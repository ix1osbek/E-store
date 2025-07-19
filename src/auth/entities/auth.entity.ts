import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Role } from '../role.enum';
import { Rating } from 'src/rating/entities/rating.entity';
import { Comment } from 'src/comment/entities/comment.entity'; // ✅ import qilingan
import { Like } from 'src/like/entities/like.entity';

@Entity()
export class Auth {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ default: false })
    isVerified: boolean;

    @Column({ nullable: true })
    otp: string;

    @Column({ nullable: true, type: 'timestamp' })
    otpTime: Date;

    @Column({ type: 'enum', enum: Role, default: Role.USER })
    role: Role;

    @OneToMany(() => Rating, (rating) => rating.user)
    ratings: Rating[];

    @OneToMany(() => Comment, (comment) => comment.auth)
    comments: Comment[];

    @OneToMany(() => Like, like => like.auth)
    likes: Like[];
}
