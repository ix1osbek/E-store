import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/common/guards/roles.guard'
import { Roles } from 'src/common/decorators/roles.decorator'
import { Role } from 'src/auth/role.enum';

@Controller('api/category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) { }

    @Post("create")
    @UseGuards(AuthGuard("jwt"), RolesGuard)

    @Roles(Role.SUPERADMIN, Role.ADMIN)
    @ApiOperation({ summary: 'Kategoriya yaratish' })
    @ApiOperation({ summary: 'Faqat superadmin va admin huquqi bor!' })
    @ApiResponse({ status: 201, description: 'Kategoriya muvaffaqiyatli yaratildi' })
    @ApiResponse({ status: 409, description: 'Ushbu nomdagi kategoriya mavjud!' })
    @ApiResponse({ status: 500, description: 'Serverda xato yuz berdi' })
    @ApiResponse({ status: 400, description: 'Noto‘g‘ri so‘rov' })
    @ApiResponse({ status: 404, description: 'Kategoriyalar topilmadi' })
    @ApiBearerAuth()
    create(@Body() createCategoryDto: CreateCategoryDto) {
        return this.categoryService.create(createCategoryDto);
    }
    @Get("all")
    @ApiOperation({ summary: 'Barcha kategoriyalarni olish' })
    @ApiOperation({ summary: 'Barcha olishi mumkin!' })
    @ApiResponse({ status: 200, description: 'Barcha kategoriyalar muvaffaqiyatli olindi' })
    @ApiResponse({ status: 404, description: 'Kategoriyalar topilmadi' })
    @ApiResponse({ status: 500, description: 'Serverda xato yuz berdi' })
    findAll() {
        return this.categoryService.findAll()
    }

    @Get(':id/find')
    @ApiOperation({ summary: 'Kategoriya ID bo‘yicha topish' })
    @ApiResponse({ status: 200, description: 'Kategoriya muvaffaqiyatli topildi' })
    @ApiResponse({ status: 404, description: 'Kategoriya topilmadi' })
    @ApiResponse({ status: 500, description: 'Serverda xato yuz berdi' })
    @ApiResponse({ status: 400, description: 'Noto‘g‘ri so‘rov' })
    findOne(@Param('id') id: string) {
        return this.categoryService.findOne(id);
    }

    @Put(':id/update')
    @UseGuards(AuthGuard("jwt"), RolesGuard)
    @Roles(Role.SUPERADMIN, Role.ADMIN)
    @ApiOperation({ summary: 'Kategoriya ID bo‘yicha yangilash' })
    @ApiOperation({ summary: 'Faqat superadmin va admin huquqi bor!' })
    @ApiResponse({ status: 200, description: 'Kategoriya muvaffaqiyatli yangilandi' })
    @ApiResponse({ status: 404, description: 'Kategoriya topilmadi' })
    @ApiResponse({ status: 500, description: 'Serverda xato yuz berdi' })
    @ApiResponse({ status: 400, description: 'Noto‘g‘ri so‘rov' })
    @ApiResponse({ status: 409, description: 'Ushbu nomdagi kategoriya mavjud!' })
    @ApiBearerAuth()
    update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
        return this.categoryService.update(id, updateCategoryDto);
    }

    @Delete(':id/delete')
    @UseGuards(AuthGuard("jwt"), RolesGuard)
    @Roles(Role.SUPERADMIN, Role.ADMIN)
    @ApiOperation({ summary: 'Kategoriya ID bo‘yicha o‘chirish' })
    @ApiOperation({ summary: 'Faqat superadmin va admin huquqi bor!' })
    @ApiResponse({ status: 200, description: 'Kategoriya muvaffaqiyatli o‘chirildi' })
    @ApiResponse({ status: 404, description: 'Kategoriya topilmadi' })
    @ApiResponse({ status: 500, description: 'Serverda xato yuz berdi' })
    @ApiResponse({ status: 400, description: 'Noto‘g‘ri so‘rov' })
    @ApiResponse({ status: 409, description: 'Ushbu nomdagi kategoriya mavjud!' })
    @ApiResponse({ status: 401, description: 'Ruxsat etilmagan' })
    @ApiBearerAuth()
    remove(@Param('id') id: string) {
        return this.categoryService.remove(id);
    }
}
