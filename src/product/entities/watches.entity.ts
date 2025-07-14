import {
  Entity, PrimaryGeneratedColumn, Column,
  ManyToOne, JoinColumn
} from 'typeorm';
import { Category } from '../../category/entities/category.entity';

@Entity()
export class Watch {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  model: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  color: string;

  @Column()
  image: string;

  @Column('decimal')
  price: number;

  @Column({ nullable: true })
  categoryId: string;

  @ManyToOne(() => Category, category => category.watches, {
    eager: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'categoryId' })
  category: Category;
}
