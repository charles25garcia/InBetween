import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Tbl_Game_History {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  winning_bet: string;

  @Column()
  first_card: string;

  @Column()
  middle_card: string;

  @Column()
  last_card: string;

  @Column()
  created_at: Date;

  @Column()
  dealNumber: number;
}
