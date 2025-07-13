import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
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

    @Column("decimal")
    price: number;

    @ManyToOne(() => Category, { eager: true, onDelete: 'SET NULL' })
    category: Category;
}