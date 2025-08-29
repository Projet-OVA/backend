import { CourseService } from "../services/impl/course.service";
import { CreateCourseDto, UpdateCourseDto, UploadAttachmentDto } from "../dto/request";
import { CourseListResponseDto, CourseDetailResponseDto, CourseCreateResponseDto, CourseUpdateResponseDto, CourseDeleteResponseDto, AttachmentUploadResponseDto } from "../dto/response";
export declare class CourseController {
    private readonly courseService;
    constructor(courseService: CourseService);
    createCourse(createCourseDto: CreateCourseDto, req: any): Promise<CourseCreateResponseDto>;
    findAllCourses(): Promise<CourseListResponseDto>;
    findCourseById(id: string): Promise<CourseDetailResponseDto>;
    updateCourse(id: string, updateCourseDto: UpdateCourseDto, req: any): Promise<CourseUpdateResponseDto>;
    deleteCourse(id: string, req: any): Promise<CourseDeleteResponseDto>;
    uploadAttachment(courseId: string, file: Express.Multer.File, uploadDto: UploadAttachmentDto, req: any): Promise<AttachmentUploadResponseDto>;
    deleteAttachment(courseId: string, attachmentId: string, req: any): Promise<CourseUpdateResponseDto>;
}
