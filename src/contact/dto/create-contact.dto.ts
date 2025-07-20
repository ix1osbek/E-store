import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateContactDto {
  @ApiProperty({ example: 'Ali Valiyev', description: 'Foydalanuvchining to‘liq ismi' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'ali@example.com', description: 'Foydalanuvchining email manzili' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Saytingiz ajoyib! Raqamingizni yuboring.', description: 'Xabar matni' })
  @IsNotEmpty()
  message: string;
}
