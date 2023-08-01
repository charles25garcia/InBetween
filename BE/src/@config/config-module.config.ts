import { ConfigModuleOptions } from '@nestjs/config';

export const ConfigModuleConfig: ConfigModuleOptions = {
  isGlobal: true,
  envFilePath: `./environment/${process.env.NODE_ENV}.env`,
};
