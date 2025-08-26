"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwaggerConfig = void 0;
const swagger_1 = require("@nestjs/swagger");
class SwaggerConfig {
    static setup(app) {
        const config = new swagger_1.DocumentBuilder()
            .setTitle("Documentation API SIRA")
            .setDescription(`
        🚀 Documentation API complète de SIRA
        
        ## Fonctionnalités principales
        - Authentification
        - Gestion des utilisateurs
        - Upload de photos
        
        ## Sécurité
        L'API utilise l'authentification JWT Bearer pour sécuriser les endpoints
      `)
            .setVersion("1.0")
            .setContact("Équipe PassBi", "http://localhost:5000", "support@passbi.com")
            .setLicense("Propriétaire", "http://localhost:5000")
            .addServer("http://localhost:5000", "Environnement Local")
            .addServer("http://localhost:5000", "Production")
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
//# sourceMappingURL=swagger.config.js.map