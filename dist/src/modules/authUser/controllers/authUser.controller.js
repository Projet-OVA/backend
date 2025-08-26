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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUserController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const i_authUser_service_1 = require("../services/interfaces/i-authUser.service");
const register_user_dto_1 = require("../dto/request/register-user.dto");
const login_user_dto_1 = require("../dto/request/login-user.dto");
const auth_response_dto_1 = require("../dto/response/auth-response.dto");
const jwt_auth_guard_1 = require("../../../core/guards/jwt-auth.guard");
let AuthUserController = class AuthUserController {
    authUserService;
    constructor(authUserService) {
        this.authUserService = authUserService;
    }
    async register(registerDto) {
        return await this.authUserService.register(registerDto);
    }
    async login(loginDto) {
        return await this.authUserService.login(loginDto);
    }
    async logout(req) {
        const userId = req.user.sub;
        return await this.authUserService.logout(userId);
    }
};
exports.AuthUserController = AuthUserController;
__decorate([
    (0, common_1.Post)("register"),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({
        summary: "Inscription d'un nouvel utilisateur",
        description: "Permet à un nouvel utilisateur de créer un compte dans le système. Le rôle par défaut attribué est 'CITIZEN' sauf indication contraire.",
    }),
    (0, swagger_1.ApiBody)({
        type: register_user_dto_1.RegisterUserDto,
        description: "Informations requises pour créer un nouveau compte utilisateur",
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: "Utilisateur créé avec succès. Retourne les informations du nouvel utilisateur.",
        type: auth_response_dto_1.RegisterResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CONFLICT,
        description: "Conflit : L'adresse email ou le nom d'utilisateur est déjà utilisé par un autre compte.",
        schema: {
            type: "object",
            properties: {
                message: { type: "string", example: "Cet email est déjà utilisé" },
                statusCode: { type: "number", example: 409 },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: "Requête incorrecte : Les données fournies ne respectent pas le format attendu.",
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
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_user_dto_1.RegisterUserDto]),
    __metadata("design:returntype", Promise)
], AuthUserController.prototype, "register", null);
__decorate([
    (0, common_1.Post)("login"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: "Connexion d'un utilisateur existant",
        description: "Permet à un utilisateur de se connecter avec son adresse email OU son nom d'utilisateur. Retourne un token JWT d'authentification valide pour accéder aux ressources protégées.",
    }),
    (0, swagger_1.ApiBody)({
        type: login_user_dto_1.LoginUserDto,
        description: "Identifiants de connexion (email/nom d'utilisateur et mot de passe)",
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: "Connexion réussie. Retourne les informations utilisateur et le token d'accès.",
        type: auth_response_dto_1.AuthResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: "Non autorisé : Les identifiants fournis sont incorrects.",
        schema: {
            type: "object",
            properties: {
                message: { type: "string", example: "Identifiants incorrects" },
                statusCode: { type: "number", example: 401 },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: "Requête incorrecte : Format des données de connexion invalide.",
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
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_user_dto_1.LoginUserDto]),
    __metadata("design:returntype", Promise)
], AuthUserController.prototype, "login", null);
__decorate([
    (0, common_1.Post)("logout"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: "Déconnexion d'un utilisateur authentifié",
        description: "Permet à un utilisateur authentifié de se déconnecter du système. Cette opération nécessite un token JWT valide dans l'en-tête Authorization.",
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: "Déconnexion réussie. L'utilisateur a été déconnecté du système.",
        type: auth_response_dto_1.LogoutResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: "Non autorisé : Token JWT manquant, invalide ou expiré.",
        schema: {
            type: "object",
            properties: {
                message: { type: "string", example: "Token JWT invalide" },
                statusCode: { type: "number", example: 401 },
            },
        },
    }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthUserController.prototype, "logout", null);
exports.AuthUserController = AuthUserController = __decorate([
    (0, swagger_1.ApiTags)("Authentification"),
    (0, common_1.Controller)("auth"),
    __param(0, (0, common_1.Inject)(i_authUser_service_1.IAuthUserService)),
    __metadata("design:paramtypes", [Object])
], AuthUserController);
//# sourceMappingURL=authUser.controller.js.map