import {
    Entity, PrimaryGeneratedColumn, Column,
    ManyToOne, JoinColumn,
    CreateDateColumn,
    UpdateDateColumn
} from 'typeorm';
import { Category } from '../../category/entities/category.entity';


//////// memory enum

export enum MemorySize {
    GB32 = '32GB',
    GB64 = '64GB',
    GB128 = '128GB',
    GB256 = '256GB',
    GB512 = '512GB',
    TB1 = '1TB',
}


@Entity()
export class Phone {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    model: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column({
        type: 'enum',
        enum: MemorySize,
    })
    memory: MemorySize;

    @Column()
    color: string;


    @Column({ type: 'text' })
    image: string;



    @Column()
    cpu: string;

    @Column()
    screen_size: string;

    @Column()
    battery: string;

    @Column()
    front_camera: string;

    @Column()
    main_camera: string;

    @Column('decimal')
    price: number;

    @Column({ nullable: true })
    categoryId: string;

    @ManyToOne(() => Category, category => category.phones, {
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
