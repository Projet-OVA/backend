import { Injectable } from "@nestjs/common";
import { v2 as cloudinary } from "cloudinary";
import { ConfigService } from "@nestjs/config";

interface CloudinaryUploadResult {
  public_id: string;
  secure_url: string;
  format: string;
  resource_type: string;
  bytes: number;
  folder: string;
}

@Injectable()
export class CloudinaryService {
  constructor(private configService: ConfigService) {
    cloudinary.config({
      cloud_name: this.configService.get<string>("CLOUDINARY_CLOUD_NAME"),
      api_key: this.configService.get<string>("CLOUDINARY_API_KEY"),
      api_secret: this.configService.get<string>("CLOUDINARY_API_SECRET"),
    });
  }

  async uploadFile(
    file: Express.Multer.File,
    folder: "images" | "videos" | "audio",
    subfolder?: string,
  ): Promise<CloudinaryUploadResult> {
    try {
      const folderPath = subfolder ? `${folder}/${subfolder}` : folder;
      const resourceType =
        folder === "images" ? "image" : folder === "videos" ? "video" : "raw";

      const result = await new Promise<CloudinaryUploadResult>(
        (resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            {
              folder: folderPath,
              resource_type: resourceType,
              transformation: this.getTransformations(folder),
            },
            (error, result) => {
              if (error) reject(new Error(error.message));
              else if (result) {
                resolve({
                  public_id: result.public_id,
                  secure_url: result.secure_url,
                  format: result.format,
                  resource_type: result.resource_type,
                  bytes: result.bytes,
                  folder: folderPath,
                });
              } else {
                reject(new Error("Aucun résultat de Cloudinary"));
              }
            },
          );
          uploadStream.end(file.buffer);
        },
      );

      return result;
    } catch (error) {
      throw new Error(`Erreur upload Cloudinary: ${(error as Error).message}`);
    }
  }

  async deleteFile(
    publicId: string,
    resourceType: "image" | "video" | "raw" = "image",
  ): Promise<any> {
    try {
      return await cloudinary.uploader.destroy(publicId, {
        resource_type: resourceType,
      });
    } catch (error) {
      throw new Error(
        `Erreur suppression Cloudinary: ${(error as Error).message}`,
      );
    }
  }

  private getAllowedFormats(folder: string): string[] {
    switch (folder) {
      case "images":
        return ["jpg", "jpeg", "png", "webp", "gif"];
      case "videos":
        return ["mp4", "avi", "mov", "wmv", "flv"];
      case "audio":
        return ["mp3", "wav", "ogg", "aac"];
      default:
        return ["jpg", "jpeg", "png"];
    }
  }

  private getTransformations(folder: string) {
    switch (folder) {
      case "images":
        return [
          { width: 800, height: 600, crop: "limit" },
          { quality: "auto:good" },
        ];
      case "videos":
        return [
          { width: 1280, height: 720, crop: "limit" },
          { quality: "auto:good" },
        ];
      case "audio":
        return [{ quality: "auto:good" }];
      default:
        return [];
    }
  }
}
