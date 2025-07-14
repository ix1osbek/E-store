import {
  Entity, PrimaryGeneratedColumn, Column,
  ManyToOne, JoinColumn
} from 'typeorm';
import { Category } from '../../category/entities/category.entity';

@Entity()
export class Gaming {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column()
  platform: string;

  @Column()
  storage: string;

  @Column()
  includedGames: string;

  @Column()
  img: string;

  @Column({ nullable: true })
  categoryId: string;

  @ManyToOne(() => Category, category => category.gamings, {
    eager: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'categoryId' })
  category: Category;
}
