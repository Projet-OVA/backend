import { ConfigService } from "@nestjs/config";
interface CloudinaryUploadResult {
    public_id: string;
    secure_url: string;
    format: string;
    resource_type: string;
    bytes: number;
    folder: string;
}
export declare class CloudinaryService {
    private configService;
    constructor(configService: ConfigService);
    uploadFile(file: Express.Multer.File, folder: "images" | "videos" | "audio", subfolder?: string): Promise<CloudinaryUploadResult>;
    deleteFile(publicId: string, resourceType?: "image" | "video" | "raw"): Promise<any>;
    private getAllowedFormats;
    private getTransformations;
}
export {};
