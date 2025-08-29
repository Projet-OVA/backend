import { CourseCategory, MediaType, FileExtension } from "@prisma/client";
export declare class AttachmentResponseDto {
    id: string;
    name: string;
    url: string;
    extension: FileExtension;
    mediaType: MediaType;
    bytes: number;
    folder: string;
    createdAt: Date;
}
export declare class CourseResponseDto {
    id: string;
    nom: string;
    description: string;
    category: CourseCategory;
    creatorId: string;
    creator: {
        id: string;
        nom: string;
        prenom: string;
        username: string;
        email: string;
        role: string;
    };
    attachments: AttachmentResponseDto[];
    createdAt: Date;
    updatedAt: Date;
}
export declare class CourseListResponseDto {
    message: string;
    data: CourseResponseDto[];
    statusCode: number;
}
export declare class CourseDetailResponseDto {
    message: string;
    data: CourseResponseDto;
    statusCode: number;
}
export declare class CourseCreateResponseDto {
    message: string;
    data: CourseResponseDto;
    statusCode: number;
}
export declare class CourseUpdateResponseDto {
    message: string;
    data: CourseResponseDto;
    statusCode: number;
}
export declare class CourseDeleteResponseDto {
    message: string;
    statusCode: number;
}
export declare class AttachmentUploadResponseDto {
    message: string;
    data: AttachmentResponseDto;
    statusCode: number;
}
