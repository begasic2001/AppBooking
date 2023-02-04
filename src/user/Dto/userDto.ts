import { Expose } from "class-transformer";
import { IsEmail } from "class-validator";
import { IsNotEmpty, IsString } from "class-validator";

export class userDto{
    @Expose()
    id:string

    @Expose()
    @IsEmail()
    @IsNotEmpty()
    email:string;

    @IsString()
    @IsNotEmpty()
    password:string
}