import { BehaviorSubject, filter } from 'rxjs';
import { Injectable } from '@nestjs/common';

import { UserStatsSseDto } from '@core/dtos';

@Injectable()
export class UserStatsHelperService {
  private readonly _userStats = new BehaviorSubject<UserStatsSseDto>(undefined);

  readonly userStats$ = this._userStats.asObservable();

  get userStats(): UserStatsSseDto {
    return this._userStats.getValue();
  }
  set userStats(value: UserStatsSseDto) {
    this._userStats.next(value);
  }

  listenToUserStatsByUserId(userId: string) {
    return this.userStats$.pipe(filter((stats) => stats.userId === userId));
  }
}
