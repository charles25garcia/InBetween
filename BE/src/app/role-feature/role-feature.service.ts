import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not } from 'typeorm';

import { BaseRepo } from 'src/@core/classes';
import { Tbl_Role_Feature } from './tbl-role-feature.entity';
import { featuresBuilder } from '@shared/utils';
import { FeaturesModel } from '@shared/models';

@Injectable()
export class RoleFeatureService extends BaseRepo<Tbl_Role_Feature> {
  constructor(
    @InjectRepository(Tbl_Role_Feature)
    private roleFeatureRepo: Repository<Tbl_Role_Feature>,
  ) {
    super(roleFeatureRepo);
  }

  getAllRoleFeatures(): Promise<Tbl_Role_Feature[]> {
    return this.getAll();
  }

  async getFeaturesByRoleId(roleId: number): Promise<FeaturesModel[]> {
    const queryResult = await this.roleFeatureRepo.find({
      where: { permissionId: Not(1), roleId },
      relations: ['feature'],
    });

    return featuresBuilder(queryResult.map((i) => i.feature));
  }
}
