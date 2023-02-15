import { City } from './city.entity';
import { BaseEntity } from '../common/Base.entity';
import { Entity, Column, Unique, BeforeInsert, OneToMany, JoinColumn,PrimaryGeneratedColumn } from 'typeorm';
import { Tour } from './tour.entity';
@Entity()
export class Transport extends BaseEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  Transport : string;

  @OneToMany(()=> Tour,tour => tour.TransportID)
  Tour?:Tour[]
}
