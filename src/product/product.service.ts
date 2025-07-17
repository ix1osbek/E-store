import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm'
import { CreateProductDto } from './dto/create-product.dto';
import { UploadService } from '../upload/upload.service'
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private readonly ProductRepository: Repository<Product>,
        private readonly uploadService: UploadService,
    ) { }


    ///////////////// product crud /////////////////
    async createProduct(createProductDTo: CreateProductDto, files: Express.Multer.File[]) {
        try {
            let imageUrls: string[] = [];
            if (files && files.length > 0) {
                imageUrls = await this.uploadService.uploadAndGetUrls(files);
            }

            const newPhone = this.ProductRepository.create({
                ...createProductDTo,
                image: imageUrls.join(',')
            });
            return await this.ProductRepository.save(newPhone)
        } catch (error) {
            console.log(error);
            
            if (error instanceof ConflictException) throw error;
            throw new Error('Serverda xato yuz berdi' );
            
        }
    }


    async findAllproducts() {
        try {
            if (!this.ProductRepository) {
                throw new NotFoundException('product topilmadi');
            }
            return await this.ProductRepository.find()
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new Error('Serverda xato yuz berdi');
        }
    }

    async findOneproduct(id: string) {
        try {
            const product = await this.ProductRepository.findOne({ where: { id } });
            if (!product) {
                throw new NotFoundException('Product topilmadi');
            }
            return product;
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new Error('Serverda xato yuz berdi');
        }
    }

    async updateproduct(id: string, updateProductDto: UpdateProductDto, files: Express.Multer.File[]) {
        try {
            const product = await this.ProductRepository.findOne({ where: { id } });
            if (!product) {
                throw new NotFoundException('Product topilmadi');
            }

            let imageUrls: string[] = [];
            if (files && files.length > 0) {
                imageUrls = await this.uploadService.uploadAndGetUrls(files);
            }
            const updateData = {
                ...updateProductDto,
                image: imageUrls.length > 0 ? imageUrls.join(',') : (typeof updateProductDto.image === 'string' ? updateProductDto.image : undefined)
            };
            await this.ProductRepository.update(id, updateData);
            return this.ProductRepository.findOne({ where: { id } });
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new Error('Serverda xato yuz berdi');
        }
    }

    async removeproduct(id: string) {
        try {
            const product = await this.ProductRepository.findOne({ where: { id } })
            if (!product) {
                throw new NotFoundException('Product topilmadi')
            }
            await this.ProductRepository.delete(id)
            return { message: 'Product muvaffaqiyatli o‘chirildi' }
        } catch (error) {
            if (error instanceof NotFoundException) throw error
            throw new Error('Serverda xato yuz berdi')
        }
    }
}