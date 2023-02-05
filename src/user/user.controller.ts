import { UserService } from './user.service';
import {
  Body,
  Controller,
  Post,
  Get,
  Headers,
  Delete,
  CacheInterceptor,
  CACHE_MANAGER,
} from '@nestjs/common';
import { userDto } from './Dto';
import {
  Inject,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport/dist';
import { Cache } from 'cache-manager';
import { UnauthorizedException } from '@nestjs/common/exceptions';
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Post('register')
  async register(@Body() userData: userDto) {
    return this.userService.register(userData);
  }

  @Post('login')
  async login(@Body() userData: userDto) {
    return this.userService.login(userData);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('logout')
  async logout(@Request() req, @Body() data) {
    const userId = req.user.id;
    const refreshToken = data.refreshToken;
    const getRefreshToken = await this.cacheManager.get(userId.toString());
    if (refreshToken === getRefreshToken) {
      return this.userService.logout(userId);
    } else {
      throw new UnauthorizedException('Access Denied!!');
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  me(@Request() req) {
    return req.user;
  }

  @UseGuards(AuthGuard('jwt-refresh'))
  @Post('refreshToken')
  refreshToken(@Request() req) {
    const userId = req.user['sub'];
    const email = req.user['email'];
    const refreshToken = req.user['refreshToken'];
    return this.userService.refreshToken(userId, email, refreshToken);
  }

  @Get('getAll')
  @UseInterceptors(CacheInterceptor)
  getAllUserWithCache() {
    console.log('Cached');
    return this.userService.getAll();
  }
}
