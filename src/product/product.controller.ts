import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFiles, UseInterceptors, UseGuards, Put } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateComputerDto } from './dto/create-computer.dto';
import { CreatePhoneDto } from './dto/create-phone.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/auth/role.enum';
import { UpdatePhoneDto } from './dto/update-phone-dto';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Post("phone/create")
    @UseGuards(AuthGuard("jwt"), RolesGuard)
    @Roles(Role.SUPERADMIN, Role.ADMIN)
    @UseInterceptors(FilesInterceptor('files', 5))
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                model: { type: 'string' },
                title: { type: 'string' },
                description: { type: 'string' },
                memory: { type: 'string' },
                color: { type: 'string' },
                cpu: { type: 'string' },
                screen_size: { type: 'string' },
                battery: { type: 'string' },
                front_camera: { type: 'string' },
                main_camera: { type: 'string' },
                price: { type: 'number' },
                categoryId: { type: 'string' },
                files: {
                    type: 'array',
                    items: {
                        type: 'string',
                        format: 'binary'
                    }
                }
            },
            required: ['model', 'title', 'price', 'categoryId', 'files'],
        },
    })
    @ApiOperation({ summary: 'Telefon yaratish' })
    @ApiOperation({ summary: 'Telefon yaratish uchun fayllarni yuklash mumkin!' })
    @ApiOperation({ summary: 'Fayllar maksimal 5 ta bo‘lishi kerak!' })
    @ApiResponse({ status: 201, description: 'Telefon muvaffaqiyatli yaratildi' })
    @ApiResponse({ status: 409, description: 'Ushbu modeldagi telefon mavjud!' })
    @ApiResponse({ status: 500, description: 'Serverda xato yuz berdi' })
    @ApiResponse({ status: 400, description: 'Noto‘g‘ri so‘rov' })
    @ApiResponse({ status: 404, description: 'Kategoriyalar topilmadi' })
    async createPhone(
        @Body() createPhoneDto: CreatePhoneDto,
        @UploadedFiles() files: Express.Multer.File[],
    ) {
        return this.productService.createPhone(createPhoneDto, files);
    }

    @Get("phone/all")
    @ApiOperation({ summary: 'Barcha telefonlarni olish' })
    @ApiResponse({ status: 200, description: 'Barcha telefonlar muvaffaqiyatli olindi' })
    @ApiResponse({ status: 404, description: 'Telefonlar topilmadi' })
    @ApiResponse({ status: 500, description: 'Serverda xato yuz berdi' })
    async findAllPhones() {
        return this.productService.findAllPhones();
    }

    @Get("phone/:id/find")
    @ApiOperation({ summary: 'Telefon ID bo‘yicha topish' })
    @ApiResponse({ status: 200, description: 'Telefon muvaffaqiyatli topildi' })
    @ApiResponse({ status: 404, description: 'Telefon topilmadi' })
    @ApiResponse({ status: 500, description: 'Serverda xato yuz berdi' })
    async findOnePhone(@Param('id') id: string) {
        return this.productService.findOnePhone(id)
    }

    @Put('phone/:id/update')
    @UseGuards(AuthGuard("jwt"), RolesGuard)
    @Roles(Role.SUPERADMIN, Role.ADMIN)
    @ApiOperation({ summary: 'Telefon ID bo‘yicha yangilash' })
    @ApiOperation({ summary: 'Faqat superadmin va admin huquqi bor!' })
    @ApiResponse({ status: 200, description: 'Telefon muvaffaqiyatli yangilandi' })
    @ApiResponse({ status: 404, description: 'Telefon topilmadi' })
    @ApiResponse({ status: 500, description: 'Serverda xato yuz berdi' })
    @ApiResponse({ status: 400, description: 'Noto‘g‘ri so‘rov' })
    @ApiBody({
        type: UpdatePhoneDto,
        description: 'Yangilash uchun telefon ma\'lumotlari',
    })
    async updatePhone(@Param('id') id: string, @Body() updateProductDto: UpdatePhoneDto) {
        return this.productService.updatePhone(id, updateProductDto);
    }

    @Delete('phone/:id/delete')
    @UseGuards(AuthGuard("jwt"), RolesGuard)
    @Roles(Role.SUPERADMIN, Role.ADMIN)
    @ApiOperation({ summary: 'Telefon ID bo‘yicha o‘chirish' })
    @ApiOperation({ summary: 'Faqat superadmin va admin huquqi bor!' })
    @ApiResponse({ status: 200, description: 'Telefon muvaffaqiyatli o‘chirildi' })
    @ApiResponse({ status: 404, description: 'Telefon topilmadi' })
    @ApiResponse({ status: 500, description: 'Serverda xato yuz berdi' })
    @ApiResponse({ status: 400, description: 'Noto‘g‘ri so‘rov' })
    @ApiResponse({ status: 401, description: 'Ruxsat etilmagan' })
    async remove(@Param('id') id: string) {
        return this.productService.removePhone(id);
    }
}
