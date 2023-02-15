import { Sight } from './sight.entity';
import { BaseEntity } from '../common/Base.entity';
import {
  Entity,
  Column,
  Unique,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { Country } from './countries.entity';
@Entity()
@Unique(['City'])
export class City extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  City: string;

  @ManyToOne(() => Country, country => country.City)
  @JoinColumn({ name: "CountryID" })
  CountryID?: string;

  @OneToMany(()=> Sight,sight => sight.CityID)
  SightID?:Sight[]
}
