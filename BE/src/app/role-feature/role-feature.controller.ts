import { Controller, Get, Param } from '@nestjs/common';

import { RoleFeatureService } from './role-feature.service';
import { FeaturesModel } from '@shared/models';
import { Tbl_Role_Feature } from './tbl-role-feature.entity';
import { errorResponseConst } from '@shared/constants';

@Controller('role-feature')
export class RoleFeatureController {
  constructor(private roleFeatureService: RoleFeatureService) {}

  @Get()
  getAllRoleFeatures(): Promise<Tbl_Role_Feature[]> {
    try {
      return this.roleFeatureService.getAllRoleFeatures();
    } catch (error) {
      throw errorResponseConst;
    }
  }

  @Get('/role/:id')
  async getFeaturesByRoleId(
    @Param('id') roleId: number,
  ): Promise<FeaturesModel[]> {
    return await this.roleFeatureService.getFeaturesByRoleId(roleId);
  }
}
