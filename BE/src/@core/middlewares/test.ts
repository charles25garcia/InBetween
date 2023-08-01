import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';

@Injectable()
export class TestMiddelware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    console.log('test');
    next();
  }
}
