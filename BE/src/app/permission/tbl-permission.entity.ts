import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Tbl_Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;
}
