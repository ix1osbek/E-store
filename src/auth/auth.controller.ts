import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { VerifyOtpDto } from './dto/verify_otp.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';


@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post("register")
    @ApiOperation({ summary: 'Foydalanuvchini ro‘yxatdan o‘tkazish' })
    @ApiResponse({ status: 201, description: 'Foydalanuvchi yaratildi' })
    @ApiResponse({ status: 409, description: 'Email allaqachon ro‘yxatda bor' })
    async register(@Body() createAuthDto: CreateAuthDto) {
        await this.authService.register(createAuthDto);
        return { message: "Iltimos emailingizga yuborilgan kodni kiriting!" };
    }

    @Post("verify_otp")
    @ApiOperation({ summary: 'OTP orqali emailni tasdiqlash' })
    @ApiResponse({ status: 200, description: 'Email manzilingiz tasdiqlandi!' })
    @ApiResponse({ status: 409, description: 'Noto‘g‘ri OTP yoki email' })
    @ApiResponse({ status: 404, description: 'Foydalanuvchi topilmadi' })
    async verifyOtp(@Body() verifyOtpDto: VerifyOtpDto) {
        await this.authService.verifyOtp(verifyOtpDto.email, verifyOtpDto.otp);
        return { message: "Email manzilingiz tasdiqlandi!" };
    }
}
