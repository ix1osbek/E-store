import {
    Entity, PrimaryGeneratedColumn, Column,
    CreateDateColumn, UpdateDateColumn,
    ManyToOne, JoinColumn,
    OneToMany
} from 'typeorm';
import { Category } from '../../category/entities/category.entity';
import { Rating } from 'src/rating/entities/rating.entity';
import { Comment } from 'src/comment/entities/comment.entity';

export enum MemorySize {
    GB32 = '32GB',
    GB64 = '64GB',
    GB128 = '128GB',
    GB256 = '256GB',
    GB512 = '512GB',
    TB1 = '1TB',
}

export enum StorageType {
    HDD = 'HDD',
    SSD = 'SSD',
    NVME = 'NVMe SSD',
}

export enum ProductType {
    PHONE = 'Phone',
    LAPTOP = 'Laptop',
    TABLET = 'Tablet',
    MONITOR = 'Monitor',
    ACCESSORY = 'Accessory',
}

@Entity()
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    model: string;

    @Column()
    description: string;

    @Column({
        type: 'enum',
        enum: ProductType,
    })
    type: ProductType;

    @Column({ nullable: true })
    brand: string;

    @Column({ nullable: true })
    color: string;

    @Column({
        type: 'enum',
        enum: MemorySize,
        nullable: true,
    })
    memory: MemorySize;

    @Column({
        type: 'enum',
        enum: StorageType,
        nullable: true,
    })
    storageType: StorageType;

    @Column({ nullable: true })
    storageCapacity: string; // e.g. "512GB", "1TB"

    @Column({ nullable: true })
    cpu: string;

    @Column({ nullable: true })
    gpu: string;

    @Column({ nullable: true })
    screenSize: string; // e.g. "6.5 inch", "15.6 inch"

    @Column({ nullable: true })
    battery: string;

    @Column({ nullable: true })
    camera: string;

    @Column('decimal')
    price: number;

    @Column({ type: 'text' })
    image: string;

    @Column({ nullable: true })
    categoryId: string

    @ManyToOne(() => Category, category => category.product, {
        eager: true,
        onDelete: 'SET NULL',
    })

    @JoinColumn({ name: 'categoryId' })
    category: Category;

    @OneToMany(() => Rating, (rating) => rating.product)
    ratings: Rating[]

    @OneToMany(() => Comment, (comment) => comment.product) 
    comments: Comment[];


    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt: Date;
}
