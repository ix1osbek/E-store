import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne
} from 'typeorm';
import { Product } from 'src/product/entities/product.entity';
import { Auth } from "src/auth/entities/auth.entity";
@Entity()
export class Comment {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    text: string;

    @ManyToOne(() => Product, (product) => product.comments)
    product: Product;

    @ManyToOne(() => Auth, (user) => user.comments)
    auth: Auth;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
