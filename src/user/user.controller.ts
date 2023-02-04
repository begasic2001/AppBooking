import { UserService } from './user.service';
import { Body, Controller, Post ,Get} from '@nestjs/common';
import { userDto } from './Dto';
import { Request, UseGuards } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport/dist';
@Controller('user')
export class UserController {
    constructor(private readonly userService:UserService){}

    @Post("register")
    async register(@Body() userData:userDto) {
        return this.userService.register(userData);
    }

    @Post("login")
    async login(@Body() userData:userDto){
        return this.userService.login(userData);
    }
    @UseGuards(AuthGuard('jwt'))
    @Get("me")
    me(@Request() req){
        return req.user
    }
}
