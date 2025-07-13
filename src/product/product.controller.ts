import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateGamingDto } from './dto/create-gaming.dto';
import { UpdateProductDto } from './dto/create-computer.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() createGamingDto: CreateGamingDto) {
    return this.productService.create(createGamingDto);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
