import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFiles, UseInterceptors, UseGuards, Put } from '@nestjs/common';
import { ProductService } from './product.service'
import { CreatePhoneDto } from './dto/create-phone.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/auth/role.enum';
import { UpdatePhoneDto } from './dto/update-phone-dto';
import { CreateWatchDto } from './dto/create-watch.dto';
import { UpdateWatchDto } from './dto/update-watch-dto';
import { CreateGamingDto } from './dto/create-gaming.dto';
import { UpdateGamingDto } from './dto/update-gaming-dto';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) { }


    //////////// PHONE CRUD ////////////
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
    @UseInterceptors(FilesInterceptor('files', 5))
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
    async updatePhone(@Param('id') id: string, @Body() updateProductDto: UpdatePhoneDto, @UploadedFiles() files: Express.Multer.File[],) {
        return this.productService.updatePhone(id, updateProductDto, files);
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


    //////////// WATCH CRUD ////////////

    @Post("watch/create")
    @UseGuards(AuthGuard("jwt"), RolesGuard)
    @Roles(Role.SUPERADMIN, Role.ADMIN)
    @UseInterceptors(FilesInterceptor('files', 5))
    @ApiConsumes('multipart/form-data')
    @ApiOperation({ summary: 'Soat yaratish' })
    @ApiOperation({ summary: 'Soat yaratish uchun fayllarni yuklash mumkin!' })
    @ApiOperation({ summary: 'Fayllar maksimal 5 ta bo‘lishi kerak!' })
    @ApiResponse({ status: 201, description: 'Soat muvaffaqiyatli yaratildi' })
    @ApiResponse({ status: 500, description: 'Serverda xato yuz berdi' })
    @ApiResponse({ status: 400, description: 'Noto‘g‘ri so‘rov' })
    @ApiResponse({ status: 404, description: 'Kategoriyalar topilmadi' })
    async createWatch(
        @Body() createWatchdto: CreateWatchDto,
        @UploadedFiles() files: Express.Multer.File[],
    ) {
        return this.productService.createWatch(createWatchdto, files);
    }

    @Get("watch/all")
    @ApiOperation({ summary: 'Barcha soatlarni olish' })
    @ApiResponse({ status: 200, description: 'Barcha soatlar muvaffaqiyatli olindi' })
    @ApiResponse({ status: 404, description: 'soatlar topilmadi' })
    @ApiResponse({ status: 500, description: 'Serverda xato yuz berdi' })
    async findAllWatches() {
        return this.productService.findAllwatches();
    }


    @Get("watch/:id/find")
    @ApiOperation({ summary: 'Soat ID bo‘yicha topish' })
    @ApiResponse({ status: 200, description: 'Soat muvaffaqiyatli topildi' })
    @ApiResponse({ status: 404, description: 'Soat topilmadi' })
    @ApiResponse({ status: 500, description: 'Serverda xato yuz berdi' })
    async findOneWatch(@Param('id') id: string) {
        return this.productService.findOneWatch(id)
    }



    @Put('watch/:id/update')
    @UseGuards(AuthGuard("jwt"), RolesGuard)
    @Roles(Role.SUPERADMIN, Role.ADMIN)
    @UseInterceptors(FilesInterceptor('files', 5))
    @ApiOperation({ summary: 'soat ID bo‘yicha yangilash' })
    @ApiOperation({ summary: 'Faqat superadmin va admin huquqi bor!' })
    @ApiResponse({ status: 200, description: 'soat muvaffaqiyatli yangilandi' })
    @ApiResponse({ status: 404, description: 'soat topilmadi' })
    @ApiResponse({ status: 500, description: 'Serverda xato yuz berdi' })
    @ApiResponse({ status: 400, description: 'Noto‘g‘ri so‘rov' })
    @ApiBody({
        type: UpdateWatchDto,
        description: 'Yangilash uchun soat ma\'lumotlari',
    })
    async updateWatch(@Param('id') id: string, @Body() updateProductDto: UpdateWatchDto, @UploadedFiles() files: Express.Multer.File[],) {
        return this.productService.updatePhone(id, updateProductDto, files);
    }


    @Delete('watch/:id/delete')
    @UseGuards(AuthGuard("jwt"), RolesGuard)
    @Roles(Role.SUPERADMIN, Role.ADMIN)
    @ApiOperation({ summary: 'Soat ID bo‘yicha o‘chirish' })
    @ApiOperation({ summary: 'Faqat superadmin va admin huquqi bor!' })
    @ApiResponse({ status: 200, description: 'Soat muvaffaqiyatli o‘chirildi' })
    @ApiResponse({ status: 404, description: 'Soat topilmadi' })
    @ApiResponse({ status: 500, description: 'Serverda xato yuz berdi' })
    @ApiResponse({ status: 400, description: 'Noto‘g‘ri so‘rov' })
    @ApiResponse({ status: 401, description: 'Ruxsat etilmagan' })
    async removeWatch(@Param('id') id: string) {
        return this.productService.removeWatch(id);
    }


    ////////////// game crud /////////////

    @Post("gaming/create")
    @UseGuards(AuthGuard("jwt"), RolesGuard)
    @Roles(Role.SUPERADMIN, Role.ADMIN)
    @UseInterceptors(FilesInterceptor('files', 5))
    @ApiConsumes('multipart/form-data')
    @ApiOperation({ summary: 'Gaming yaratish' })
    @ApiOperation({ summary: 'Gaming yaratish uchun fayllarni yuklash mumkin!' })
    @ApiOperation({ summary: 'Fayllar maksimal 5 ta bo‘lishi kerak!' })
    @ApiResponse({ status: 201, description: 'Gaming muvaffaqiyatli yaratildi' })
    @ApiResponse({ status: 500, description: 'Serverda xato yuz berdi' })
    @ApiResponse({ status: 400, description: 'Noto‘g‘ri so‘rov' })
    @ApiResponse({ status: 404, description: 'Kategoriyalar topilmadi' })
    async createGaming(
        @Body() createGamingdto: CreateGamingDto,
        @UploadedFiles() files: Express.Multer.File[],
    ) {
        return this.productService.createGame(createGamingdto, files);
    }

    @Get("gaming/all")
    @ApiOperation({ summary: 'Barcha Gaminglarni olish' })
    @ApiResponse({ status: 200, description: 'Barcha Gaminglar muvaffaqiyatli olindi' })
    @ApiResponse({ status: 404, description: 'Gaminglar topilmadi' })
    @ApiResponse({ status: 500, description: 'Serverda xato yuz berdi' })
    async findAllGaming() {
        return this.productService.findAllGames();
    }


    @Get("gaming/:id/find")
    @ApiOperation({ summary: 'Gaming ID bo‘yicha topish' })
    @ApiResponse({ status: 200, description: 'Gaming muvaffaqiyatli topildi' })
    @ApiResponse({ status: 404, description: 'Gaming topilmadi' })
    @ApiResponse({ status: 500, description: 'Serverda xato yuz berdi' })
    async findOneGaming(@Param('id') id: string) {
        return this.productService.findOneGame(id)
    }



    @Put('gaming/:id/update')
    @UseGuards(AuthGuard("jwt"), RolesGuard)
    @Roles(Role.SUPERADMIN, Role.ADMIN)
    @UseInterceptors(FilesInterceptor('files', 5))
    @ApiOperation({ summary: 'gaming ID bo‘yicha yangilash' })
    @ApiOperation({ summary: 'Faqat superadmin va admin huquqi bor!' })
    @ApiResponse({ status: 200, description: 'gaming muvaffaqiyatli yangilandi' })
    @ApiResponse({ status: 404, description: 'gaming topilmadi' })
    @ApiResponse({ status: 500, description: 'Serverda xato yuz berdi' })
    @ApiResponse({ status: 400, description: 'Noto‘g‘ri so‘rov' })
    @ApiBody({
        type: UpdateGamingDto,
        description: 'Yangilash uchun gaming ma\'lumotlari',
    })
    async updateGaming(@Param('id') id: string, @Body() updateProductDto: UpdateGamingDto, @UploadedFiles() files: Express.Multer.File[],) {
        return this.productService.updategaming(id, updateProductDto, files);
    }


    @Delete('gaming/:id/delete')
    @UseGuards(AuthGuard("jwt"), RolesGuard)
    @Roles(Role.SUPERADMIN, Role.ADMIN)
    @ApiOperation({ summary: 'Gaming ID bo‘yicha o‘chirish' })
    @ApiOperation({ summary: 'Faqat superadmin va admin huquqi bor!' })
    @ApiResponse({ status: 200, description: 'Gaming muvaffaqiyatli o‘chirildi' })
    @ApiResponse({ status: 404, description: 'Gaming topilmadi' })
    @ApiResponse({ status: 500, description: 'Serverda xato yuz berdi' })
    @ApiResponse({ status: 400, description: 'Noto‘g‘ri so‘rov' })
    @ApiResponse({ status: 401, description: 'Ruxsat etilmagan' })
    async removeGaming(@Param('id') id: string) {
        return this.productService.removeGaming(id);
    }
}
