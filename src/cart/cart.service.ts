import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { Repository } from 'typeorm';
import { AddToCartDto } from './dto/add-to-cart.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
  ) {}
  
  async addToCart(authId: string, dto: AddToCartDto) {
    const existing = await this.cartRepository.findOneBy({
      authId,
      productId: dto.productId,
    });

    if (existing) {
      existing.quantity += dto.quantity || 1;
      return this.cartRepository.save(existing);
    }

    const newCart = this.cartRepository.create({
      authId,
      productId: dto.productId,
      quantity: dto.quantity || 1,
    });

    return this.cartRepository.save(newCart);
  }

  async getUserCart(authId: string) {
    return this.cartRepository.find({
      where: { authId },
      relations: ['product'],
    });
  }

  async removeFromCart(id: string, authId: string) {
    const item = await this.cartRepository.findOneBy({ id, authId });
    if (!item) throw new NotFoundException('Item not found');
    return this.cartRepository.remove(item);
  }
}
