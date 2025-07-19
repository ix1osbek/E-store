import { IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ToggleLikeDto {
    @ApiProperty({
        example: 'c0a8012e-7e6f-4db1-bef0-3b2f07a1f799',
        description: 'The UUID of the product to like or unlike',
    })
    @IsUUID()
    productId: string;
}
