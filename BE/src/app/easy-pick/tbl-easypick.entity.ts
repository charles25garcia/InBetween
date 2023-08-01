import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Tbl_Easypick {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  percentage: string;

  @Column({ type: 'float' })
  value: number;
}
