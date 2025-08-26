"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CorsConfig = void 0;
const common_1 = require("@nestjs/common");
let CorsConfig = class CorsConfig {
    static getConfig() {
        return {
            origin: [
                "http://localhost:5000",
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
//# sourceMappingURL=cors.config.js.map