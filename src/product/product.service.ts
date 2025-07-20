import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { ILike, Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm'
import { CreateProductDto } from './dto/create-product.dto';
import { UploadService } from '../upload/upload.service'
import { UpdateProductDto } from './dto/update-product.dto';
import { FilterProductDto } from './dto/filter-product.dto';

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
            if (error instanceof ConflictException) throw error;
            throw new Error('Serverda xato yuz berdi');

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

    async searchProducts(query: string): Promise<Product[]> {
        try {
            return this.ProductRepository.find({
                where: [
                    { title: ILike(`%${query}%`) },
                    { description: ILike(`%${query}%`) },
                ],
                relations: ['category'],
            });
        } catch (error) {
            throw new InternalServerErrorException({ message: "serverda xatolik yuz berdi!" })
        }
    }



    /////////////// filter


    async filterProducts(filterDto: FilterProductDto): Promise<Product[]> {
        try {
            const {
                model,
                brand,
                color,
                memory,
                storageType,
                storageCapacity,
                type,
                minPrice,
                maxPrice,
                categoryId,
            } = filterDto;

            const query = this.ProductRepository.createQueryBuilder('product');

            if (model) {
                query.andWhere('product.model ILIKE :model', { model: `%${model}%` });
            }

            if (brand) {
                query.andWhere('product.brand ILIKE :brand', { brand: `%${brand}%` });
            }

            if (color) {
                query.andWhere('product.color ILIKE :color', { color: `%${color}%` });
            }

            if (memory) {
                query.andWhere('product.memory = :memory', { memory });
            }

            if (storageType) {
                query.andWhere('product.storageType = :storageType', { storageType });
            }

            if (storageCapacity) {
                query.andWhere('product.storageCapacity = :storageCapacity', { storageCapacity });
            }

            if (type) {
                query.andWhere('product.type = :type', { type });
            }

            if (minPrice) {
                query.andWhere('product.price >= :minPrice', { minPrice });
            }

            if (maxPrice) {
                query.andWhere('product.price <= :maxPrice', { maxPrice });
            }

            if (categoryId) {
                query.andWhere('product.categoryId = :categoryId', { categoryId });
            }

            return await query.getMany();
        } catch (error) {
            throw new InternalServerErrorException({ message: "serverda xatolik yuz berdi!" })
        }
    }

}