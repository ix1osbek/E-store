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
            const { email, password } = createAuthDto
            const existingUser = await this.authRepository.findOne({ where: { email } });
            if (existingUser) {
                throw new ConflictException("Bu email bilan foydalanuvchi mavjud!")
            }

            const hashedPassword = await bcrypt.hash(password, 10)
            const otp = Math.floor(100000 + Math.random() * 900000).toString();

            const newUser = this.authRepository.create({
                email,
                password: hashedPassword,
                isVerified: false,
                otp,
                otpTime: new Date()
            })
            await this.authRepository.save(newUser);
            await this.emailService.sendEmailOtp(email, otp)
            return { message: "Iltimos emailingizga yuborilgan kodni kiriting!" };
        } catch (error) {
            if (error instanceof ConflictException) throw error
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
                { sub: payload.sub, email: payload.email, role: payload.role },
                { secret: process.env.JWT_ACCESS_SECRET, expiresIn: '15m' }
            );

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
}