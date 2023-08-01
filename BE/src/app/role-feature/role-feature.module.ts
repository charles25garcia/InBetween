import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Services
import { RoleFeatureService } from './role-feature.service';

// Entities
import { Tbl_Role_Feature } from './tbl-role-feature.entity';
import { RoleFeatureController } from './role-feature.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Tbl_Role_Feature])],
  providers: [RoleFeatureService],
  controllers: [RoleFeatureController],
})
export class RoleFeatureModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(TestMiddelware).forRoutes('*');
  // }
}
