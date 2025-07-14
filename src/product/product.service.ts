import { ConflictException, Injectable } from '@nestjs/common'
import { CreateComputerDto } from './dto/create-computer.dto';
import { Repository } from 'typeorm';
import { Phone } from './entities/phone.entity';
import { InjectRepository } from '@nestjs/typeorm'
import { CreatePhoneDto } from './dto/create-phone.dto';
import { UploadService } from '../upload/upload.service';

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

    findAll() {
        return `This action returns all product`;
    }

    findOne(id: number) {
        return `This action returns a #${id} product`;
    }

    update(id: number, updateProductDto: CreateComputerDto) {
        return `This action updates a #${id} product`;
    }

    remove(id: number) {
        return `This action removes a #${id} product`;
    }
}
