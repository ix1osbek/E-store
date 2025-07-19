import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Auth } from 'src/auth/entities/auth.entity';
import { Product } from 'src/product/entities/product.entity';

@Entity()
export class Like {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Auth, auth => auth.likes, { onDelete: 'CASCADE' })
  @JoinColumn()
  auth: Auth;

  @ManyToOne(() => Product, product => product.likes, { onDelete: 'CASCADE' })
  @JoinColumn()
  product: Product;
}
