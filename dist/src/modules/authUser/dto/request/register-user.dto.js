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
exports.RegisterUserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class RegisterUserDto {
    nom;
    prenom;
    username;
    email;
    password;
    phoneNumber;
    role;
}
exports.RegisterUserDto = RegisterUserDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Nom de l'utilisateur",
        example: "Diop",
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)({ message: "Le nom est obligatoire" }),
    (0, class_validator_1.IsString)({ message: "Le nom doit être une chaîne de caractères" }),
    __metadata("design:type", String)
], RegisterUserDto.prototype, "nom", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Prénom de l'utilisateur",
        example: "Amadou",
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)({ message: "Le prénom est obligatoire" }),
    (0, class_validator_1.IsString)({ message: "Le prénom doit être une chaîne de caractères" }),
    __metadata("design:type", String)
], RegisterUserDto.prototype, "prenom", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Nom d'utilisateur unique",
        example: "admin.diop",
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)({ message: "Le nom d'utilisateur est obligatoire" }),
    (0, class_validator_1.IsString)({
        message: "Le nom d'utilisateur doit être une chaîne de caractères",
    }),
    __metadata("design:type", String)
], RegisterUserDto.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Adresse email de l'utilisateur",
        example: "amadou.diop@example.com",
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)({ message: "L'email est obligatoire" }),
    (0, class_validator_1.IsEmail)({}, { message: "L'email doit avoir un format valide" }),
    __metadata("design:type", String)
], RegisterUserDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Mot de passe de l'utilisateur (minimum 6 caractères)",
        example: "password123",
        minLength: 6,
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)({ message: "Le mot de passe est obligatoire" }),
    (0, class_validator_1.IsString)({ message: "Le mot de passe doit être une chaîne de caractères" }),
    (0, class_validator_1.MinLength)(6, {
        message: "Le mot de passe doit contenir au moins 6 caractères",
    }),
    __metadata("design:type", String)
], RegisterUserDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Numéro de téléphone de l'utilisateur",
        example: "+221701234567",
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: "Le téléphone doit être une chaîne de caractères" }),
    __metadata("design:type", String)
], RegisterUserDto.prototype, "phoneNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Rôle de l'utilisateur",
        example: "CITIZEN",
        enum: ["ADMIN", "CITIZEN"],
        default: "CITIZEN",
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: "Le rôle doit être une chaîne de caractères" }),
    __metadata("design:type", String)
], RegisterUserDto.prototype, "role", void 0);
//# sourceMappingURL=register-user.dto.js.map