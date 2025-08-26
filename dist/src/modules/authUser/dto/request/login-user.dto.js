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
exports.LoginUserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class LoginUserDto {
    emailOrUsername;
    email;
    username;
    password;
    getLoginIdentifier() {
        return (this.emailOrUsername || this.email || this.username || "").trim();
    }
}
exports.LoginUserDto = LoginUserDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Adresse email ou nom d'utilisateur pour la connexion",
        example: "dioufsoda@gmail.com",
        required: false
    }),
    (0, class_validator_1.ValidateIf)((obj, value) => {
        return !obj.email && !obj.username;
    }),
    (0, class_validator_1.IsNotEmpty)({ message: "L'email ou le nom d'utilisateur est obligatoire" }),
    (0, class_validator_1.IsString)({ message: "L'email ou le nom d'utilisateur doit être une chaîne de caractères" }),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (value === null || value === undefined)
            return undefined;
        return typeof value === "string" ? value.trim() : String(value).trim();
    }),
    __metadata("design:type", String)
], LoginUserDto.prototype, "emailOrUsername", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Adresse email de l'utilisateur",
        example: "dioufsoda@gmail.com",
        required: false
    }),
    (0, class_validator_1.ValidateIf)((obj, value) => {
        return !obj.emailOrUsername && !obj.username;
    }),
    (0, class_validator_1.IsNotEmpty)({ message: "L'email est obligatoire" }),
    (0, class_validator_1.IsString)({ message: "L'email doit être une chaîne de caractères" }),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (value === null || value === undefined)
            return undefined;
        return typeof value === "string" ? value.trim() : String(value).trim();
    }),
    __metadata("design:type", String)
], LoginUserDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Nom d'utilisateur",
        example: "Souada",
        required: false
    }),
    (0, class_validator_1.ValidateIf)((obj, value) => {
        return !obj.emailOrUsername && !obj.email;
    }),
    (0, class_validator_1.IsNotEmpty)({ message: "Le nom d'utilisateur est obligatoire" }),
    (0, class_validator_1.IsString)({ message: "Le nom d'utilisateur doit être une chaîne de caractères" }),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (value === null || value === undefined)
            return undefined;
        return typeof value === "string" ? value.trim() : String(value).trim();
    }),
    __metadata("design:type", String)
], LoginUserDto.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Mot de passe de l'utilisateur (minimum 6 caractères)",
        example: "password123",
        minLength: 6,
    }),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (value === null || value === undefined)
            return "";
        return typeof value === "string" ? value.trim() : String(value).trim();
    }),
    (0, class_validator_1.IsNotEmpty)({ message: "Le mot de passe est obligatoire" }),
    (0, class_validator_1.IsString)({ message: "Le mot de passe doit être une chaîne de caractères" }),
    (0, class_validator_1.MinLength)(6, {
        message: "Le mot de passe doit contenir au moins 6 caractères",
    }),
    __metadata("design:type", String)
], LoginUserDto.prototype, "password", void 0);
//# sourceMappingURL=login-user.dto.js.map