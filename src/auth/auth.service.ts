import { ConflictException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto'
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { EmailService } from 'src/email/email.service'
import { JwtService } from '@nestjs/jwt';
import { Role } from './role.enum';
import { Request, Response } from 'express';
import { UpdateAuthRoleDto } from './dto/update-authRole.dto';
import { SendResetDto } from './dto/send-reset.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Injectable()
export class AuthService {
    private otpStore = new Map<string, string>();
    constructor(@InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>,
        private readonly emailService: EmailService,
        private readonly jwtService: JwtService,
    ) { }

    //////////// register
    async register(createAuthDto: CreateAuthDto) {
        try {
            const { email, password } = createAuthDto;
            const existingUser = await this.authRepository.findOne({ where: { email } });

            const hashedPassword = await bcrypt.hash(password, 10);
            const otp = Math.floor(100000 + Math.random() * 900000).toString();
            const now = new Date();

            if (existingUser && !existingUser.isVerified) {
                const diffMs = now.getTime() - new Date(existingUser.otpTime).getTime();
                const diffMinutes = diffMs / (1000 * 60);

                if (diffMinutes >= 2) {
                    existingUser.password = hashedPassword;
                    existingUser.otp = otp;
                    existingUser.otpTime = now;
                    await this.authRepository.save(existingUser);
                    await this.emailService.sendEmailOtp(email, otp);
                    return { message: "Yangi tasdiqlash kodingiz emailingizga yuborildi!" };
                }
                throw new ConflictException("Iltimos, 2 daqiqa kutib qayta urinib ko‘ring!");
            }
            if (existingUser && existingUser.isVerified) {
                throw new ConflictException("Bu email bilan foydalanuvchi mavjud!");
            }

            const newUser = this.authRepository.create({
                email,
                password: hashedPassword,
                isVerified: false,
                otp,
                otpTime: now,
            });
            await this.authRepository.save(newUser);
            await this.emailService.sendEmailOtp(email, otp);
            return { message: "Iltimos emailingizga yuborilgan kodni kiriting!" };
        } catch (error) {
            if (error instanceof ConflictException) throw error;
            throw new InternalServerErrorException('Serverda xato yuz berdi');
        }
    }


    ///////////// send otp
    async verifyOtp(email: string, otp: string) {
        try {
            const user = await this.authRepository.findOne({ where: { email } });
            if (!user) throw new ConflictException("Foydalanuvchi topilmadi!");

            if (user.otp !== otp) throw new ConflictException("Noto'g'ri OTP!");
            const otpTime = user.otpTime;
            const currentTime = new Date();
            const timeDifference = (currentTime.getTime() - otpTime.getTime())
            if (timeDifference > 2 * 60 * 1000) {
                throw new ConflictException("OTP muddati tugagan!");
            }
            user.isVerified = true;
            user.otp = '';
            user.otpTime = new Date(0);
            await this.authRepository.save(user);
            return { message: "Email manzilingiz tasdiqlandi!" };
        } catch (error) {
            if (error instanceof ConflictException) throw error
            throw new InternalServerErrorException('Serverda xato yuz berdi');
        }
    }


    ///////////// login
    async login(loginDto: CreateAuthDto, res: Response) {
        try {
            const { email, password } = loginDto
            const user = await this.authRepository.findOne({ where: { email } })
            if (!user) {
                throw new UnauthorizedException('Email yoki parol xato!');
            }

            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) {
                throw new UnauthorizedException('Email yoki parol xato!');
            }

            if (!user.isVerified) {
                throw new UnauthorizedException('Email manzili tasdiqlanmagan!')
            }

            //////////// JWT yaratish
            const payload = { id: user.id, email: user.email, role: user.role }
            ///// access token 
            const accessToken = this.jwtService.sign(payload, {
                secret: process.env.JWT_ACCESS_SECRET,
                expiresIn: '15m',
            })

            ///// refresh token
            const refreshToken = this.jwtService.sign(payload, {
                secret: process.env.JWT_REFRESH_SECRET,
                expiresIn: '7d',
            })

            //////////// Refresh tokenni cookiega saqlash
            res.cookie("refresh_token", refreshToken, {
                httpOnly: true,
                secure: false, // HTTPSda true
                sameSite: 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000,
                path: '/',
            })
            return {
                accessToken,
                user: {
                    id: user.id,
                    email: user.email,
                    role: user.role
                }
            }
        } catch (error) {
            if (error instanceof UnauthorizedException) throw error
            throw new InternalServerErrorException('Serverda xato yuz berdi');
        }
    }


    //////////// refresh token
    async refreshToken(req: Request) {
        const token = req.cookies['refresh_token'];
        if (!token) throw new UnauthorizedException('Refresh token topilmadi!');

        try {
            const payload = this.jwtService.verify(token, {
                secret: process.env.JWT_REFRESH_SECRET,
            });

            const newAccessToken = this.jwtService.sign(
                { id: payload.id, email: payload.email, role: payload.role },
                {
                    secret: process.env.JWT_ACCESS_SECRET,
                    expiresIn: '15m',
                });

            return { accessToken: newAccessToken };
        } catch (error) {
            throw new UnauthorizedException('Refresh token yaroqsiz!');
        }
    }



    //////////// get all users

    async getAllUsers() {
        try {
            const users = await this.authRepository.find();
            if (!users || users.length === 0) {
                throw new NotFoundException("Foydalanuvchilar topilmadi!");
            }
            return users.map(user => ({
                id: user.id,
                email: user.email,
                isVerified: user.isVerified,
                role: user.role
            }));

        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new InternalServerErrorException('Serverda xato yuz berdi')
        }
    }


    ///////////// add admin
    async updateUserRole(id: string, updateAuthDto: UpdateAuthRoleDto) {
        try {
            const user = await this.authRepository.findOne({ where: { id } })
            if (!user) {
                throw new NotFoundException("Foydalanuvchi topilmadi!")
            }
            const { role } = updateAuthDto;
            user.role = role;
            await this.authRepository.save(user);
            return {
                message: "Foydalanuvchi roli yangilandi!", user: {
                    id: user.id,
                    email: user.email,
                    role: user.role
                }
            };
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new InternalServerErrorException('Serverda xato yuz berdi')
        }
    }


    ////////////////// reset password
    async sendResetCode(sendResetDto: SendResetDto) {
        try {
            const { email } = sendResetDto;
            const user = await this.authRepository.findOne({ where: { email } });
            if (!user) {
                throw new NotFoundException("Bunday email bilan foydalanuvchi topilmadi!");
            }
            const otp = Math.floor(100000 + Math.random() * 900000).toString();
            user.otp = otp;
            user.otpTime = new Date();
            await this.authRepository.save(user);
            await this.emailService.sendEmailOtp(email, otp);
            return { message: 'Emailga tiklash kodi yuborildi.' };
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new InternalServerErrorException('Serverda xato yuz berdi');
        }
    }


    ///////////////////////// reset password
    async resetPassword(resetDto: ResetPasswordDto) {
        const { email, otp, newPassword } = resetDto;
        try {
            const user = await this.authRepository.findOne({ where: { email } });
            if (!user) {
                throw new NotFoundException("Foydalanuvchi topilmadi!");
            }
            if (user.otp !== otp) {
                throw new UnauthorizedException("Noto‘g‘ri OTP kiritildi!");
            }
            const otpTime = user.otpTime;
            const now = new Date()
            const diff = now.getTime() - otpTime.getTime()
            if (diff > 2 * 60 * 1000) {
                throw new UnauthorizedException("OTP kodi muddati tugagan!");
            }
            user.password = await bcrypt.hash(newPassword, 10);
            user.otp = '';
            user.otpTime = new Date(0);
            await this.authRepository.save(user)
            return { message: "Parol muvaffaqiyatli yangilandi!" }
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new InternalServerErrorException('Serverda xato yuz berdi')
        }
    }


}