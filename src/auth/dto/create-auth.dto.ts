import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateAuthDto {
    @IsEmail()
    @IsNotEmpty()
    @IsString()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}
