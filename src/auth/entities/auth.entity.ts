import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
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
}
