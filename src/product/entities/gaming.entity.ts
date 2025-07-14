import {
    Entity, PrimaryGeneratedColumn, Column,
    ManyToOne, JoinColumn,
    CreateDateColumn,
    UpdateDateColumn
} from 'typeorm';
import { Category } from '../../category/entities/category.entity';
import { MemorySize } from './phone.entity';

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

    @Column({
        type: 'enum',
        enum: MemorySize,
    })
    storage: MemorySize;

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

    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt: Date;
}
