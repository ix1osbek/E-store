import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateCameraDto {
    @ApiProperty({ example: "DSLR Camera" })
    @IsNotEmpty({ message: "Camera name maydoni bo'sh bo'lmasligi kerak!" })
    name: string;

    @ApiProperty({ example: 1200 })
    @IsNotEmpty({ message: "Price maydoni bo'sh bo'lmasligi kerak!" })
    price: number;

    @ApiProperty({ example: "24MP" })
    @IsNotEmpty({ message: "Resolution maydoni bo'sh bo'lmasligi kerak!" })
    resolution: string;

    @ApiProperty({ example: "Zoom" })
    @IsNotEmpty({ message: "Lens type maydoni bo'sh bo'lmasligi kerak!" })
    lensType: string;

    @ApiProperty({ example: "skmefim-sdfmweomowmof" })
    categoryId: string;
}
