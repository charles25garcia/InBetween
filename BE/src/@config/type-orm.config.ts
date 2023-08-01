import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';

export const TypeOrmConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => ({
    type: configService.get<string>('DATABASE_TYPE') as any,
    extra: {
      socketPath: configService.get<string>('SOCKET_PATH'),
    },
    host: configService.get<string>('DATABASE_HOST'),
    port: configService.get<string>('DATABASE_PORT'),
    username: configService.get<string>('DATABASE_USERNAME'),
    password: configService.get<string>('DATABASE_PASSWORD'),
    database: configService.get<string>('DATABASE_NAME'),
    entities: [], //['../**/*.entity.{ts,js}'],
    synchronize: configService.get<string>('DATABASE_SYNCHRONIZE') === 'true',
    retryAttempts: +configService.get<string>('DATABASE_RETRY_ATTEMPTS'),
    autoLoadEntities:
      configService.get<string>('DATABASE_AUTOLOAD_ENTITY') === 'true',
  }),
  inject: [ConfigService],
};
