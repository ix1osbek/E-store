import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

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

    @ApiProperty({ example: "1TB SSD" })
    @IsNotEmpty({ message: "Storage maydoni bo'sh bo'lishi mumkin emas!" })
    storage: string;

    @ApiProperty({ example: "NVIDIA RTX 3080" })
    @IsNotEmpty({ message: "GPU maydoni bo'sh bo'lishi mumkin emas!" })
    gpu: string;

    @ApiProperty({ example: "skmefim-sdfmweomowmof" })
    categoryId: string;
}
