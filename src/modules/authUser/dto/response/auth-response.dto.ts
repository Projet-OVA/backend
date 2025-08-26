import { ApiProperty } from "@nestjs/swagger";

export class UserResponseDto {
  @ApiProperty({
    description: "Identifiant unique de l'utilisateur",
    example: "clx1234567890abcdef",
  })
  id: string;

  @ApiProperty({
    description: "Nom de famille de l'utilisateur",
    example: "Diop",
  })
  nom: string;

  @ApiProperty({
    description: "Prénom de l'utilisateur",
    example: "Amadou",
  })
  prenom: string;

  @ApiProperty({
    description: "Adresse email de l'utilisateur",
    example: "amadou.diop@example.com",
  })
  email: string;

  @ApiProperty({
    description: "Nom d'utilisateur unique",
    example: "admin.diop",
  })
  username: string;

  @ApiProperty({
    description: "Numéro de téléphone de l'utilisateur",
    example: "+221701234567",
    required: false,
  })
  phoneNumber?: string;

  @ApiProperty({
    description: "Rôle de l'utilisateur dans le système",
    example: "ADMIN",
    enum: ["ADMIN", "CITIZEN"],
  })
  role: string;

  @ApiProperty({
    description: "Date de création du compte utilisateur",
    example: "2024-01-01T10:00:00.000Z",
    type: String,
    format: "date-time",
  })
  createdAt: Date;
}

export class AuthDataDto {
  @ApiProperty({
    description: "Informations détaillées de l'utilisateur",
    type: () => UserResponseDto,
  })
  user: UserResponseDto;

  @ApiProperty({
    description: "Token d'accès JWT pour l'authentification",
    example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  })
  accessToken: string;
}

export class AuthResponseDto {
  @ApiProperty({
    description: "Message descriptif de la réponse",
    example: "Utilisateur connecté avec succès",
  })
  message: string;

  @ApiProperty({
    description:
      "Données d'authentification incluant l'utilisateur et le token",
    type: () => AuthDataDto,
  })
  data: AuthDataDto;

  @ApiProperty({
    description: "Code de statut HTTP de la réponse",
    example: 200,
  })
  statusCode: number;
}

export class RegisterResponseDto {
  @ApiProperty({
    description: "Message de confirmation de l'inscription",
    example: "Utilisateur créé avec succès",
  })
  message: string;

  @ApiProperty({
    description: "Données de l'utilisateur nouvellement créé",
    type: () => UserResponseDto,
  })
  data: UserResponseDto;

  @ApiProperty({
    description: "Code de statut HTTP de la réponse",
    example: 201,
  })
  statusCode: number;
}

export class LogoutResponseDto {
  @ApiProperty({
    description: "Message de confirmation de la déconnexion",
    example: "Déconnexion réussie",
  })
  message: string;

  @ApiProperty({
    description: "Données de réponse (null pour la déconnexion)",
    example: null,
    nullable: true,
    type: "null",
  })
  data: null;

  @ApiProperty({
    description: "Code de statut HTTP de la réponse",
    example: 200,
  })
  statusCode: number;
}
