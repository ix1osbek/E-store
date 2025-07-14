import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { CreateComputerDto } from './dto/create-computer.dto';
import { Repository } from 'typeorm';
import { Phone } from './entities/phone.entity';
import { InjectRepository } from '@nestjs/typeorm'
import { CreatePhoneDto } from './dto/create-phone.dto';
import { UploadService } from '../upload/upload.service';
import { UpdatePhoneDto } from './dto/update-phone-dto';
import { CreateWatchDto } from './dto/create-watch.dto';
import { Watch } from './entities/watches.entity';
import { UpdateWatchDto } from './dto/update-watch-dto';
import { CreateGamingDto } from './dto/create-gaming.dto';
import { Gaming } from './entities/gaming.entity';
import { UpdateGamingDto } from './dto/update-gaming-dto';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Phone)
        private readonly phoneRepository: Repository<Phone>,
        private readonly uploadService: UploadService,
        @InjectRepository(Watch)
        private readonly watchRepository: Repository<Watch>,
        @InjectRepository(Gaming)
        private readonly GameRepository: Repository<Gaming>,
    ) { }


    ///////////////// phone crud /////////////////
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

    async updatePhone(id: string, updateProductDto: UpdatePhoneDto, files: Express.Multer.File[]) {
        try {
            const phone = await this.phoneRepository.findOne({ where: { id } });
            if (!phone) {
                throw new NotFoundException('Telefon topilmadi');
            }

            let imageUrls: string[] = [];
            if (files && files.length > 0) {
                imageUrls = await this.uploadService.uploadAndGetUrls(files);
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



    /////////////// watch crud /////////////////

    async createWatch(createWatchDto: CreateWatchDto, files: Express.Multer.File[]) {
        try {
            let imageUrls: string[] = [];
            if (files && files.length > 0) {
                imageUrls = await this.uploadService.uploadAndGetUrls(files);
            }
            const newWatch = this.GameRepository.create({
                ...createWatchDto,
                img: imageUrls.join(',')
            });
            return await this.GameRepository.save(newWatch)
        } catch (error) {
            throw new Error('Serverda xato yuz berdi');
        }
    }


    async findAllwatches() {
        try {
            if (!this.watchRepository) {
                throw new NotFoundException('Soat topilmadi');
            }
            return await this.watchRepository.find()
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new Error('Serverda xato yuz berdi');
        }
    }
    async findOneWatch(id: string) {
        try {
            const watch = await this.watchRepository.findOne({ where: { id } });
            if (!watch) {
                throw new NotFoundException('Soat topilmadi');
            }
            return watch;
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new Error('Serverda xato yuz berdi');
        }
    }


    async updateWatch(id: string, updateProductDto: UpdateWatchDto, files: Express.Multer.File[]) {
        try {
            const watch = await this.watchRepository.findOne({ where: { id } });
            if (!watch) {
                throw new NotFoundException('Soat topilmadi');
            }

            let imageUrls: string[] = [];
            if (files && files.length > 0) {
                imageUrls = await this.uploadService.uploadAndGetUrls(files);
            }
            await this.watchRepository.update(id, updateProductDto);
            return this.watchRepository.findOne({ where: { id } });
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new Error('Serverda xato yuz berdi');
        }
    }

    async removeWatch(id: string) {
        try {
            const watch = await this.watchRepository.findOne({ where: { id } })
            if (!watch) {
                throw new NotFoundException('Soat topilmadi')
            }
            await this.watchRepository.delete(id)
            return { message: 'Soat muvaffaqiyatli o‘chirildi' }
        } catch (error) {
            if (error instanceof NotFoundException) throw error
            throw new Error('Serverda xato yuz berdi')
        }
    }



    //////////////// crud gaming //////////////


    async createGame(createGamingDto: CreateGamingDto, files: Express.Multer.File[]) {
        try {
            let imageUrls: string[] = [];
            if (files && files.length > 0) {
                imageUrls = await this.uploadService.uploadAndGetUrls(files);
            }
            const newGaming = this.GameRepository.create({
                ...createGamingDto,
                img: imageUrls.join(',')
            });
            return await this.GameRepository.save(newGaming)
        } catch (error) {
            throw new Error('Serverda xato yuz berdi');
        }
    }

    async findAllGames() {
        try {
            if (!this.GameRepository) {
                throw new NotFoundException('Gaming topilmadi');
            }
            return await this.GameRepository.find()
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new Error('Serverda xato yuz berdi');
        }
    }
    async findOneGame(id: string) {
        try {
            const game = await this.GameRepository.findOne({ where: { id } });
            if (!game) {
                throw new NotFoundException('Gaming topilmadi');
            }
            return game;
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new Error('Serverda xato yuz berdi');
        }
    }

    async updategaming(id: string, updateProductDto: UpdateGamingDto, files: Express.Multer.File[]) {
        try {
            const gaming = await this.GameRepository.findOne({ where: { id } });
            if (!gaming) {
                throw new NotFoundException('Gaming topilmadi');
            }

            let imageUrls: string[] = [];
            if (files && files.length > 0) {
                imageUrls = await this.uploadService.uploadAndGetUrls(files);
            }
            await this.watchRepository.update(id, updateProductDto);
            return this.watchRepository.findOne({ where: { id } });
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new Error('Serverda xato yuz berdi');
        }
    }

    async removeGaming(id: string) {
        try {
            const gaming = await this.GameRepository.findOne({ where: { id } })
            if (!gaming) {
                throw new NotFoundException('Gaming topilmadi')
            }
            await this.GameRepository.delete(id)
            return { message: 'Gaming muvaffaqiyatli o‘chirildi' }
        } catch (error) {
            if (error instanceof NotFoundException) throw error
            throw new Error('Serverda xato yuz berdi')
        }
    }

}
