import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
    constructor(@InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>
    ) { }
    async create(createCategoryDto: CreateCategoryDto) {
        try {
            const foundCategory = await this.categoryRepository.findOne({ where: { name: createCategoryDto.name } });
            if (foundCategory) {
                throw new ConflictException("Ushbu nomdagi kategoriya mavjud!");
            }
            const newCategory = this.categoryRepository.create(createCategoryDto)
            await this.categoryRepository.save(newCategory)
            return { message: "Kategoriya yaratildiiii!" }
        } catch (error) {
            if (error instanceof ConflictException) throw error
            throw new InternalServerErrorException('Serverda xato yuz berdi');
        }
    }

    async findAll() {
        try {
            const categories = await this.categoryRepository.find();
            if (!categories || categories.length === 0) {
                throw new NotFoundException('Kategoriyalar topilmadi , iltimos birozdan so"ng qayta urinib ko"ring!');
            }
            return categories;
        } catch (error) {
            if (error instanceof NotFoundException) throw error
            throw new InternalServerErrorException('Serverda xato yuz berdi')
        }
    }

    async findOne(id: string) {
        try {
            const category = await this.categoryRepository.findOne({
                where: { id: id.toString() },
                relations: ['product'],
            });

            if (!category) {
                throw new NotFoundException(`Kategoriya #${id} topilmadi`);
            }

            return category;
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new InternalServerErrorException('Serverda xato yuz berdi');
        }
    }


    async update(id: string, updateCategoryDto: UpdateCategoryDto) {
        try {
            const category = await this.categoryRepository.findOne({ where: { id: id.toString() } });
            if (!category) {
                throw new NotFoundException(`Kategoriya #${id} topilmadi`);
            }
            await this.categoryRepository.update(id, updateCategoryDto);
            return { message: "Kategoriya muvaffaqiyatli yangilandi!" };
        } catch (error) {
            if (error instanceof NotFoundException) throw error
            throw new InternalServerErrorException('Serverda xato yuz berdi');
        }
    }

    async remove(id: string) {
        try {
            const category = await this.categoryRepository.findOne({ where: { id: id.toString() } });
            if (!category) {
                throw new NotFoundException(`Kategoriya #${id} topilmadi`);
            }
            await this.categoryRepository.delete(id);
            return { message: "Kategoriya muvaffaqiyatli o'chirildi!" };
        } catch (error) {
            if (error instanceof NotFoundException) throw error
            throw new InternalServerErrorException('Serverda xato yuz berdi');
        }
    }
}
