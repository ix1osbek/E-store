import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(@InjectRepository(Auth) private readonly authRepository: Repository<Auth>) { }
    async register(createAuthDto: CreateAuthDto) {
        try {
            const { password, email } = createAuthDto
            const foundetUser = await this.authRepository.findOne({ where: { email } })
            if (foundetUser) {
                throw new ConflictException("Foydalanuvchi allaqachon ro'yhatdan o'tgan!")
            }

            const hashedPassword = await bcrypt.hash(password, 10)
            const newUser = this.authRepository.create({
                email: email,
                password: hashedPassword
            })
            await this.authRepository.save(newUser);
        } catch (error) {
            if (error instanceof ConflictException) {
                throw error;
            }
            throw new InternalServerErrorException('Something went wrong');
        }
    }

    findAll() {
        return `This action returns all auth`;
    }

    findOne(id: number) {
        return `This action returns a #${id} auth`;
    }

    update(id: number, updateAuthDto: UpdateAuthDto) {
        return `This action updates a #${id} auth`;
    }

    remove(id: number) {
        return `This action removes a #${id} auth`;
    }
}
