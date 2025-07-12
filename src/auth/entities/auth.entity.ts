import { Entity  , Column , PrimaryGeneratedColumn} from 'typeorm';
@Entity()
export class Auth {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ default: false })
    isVerified: boolean;
}
