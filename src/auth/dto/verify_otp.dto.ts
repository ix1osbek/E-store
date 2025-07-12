import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VerifyOtpDto {
    @ApiProperty({ example: "user@gmail.com" })
    @IsEmail({}, { message: "Email noto'g'ri formatda!" })
    @IsNotEmpty({ message: "Email maydoni bo'sh bo'lmasligi kerak!" })
    @IsString({ message: "Email noto'g'ri formatda!" })
    email: string;
    
    @ApiProperty({ example: "123456" })
    @IsString({ message: "OTP noto'g'ri formatda!" })
    @IsNotEmpty({ message: "OTP maydoni bo'sh bo'lmasligi kerak!" })
    otp: string;
}
