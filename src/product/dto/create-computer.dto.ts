import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty } from "class-validator";
import { MemorySize } from "../entities/phone.entity";

export class CreateComputerDto {
    @ApiProperty({ example: "Gaming PC" })
    @IsNotEmpty({ message: "Nomi bo'sh bo'lishi mumkin emas!" })
    name: string;

    @ApiProperty({ example: 2000 })
    @IsNotEmpty({ message: "Narxi bo'sh bo'lishi mumkin emas!" })
    price: number;

    @ApiProperty({ example: "Intel i9" })
    @IsNotEmpty({ message: "Processor maydoni bo'sh bo'lishi mumkin emas!" })
    processor: string;

    @ApiProperty({ example: "32GB" })
    @IsNotEmpty({ message: "RAM maydoni bo'sh bo'lishi mumkin emas!" })
    ram: string;

    @ApiProperty({ enum: MemorySize })
    @IsEnum(MemorySize)
    storage: MemorySize;

    @ApiProperty({ example: "NVIDIA RTX 3080" })
    @IsNotEmpty({ message: "GPU maydoni bo'sh bo'lishi mumkin emas!" })
    gpu: string;

    @ApiProperty({ example: "image_url" })
    @IsNotEmpty({ message: "Image maydoni bo'sh bo'lmasligi kerak!" })
    img: string;

    @ApiProperty({ example: "skmefim-sdfmweomowmof" })
    @IsNotEmpty({ message: "Category ID maydoni bo'sh bo'lmasligi kerak!" })
    categoryId: string;
}
