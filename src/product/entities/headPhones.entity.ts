import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Category } from '../../category/entities/category.entity';

@Entity()
export class Headphone {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column('decimal', { precision: 10, scale: 2 })
    price: number;

    @Column()
    brand: string;

    @Column()
    wireless: boolean;

    @Column()
    color: string;


    @Column()
    img: string; 
    @ManyToOne(() => Category, { eager: true, onDelete: 'SET NULL' })
    category: Category;
}
