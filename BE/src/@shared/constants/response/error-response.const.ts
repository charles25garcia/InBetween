import { HttpException, HttpStatus } from '@nestjs/common';

export const errorResponseConst = new HttpException(
  'Enable to process your request.',
  HttpStatus.INTERNAL_SERVER_ERROR,
);
