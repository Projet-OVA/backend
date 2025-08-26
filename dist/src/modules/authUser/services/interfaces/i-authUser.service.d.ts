import { RegisterUserDto } from "../../dto/request/register-user.dto";
import { LoginUserDto } from "../../dto/request/login-user.dto";
import { AuthResponseDto, RegisterResponseDto, LogoutResponseDto } from "../../dto/response/auth-response.dto";
export interface IAuthUserService {
    register(registerDto: RegisterUserDto): Promise<RegisterResponseDto>;
    login(loginDto: LoginUserDto): Promise<AuthResponseDto>;
    logout(userId: string): Promise<LogoutResponseDto>;
    validateUser(emailOrUsername: string, password: string): Promise<any>;
    generateJwtToken(payload: any): string;
}
export declare const IAuthUserService: unique symbol;
