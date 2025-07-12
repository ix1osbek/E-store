import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';
import { EmailModule } from 'src/email/email.module';

@Module({
    imports: [TypeOrmModule.forFeature([Auth]) , EmailModule],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule { }
