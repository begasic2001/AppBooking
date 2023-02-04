import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private jwtService:JwtService){}

    async createAccessToken(userId:string,email:string):Promise<{accessToken:string}>{
        const payload = {
            sub:userId,
            email,
        }

        const accessToken = await this.jwtService.signAsync(payload,{
            expiresIn:'10m',
            secret: process.env.SECRET_KEY
        })

        return {
            accessToken
        }
    }
}
