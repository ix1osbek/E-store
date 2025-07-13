import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Category } from '../../category/entities/category.entity';

@Entity()
export class Phone {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ unique: true })
    model: string

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    memory: string

    @Column()
    color: string;

    @Column()
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

    @Column("decimal")
    price: number;

    @ManyToOne(() => Category, { eager: true, onDelete: 'SET NULL' })
    category: Category;
}
