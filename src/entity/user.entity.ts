import { BaseEntity } from '../common/Base.entity';
import { Entity, Column, Unique, BeforeInsert, OneToMany,PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';
@Entity()
@Unique(['email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  Birthday: string;

  @Column()
  Name: string;

  @Column()
  Phone: string;

  @Column()
  Address: string;

  @Column()
  ImgUrl: string;

  @BeforeInsert()
  async hashPassword() {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
}
