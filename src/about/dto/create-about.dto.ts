import { ApiProperty } from '@nestjs/swagger';

export class CreateAboutDto {
  @ApiProperty({ example: 'Biz haqimizda matni...', description: 'Sayt haqida matn' })
  content: string;
}
