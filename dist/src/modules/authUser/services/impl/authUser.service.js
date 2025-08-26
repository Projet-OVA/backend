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
exports.AuthUserService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const prisma_service_1 = require("../../../../core/prisma/prisma.service");
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
        const normalizedEmail = email.trim().toLowerCase();
        const normalizedUsername = username.trim().toLowerCase();
        const existingUser = await this.prisma.user.findFirst({
            where: {
                OR: [
                    { email: { equals: normalizedEmail, mode: "insensitive" } },
                    { username: { equals: normalizedUsername, mode: "insensitive" } },
                ],
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
                statusCode: common_1.HttpStatus.CREATED,
            };
        }
        catch {
            throw new common_1.ConflictException("Erreur lors de la création de l'utilisateur");
        }
    }
    async login(loginDto) {
        const identifier = loginDto.getLoginIdentifier();
        const { password } = loginDto;
        if (!identifier) {
            throw new common_1.BadRequestException("Un email ou nom d'utilisateur est requis pour la connexion");
        }
        const user = await this.validateUser(identifier, password);
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
        const identifier = (emailOrUsername ?? "").toString().trim();
        if (!identifier) {
            return null;
        }
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
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return null;
        }
        const { password: _omit, ...safeUser } = user;
        return safeUser;
    }
    generateJwtToken(payload) {
        return this.jwtService.sign(payload);
    }
};
exports.AuthUserService = AuthUserService;
exports.AuthUserService = AuthUserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], AuthUserService);
//# sourceMappingURL=authUser.service.js.map