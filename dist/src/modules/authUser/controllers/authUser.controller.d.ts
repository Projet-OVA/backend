import { Request } from "express";
import { IAuthUserService } from "../services/interfaces/i-authUser.service";
import { RegisterUserDto } from "../dto/request/register-user.dto";
import { LoginUserDto } from "../dto/request/login-user.dto";
import { AuthResponseDto, RegisterResponseDto, LogoutResponseDto } from "../dto/response/auth-response.dto";
interface AuthenticatedRequest extends Request {
    user: {
        sub: string;
        email: string;
        username: string;
        nom: string;
        prenom: string;
        role: string;
    };
}
export declare class AuthUserController {
    private readonly authUserService;
    constructor(authUserService: IAuthUserService);
    register(registerDto: RegisterUserDto): Promise<RegisterResponseDto>;
    login(loginDto: LoginUserDto): Promise<AuthResponseDto>;
    logout(req: AuthenticatedRequest): Promise<LogoutResponseDto>;
}
export {};
