import { Controller, Post, Get, Param, Delete, Body, UseGuards } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { Blog } from './entities/blog.entity';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/auth/role.enum';

@ApiTags('Blog')
@Controller('api/blog')
export class BlogController {
    constructor(private readonly blogService: BlogService) { }

    @Post('create')
    @UseGuards(AuthGuard("jwt"), RolesGuard)
    @Roles(Role.SUPERADMIN, Role.ADMIN)
    @ApiBearerAuth()
    @ApiResponse({ status: 401, description: 'Ruxsat etilmagan. Faqat admin va superadmin ruxsati bor' })
    @ApiOperation({ summary: 'Yangi blog yaratish' })
    @ApiResponse({ status: 201, description: 'Blog yaratildi', type: Blog })
    @ApiBody({ type: CreateBlogDto })
    create(@Body() dto: CreateBlogDto) {
        return this.blogService.create(dto);
    }

    @Get('all')
    @ApiOperation({ summary: 'Barcha bloglarni olish' })
    @ApiResponse({ status: 200, description: 'Bloglar ro‘yxati', type: [Blog] })
    findAll() {
        return this.blogService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Bitta blogni olish' })
    @ApiParam({ name: 'id', type: Number, description: 'Blog ID raqami' })
    @ApiResponse({ status: 200, description: 'Topilgan blog', type: Blog })
    findOne(@Param('id') id: string) {
        return this.blogService.findOne(+id);
    }

    @Delete(':id')
    @UseGuards(AuthGuard("jwt"), RolesGuard)
    @Roles(Role.SUPERADMIN, Role.ADMIN)
    @ApiBearerAuth()
    @ApiResponse({ status: 401, description: 'Ruxsat etilmagan. Faqat admin va superadmin ruxsati bor' })
    @ApiOperation({ summary: 'Blogni o‘chirish' })
    @ApiParam({ name: 'id', type: Number, description: 'Blog ID raqami' })
    @ApiResponse({ status: 200, description: 'Blog o‘chirildi' })
    remove(@Param('id') id: string) {
        return this.blogService.remove(+id);
    }
}
