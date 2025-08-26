"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUserModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const authUser_controller_1 = require("./controllers/authUser.controller");
const authUser_service_1 = require("./services/impl/authUser.service");
const i_authUser_service_1 = require("./services/interfaces/i-authUser.service");
const prisma_module_1 = require("../../core/prisma/prisma.module");
const jwt_strategy_1 = require("../../core/guards/jwt.strategy");
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
//# sourceMappingURL=authUser.module.js.map