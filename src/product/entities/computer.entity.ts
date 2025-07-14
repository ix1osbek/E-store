import {
  Entity, PrimaryGeneratedColumn, Column,
  ManyToOne, JoinColumn
} from 'typeorm';
import { Category } from '../../category/entities/category.entity';

@Entity()
export class Computer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column()
  processor: string;

  @Column()
  ram: string;

  @Column()
  storage: string;

  @Column()
  gpu: string;

  @Column()
  img: string;

  @Column({ nullable: true })
  categoryId: string;

  @ManyToOne(() => Category, category => category.computers, {
    eager: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'categoryId' })
  category: Category;
}
