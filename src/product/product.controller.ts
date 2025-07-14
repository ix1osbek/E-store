import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateGamingDto } from './dto/create-gaming.dto';
import { CreateComputerDto } from './dto/create-computer.dto';
import { CreatePhoneDto } from './dto/create-phone.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Post("phone/create")
    @UseInterceptors(FilesInterceptor('files', 5)) 
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
    @Get()
    findAll() {
        return this.productService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.productService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateProductDto: CreateComputerDto) {
        return this.productService.update(+id, updateProductDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.productService.remove(+id);
    }
}
