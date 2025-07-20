import { Controller, Post, Get, Body } from '@nestjs/common';
import { AboutService } from './about.service';
import { CreateAboutDto } from './dto/create-about.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('About')
@Controller('api/about')
export class AboutController {
    constructor(private readonly aboutService: AboutService) { }

    @Post('create')
    @ApiOperation({ summary: 'Sayt haqida ma’lumot yaratish' })
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
