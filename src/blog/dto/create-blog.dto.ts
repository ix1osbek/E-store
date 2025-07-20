import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateBlogDto {
  @ApiProperty({ example: 'NestJS haqida', description: 'Blog sarlavhasi' })
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'Bu maqolada NestJS haqida gapiramiz...', description: 'Blog matni' })
  @IsNotEmpty()
  content: string;

  @ApiProperty({ example: 'Ixlosbek', description: 'Muallif ismi' })
  @IsNotEmpty()
  author: string;
}
