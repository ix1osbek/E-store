import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Category } from '../../category/entities/category.entity';

@Entity()
export class Gaming {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column()
  platform: string; // masalan: "PlayStation 5"

  @Column()
  storage: string; // masalan: "1TB"

  @Column()
  includedGames: string; // masalan: "FIFA 24, GTA V"

    @Column()
    img: string; // o'yin uchun rasm URL

  @ManyToOne(() => Category, { eager: true, onDelete: 'SET NULL' })
  category: Category;
}
