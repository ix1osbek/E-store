
import {  IsOptional, IsEnum, } from 'class-validator';
import { Role } from '../role.enum';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAuthRoleDto {
    @ApiProperty({ example: "admin" })
    @IsOptional({ message: "Rol maydoni bo'sh bo'lishi emas!" })
    @IsEnum(Role, { message: "Rol noto'g'ri formatda!" })
    role: Role
}
