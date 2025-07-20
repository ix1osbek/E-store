import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import { AboutService } from './about.service';
import { CreateAboutDto } from './dto/create-about.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/auth/role.enum';

@ApiTags('About')
@Controller('api/about')
export class AboutController {
    constructor(private readonly aboutService: AboutService) { }

    @Post('create')
    @UseGuards(AuthGuard("jwt"), RolesGuard)
    @Roles(Role.SUPERADMIN, Role.ADMIN)
    @ApiOperation({ summary: 'Sayt haqida ma’lumot yaratish' })
    @ApiOperation({ summary: 'Faqat superadmin va admin huquqi bor!' })
    @ApiResponse({ status: 201, description: 'About muvofaqiyatli qoshildi' })
    @ApiResponse({ status: 500, description: 'Serverda xato yuz berdi' })
    @ApiResponse({ status: 401, description: 'Ruxsat etilmagan' })
    @ApiBearerAuth()
    create(@Body() dto: CreateAboutDto) {
        return this.aboutService.create(dto);
    }

    @Get()
    @ApiOperation({ summary: 'Eng oxirgi "About" ma’lumotni olish' })
    findLatest() {
        return this.aboutService.findLatest();
    }

    @Get('all')
    @ApiOperation({ summary: 'Barcha "About" yozuvlarini olish (admin uchun)' })
    findAll() {
        return this.aboutService.findAll();
    }
}
