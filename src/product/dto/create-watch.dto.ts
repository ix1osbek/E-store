// src/watch/dto/create-watch.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class CreateWatchDto {
    @ApiProperty({ example: "Apple Watch Series 7" })
    @IsString({ message: "Model must be a string" })
    @IsNotEmpty({ message: "Model must not be empty" })
    model: string;

    @ApiProperty({ example: "Apple Watch Series 7" })
    @IsString({ message: "Title must be a string" })
    @IsNotEmpty({ message: "Title must not be empty" })
    title: string;

    @ApiProperty({ example: "Latest model of Apple Watch" })
    @IsString({ message: "Description must be a string" })
    @IsNotEmpty({ message: "Description must not be empty" })
    description: string;

    @ApiProperty({ example: "Black" })
    @IsString({ message: "Color must be a string" })
    @IsNotEmpty({ message: "Color must not be empty" })
    color: string;

    @ApiProperty({ example: "image_url" })
    @IsString({ message: "Image must be a string" })
    @IsNotEmpty({ message: "Image must not be empty" })
    image: string;

    @ApiProperty({ example: 399.99 })
    @IsNumber({}, { message: "Price must be a number" })
    @IsNotEmpty({ message: "Price must not be empty" })
    price: number;

    @ApiProperty({ example: "skmefim-sdfmweomowmof" })
    @IsString({ message: "Category ID must be a string" })
    @IsNotEmpty({ message: "Category ID must not be empty" })
    categoryId: string;
}
