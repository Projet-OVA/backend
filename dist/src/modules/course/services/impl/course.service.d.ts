import { PrismaService } from "../../../../core/prisma/prisma.service";
import { CloudinaryService } from "../../../../core/cloudinary/cloudinary.service";
import { CreateCourseDto, UpdateCourseDto, UploadAttachmentDto } from "../../dto/request";
import { CourseListResponseDto, CourseDetailResponseDto, CourseCreateResponseDto, CourseUpdateResponseDto, CourseDeleteResponseDto, AttachmentUploadResponseDto } from "../../dto/response";
export declare class CourseService {
    private readonly prisma;
    private readonly cloudinaryService;
    constructor(prisma: PrismaService, cloudinaryService: CloudinaryService);
    createCourse(createCourseDto: CreateCourseDto, creatorId: string): Promise<CourseCreateResponseDto>;
    findAllCourses(): Promise<CourseListResponseDto>;
    findCourseById(id: string): Promise<CourseDetailResponseDto>;
    updateCourse(id: string, updateCourseDto: UpdateCourseDto, userId: string): Promise<CourseUpdateResponseDto>;
    deleteCourse(id: string, userId: string): Promise<CourseDeleteResponseDto>;
    uploadAttachment(courseId: string, file: Express.Multer.File, uploadDto: UploadAttachmentDto, userId: string): Promise<AttachmentUploadResponseDto>;
    deleteAttachment(courseId: string, attachmentId: string, userId: string): Promise<CourseUpdateResponseDto>;
    canUserModifyCourse(courseId: string, userId: string): Promise<boolean>;
    private mapToCourseResponse;
    private mapMediaTypeToFolder;
    private mapMediaTypeToResourceType;
    private mapExtensionToEnum;
    private getAllowedFormatsForMediaType;
    private detectMediaTypeFromExtension;
}
