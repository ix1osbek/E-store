import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Phone } from '../../product/entities/phone.entity';
import { Camera } from '../../product/entities/camera.entity';
import { Computer } from '../../product/entities/computer.entity';
import { Gaming } from '../../product/entities/gaming.entity';
import { Headphone } from '../../product/entities/headPhones.entity';
import { Watch } from '../../product/entities/watches.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => Phone, phone => phone.category)
  phones: Phone[];

  @OneToMany(() => Camera, camera => camera.category)
  cameras: Camera[];

  @OneToMany(() => Computer, computer => computer.category)
  computers: Computer[];

  @OneToMany(() => Gaming, gaming => gaming.category)
  gamings: Gaming[];

  @OneToMany(() => Headphone, headphone => headphone.category)
  headphones: Headphone[];

  @OneToMany(() => Watch, watch => watch.category)
  watches: Watch[];
}
