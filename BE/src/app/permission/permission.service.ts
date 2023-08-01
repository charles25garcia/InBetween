import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Classes
import { BaseRepo } from 'src/@core/classes';

// Entities
import { Tbl_Permission } from './tbl-permission.entity';

@Injectable()
export class PermissionService extends BaseRepo<Tbl_Permission> {
  constructor(
    @InjectRepository(Tbl_Permission)
    private permissionRepo: Repository<Tbl_Permission>,
  ) {
    super(permissionRepo);
  }
}
