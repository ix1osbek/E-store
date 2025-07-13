import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../role.enum';
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
    role: Role
}
