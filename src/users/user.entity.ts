import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterInsert,
  AfterUpdate,
  AfterRemove,
  OneToMany,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Report } from 'src/reports/reports.entity';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  email: string;
  @Column()
  password: string;

  @Column({ default: true })
  admin: boolean;

  @OneToMany(() => Report, (report) => report.user)
  reports: Report[];

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
