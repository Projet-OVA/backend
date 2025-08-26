import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { CorsConfig } from "./core/config/cors/cors.config";
import { SwaggerConfig } from "./core/config/swagger/swagger.config";
import { json, urlencoded } from "express";
import * as dotenv from "dotenv";
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuration pour les fichiers
  app.use(json({ limit: "10mb" }));
  app.use(urlencoded({ extended: true, limit: "10mb" }));

  // Utilisation de la configuration CORS depuis CorsConfig
  app.enableCors(CorsConfig.getConfig());

  // Configuration globale
  app.setGlobalPrefix("api");
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Configuration Swagger
  SwaggerConfig.setup(app);

  const port = process.env.PORT || 3000;
  await app.listen(port, "0.0.0.0");
  console.log(`Application is running on port ${port}`);
}

void bootstrap();
