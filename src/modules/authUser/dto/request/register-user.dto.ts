import { ApiProperty } from "@nestjs/swagger";
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from "class-validator";

export class RegisterUserDto {
  @ApiProperty({
    description: "Nom de l'utilisateur",
    example: "Diop",
    required: true,
  })
  @IsNotEmpty({ message: "Le nom est obligatoire" })
  @IsString({ message: "Le nom doit être une chaîne de caractères" })
  nom: string;

  @ApiProperty({
    description: "Prénom de l'utilisateur",
    example: "Amadou",
    required: true,
  })
  @IsNotEmpty({ message: "Le prénom est obligatoire" })
  @IsString({ message: "Le prénom doit être une chaîne de caractères" })
  prenom: string;

  @ApiProperty({
    description: "Nom d'utilisateur unique",
    example: "admin.diop",
    required: true,
  })
  @IsNotEmpty({ message: "Le nom d'utilisateur est obligatoire" })
  @IsString({
    message: "Le nom d'utilisateur doit être une chaîne de caractères",
  })
  username: string;

  @ApiProperty({
    description: "Adresse email de l'utilisateur",
    example: "amadou.diop@example.com",
    required: true,
  })
  @IsNotEmpty({ message: "L'email est obligatoire" })
  @IsEmail({}, { message: "L'email doit avoir un format valide" })
  email: string;

  @ApiProperty({
    description: "Mot de passe de l'utilisateur (minimum 6 caractères)",
    example: "password123",
    minLength: 6,
    required: true,
  })
  @IsNotEmpty({ message: "Le mot de passe est obligatoire" })
  @IsString({ message: "Le mot de passe doit être une chaîne de caractères" })
  @MinLength(6, {
    message: "Le mot de passe doit contenir au moins 6 caractères",
  })
  password: string;

  @ApiProperty({
    description: "Numéro de téléphone de l'utilisateur",
    example: "+221701234567",
    required: false,
  })
  @IsOptional()
  @IsString({ message: "Le téléphone doit être une chaîne de caractères" })
  phoneNumber?: string;

  @ApiProperty({
    description: "Rôle de l'utilisateur",
    example: "CITIZEN",
    enum: ["ADMIN", "CITIZEN"],
    default: "CITIZEN",
    required: false,
  })
  @IsOptional()
  @IsString({ message: "Le rôle doit être une chaîne de caractères" })
  role?: string;
}
