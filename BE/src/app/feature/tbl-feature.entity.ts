import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Tbl_Role_Feature } from '../role-feature/tbl-role-feature.entity';
import { Tbl_User_Role } from '../user-role/tbl-user-role.entity';

@Entity()
export class Tbl_Feature {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  featureName: string;

  @Column()
  featurePage: string;

  @Column()
  isActive: boolean;

  @Column()
  parentFeatureId: number;

  @Column()
  level: number;

  @Column()
  icon: string;

  @OneToMany(() => Tbl_Role_Feature, (roleFeature) => roleFeature.feature)
  roleFeatures: Tbl_Role_Feature[];

  @OneToOne(() => Tbl_User_Role, (userRole) => userRole.defautlFeature)
  @JoinColumn({ name: 'id', referencedColumnName: 'defaultFeatureId' })
  userRole: Tbl_User_Role;
}
