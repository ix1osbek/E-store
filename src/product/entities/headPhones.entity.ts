import {
    Entity, PrimaryGeneratedColumn, Column,
    ManyToOne, JoinColumn,
    CreateDateColumn,
    UpdateDateColumn
} from 'typeorm';
import { Category } from '../../category/entities/category.entity';

@Entity()
export class Headphone {
    @PrimaryGeneratedColumn('uuid')
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

    @Column('text', { array: true, nullable: true })
    img: string[];

    @Column({ nullable: true })
    categoryId: string;

    @ManyToOne(() => Category, category => category.headphones, {
        eager: true,
        onDelete: 'SET NULL',
    })
    @JoinColumn({ name: 'categoryId' })
    category: Category;

    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt: Date;
}
