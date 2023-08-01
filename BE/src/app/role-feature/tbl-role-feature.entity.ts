import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

// Entities
import { Tbl_Permission } from '../permission';
import { Tbl_Feature } from '../feature';

@Entity()
export class Tbl_Role_Feature {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  roleId: number;

  @Column()
  permissionId: number;

  @Column()
  featureId: number;

  @Column()
  assignedByUserId: string;

  @ManyToOne(() => Tbl_Permission, (permission) => permission)
  permission: Tbl_Permission;

  @ManyToOne(() => Tbl_Feature, (feature) => feature.roleFeatures)
  @JoinColumn({ name: 'featureId' })
  feature: Tbl_Feature;
}
