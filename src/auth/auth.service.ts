import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto'
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { EmailService } from 'src/email/email.service'

@Injectable()
export class AuthService {
    private otpStore = new Map<string, string>();
    constructor(@InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>,
        private readonly emailService: EmailService
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
}