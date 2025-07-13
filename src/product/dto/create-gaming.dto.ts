import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateGamingDto {
    @ApiProperty({ example: "Gaming Laptop" })
    @IsNotEmpty({ message: "Nomi bo'sh bo'lishi mumkin emas!" })
    name: string;

    @ApiProperty({ example: 1500 })
    @IsNotEmpty({ message: "Narxi bo'sh bo'lishi mumkin emas!" })
    price: number;

    @ApiProperty({ example: "PC" })
    @IsNotEmpty({ message: "Platform maydoni bo'sh bo'lishi mumkin emas!" })
    platform: string;

    @ApiProperty({ example: "1TB SSD" })
    @IsNotEmpty({ message: "Storage maydoni bo'sh bo'lishi mumkin emas!" })
    storage: string;

    @ApiProperty({ example: "Game A, Game B" })
    @IsNotEmpty({ message: "O'yinlar maydoni bo'sh bo'lishi mumkin emas!" })
    includedGames: string;

    @ApiProperty({ example: "image_url" })
    @IsNotEmpty({ message: "Image maydoni bo'sh bo'lmasligi kerak!" })
    img: string;

    @ApiProperty({ example: "skmefim-sdfmweomowmof" })
    @IsNotEmpty({ message: "Category ID maydoni bo'sh bo'lmasligi kerak!" })
    categoryId: string;
}
