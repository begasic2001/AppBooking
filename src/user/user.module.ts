import { AuthModule } from './../auth/auth.module';
import { CacheModule, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './Entity/user.entity';
import * as redisStore from 'cache-manager-redis-store';
@Module({
  imports: [TypeOrmModule.forFeature([User]), AuthModule,
  CacheModule.register({
    isGlobal:true,
    store: redisStore, 
    host: 'localhost', //default host
    port: 6379 //default port
  })
],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
