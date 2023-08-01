import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, forwardRef } from '@nestjs/common';

// Entities
import { Tbl_Feature } from './tbl-feature.entity';

@Module({
  imports: [forwardRef(() => TypeOrmModule.forFeature([Tbl_Feature]))],
  providers: [],
})
export class FeatureModule {}
