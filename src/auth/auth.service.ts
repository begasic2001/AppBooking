import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Cache } from 'cache-manager';
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async createAccessToken(userId: string, email: string): Promise<string> {
    const payload = {
      sub: userId,
      email,
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '10m',
      secret: process.env.SECRET_KEY_ACCESS,
    });

    return accessToken;
  }

  async createRefreshToken(userId: string, email: string): Promise<string> {
    const payload = {
      sub: userId,
      email,
    };

    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '20m',
      secret: process.env.SECRET_KEY_REFRESH,
    });
    this.cacheManager.set(userId.toString(), refreshToken, {
      ttl: 2 * 60 * 60,
    });
    
    return refreshToken;
  }
}
