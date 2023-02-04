import { User } from './Entity/user.entity';
import { AuthService } from './../auth/auth.service';
import { userDto } from './Dto/UserDto';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ConflictException,
  ForbiddenException,
  InternalServerErrorException,
} from '@nestjs/common/exceptions';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor(
    private authService: AuthService,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async register(userData) {
    try {
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

  async login(userData){
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
      return await this.authService.createAccessToken(hasUser.id,hasUser.email);  
    } catch (error) {}
  }
}
