import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { About } from './entities/about.entity';
import { CreateAboutDto } from './dto/create-about.dto';

@Injectable()
export class AboutService {
    constructor(
        @InjectRepository(About)
        private readonly aboutRepo: Repository<About>,
    ) { }

    async create(dto: CreateAboutDto): Promise<About> {
        const about = this.aboutRepo.create(dto);
        return this.aboutRepo.save(about);
    }

    async findLatest(): Promise<About | null> {
        const abouts = await this.aboutRepo.find({
            order: {
                createdAt: 'DESC',
            },
            take: 1,
        });

        return abouts[0] || null;
    }


    async findAll(): Promise<About[]> {
        return this.aboutRepo.find({
            order: {
                createdAt: 'DESC',
            },
        });
    }
}
