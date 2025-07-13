import { Injectable } from '@nestjs/common';
import { CreateGamingDto } from './dto/create-gaming.dto';
import { UpdateProductDto } from './dto/create-computer.dto';

@Injectable()
export class ProductService {
  create(createGamingDto: CreateGamingDto) {
    return 'This action adds a new product';
  }

  findAll() {
    return `This action returns all product`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
