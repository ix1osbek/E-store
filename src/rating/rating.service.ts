import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rating } from './entities/rating.entity';
import { Product } from '../product/entities/product.entity';
import { Auth } from '../auth/entities/auth.entity';
import { CreateRatingDto } from './dto/create-rating.dto';

@Injectable()
export class RatingService {
  constructor(
    @InjectRepository(Rating)
    private readonly ratingRepo: Repository<Rating>,

    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,

    @InjectRepository(Auth)
    private readonly userRepo: Repository<Auth>,
  ) {}

  async create(dto: CreateRatingDto, userId: string) {
    const product = await this.productRepo.findOne({ where: { id: dto.productId } });
    if (!product) throw new NotFoundException('Mahsulot topilmadi');

    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('Foydalanuvchi topilmadi');

    const rating = this.ratingRepo.create({
      value: dto.value,
      product,
      user,
    });

    return this.ratingRepo.save(rating);
  }

  async getAverageRating(productId: string): Promise<number> {
    const ratings = await this.ratingRepo.find({
      where: { product: { id: productId } },
    })
    if (!ratings.length) return 0;
    const sum = ratings.reduce((total, item) => total + item.value, 0);
    return parseFloat((sum / ratings.length).toFixed(1));
  }

  async getProductRatings(productId: string): Promise<Rating[]> {
    return this.ratingRepo.find({
      where: { product: { id: productId } },
      relations: ['user'],
      order: { createdAt: 'DESC' },
    });
  }
}
