import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsEnum,
  IsObject,
  IsArray,
} from 'class-validator';
import { MemorySize } from '../entities/product.entity';

export class CreateProductDto {
  @ApiProperty({ example: "iPhone 13" })
  @IsString()
  @IsNotEmpty()
  model: string;

  @ApiProperty({ example: "Apple iPhone 13" })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: "The latest Apple iPhone with advanced features." })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ enum: MemorySize, example: MemorySize.GB128, required: false })
  @IsOptional()
  @IsEnum(MemorySize)
  memory?: MemorySize;

  @ApiProperty({ example: "Black", required: false })
  @IsOptional()
  @IsString()
  color?: string;

  @ApiProperty({ example: "A15 Bionic", required: false })
  @IsOptional()
  @IsString()
  cpu?: string;

  @ApiProperty({ example: "6.1 inches", required: false })
  @IsOptional()
  @IsString()
  screen_size?: string;

  @ApiProperty({ example: "3095 mAh", required: false })
  @IsOptional()
  @IsString()
  battery?: string;

  @ApiProperty({ example: "12MP", required: false })
  @IsOptional()
  @IsString()
  front_camera?: string;

  @ApiProperty({ example: "12MP", required: false })
  @IsOptional()
  @IsString()
  main_camera?: string;

  @ApiProperty({ example: 999.99 })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({ example: "some-category-id" })
  @IsNotEmpty()
  @IsString()
  categoryId: string;

  @ApiProperty({
    example: {
      iso: "100–3200",
      zoom: "30x optical",
      waterproof: true,
    },
    required: false,
    description: "Extra specifications for special products like cameras, smartwatches etc."
  })
  @IsOptional()
  @IsObject()
  extraSpecs?: Record<string, any>;

@IsArray()
@IsString({ each: true }) 
@ApiProperty({ type: [String], example: ["https://example.com/image1.jpg"] })
image: string[];

}
