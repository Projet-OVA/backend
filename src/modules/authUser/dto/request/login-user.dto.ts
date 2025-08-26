import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength, IsNotEmpty, ValidateIf } from "class-validator";
import { Transform } from "class-transformer";

export class LoginUserDto {
  @ApiProperty({
    description: "Adresse email ou nom d'utilisateur pour la connexion",
    example: "dioufsoda@gmail.com",
    required: false
  })
  @ValidateIf((obj, value) => {
    // Valider seulement si aucun email/username n'est fourni
    return !obj.email && !obj.username;
  })
  @IsNotEmpty({ message: "L'email ou le nom d'utilisateur est obligatoire" })
  @IsString({ message: "L'email ou le nom d'utilisateur doit être une chaîne de caractères" })
  @Transform(({ value }) => {
    if (value === null || value === undefined) return undefined;
    return typeof value === "string" ? value.trim() : String(value).trim();
  })
  emailOrUsername?: string;

  @ApiProperty({
    description: "Adresse email de l'utilisateur",
    example: "dioufsoda@gmail.com",
    required: false
  })
  @ValidateIf((obj, value) => {
    // Valider seulement si ni emailOrUsername ni username ne sont fournis
    return !obj.emailOrUsername && !obj.username;
  })
  @IsNotEmpty({ message: "L'email est obligatoire" })
  @IsString({ message: "L'email doit être une chaîne de caractères" })
  @Transform(({ value }) => {
    if (value === null || value === undefined) return undefined;
    return typeof value === "string" ? value.trim() : String(value).trim();
  })
  email?: string;

  @ApiProperty({
    description: "Nom d'utilisateur",
    example: "Souada",
    required: false
  })
  @ValidateIf((obj, value) => {
    // Valider seulement si ni emailOrUsername ni email ne sont fournis
    return !obj.emailOrUsername && !obj.email;
  })
  @IsNotEmpty({ message: "Le nom d'utilisateur est obligatoire" })
  @IsString({ message: "Le nom d'utilisateur doit être une chaîne de caractères" })
  @Transform(({ value }) => {
    if (value === null || value === undefined) return undefined;
    return typeof value === "string" ? value.trim() : String(value).trim();
  })
  username?: string;

  @ApiProperty({
    description: "Mot de passe de l'utilisateur (minimum 6 caractères)",
    example: "password123",
    minLength: 6,
  })
  @Transform(({ value }) => {
    if (value === null || value === undefined) return "";
    return typeof value === "string" ? value.trim() : String(value).trim();
  })
  @IsNotEmpty({ message: "Le mot de passe est obligatoire" })
  @IsString({ message: "Le mot de passe doit être une chaîne de caractères" })
  @MinLength(6, {
    message: "Le mot de passe doit contenir au moins 6 caractères",
  })
  password: string;

  // Méthode pour obtenir l'identifiant de connexion
  getLoginIdentifier(): string {
    return (this.emailOrUsername || this.email || this.username || "").trim();
  }
}