import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Product } from 'src/product/entities/product.entity';

@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(Comment)
        private readonly commentRepository: Repository<Comment>,
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
    ) { }

    async create(createCommentDto: CreateCommentDto): Promise<Comment> {
        const product = await this.productRepository.findOne({
            where: { id: createCommentDto.productId },
        });

        if (!product) throw new NotFoundException('Mahsulot topilmadi');

        const comment = this.commentRepository.create({
            text: createCommentDto.text,
            auth: { id: createCommentDto.userId }, 
            product: { id: createCommentDto.productId },
        });

        return this.commentRepository.save(comment);
    }

    async findAll(): Promise<Comment[]> {
        return this.commentRepository.find({ relations: ['product'] });
    }

    async findOne(id: string): Promise<Comment> {
        const comment = await this.commentRepository.findOne({
            where: { id },
            relations: ['product'],
        });

        if (!comment) throw new NotFoundException('Comment topilmadi');
        return comment;
    }

    async update(id: string, dto: UpdateCommentDto): Promise<Comment> {
        const comment = await this.commentRepository.preload({ id, ...dto });
        if (!comment) throw new NotFoundException('Comment topilmadi');
        return this.commentRepository.save(comment);
    }

    async remove(id: string): Promise<void> {
        const comment = await this.commentRepository.findOneBy({ id });
        if (!comment) throw new NotFoundException('Comment topilmadi');
        await this.commentRepository.remove(comment);
    }
}
