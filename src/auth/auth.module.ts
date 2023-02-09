import { UserModule } from './../user/user.module';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy, jwtRefresh } from './strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';

@Module({
  imports: [JwtModule.register({}), TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, jwtRefresh],
  exports: [AuthService],
})
export class AuthModule {}
