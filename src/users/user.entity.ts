import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterInsert,
  AfterUpdate,
  AfterRemove,
} from 'typeorm';
import { Exclude } from 'class-transformer';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  email: string;
  @Column()
  password: string;
  @AfterInsert()
  loginsert() {
    console.log('Inserted User Id with ', this.id);
  }
  @AfterUpdate()
  logUpdate() {
    console.log('updated User Id with ', this.id);
  }
  @AfterRemove()
  logRemove() {
    console.log('Removed User Id with ', this.id);
  }
}
