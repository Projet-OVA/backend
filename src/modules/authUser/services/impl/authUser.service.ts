import {
  Injectable,
  BadRequestException,
  ConflictException,
  UnauthorizedException,
  HttpStatus,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { PrismaService } from "../../../../core/prisma/prisma.service";
import { IAuthUserService } from "../interfaces/i-authUser.service";
import { RegisterUserDto } from "../../dto/request/register-user.dto";
import { LoginUserDto } from "../../dto/request/login-user.dto";
import {
  AuthResponseDto,
  RegisterResponseDto,
  LogoutResponseDto,
  UserResponseDto,
} from "../../dto/response/auth-response.dto";

interface JwtPayload {
  sub: string;
  email: string;
  username: string;
  nom: string;
  prenom: string;
  role: string;
}

// Types pour les résultats Prisma
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

@Injectable()
export class AuthUserService implements IAuthUserService {
  private readonly saltRounds = 12;

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterUserDto): Promise<RegisterResponseDto> {
    const { nom, prenom, email, username, password, phoneNumber } = registerDto;

    const normalizedEmail = email.trim().toLowerCase();
    const normalizedUsername = username.trim().toLowerCase();

    // Vérifier si l'email ou le nom d'utilisateur existe déjà
    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [
          { email: { equals: normalizedEmail, mode: "insensitive" } },
          { username: { equals: normalizedUsername, mode: "insensitive" } },
        ],
      },
    });

    if (existingUser) {
      throw new ConflictException("Email ou nom d'utilisateur déjà utilisé");
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, this.saltRounds);

    try {
      // Créer l'utilisateur
      const user: UserCreateResult = await this.prisma.user.create({
        data: {
          nom,
          prenom,
          email: normalizedEmail,
          username: normalizedUsername,
          password: hashedPassword,
          phoneNumber,
        },
      });

      return {
        message: "Utilisateur créé avec succès",
        data: {
          id: user.id,
          nom: user.nom,
          prenom: user.prenom,
          email: user.email,
          username: user.username,
          phoneNumber: user.phoneNumber ?? undefined,
          role: user.role,
          createdAt: user.createdAt,
        },
        statusCode: HttpStatus.CREATED,
      };
    } catch {
      throw new ConflictException(
        "Erreur lors de la création de l'utilisateur",
      );
    }
  }

  async login(loginDto: LoginUserDto): Promise<AuthResponseDto> {
    // Utiliser la méthode helper pour obtenir l'identifiant
    const identifier = loginDto.getLoginIdentifier();
    const { password } = loginDto;

    // Vérifier que l'identifiant existe
    if (!identifier) {
      throw new BadRequestException(
        "Un email ou nom d'utilisateur est requis pour la connexion",
      );
    }

    // Valider l'utilisateur
    const user = await this.validateUser(identifier, password);

    if (!user) {
      throw new UnauthorizedException(
        "Email/nom d'utilisateur ou mot de passe incorrect",
      );
    }

    // Générer le token JWT
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      username: user.username,
      nom: user.nom,
      prenom: user.prenom,
      role: user.role,
    };

    const accessToken = this.generateJwtToken(payload);

    // Transformer les données pour correspondre au DTO (en excluant le mot de passe)
    const userResponse: UserResponseDto = {
      id: user.id,
      nom: user.nom,
      prenom: user.prenom,
      email: user.email,
      username: user.username,
      phoneNumber: user.phoneNumber ?? undefined,
      role: user.role,
      createdAt: user.createdAt,
    };

    return {
      message: "Utilisateur connecté avec succès",
      data: {
        user: userResponse,
        accessToken,
      },
      statusCode: HttpStatus.OK,
    };
  }
  async logout(userId: string): Promise<LogoutResponseDto> {
    // Vérifier que l'utilisateur existe
    const user = (await this.prisma.user.findUnique({
      where: { id: userId },
    })) as UserCreateResult | null;

    if (!user) {
      throw new UnauthorizedException("Utilisateur non trouvé");
    }

    return {
      message: "Déconnexion réussie",
      data: null,
      statusCode: HttpStatus.OK,
    };
  }

  async validateUser(
    emailOrUsername: string,
    password: string,
  ): Promise<UserCreateResult | null> {
    const identifier = (emailOrUsername ?? "").toString().trim();
    if (!identifier) {
      return null;
    }

    // Rechercher l'utilisateur par email ou nom d'utilisateur (insensible à la casse)
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [
          { email: { equals: identifier, mode: "insensitive" } },
          { username: { equals: identifier, mode: "insensitive" } },
        ],
      },
      select: {
        id: true,
        nom: true,
        prenom: true,
        email: true,
        username: true,
        phoneNumber: true,
        role: true,
        createdAt: true,
        password: true,
      },
    });

    if (!user) {
      return null;
    }

    // Vérifier le mot de passe
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return null;
    }

    // Retirer password du type retourné
    const { password: _omit, ...safeUser } = user;
    return safeUser as unknown as UserCreateResult;
  }

  generateJwtToken(payload: JwtPayload): string {
    return this.jwtService.sign(payload);
  }
}
