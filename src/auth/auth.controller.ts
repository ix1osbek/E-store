import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { VerifyOtpDto } from './dto/verify_otp.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';


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

    @Post("login")
    @ApiOperation({ summary: "Foydalanuvchini tizimga kirishi" })
    @ApiResponse({ status: 200, description: 'Foydalanuvchi tizimga kirdi' })
    @ApiResponse({ status: 401, description: 'Noto‘g‘ri email yoki parol' })
    @ApiResponse({ status: 404, description: 'Foydalanuvchi topilmadi' })
    @ApiResponse({ status: 500, description: 'Serverda xato yuz berdi' })
    async login(@Body() dto: CreateAuthDto, @Res({ passthrough: true }) res: Response) {
        return this.authService.login(dto, res)
    }


    @Post("refresh")
    @ApiOperation({ summary: 'Tokenni yangilash' })
    @ApiResponse({ status: 200, description: 'Token yangilandi' })
    @ApiResponse({ status: 401, description: 'Token noto‘g‘ri' })
    @ApiResponse({ status: 500, description: 'Serverda xato yuz berdi' })
    async refresh(@Req() req: Request) {
        return this.authService.refreshToken(req);
    }

    @Post('logout')
    @ApiOperation({ summary: 'Foydalanuvchini tizimdan chiqishi' })
    @ApiResponse({ status: 200, description: 'Foydalanuvchi tizimdan chiqdi' })
    @ApiResponse({ status: 500, description: 'Serverda xato yuz berdi' })
    async logout(@Res({ passthrough: true }) res: Response) {
        res.clearCookie('refresh_token', {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            path: '/', 
        });

        return { message: 'Tizimdan chiqildi' };
    }



    @Get('all')
    @ApiOperation({ summary: 'Barcha foydalanuvchilarni olish' })
    @ApiResponse({ status: 200, description: 'Foydalanuvchilar ro‘yxati' })
    @ApiResponse({ status: 404, description: 'Foydalanuvchilar topilmadi' })
    @ApiResponse({ status: 500, description: 'Serverda xato yuz berdi' })
    async getAllUsers() {
        return this.authService.getAllUsers();
    }
}
