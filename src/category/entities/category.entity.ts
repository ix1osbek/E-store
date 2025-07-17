import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Product } from '../../product/entities/product.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

//   @OneToMany(() => Product, product => product.category)
//   products: Product[]; 

  @OneToMany(() => Product, product => product.category)
  product: Product[];
}
