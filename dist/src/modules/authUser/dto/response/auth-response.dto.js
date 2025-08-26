"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogoutResponseDto = exports.RegisterResponseDto = exports.AuthResponseDto = exports.AuthDataDto = exports.UserResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class UserResponseDto {
    id;
    nom;
    prenom;
    email;
    username;
    phoneNumber;
    role;
    createdAt;
}
exports.UserResponseDto = UserResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Identifiant unique de l'utilisateur",
        example: "clx1234567890abcdef",
    }),
    __metadata("design:type", String)
], UserResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Nom de famille de l'utilisateur",
        example: "Diop",
    }),
    __metadata("design:type", String)
], UserResponseDto.prototype, "nom", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Prénom de l'utilisateur",
        example: "Amadou",
    }),
    __metadata("design:type", String)
], UserResponseDto.prototype, "prenom", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Adresse email de l'utilisateur",
        example: "amadou.diop@example.com",
    }),
    __metadata("design:type", String)
], UserResponseDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Nom d'utilisateur unique",
        example: "admin.diop",
    }),
    __metadata("design:type", String)
], UserResponseDto.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Numéro de téléphone de l'utilisateur",
        example: "+221701234567",
        required: false,
    }),
    __metadata("design:type", String)
], UserResponseDto.prototype, "phoneNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Rôle de l'utilisateur dans le système",
        example: "ADMIN",
        enum: ["ADMIN", "CITIZEN"],
    }),
    __metadata("design:type", String)
], UserResponseDto.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Date de création du compte utilisateur",
        example: "2024-01-01T10:00:00.000Z",
        type: String,
        format: "date-time",
    }),
    __metadata("design:type", Date)
], UserResponseDto.prototype, "createdAt", void 0);
class AuthDataDto {
    user;
    accessToken;
}
exports.AuthDataDto = AuthDataDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Informations détaillées de l'utilisateur",
        type: () => UserResponseDto,
    }),
    __metadata("design:type", UserResponseDto)
], AuthDataDto.prototype, "user", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Token d'accès JWT pour l'authentification",
        example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    }),
    __metadata("design:type", String)
], AuthDataDto.prototype, "accessToken", void 0);
class AuthResponseDto {
    message;
    data;
    statusCode;
}
exports.AuthResponseDto = AuthResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Message descriptif de la réponse",
        example: "Utilisateur connecté avec succès",
    }),
    __metadata("design:type", String)
], AuthResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Données d'authentification incluant l'utilisateur et le token",
        type: () => AuthDataDto,
    }),
    __metadata("design:type", AuthDataDto)
], AuthResponseDto.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Code de statut HTTP de la réponse",
        example: 200,
    }),
    __metadata("design:type", Number)
], AuthResponseDto.prototype, "statusCode", void 0);
class RegisterResponseDto {
    message;
    data;
    statusCode;
}
exports.RegisterResponseDto = RegisterResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Message de confirmation de l'inscription",
        example: "Utilisateur créé avec succès",
    }),
    __metadata("design:type", String)
], RegisterResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Données de l'utilisateur nouvellement créé",
        type: () => UserResponseDto,
    }),
    __metadata("design:type", UserResponseDto)
], RegisterResponseDto.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Code de statut HTTP de la réponse",
        example: 201,
    }),
    __metadata("design:type", Number)
], RegisterResponseDto.prototype, "statusCode", void 0);
class LogoutResponseDto {
    message;
    data;
    statusCode;
}
exports.LogoutResponseDto = LogoutResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Message de confirmation de la déconnexion",
        example: "Déconnexion réussie",
    }),
    __metadata("design:type", String)
], LogoutResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Données de réponse (null pour la déconnexion)",
        example: null,
        nullable: true,
        type: "null",
    }),
    __metadata("design:type", void 0)
], LogoutResponseDto.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Code de statut HTTP de la réponse",
        example: 200,
    }),
    __metadata("design:type", Number)
], LogoutResponseDto.prototype, "statusCode", void 0);
//# sourceMappingURL=auth-response.dto.js.map