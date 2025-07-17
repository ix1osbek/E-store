import { Auth } from "src/auth/entities/auth.entity";
import { Product } from "src/product/entities/product.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Rating {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int', default: 5 }) 
  value: number;

  @ManyToOne(() => Product, (product) => product.ratings)
  @JoinColumn()
  product: Product;

  @ManyToOne(() => Auth, (user) => user.ratings, { nullable: true })
  user: Auth;

  @CreateDateColumn()
  createdAt: Date;
}
