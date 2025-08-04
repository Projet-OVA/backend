import { CorsOptions } from "@nestjs/common/interfaces/external/cors-options.interface";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CorsConfig {
  public static getConfig(): CorsOptions {
    return {
      origin: [
        "http://localhost:3000",
        "https://localhost:3000",
        "https://impactsolution-passbi.onrender.com",
        "https://impactsolution-passbiv1.onrender.com", // Ajout de l'URL de déploiement
        "https://impactsolution-passbiv1.onrender.com/docs", // Ajout de l'URL de déploiement
        // Ajoutez ici tous les domaines de votre frontend
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
}
