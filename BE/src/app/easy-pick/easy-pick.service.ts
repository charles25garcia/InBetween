import { Injectable } from '@nestjs/common';
import { Tbl_Easypick } from './tbl-easypick.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class EasyPickService {
  constructor(
    @InjectRepository(Tbl_Easypick)
    private easypickRepo: Repository<Tbl_Easypick>,
  ) {}

  getEasyPickValues(): Promise<Tbl_Easypick[]> {
    return this.easypickRepo.find();
  }
}
