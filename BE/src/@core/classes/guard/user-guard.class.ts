import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

export abstract class UserGuardClass {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async getTokenPayload(token: string): Promise<{ username: string }> {
    const payload = await this.jwtService.verifyAsync(token, {
      secret: this.configService.get<string>('JWT_SECRET'),
    });

    return payload;
  }

  extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] =
      (request.headers as any).authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
