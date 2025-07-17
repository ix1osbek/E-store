import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFiles, UseInterceptors, UseGuards, Put } from '@nestjs/common';
import { ProductService } from './product.service'
import { CreateProductDto } from './dto/create-product.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/auth/role.enum';
import { UpdateProductDto } from "./dto/update-product.dto"

@Controller('api/product')
export class ProductController {
    constructor(private readonly productService: ProductService) { }


    //////////// product CRUD ////////////
    @Post("create")
    @UseGuards(AuthGuard("jwt"), RolesGuard)
    @Roles(Role.SUPERADMIN, Role.ADMIN)
    @UseInterceptors(FilesInterceptor('image', 5))
    @ApiConsumes('multipart/form-data')
    @ApiOperation({ summary: 'Telefon yaratish' })
    @ApiOperation({ summary: 'Telefon yaratish uchun fayllarni yuklash mumkin!' })
    @ApiOperation({ summary: 'Fayllar maksimal 5 ta bo‘lishi kerak!' })
    @ApiResponse({ status: 201, description: 'Telefon muvaffaqiyatli yaratildi' })
    @ApiResponse({ status: 409, description: 'Ushbu modeldagi telefon mavjud!' })
    @ApiResponse({ status: 500, description: 'Serverda xato yuz berdi' })
    @ApiResponse({ status: 400, description: 'Noto‘g‘ri so‘rov' })
    @ApiResponse({ status: 404, description: 'Kategoriyalar topilmadi' })
    async createProduct(
        @Body() createProductDto: CreateProductDto,
        @UploadedFiles() file: Express.Multer.File[],
    ) {
        return this.productService.createProduct(createProductDto, file);
    }
    @Get("all")
    @ApiOperation({ summary: 'Barcha productlarni olish' })
    @ApiResponse({ status: 200, description: 'Barcha productlar muvaffaqiyatli olindi' })
    @ApiResponse({ status: 404, description: 'productlar topilmadi' })
    @ApiResponse({ status: 500, description: 'Serverda xato yuz berdi' })
    async findAllproducts() {
        return this.productService.findAllproducts();
    }

    @Get(":id/find")
    @ApiOperation({ summary: 'product ID bo‘yicha topish' })
    @ApiResponse({ status: 200, description: 'product muvaffaqiyatli topildi' })
    @ApiResponse({ status: 404, description: 'product topilmadi' })
    @ApiResponse({ status: 500, description: 'Serverda xato yuz berdi' })
    async findOneproduct(@Param('id') id: string) {
        return this.productService.findOneproduct(id)
    }

    @Put(':id/update')
    @UseGuards(AuthGuard("jwt"), RolesGuard)
    @Roles(Role.SUPERADMIN, Role.ADMIN)
    @UseInterceptors(FilesInterceptor('image', 5))
    @ApiConsumes('multipart/form-data')
    @ApiOperation({ summary: 'Faqat superadmin va admin huquqi bor!' })
    @ApiResponse({ status: 200, description: 'product muvaffaqiyatli yangilandi' })
    @ApiResponse({ status: 404, description: 'product topilmadi' })
    @ApiResponse({ status: 500, description: 'Serverda xato yuz berdi' })
    @ApiResponse({ status: 400, description: 'Noto‘g‘ri so‘rov' })
    @ApiBody({
        type: UpdateProductDto,
        description: 'Yangilash uchun product ma\'lumotlari',
    })
    async updateproduct(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto, @UploadedFiles() image: Express.Multer.File[],) {
        return this.productService.updateproduct(id, updateProductDto, image);
    }

    @Delete(':id/delete')
    @UseGuards(AuthGuard("jwt"), RolesGuard)
    @Roles(Role.SUPERADMIN, Role.ADMIN)
    @ApiOperation({ summary: 'product ID bo‘yicha o‘chirish' })
    @ApiOperation({ summary: 'Faqat superadmin va admin huquqi bor!' })
    @ApiResponse({ status: 200, description: 'product muvaffaqiyatli o‘chirildi' })
    @ApiResponse({ status: 404, description: 'product topilmadi' })
    @ApiResponse({ status: 500, description: 'Serverda xato yuz berdi' })
    @ApiResponse({ status: 400, description: 'Noto‘g‘ri so‘rov' })
    @ApiResponse({ status: 401, description: 'Ruxsat etilmagan' })
    async remove(@Param('id') id: string) {
        return this.productService.removeproduct(id)
    }
}
