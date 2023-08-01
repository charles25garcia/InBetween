import { Controller, Get } from '@nestjs/common';
import { Tbl_Game_History } from './tbl-game-history.entity';
import { GameHistoryService } from './game-history.service';

@Controller('game-history')
export class GameHistoryController {
  constructor(private gameHistoryService: GameHistoryService) {}

  @Get('get-histories')
  getHistories(): Promise<Tbl_Game_History[]> {
    return this.gameHistoryService.getHistories();
  }
}
