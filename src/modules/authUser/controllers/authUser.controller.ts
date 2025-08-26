import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
  Req,
  Inject,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { Request } from "express";
import { IAuthUserService } from "../services/interfaces/i-authUser.service";
import { RegisterUserDto } from "../dto/request/register-user.dto";
import { LoginUserDto } from "../dto/request/login-user.dto";
import {
  AuthResponseDto,
  RegisterResponseDto,
  LogoutResponseDto,
} from "../dto/response/auth-response.dto";
import { JwtAuthGuard } from "src/core/guards/jwt-auth.guard";

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

@ApiTags("Authentication")
@Controller("auth")
export class AuthUserController {
  constructor(
    @Inject(IAuthUserService)
    private readonly authUserService: IAuthUserService,
  ) {}

  @Post("register")
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: "Inscription d'un nouvel utilisateur",
    description:
      "Permet à un nouvel utilisateur de créer un compte. Le rôle par défaut est 'CITIZEN'.",
  })
  @ApiBody({ type: RegisterUserDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Utilisateur créé avec succès",
    type: RegisterResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: "Email ou nom d'utilisateur déjà utilisé",
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Données d'entrée invalides",
  })
  async register(
    @Body() registerDto: RegisterUserDto,
  ): Promise<RegisterResponseDto> {
    return await this.authUserService.register(registerDto);
  }

  @Post("login")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Connexion d'un utilisateur",
    description:
      "Connexion avec email OU nom d'utilisateur. Retourne un token JWT.",
  })
  @ApiBody({ type: LoginUserDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Connexion réussie",
    type: AuthResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Identifiants incorrects",
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Données d'entrée invalides",
  })
  async login(@Body() loginDto: LoginUserDto): Promise<AuthResponseDto> {
    return await this.authUserService.login(loginDto);
  }

  @Post("logout")
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({
    summary: "Déconnexion d'un utilisateur",
    description:
      "Déconnexion d'un utilisateur authentifié. Nécessite un token JWT valide.",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Déconnexion réussie",
    type: LogoutResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Token JWT manquant ou invalide",
  })
  async logout(@Req() req: AuthenticatedRequest): Promise<LogoutResponseDto> {
    const userId = req.user.sub;
    return await this.authUserService.logout(userId);
  }
}
