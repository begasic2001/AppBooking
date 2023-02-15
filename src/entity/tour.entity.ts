import { Transport } from './transport.entity';
import { City } from './city.entity';
import { BaseEntity } from '../common/Base.entity';
import { Entity, Column, Unique, BeforeInsert, OneToMany, JoinColumn,PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
@Entity()
export class Tour extends BaseEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  Name:string

  @Column({type:"float"})
  Price:number

  @Column()
  StartDate:Date
 
  @Column()
  EndDate : Date

  @Column({type:'int'})
  MaxTourists:number

  @ManyToOne(()=>Transport,transport => transport.Tour)
  @JoinColumn({name:'TransportID'})
  TransportID?:Transport

}
