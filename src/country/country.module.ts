import { CloudinaryModule } from './../common/cloudinary/cloudinary.module';
import { Module } from '@nestjs/common';
import { CountryController } from './country.controller';
import { CountryService } from './country.service';

@Module({
  imports:[
    CloudinaryModule
  ],
  controllers: [CountryController],
  providers: [CountryService]
})
export class CountryModule {}
