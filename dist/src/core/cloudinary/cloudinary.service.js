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
exports.CloudinaryService = void 0;
const common_1 = require("@nestjs/common");
const cloudinary_1 = require("cloudinary");
const config_1 = require("@nestjs/config");
let CloudinaryService = class CloudinaryService {
    configService;
    constructor(configService) {
        this.configService = configService;
        cloudinary_1.v2.config({
            cloud_name: this.configService.get("CLOUDINARY_CLOUD_NAME"),
            api_key: this.configService.get("CLOUDINARY_API_KEY"),
            api_secret: this.configService.get("CLOUDINARY_API_SECRET"),
        });
    }
    async uploadFile(file, folder, subfolder) {
        try {
            const folderPath = subfolder ? `${folder}/${subfolder}` : folder;
            const resourceType = folder === "images" ? "image" : folder === "videos" ? "video" : "raw";
            const result = await new Promise((resolve, reject) => {
                const uploadStream = cloudinary_1.v2.uploader.upload_stream({
                    folder: folderPath,
                    resource_type: resourceType,
                    transformation: this.getTransformations(folder),
                }, (error, result) => {
                    if (error)
                        reject(new Error(error.message));
                    else if (result) {
                        resolve({
                            public_id: result.public_id,
                            secure_url: result.secure_url,
                            format: result.format,
                            resource_type: result.resource_type,
                            bytes: result.bytes,
                            folder: folderPath,
                        });
                    }
                    else {
                        reject(new Error("Aucun résultat de Cloudinary"));
                    }
                });
                uploadStream.end(file.buffer);
            });
            return result;
        }
        catch (error) {
            throw new Error(`Erreur upload Cloudinary: ${error.message}`);
        }
    }
    async deleteFile(publicId, resourceType = "image") {
        try {
            return await cloudinary_1.v2.uploader.destroy(publicId, {
                resource_type: resourceType,
            });
        }
        catch (error) {
            throw new Error(`Erreur suppression Cloudinary: ${error.message}`);
        }
    }
    getAllowedFormats(folder) {
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
    getTransformations(folder) {
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
};
exports.CloudinaryService = CloudinaryService;
exports.CloudinaryService = CloudinaryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], CloudinaryService);
//# sourceMappingURL=cloudinary.service.js.map