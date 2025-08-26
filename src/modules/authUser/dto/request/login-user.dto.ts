import { IsString, MinLength } from "class-validator";

export class LoginUserDto {
  @IsString()
  emailOrUsername: string;

  @IsString()
  @MinLength(6)
  password: string;
}
