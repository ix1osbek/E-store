import {
  Entity, PrimaryGeneratedColumn, Column,
  ManyToOne, JoinColumn
} from 'typeorm';
import { Category } from '../../category/entities/category.entity';

@Entity()
export class Camera {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('decimal')
  price: number;

  @Column()
  resolution: string;

  @Column()
  lensType: string;

  @Column()
  img: string;

  @Column({ nullable: true })
  categoryId: string;

  @ManyToOne(() => Category, category => category.cameras, {
    eager: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'categoryId' })
  category: Category;
}
