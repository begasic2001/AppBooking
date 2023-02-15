import { City } from './city.entity';
import { BaseEntity } from '../common/Base.entity';
import {
  Entity,
  Column,
  JoinColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
@Entity()
export class Sight extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  Name: string;

  @Column({ type: 'char' })
  SightForMoney: string;

  @Column({ type: 'float' })
  Payment: number;

  @Column()
  Picture: string;

  @ManyToOne(()=> City,city => city.SightID)
  @JoinColumn({name:'CityID'})
  CityID:City
}
