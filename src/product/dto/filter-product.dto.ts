import { ApiPropertyOptional } from '@nestjs/swagger';
import { ProductType, MemorySize, StorageType } from '../entities/product.entity';
import { IsOptional, IsEnum, IsNumberString } from 'class-validator';

export class FilterProductDto {
    @ApiPropertyOptional({ example: 'iPhone 14', description: 'Product model nomi' })
    @IsOptional()
    model?: string;

    @ApiPropertyOptional({ example: 'Apple', description: 'Brend nomi' })
    @IsOptional()
    brand?: string;

    @ApiPropertyOptional({ example: 'Black', description: 'Mahsulot rangi' })
    @IsOptional()
    color?: string;

    @ApiPropertyOptional({ enum: MemorySize, example: MemorySize.GB128, description: 'Xotira hajmi' })
    @IsOptional()
    @IsEnum(MemorySize)
    memory?: MemorySize;

    @ApiPropertyOptional({ enum: StorageType, example: StorageType.SSD, description: 'Disk turi' })
    @IsOptional()
    @IsEnum(StorageType)
    storageType?: StorageType;

    @ApiPropertyOptional({ example: '512GB', description: 'Saqlash hajmi' })
    @IsOptional()
    storageCapacity?: string;

    @ApiPropertyOptional({ enum: ProductType, example: ProductType.PHONE, description: 'Mahsulot turi' })
    @IsOptional()
    @IsEnum(ProductType)
    type?: ProductType;

    @ApiPropertyOptional({ example: 500, description: 'Minimal narx (USD)' })
    @IsOptional()
    @IsNumberString()
    minPrice?: number;

    @ApiPropertyOptional({ example: 1500, description: 'Maksimal narx (USD)' })
    @IsOptional()
    @IsNumberString()
    maxPrice?: number;

    @ApiPropertyOptional({ example: 'a222f7a6-7aa0-4a0a-b2f9-73be47f7d3ac', description: 'Category ID (UUID)' })
    @IsOptional()
    categoryId?: string;
}
