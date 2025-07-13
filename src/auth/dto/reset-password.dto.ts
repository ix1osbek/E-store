import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class ResetPasswordDto {
    @ApiProperty({ example: "user@gmail.com" })
    @IsEmail()
    email: string;

    @ApiProperty({ example: "123456" })
    @IsString()
    otp: string;

    @ApiProperty({ example: "newPassword123" })
    @IsString()
    @MinLength(6)
    newPassword: string;
}
