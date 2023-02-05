import { User } from './Entity/user.entity';
import { AuthService } from './../auth/auth.service';
import { userDto } from './Dto/UserDto';
import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ConflictException,
  ForbiddenException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common/exceptions';
import * as bcrypt from 'bcrypt';
import { Cache } from 'cache-manager';
@Injectable()
export class UserService {
  constructor(
    private authService: AuthService,
    @InjectRepository(User) private userRepository: Repository<User>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async register(userData) {
    try {
      userData.email = userData.email.trim();
      // .replace(/\s+/g, "-").toLowerCase()
      const user = await this.userRepository.create(userData);
      const saveUser = await this.userRepository.save(user);
      return plainToInstance(userDto, saveUser, {
        excludeExtraneousValues: true,
      });
    } catch (error) {
      if (error.sqlState === '23000') {
        throw new ConflictException('Email already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async login(userData) {
    try {
      const { email, password } = userData;
      const hasUser = await this.userRepository.findOne({
        where: {
          email,
        },
      });
      if (!hasUser) {
        throw new ForbiddenException('User not found');
      }
      const passwordMatched = await bcrypt.compare(password, hasUser.password);
      if (!passwordMatched) {
        throw new ForbiddenException('Incorrect password');
      }
      const accessToken = await this.authService.createAccessToken(
        hasUser.id,
        hasUser.email,
      );
      const refreshToken = await this.authService.createRefreshToken(
        hasUser.id,
        hasUser.email,
      );

      return {
        accessToken,
        refreshToken,
      };
    } catch (error) {}
  }

  async logout(userId){
    const getRefreshToken = await this.cacheManager.del(userId.toString());
    if(getRefreshToken)
      return 'Logout !!!!!!!';
   
  }

  async refreshToken(userId: string, email: string, refreshToken: string) {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });
    if (!user || !refreshToken) {
      throw new ForbiddenException('Access Denied');
    }
    const newAccessToken = await this.authService.createAccessToken(
      userId,
      email,
    );
    const newRefreshToken = await this.authService.createRefreshToken(
      userId,
      email,
    );
    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  }

  getAll() {
    return this.userRepository.find();
  }
}
