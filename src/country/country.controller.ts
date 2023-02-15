import { CountryService } from './country.service';
import { Controller, UploadedFile, UseInterceptors ,Post} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('country')
export class CountryController {
    constructor(private readonly countryService:CountryService){}
    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    uploadImage(@UploadedFile() file: Express.Multer.File) {
      return this.countryService.uploadImageToCloudinary(file);
    }
}
