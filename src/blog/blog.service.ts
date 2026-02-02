import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blog } from './entities/blog.entity';
import { CreateBlogDto } from './dto/create-blog.dto';

@Injectable()
export class BlogService {
    constructor(
        @InjectRepository(Blog)
        private readonly blogRepo: Repository<Blog>,
    ) { }

    async create(dto: CreateBlogDto): Promise<Blog> {
        const blog = this.blogRepo.create(dto);
        return this.blogRepo.save(blog);
    }
    
    async findAll(): Promise<Blog[]> {
        return this.blogRepo.find({ order: { createdAt: 'DESC' } });
    }

    async findOne(id: number): Promise<Blog | null> {
        return this.blogRepo.findOneBy({ id });
    }

    async remove(id: number): Promise<void> {
        await this.blogRepo.delete(id);
    }
}
