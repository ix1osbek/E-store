import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Category } from '../../category/entities/category.entity';

@Entity()
export class Camera {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column('decimal')
  price: number;

  @Column()
  resolution: string; // Masalan: "64MP"

  @Column()
  lensType: string; // Masalan: "Wide-angle"

  @ManyToOne(() => Category, { eager: true, onDelete: 'SET NULL' })
  category: Category;
}
