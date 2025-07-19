import { Controller, Get, Post, Body, Param, Res, Req, Put } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { VerifyOtpDto } from './dto/verify_otp.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { UpdateAuthRoleDto } from './dto/update-authRole.dto';
import { SendResetDto } from './dto/send-reset.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { UseGuards } from '@nestjs/common';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from './role.enum';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/common/guards/roles.guard';



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
    @UseGuards(AuthGuard("jwt"), RolesGuard)
    @Roles(Role.SUPERADMIN)
    @ApiOperation({ summary: 'Faqat superadmin huquqi bor!' })
    @ApiOperation({ summary: 'Barcha foydalanuvchilarni olish' })
    @ApiResponse({ status: 200, description: 'Foydalanuvchilar ro‘yxati' })
    @ApiResponse({ status: 404, description: 'Foydalanuvchilar topilmadi' })
    @ApiResponse({ status: 500, description: 'Serverda xato yuz berdi' })
    @ApiBearerAuth()
    async getAllUsers() {
        return this.authService.getAllUsers();
    }


    @Put(':id/role')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(Role.SUPERADMIN)
    @ApiOperation({ summary: 'Foydalanuvchining rolini yangilash (faqat superadmin)' })
    @ApiResponse({ status: 200, description: 'Foydalanuvchining roli yangilandi' })
    @ApiResponse({ status: 403, description: 'Ruxsat yo‘q (superadmin emas)' })
    @ApiResponse({ status: 404, description: 'Foydalanuvchi topilmadi' })
    @ApiBearerAuth()
    async updateUserRole(
        @Param('id') id: string,
        @Body() updateAuthDto: UpdateAuthRoleDto,
    ) {
        return this.authService.updateUserRole(id, updateAuthDto);
    }


    @Post('forgot_password')
    @ApiOperation({ summary: 'Parolni tiklash uchun kod yuborish' })
    @ApiResponse({ status: 200, description: 'Parolni tiklash uchun kod yuborildi' })
    @ApiResponse({ status: 404, description: 'Foydalanuvchi topilmadi' })
    @ApiResponse({ status: 500, description: 'Serverda xato yuz berdi' })
    async sendResetCode(@Body() dto: SendResetDto) {
        return this.authService.sendResetCode(dto)
    }

    @Post('reset_password')
    @ApiOperation({ summary: 'Parolni tiklash' })
    @ApiResponse({ status: 200, description: 'Parol muvaffaqiyatli tiklandi' })
    @ApiResponse({ status: 404, description: 'Foydalanuvchi topilmadi' })
    @ApiResponse({ status: 500, description: 'Serverda xato yuz berdi' })
    async resetPassword(@Body() dto: ResetPasswordDto) {
        return this.authService.resetPassword(dto)
    }

}

