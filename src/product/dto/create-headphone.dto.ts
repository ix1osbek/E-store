import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateHeadphoneDto {
    @ApiProperty({ example: "Wireless Headphones" })
    @IsNotEmpty({ message: "Name maydoni bo'sh bo'lmasligi kerak!" })
    name: string;

    @ApiProperty({ example: 300 })
    @IsNotEmpty({ message: "Price maydoni bo'sh bo'lmasligi kerak!" })
    price: number;

    @ApiProperty({ example: "Sony" })
    @IsNotEmpty({ message: "Brand maydoni bo'sh bo'lmasligi kerak!" })
    brand: string;

    @ApiProperty({ example: true })
    @IsNotEmpty({ message: "Wireless maydoni bo'sh bo'lmasligi kerak!" })
    wireless: boolean;

    @ApiProperty({ example: "Black" })
    @IsNotEmpty({ message: "Color maydoni bo'sh bo'lmasligi kerak!" })
    color: string;

    @ApiProperty({ example: "skmefim-sdfmweomowmof" })
    categoryId: string;
}
