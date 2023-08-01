import { SetMetadata } from '@nestjs/common';
export const SkipMapping = () => SetMetadata('skipMapping', true);
