import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Expose } from 'class-transformer';
import { Tbl_User } from '../user/tbl-user.entity';
import { Tbl_Feature } from '../feature/tbl-feature.entity';

@Entity()
export class Tbl_User_Role {
  @PrimaryGeneratedColumn()
  @Expose()
  id: number;

  @Column()
  @Expose()
  roleDescription: string;

  @Column()
  lastUpdated?: Date;

  @Column()
  updatedById?: string;

  @Expose()
  @Column()
  defaultFeatureId: number;

  @OneToOne(() => Tbl_User, (user) => user)
  @JoinColumn()
  updatedBy?: Tbl_User;

  @OneToMany(() => Tbl_User, (user) => user.userRole)
  users?: Tbl_User[];

  @Expose()
  @OneToOne(() => Tbl_Feature, (feature) => feature.userRole)
  @JoinColumn({ name: 'defaultFeatureId', referencedColumnName: 'id' })
  defautlFeature: Tbl_Feature;
}
