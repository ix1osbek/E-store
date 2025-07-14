import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { CreateComputerDto } from './dto/create-computer.dto';
import { Repository } from 'typeorm';
import { Phone } from './entities/phone.entity';
import { InjectRepository } from '@nestjs/typeorm'
import { CreatePhoneDto } from './dto/create-phone.dto';
import { UploadService } from '../upload/upload.service';
import { UpdatePhoneDto } from './dto/update-phone-dto';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Phone)
        private readonly phoneRepository: Repository<Phone>,
        private readonly uploadService: UploadService,
    ) { }
    async createPhone(createPhoneDto: CreatePhoneDto, files: Express.Multer.File[]) {
        try {
            const phone = await this.phoneRepository.findOne({ where: { model: createPhoneDto.model } });
            if (phone) {
                throw new ConflictException("Ushbu modeldagi telefon mavjud!");
            }

            let imageUrls: string[] = [];
            if (files && files.length > 0) {
                imageUrls = await this.uploadService.uploadAndGetUrls(files);
            }

            const newPhone = this.phoneRepository.create({
                ...createPhoneDto,
                image: imageUrls.join(',')
            });
            return await this.phoneRepository.save(newPhone)
        } catch (error) {
            if (error instanceof ConflictException) throw error;
            throw new Error('Serverda xato yuz berdi');
        }
    }

    async findAllPhones() {
        try {
            if (!this.phoneRepository) {
                throw new NotFoundException('Phone topilmadi');
            }
            return await this.phoneRepository.find()
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new Error('Serverda xato yuz berdi');
        }
    }

    async findOnePhone(id: string) {
        try {
            const phone = await this.phoneRepository.findOne({ where: { id } });
            if (!phone) {
                throw new NotFoundException('Telefon topilmadi');
            }
            return phone;
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new Error('Serverda xato yuz berdi');
        }
    }

    async updatePhone(id: string, updateProductDto: UpdatePhoneDto) {
        try {
            const phone = await this.phoneRepository.findOne({ where: { id } });
            if (!phone) {
                throw new NotFoundException('Telefon topilmadi');
            }
            await this.phoneRepository.update(id, updateProductDto);
            return this.phoneRepository.findOne({ where: { id } });
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new Error('Serverda xato yuz berdi');
        }
    }

    async removePhone(id: string) {
        try {
            const phone = await this.phoneRepository.findOne({ where: { id } })
            if (!phone) {
                throw new NotFoundException('Telefon topilmadi')
            }
            await this.phoneRepository.delete(id)
            return { message: 'Telefon muvaffaqiyatli o‘chirildi' }
        } catch (error) {
            if (error instanceof NotFoundException) throw error
            throw new Error('Serverda xato yuz berdi')
        }
    }
}
