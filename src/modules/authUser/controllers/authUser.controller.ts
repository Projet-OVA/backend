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

@ApiTags("Authentification")
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
      "Permet à un nouvel utilisateur de créer un compte dans le système. Le rôle par défaut attribué est 'CITIZEN' sauf indication contraire.",
  })
  @ApiBody({
    type: RegisterUserDto,
    description:
      "Informations requises pour créer un nouveau compte utilisateur",
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description:
      "Utilisateur créé avec succès. Retourne les informations du nouvel utilisateur.",
    type: RegisterResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description:
      "Conflit : L'adresse email ou le nom d'utilisateur est déjà utilisé par un autre compte.",
    schema: {
      type: "object",
      properties: {
        message: { type: "string", example: "Cet email est déjà utilisé" },
        statusCode: { type: "number", example: 409 },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description:
      "Requête incorrecte : Les données fournies ne respectent pas le format attendu.",
    schema: {
      type: "object",
      properties: {
        message: {
          type: "array",
          items: { type: "string" },
          example: [
            "Le nom est obligatoire",
            "L'email doit avoir un format valide",
          ],
        },
        statusCode: { type: "number", example: 400 },
      },
    },
  })
  async register(
    @Body() registerDto: RegisterUserDto,
  ): Promise<RegisterResponseDto> {
    return await this.authUserService.register(registerDto);
  }

  @Post("login")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: "Connexion d'un utilisateur existant",
    description:
      "Permet à un utilisateur de se connecter avec son adresse email OU son nom d'utilisateur. Retourne un token JWT d'authentification valide pour accéder aux ressources protégées.",
  })
  @ApiBody({
    type: LoginUserDto,
    description:
      "Identifiants de connexion (email/nom d'utilisateur et mot de passe)",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description:
      "Connexion réussie. Retourne les informations utilisateur et le token d'accès.",
    type: AuthResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Non autorisé : Les identifiants fournis sont incorrects.",
    schema: {
      type: "object",
      properties: {
        message: { type: "string", example: "Identifiants incorrects" },
        statusCode: { type: "number", example: 401 },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description:
      "Requête incorrecte : Format des données de connexion invalide.",
    schema: {
      type: "object",
      properties: {
        message: {
          type: "array",
          items: { type: "string" },
          example: ["Le mot de passe doit contenir au moins 6 caractères"],
        },
        statusCode: { type: "number", example: 400 },
      },
    },
  })
  async login(@Body() loginDto: LoginUserDto): Promise<AuthResponseDto> {
    return await this.authUserService.login(loginDto);
  }

  @Post("logout")
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({
    summary: "Déconnexion d'un utilisateur authentifié",
    description:
      "Permet à un utilisateur authentifié de se déconnecter du système. Cette opération nécessite un token JWT valide dans l'en-tête Authorization.",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description:
      "Déconnexion réussie. L'utilisateur a été déconnecté du système.",
    type: LogoutResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "Non autorisé : Token JWT manquant, invalide ou expiré.",
    schema: {
      type: "object",
      properties: {
        message: { type: "string", example: "Token JWT invalide" },
        statusCode: { type: "number", example: 401 },
      },
    },
  })
  async logout(@Req() req: AuthenticatedRequest): Promise<LogoutResponseDto> {
    const userId = req.user.sub;
    return await this.authUserService.logout(userId);
  }
}
