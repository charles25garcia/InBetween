import { Injectable } from '@nestjs/common';
import { Tbl_Game_History } from './tbl-game-history.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HistoryDto } from '@core/dtos/game-history/history.dto';

@Injectable()
export class GameHistoryService {
  constructor(
    @InjectRepository(Tbl_Game_History)
    private gameHistoryRepo: Repository<Tbl_Game_History>,
  ) {}

  async getHistories(): Promise<Tbl_Game_History[]> {
    return await this.gameHistoryRepo.find({
      take: 15,
      order: {
        created_at: 'DESC',
      },
    });
  }
  async addGameHistory(historyDto: HistoryDto): Promise<Tbl_Game_History> {
    const currentDate = new Date();
    const history = await this.gameHistoryRepo.create({
      created_at: currentDate,
      ...historyDto,
    });

    await this.gameHistoryRepo.save(history);
    return history;
  }
}
