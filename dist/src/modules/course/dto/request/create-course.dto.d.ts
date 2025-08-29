import { CourseCategory } from "@prisma/client";
export declare class CreateAttachmentDto {
    name: string;
    mediaType: "IMAGE" | "VIDEO" | "AUDIO";
    extension: string;
}
export declare class CreateCourseDto {
    nom: string;
    description: string;
    category: CourseCategory;
    attachments?: CreateAttachmentDto[];
}
