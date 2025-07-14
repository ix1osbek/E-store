import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsOptional, IsArray, IsEnum } from 'class-validator';
import { MemorySize } from '../entities/phone.entity';

export class UpdatePhoneDto {
    @ApiProperty({ example: "iPhone 13" })
    @IsString()
    @IsNotEmpty()
    model?: string;

    @ApiProperty({ example: "iPhone 13" })
    @IsString()
    @IsNotEmpty()
    @IsNotEmpty()
    title?: string;

    @ApiProperty({ example: "Latest model of iPhone" })
    @IsString()
    description?: string;

    @ApiProperty({ enum: MemorySize , example: MemorySize.GB128 })
    @IsEnum(MemorySize)
    memory?: MemorySize;

    @ApiProperty({ example: "Black" })
    @IsString()
    color?: string;

    @ApiProperty({ example: "A15 Bionic" })
    @IsString()
    cpu?: string;

    @ApiProperty({ example: "6.1 inches" })
    @IsString()
    screen_size?: string;

    @ApiProperty({ example: "3095 mAh" })
    @IsString()
    battery?: string;

    @ApiProperty({ example: "12MP" })
    @IsString()
    front_camera?: string;

    @ApiProperty({ example: "12MP" })
    @IsString()
    main_camera?: string;
    @ApiProperty({ example: 999.99 })
    @IsNotEmpty()
    @IsNumber()
    price?: number;

    @ApiProperty({ example: "skmefim-sdfmweomowmof" })
    categoryId?: string;
}
