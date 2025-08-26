/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),
/* 2 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const common_1 = __webpack_require__(3);
const app_controller_1 = __webpack_require__(4);
const app_service_1 = __webpack_require__(5);
const authUser_module_1 = __webpack_require__(6);
const config_1 = __webpack_require__(24);
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [config_1.ConfigModule.forRoot({ isGlobal: true }), authUser_module_1.AuthUserModule],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);


/***/ }),
/* 3 */
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),
/* 4 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppController = void 0;
const common_1 = __webpack_require__(3);
const app_service_1 = __webpack_require__(5);
let AppController = class AppController {
    appService;
    constructor(appService) {
        this.appService = appService;
    }
    getHello() {
        return this.appService.getHello();
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getHello", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof app_service_1.AppService !== "undefined" && app_service_1.AppService) === "function" ? _a : Object])
], AppController);


/***/ }),
/* 5 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppService = void 0;
const common_1 = __webpack_require__(3);
let AppService = class AppService {
    getHello() {
        return "Hello World!";
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)()
], AppService);


/***/ }),
/* 6 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthUserModule = void 0;
const common_1 = __webpack_require__(3);
const jwt_1 = __webpack_require__(7);
const passport_1 = __webpack_require__(8);
const authUser_controller_1 = __webpack_require__(9);
const authUser_service_1 = __webpack_require__(17);
const i_authUser_service_1 = __webpack_require__(11);
const prisma_module_1 = __webpack_require__(21);
const jwt_strategy_1 = __webpack_require__(22);
let AuthUserModule = class AuthUserModule {
};
exports.AuthUserModule = AuthUserModule;
exports.AuthUserModule = AuthUserModule = __decorate([
    (0, common_1.Module)({
        imports: [
            prisma_module_1.PrismaModule,
            passport_1.PassportModule,
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET || "your-secret-key",
                signOptions: { expiresIn: "24h" },
            }),
        ],
        controllers: [authUser_controller_1.AuthUserController],
        providers: [
            {
                provide: i_authUser_service_1.IAuthUserService,
                useClass: authUser_service_1.AuthUserService,
            },
            jwt_strategy_1.JwtStrategy,
        ],
        exports: [i_authUser_service_1.IAuthUserService],
    })
], AuthUserModule);


/***/ }),
/* 7 */
/***/ ((module) => {

module.exports = require("@nestjs/jwt");

/***/ }),
/* 8 */
/***/ ((module) => {

module.exports = require("@nestjs/passport");

/***/ }),
/* 9 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthUserController = void 0;
const common_1 = __webpack_require__(3);
const swagger_1 = __webpack_require__(10);
const i_authUser_service_1 = __webpack_require__(11);
const register_user_dto_1 = __webpack_require__(12);
const login_user_dto_1 = __webpack_require__(14);
const auth_response_dto_1 = __webpack_require__(15);
const jwt_auth_guard_1 = __webpack_require__(16);
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
        description: "Permet à un nouvel utilisateur de créer un compte. Le rôle par défaut est 'CITIZEN'.",
    }),
    (0, swagger_1.ApiBody)({ type: register_user_dto_1.RegisterUserDto }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: "Utilisateur créé avec succès",
        type: auth_response_dto_1.RegisterResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CONFLICT,
        description: "Email ou nom d'utilisateur déjà utilisé",
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: "Données d'entrée invalides",
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof register_user_dto_1.RegisterUserDto !== "undefined" && register_user_dto_1.RegisterUserDto) === "function" ? _b : Object]),
    __metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], AuthUserController.prototype, "register", null);
__decorate([
    (0, common_1.Post)("login"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: "Connexion d'un utilisateur",
        description: "Connexion avec email OU nom d'utilisateur. Retourne un token JWT.",
    }),
    (0, swagger_1.ApiBody)({ type: login_user_dto_1.LoginUserDto }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: "Connexion réussie",
        type: auth_response_dto_1.AuthResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: "Identifiants incorrects",
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: "Données d'entrée invalides",
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof login_user_dto_1.LoginUserDto !== "undefined" && login_user_dto_1.LoginUserDto) === "function" ? _d : Object]),
    __metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], AuthUserController.prototype, "login", null);
__decorate([
    (0, common_1.Post)("logout"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: "Déconnexion d'un utilisateur",
        description: "Déconnexion d'un utilisateur authentifié. Nécessite un token JWT valide.",
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: "Déconnexion réussie",
        type: auth_response_dto_1.LogoutResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.UNAUTHORIZED,
        description: "Token JWT manquant ou invalide",
    }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], AuthUserController.prototype, "logout", null);
exports.AuthUserController = AuthUserController = __decorate([
    (0, swagger_1.ApiTags)("Authentication"),
    (0, common_1.Controller)("auth"),
    __param(0, (0, common_1.Inject)(i_authUser_service_1.IAuthUserService)),
    __metadata("design:paramtypes", [typeof (_a = typeof i_authUser_service_1.IAuthUserService !== "undefined" && i_authUser_service_1.IAuthUserService) === "function" ? _a : Object])
], AuthUserController);


/***/ }),
/* 10 */
/***/ ((module) => {

module.exports = require("@nestjs/swagger");

/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.IAuthUserService = void 0;
exports.IAuthUserService = Symbol("IAuthUserService");


/***/ }),
/* 12 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RegisterUserDto = void 0;
const swagger_1 = __webpack_require__(10);
const class_validator_1 = __webpack_require__(13);
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


/***/ }),
/* 13 */
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),
/* 14 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoginUserDto = void 0;
const class_validator_1 = __webpack_require__(13);
class LoginUserDto {
    emailOrUsername;
    password;
}
exports.LoginUserDto = LoginUserDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LoginUserDto.prototype, "emailOrUsername", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(6),
    __metadata("design:type", String)
], LoginUserDto.prototype, "password", void 0);


/***/ }),
/* 15 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LogoutResponseDto = exports.RegisterResponseDto = exports.AuthResponseDto = exports.UserResponseDto = void 0;
const swagger_1 = __webpack_require__(10);
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
        description: "ID de l'utilisateur",
        example: "clx1234567890abcdef",
    }),
    __metadata("design:type", String)
], UserResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Nom de l'utilisateur",
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
        description: "Email de l'utilisateur",
        example: "amadou.diop@example.com",
    }),
    __metadata("design:type", String)
], UserResponseDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Nom d'utilisateur",
        example: "admin.diop",
    }),
    __metadata("design:type", String)
], UserResponseDto.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Numéro de téléphone",
        example: "+221701234567",
        required: false,
    }),
    __metadata("design:type", String)
], UserResponseDto.prototype, "phoneNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Rôle de l'utilisateur",
        example: "ADMIN",
        enum: ["ADMIN", "CITIZEN"],
    }),
    __metadata("design:type", String)
], UserResponseDto.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Date de création",
        example: "2024-01-01T10:00:00.000Z",
    }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], UserResponseDto.prototype, "createdAt", void 0);
class AuthResponseDto {
    message;
    data;
    statusCode;
}
exports.AuthResponseDto = AuthResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Message de réponse",
        example: "Utilisateur connecté avec succès",
    }),
    __metadata("design:type", String)
], AuthResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
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
    }),
    __metadata("design:type", Object)
], AuthResponseDto.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Code de statut HTTP",
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
        description: "Message de réponse",
        example: "Utilisateur créé avec succès",
    }),
    __metadata("design:type", String)
], RegisterResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
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
    }),
    __metadata("design:type", Object)
], RegisterResponseDto.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Code de statut HTTP",
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
        description: "Message de réponse",
        example: "Déconnexion réussie",
    }),
    __metadata("design:type", String)
], LogoutResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Données de réponse",
        example: null,
    }),
    __metadata("design:type", void 0)
], LogoutResponseDto.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Code de statut HTTP",
        example: 200,
    }),
    __metadata("design:type", Number)
], LogoutResponseDto.prototype, "statusCode", void 0);


/***/ }),
/* 16 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtAuthGuard = void 0;
const common_1 = __webpack_require__(3);
const passport_1 = __webpack_require__(8);
let JwtAuthGuard = class JwtAuthGuard extends (0, passport_1.AuthGuard)("jwt") {
};
exports.JwtAuthGuard = JwtAuthGuard;
exports.JwtAuthGuard = JwtAuthGuard = __decorate([
    (0, common_1.Injectable)()
], JwtAuthGuard);


/***/ }),
/* 17 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthUserService = void 0;
const common_1 = __webpack_require__(3);
const jwt_1 = __webpack_require__(7);
const bcrypt = __webpack_require__(18);
const prisma_service_1 = __webpack_require__(19);
let AuthUserService = class AuthUserService {
    prisma;
    jwtService;
    saltRounds = 12;
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    async register(registerDto) {
        const { nom, prenom, email, username, password, phoneNumber } = registerDto;
        const existingUser = await this.prisma.user.findFirst({
            where: {
                OR: [{ email }, { username }],
            },
        });
        if (existingUser) {
            throw new common_1.ConflictException("Email ou nom d'utilisateur déjà utilisé");
        }
        const hashedPassword = await bcrypt.hash(password, this.saltRounds);
        try {
            const user = await this.prisma.user.create({
                data: {
                    nom,
                    prenom,
                    email,
                    username,
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
                statusCode: common_1.HttpStatus.CREATED,
            };
        }
        catch {
            throw new common_1.ConflictException("Erreur lors de la création de l'utilisateur");
        }
    }
    async login(loginDto) {
        const { emailOrUsername, password } = loginDto;
        const user = await this.validateUser(emailOrUsername, password);
        if (!user) {
            throw new common_1.UnauthorizedException("Email/nom d'utilisateur ou mot de passe incorrect");
        }
        const payload = {
            sub: user.id,
            email: user.email,
            username: user.username,
            nom: user.nom,
            prenom: user.prenom,
            role: user.role,
        };
        const accessToken = this.generateJwtToken(payload);
        const userResponse = {
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
            statusCode: common_1.HttpStatus.OK,
        };
    }
    async logout(userId) {
        const user = (await this.prisma.user.findUnique({
            where: { id: userId },
        }));
        if (!user) {
            throw new common_1.UnauthorizedException("Utilisateur non trouvé");
        }
        return {
            message: "Déconnexion réussie",
            data: null,
            statusCode: common_1.HttpStatus.OK,
        };
    }
    async validateUser(emailOrUsername, password) {
        const user = await this.prisma.user.findFirst({
            where: {
                OR: [{ email: emailOrUsername }, { username: emailOrUsername }],
            },
        });
        if (!user) {
            return null;
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return null;
        }
        return user;
    }
    generateJwtToken(payload) {
        return this.jwtService.sign(payload);
    }
};
exports.AuthUserService = AuthUserService;
exports.AuthUserService = AuthUserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _a : Object, typeof (_b = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _b : Object])
], AuthUserService);


/***/ }),
/* 18 */
/***/ ((module) => {

module.exports = require("bcrypt");

/***/ }),
/* 19 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PrismaService = void 0;
const common_1 = __webpack_require__(3);
const client_1 = __webpack_require__(20);
let PrismaService = class PrismaService extends client_1.PrismaClient {
    async onModuleInit() {
        await this.$connect();
    }
};
exports.PrismaService = PrismaService;
exports.PrismaService = PrismaService = __decorate([
    (0, common_1.Injectable)()
], PrismaService);


/***/ }),
/* 20 */
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),
/* 21 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PrismaModule = void 0;
const common_1 = __webpack_require__(3);
const prisma_service_1 = __webpack_require__(19);
let PrismaModule = class PrismaModule {
};
exports.PrismaModule = PrismaModule;
exports.PrismaModule = PrismaModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        providers: [prisma_service_1.PrismaService],
        exports: [prisma_service_1.PrismaService],
    })
], PrismaModule);


/***/ }),
/* 22 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtStrategy = void 0;
const common_1 = __webpack_require__(3);
const passport_1 = __webpack_require__(8);
const passport_jwt_1 = __webpack_require__(23);
const config_1 = __webpack_require__(24);
let JwtStrategy = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    configService;
    constructor(configService) {
        const jwtSecret = configService.get("JWT_SECRET");
        if (!jwtSecret) {
            throw new Error("JWT_SECRET environment variable is not defined");
        }
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtSecret,
        });
        this.configService = configService;
    }
    validate(payload) {
        return {
            sub: payload.sub,
            email: payload.email,
            username: payload.username,
            nom: payload.nom,
            prenom: payload.prenom,
            role: payload.role,
        };
    }
};
exports.JwtStrategy = JwtStrategy;
exports.JwtStrategy = JwtStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], JwtStrategy);


/***/ }),
/* 23 */
/***/ ((module) => {

module.exports = require("passport-jwt");

/***/ }),
/* 24 */
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),
/* 25 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CorsConfig = void 0;
const common_1 = __webpack_require__(3);
let CorsConfig = class CorsConfig {
    static getConfig() {
        return {
            origin: [
                "http://localhost:3000",
                "https://localhost:3000",
                "https://impactsolution-passbi.onrender.com",
                "https://impactsolution-passbiv1.onrender.com",
                "https://impactsolution-passbiv1.onrender.com/docs",
                "https://passbisn.expo.app",
                "http://localhost:19000",
                "http://localhost:19002",
                "http://localhost:8081",
            ],
            methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
            allowedHeaders: [
                "Origin",
                "X-Requested-With",
                "Content-Type",
                "Accept",
                "Authorization",
            ],
            credentials: true,
            optionsSuccessStatus: 204,
        };
    }
};
exports.CorsConfig = CorsConfig;
exports.CorsConfig = CorsConfig = __decorate([
    (0, common_1.Injectable)()
], CorsConfig);


/***/ }),
/* 26 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SwaggerConfig = void 0;
const swagger_1 = __webpack_require__(10);
class SwaggerConfig {
    static setup(app) {
        const config = new swagger_1.DocumentBuilder()
            .setTitle("Documentation API PassBi")
            .setDescription(`
        🚀 Documentation API complète de PassBi
        
        ## Fonctionnalités principales
        - Authentification par OTP
        - Gestion des utilisateurs
        - Upload de photos
        
        ## Sécurité
        L'API utilise l'authentification JWT Bearer pour sécuriser les endpoints
      `)
            .setVersion("1.0")
            .setContact("Équipe PassBi", "https://impactsolution-passbiv1.onrender.com", "support@passbi.com")
            .setLicense("Propriétaire", "https://impactsolution-passbiv1.onrender.com")
            .addServer("https://impactsolution-passbiv1.onrender.com", "Environnement Local")
            .addServer("https://impactsolution-passbiv1.onrender.com", "Production")
            .addTag("authUser", "Gestion de l'authentification des utilisateurs")
            .addTag("users", "Opérations liées aux utilisateurs")
            .addBearerAuth({
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
            name: "JWT",
            description: "Entrez votre token JWT",
            in: "header",
        }, "access-token")
            .build();
        const document = swagger_1.SwaggerModule.createDocument(app, config);
        swagger_1.SwaggerModule.setup("docs", app, document, {
            explorer: true,
            swaggerOptions: {
                persistAuthorization: true,
                filter: true,
                displayRequestDuration: true,
                docExpansion: "none",
                defaultModelsExpandDepth: 3,
                defaultModelExpandDepth: 3,
                tryItOutEnabled: true,
                operationsSorter: "alpha",
                tagsSorter: "alpha",
                syntaxHighlight: {
                    theme: "monokai",
                },
                displayOperationId: false,
                showExtensions: true,
                showCommonExtensions: true,
            },
            customCss: `
        .swagger-ui .topbar { display: none }
        .swagger-ui .info .title { font-size: 2.5em }
        .swagger-ui .info .description { font-size: 1.2em }
        .swagger-ui .scheme-container { box-shadow: none }
        .swagger-ui .opblock-tag { font-size: 1.5em }
      `,
            customSiteTitle: "Documentation API PassBi",
            customfavIcon: "/favicon.ico",
        });
    }
}
exports.SwaggerConfig = SwaggerConfig;


/***/ }),
/* 27 */
/***/ ((module) => {

module.exports = require("express");

/***/ }),
/* 28 */
/***/ ((module) => {

module.exports = require("dotenv");

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(1);
const app_module_1 = __webpack_require__(2);
const common_1 = __webpack_require__(3);
const cors_config_1 = __webpack_require__(25);
const swagger_config_1 = __webpack_require__(26);
const express_1 = __webpack_require__(27);
const dotenv = __webpack_require__(28);
dotenv.config();
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use((0, express_1.json)({ limit: "10mb" }));
    app.use((0, express_1.urlencoded)({ extended: true, limit: "10mb" }));
    app.enableCors(cors_config_1.CorsConfig.getConfig());
    app.setGlobalPrefix("api");
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
        transformOptions: {
            enableImplicitConversion: true,
        },
    }));
    swagger_config_1.SwaggerConfig.setup(app);
    const port = process.env.PORT || 3000;
    await app.listen(port, "0.0.0.0");
    console.log(`Application is running on port ${port}`);
}
void bootstrap();

})();

/******/ })()
;