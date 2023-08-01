import { ResponseDto } from '@core/dtos';

export class ResponseSerializerClass implements ResponseDto {
  success: boolean;
  message: string;
  data: any;
}
