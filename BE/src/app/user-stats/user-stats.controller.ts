import { Controller, Param, Put } from '@nestjs/common';
import { UserStatsService } from './user-stats.service';
import { GetUser } from '@core/decorators';

@Controller('user-stats')
export class UserStatsController {
  constructor(private userStatsService: UserStatsService) {}

  @Put('convert-point-to-chips/:points')
  async convertPointsToChips(
    @GetUser() user: any,
    @Param('points') points: number,
  ) {
    const stats = await this.userStatsService.convertPointsToChips(
      user.id,
      points,
    );

    return {
      points: stats.points,
      chips: stats.chips,
    };
  }

  @Put('reset-points')
  async resetPoints(@GetUser() user: any) {
    const { points } = await this.userStatsService.resetPoints(user.id);

    return { points };
  }
}
