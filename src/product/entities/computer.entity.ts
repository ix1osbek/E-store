import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Category } from '../../category/entities/category.entity';

@Entity()
export class Computer {
    @PrimaryGeneratedColumn("uuid")
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
    img: string

    @ManyToOne(() => Category, { eager: true, onDelete: 'SET NULL' })
    category: Category;
}
