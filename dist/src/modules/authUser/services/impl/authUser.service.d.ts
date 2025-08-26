import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "../../../../core/prisma/prisma.service";
import { IAuthUserService } from "../interfaces/i-authUser.service";
import { RegisterUserDto } from "../../dto/request/register-user.dto";
import { LoginUserDto } from "../../dto/request/login-user.dto";
import { AuthResponseDto, RegisterResponseDto, LogoutResponseDto } from "../../dto/response/auth-response.dto";
interface JwtPayload {
    sub: string;
    email: string;
    username: string;
    nom: string;
    prenom: string;
    role: string;
}
type UserCreateResult = {
    id: string;
    nom: string;
    prenom: string;
    email: string;
    username: string;
    phoneNumber: string | null;
    role: string;
    createdAt: Date;
};
export declare class AuthUserService implements IAuthUserService {
    private readonly prisma;
    private readonly jwtService;
    private readonly saltRounds;
    constructor(prisma: PrismaService, jwtService: JwtService);
    register(registerDto: RegisterUserDto): Promise<RegisterResponseDto>;
    login(loginDto: LoginUserDto): Promise<AuthResponseDto>;
    logout(userId: string): Promise<LogoutResponseDto>;
    validateUser(emailOrUsername: string, password: string): Promise<UserCreateResult | null>;
    generateJwtToken(payload: JwtPayload): string;
}
export {};
