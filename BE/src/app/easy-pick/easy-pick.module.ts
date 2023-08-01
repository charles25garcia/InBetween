import { Module } from '@nestjs/common';
import { EasyPickService } from './easy-pick.service';
import { EasyPickController } from './easy-pick.controller';
import { Tbl_Easypick } from './tbl-easypick.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Tbl_Easypick])],
  providers: [EasyPickService],
  controllers: [EasyPickController],
})
export class EasyPickModule {}
