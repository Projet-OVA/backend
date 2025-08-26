import { ApiProperty } from "@nestjs/swagger";

// Interface simple pour éviter les références circulaires
interface IUserData {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  username: string;
  phoneNumber?: string;
  role: string;
  createdAt: Date;
}

interface IAuthData {
  user: IUserData;
  accessToken: string;
}

export class UserResponseDto implements IUserData {
  @ApiProperty({
    description: "ID de l'utilisateur",
    example: "clx1234567890abcdef",
  })
  id: string;

  @ApiProperty({
    description: "Nom de l'utilisateur",
    example: "Diop",
  })
  nom: string;

  @ApiProperty({
    description: "Prénom de l'utilisateur",
    example: "Amadou",
  })
  prenom: string;

  @ApiProperty({
    description: "Email de l'utilisateur",
    example: "amadou.diop@example.com",
  })
  email: string;

  @ApiProperty({
    description: "Nom d'utilisateur",
    example: "admin.diop",
  })
  username: string;

  @ApiProperty({
    description: "Numéro de téléphone",
    example: "+221701234567",
    required: false,
  })
  phoneNumber?: string;

  @ApiProperty({
    description: "Rôle de l'utilisateur",
    example: "ADMIN",
    enum: ["ADMIN", "CITIZEN"],
  })
  role: string;

  @ApiProperty({
    description: "Date de création",
    example: "2024-01-01T10:00:00.000Z",
  })
  createdAt: Date;
}

export class AuthResponseDto {
  @ApiProperty({
    description: "Message de réponse",
    example: "Utilisateur connecté avec succès",
  })
  message: string;

  @ApiProperty({
    description: "Données d'authentification",
    type: "object",
    properties: {
      user: {
        type: "object",
        properties: {
          id: { type: "string", example: "clx1234567890abcdef" },
          nom: { type: "string", example: "Diop" },
          prenom: { type: "string", example: "Amadou" },
          email: { type: "string", example: "amadou.diop@example.com" },
          username: { type: "string", example: "admin.diop" },
          phoneNumber: { type: "string", example: "+221701234567" },
          role: {
            type: "string",
            example: "ADMIN",
            enum: ["ADMIN", "CITIZEN"],
          },
          createdAt: {
            type: "string",
            format: "date-time",
            example: "2024-01-01T10:00:00.000Z",
          },
        },
      },
      accessToken: {
        type: "string",
        example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      },
    },
  })
  data: IAuthData;

  @ApiProperty({
    description: "Code de statut HTTP",
    example: 200,
  })
  statusCode: number;
}

export class RegisterResponseDto {
  @ApiProperty({
    description: "Message de réponse",
    example: "Utilisateur créé avec succès",
  })
  message: string;

  @ApiProperty({
    description: "Données de l'utilisateur créé",
    type: "object",
    properties: {
      id: { type: "string", example: "clx1234567890abcdef" },
      nom: { type: "string", example: "Diop" },
      prenom: { type: "string", example: "Amadou" },
      email: { type: "string", example: "amadou.diop@example.com" },
      username: { type: "string", example: "admin.diop" },
      phoneNumber: { type: "string", example: "+221701234567" },
      role: { type: "string", example: "ADMIN", enum: ["ADMIN", "CITIZEN"] },
      createdAt: {
        type: "string",
        format: "date-time",
        example: "2024-01-01T10:00:00.000Z",
      },
    },
  })
  data: IUserData;

  @ApiProperty({
    description: "Code de statut HTTP",
    example: 201,
  })
  statusCode: number;
}

export class LogoutResponseDto {
  @ApiProperty({
    description: "Message de réponse",
    example: "Déconnexion réussie",
  })
  message: string;

  @ApiProperty({
    description: "Données de réponse",
    example: null,
  })
  data: null;

  @ApiProperty({
    description: "Code de statut HTTP",
    example: 200,
  })
  statusCode: number;
}
