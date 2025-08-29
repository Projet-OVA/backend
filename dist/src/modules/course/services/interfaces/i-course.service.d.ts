import { CreateCourseDto, UpdateCourseDto, UploadAttachmentDto } from "../../dto/request";
import { CourseCreateResponseDto, CourseUpdateResponseDto, CourseDeleteResponseDto, CourseDetailResponseDto, CourseListResponseDto, AttachmentUploadResponseDto } from "../../dto/response";
export declare const ICourseService: unique symbol;
export interface ICourseService {
    createCourse(createCourseDto: CreateCourseDto, creatorId: string): Promise<CourseCreateResponseDto>;
    findAllCourses(): Promise<CourseListResponseDto>;
    findCourseById(id: string): Promise<CourseDetailResponseDto>;
    updateCourse(id: string, updateCourseDto: UpdateCourseDto, userId: string): Promise<CourseUpdateResponseDto>;
    deleteCourse(id: string, userId: string): Promise<CourseDeleteResponseDto>;
    uploadAttachment(courseId: string, file: Express.Multer.File, uploadDto: UploadAttachmentDto, userId: string): Promise<AttachmentUploadResponseDto>;
    deleteAttachment(courseId: string, attachmentId: string, userId: string): Promise<CourseUpdateResponseDto>;
    canUserModifyCourse(id: string, userId: string): Promise<boolean>;
}
