import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contact } from './entities/contact.entity';
import { CreateContactDto } from './dto/create-contact.dto';

@Injectable()
export class ContactService {
    constructor(
        @InjectRepository(Contact)
        private contactRepo: Repository<Contact>,
    ) { }

    async create(createContactDto: CreateContactDto): Promise<Contact> {
        const contact = this.contactRepo.create(createContactDto);
        return this.contactRepo.save(contact);
    }

    async findAll(): Promise<Contact[]> {
        return this.contactRepo.find({
            order: { createdAt: 'DESC' },
        });
    }
}
