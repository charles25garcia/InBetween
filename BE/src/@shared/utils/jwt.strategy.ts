import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';
import { JwtPayload } from './jwt-payload.interface';
import { Tbl_User } from '../../app/user/tbl-user.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(Tbl_User)
    private usersRepository: Repository<Tbl_User>,
    private readonly configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get<string>('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<Tbl_User> {
    const { username } = payload;
    const user = await this.usersRepository
      .createQueryBuilder('tbl_user')
      .leftJoinAndSelect('tbl_user.userRole', 'userRole')
      .leftJoinAndSelect('tbl_user.userStats', 'userStats')
      .leftJoinAndSelect('userRole.defautlFeature', 'defautlFeature')
      .leftJoinAndSelect('tbl_user.commission', 'commission')
      .select([
        'tbl_user.id',
        'tbl_user.fullName',
        'tbl_user.email',
        'tbl_user.contactNo',
        'tbl_user.username',
        'tbl_user.showMechanics',
        'tbl_user.referralId',
        'userRole.id',
        'userRole.roleDescription',
        'userRole.defaultFeatureId',
        'defautlFeature.featurePage',
        'userStats.points',
        'userStats.chips',
        'commission',
      ])
      .where('username = :username', { username })
      .getOne();

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
