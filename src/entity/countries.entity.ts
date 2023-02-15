import { City } from './city.entity';
import { BaseEntity } from '../common/Base.entity';
import { Entity, Column, Unique, BeforeInsert, OneToMany, JoinColumn,PrimaryGeneratedColumn } from 'typeorm';
@Entity()
@Unique(['Country'])
export class Country extends BaseEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  Country: string;

  @OneToMany(() => City,city => city.CountryID)
  City?:City[]
}
