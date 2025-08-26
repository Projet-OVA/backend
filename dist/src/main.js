"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const cors_config_1 = require("./core/config/cors/cors.config");
const swagger_config_1 = require("./core/config/swagger/swagger.config");
const express_1 = require("express");
const dotenv = require("dotenv");
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
    const port = process.env.PORT || 5000;
    await app.listen(port, "0.0.0.0");
    console.log(`Application is running on port ${port}`);
}
void bootstrap();
//# sourceMappingURL=main.js.map