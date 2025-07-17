import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  text: string;

  @IsUUID()
  productId: string;

  @IsUUID()
  userId: string;
}
