import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/auth/role.enum';

@ApiTags('Contact') 
@Controller('api/contact')
export class ContactController {
    constructor(private readonly contactService: ContactService) { }

    @Post()
    @ApiOperation({ summary: 'Foydalanuvchi xabari yuborish' })
    @ApiResponse({ status: 201, description: 'Xabar muvaffaqiyatli yuborildi' })
    @ApiBody({ type: CreateContactDto })
    create(@Body() dto: CreateContactDto) {
        return this.contactService.create(dto);
    }

    @Get('all')
    @UseGuards(AuthGuard("jwt"), RolesGuard)
    @Roles(Role.SUPERADMIN, Role.ADMIN)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Barcha xabarlarni olish (admin uchun)' })
    @ApiOperation({ summary: 'Faqat superadmin va admin huquqi bor!' })
    @ApiResponse({ status: 200, description: 'Xabarlar ro‘yxati' })
    @ApiResponse({ status: 404, description: ' Xabarlar topilmadi!' })
    @ApiResponse({ status: 500, description: 'Serverda xato yuz berdi' })
    @ApiResponse({ status: 400, description: 'Noto‘g‘ri so‘rov' })
    @ApiResponse({ status: 401, description: 'Ruxsat etilmagan' })
    findAll() {
        return this.contactService.findAll();
    }
}
