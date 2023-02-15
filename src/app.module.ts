import { Sight } from './entity/sight.entity';
import { Tour } from './entity/tour.entity';
import { Transport } from './entity/transport.entity';
import { City } from './entity/city.entity';
import { Country } from './entity/countries.entity';
import { User } from 'src/entity/user.entity';
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'Tour',
      entities: [User, Country, City, Transport, Tour,Sight],
      synchronize: true,
    }),
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          host: process.env.MAIL_HOST,
          secure: false,
          auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD,
          },
        },
        defaults: {
          from: `"No Reply" <${process.env.MAIL_FROM}>`,
        },

        template: {
          dir: join(__dirname + '/src/templates/email'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
