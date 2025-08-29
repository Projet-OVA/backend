import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from "@nestjs/common";
import { PrismaService } from "../../../../core/prisma/prisma.service";
import { CloudinaryService } from "../../../../core/cloudinary/cloudinary.service";
import {
  CreateCourseDto,
  UpdateCourseDto,
  UploadAttachmentDto,
} from "../../dto/request";
import {
  CourseResponseDto,
  CourseListResponseDto,
  CourseDetailResponseDto,
  CourseCreateResponseDto,
  CourseUpdateResponseDto,
  CourseDeleteResponseDto,
  AttachmentUploadResponseDto,
  AttachmentResponseDto,
} from "../../dto/response";
import { MediaType, FileExtension } from "@prisma/client";

@Injectable()
export class CourseService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async createCourse(
    createCourseDto: CreateCourseDto,
    creatorId: string,
  ): Promise<CourseCreateResponseDto> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: creatorId },
        select: { id: true, role: true },
      });

      if (!user) {
        throw new NotFoundException("Utilisateur non trouvé");
      }

      if (user.role !== "ADMIN") {
        throw new ForbiddenException(
          "Seuls les administrateurs peuvent créer des cours",
        );
      }

      const course = await this.prisma.course.create({
        data: {
          nom: createCourseDto.nom,
          description: createCourseDto.description,
          category: createCourseDto.category,
          creatorId: creatorId,
        },
        include: {
          creator: {
            select: {
              id: true,
              nom: true,
              prenom: true,
              username: true,
              email: true,
              role: true,
            },
          },
          attachments: {
            include: {
              attachment: true,
            },
          },
        },
      });

      const courseResponse = this.mapToCourseResponse(course);

      return {
        message: "Cours créé avec succès",
        data: courseResponse,
        statusCode: 201,
      };
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof ForbiddenException
      ) {
        throw error;
      }
      throw new BadRequestException(
        `Erreur lors de la création du cours: ${error.message}`,
      );
    }
  }

  async findAllCourses(): Promise<CourseListResponseDto> {
    try {
      const courses = await this.prisma.course.findMany({
        include: {
          creator: {
            select: {
              id: true,
              nom: true,
              prenom: true,
              username: true,
              email: true,
              role: true,
            },
          },
          attachments: {
            include: {
              attachment: true,
            },
          },
        },
        orderBy: { id: "desc" },
      });

      const coursesResponse = courses.map((course) =>
        this.mapToCourseResponse(course),
      );

      return {
        message: "Cours récupérés avec succès",
        data: coursesResponse,
        statusCode: 200,
      };
    } catch (error) {
      throw new BadRequestException(
        `Erreur lors de la récupération des cours: ${error.message}`,
      );
    }
  }

  async findCourseById(id: string): Promise<CourseDetailResponseDto> {
    try {
      const course = await this.prisma.course.findUnique({
        where: { id },
        include: {
          creator: {
            select: {
              id: true,
              nom: true,
              prenom: true,
              username: true,
              email: true,
              role: true,
            },
          },
          attachments: {
            include: {
              attachment: true,
            },
          },
        },
      });

      if (!course) {
        throw new NotFoundException("Cours non trouvé");
      }

      const courseResponse = this.mapToCourseResponse(course);

      return {
        message: "Cours récupéré avec succès",
        data: courseResponse,
        statusCode: 200,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(
        `Erreur lors de la récupération du cours: ${error.message}`,
      );
    }
  }

  async updateCourse(
    id: string,
    updateCourseDto: UpdateCourseDto,
    userId: string,
  ): Promise<CourseUpdateResponseDto> {
    try {
      const canModify = await this.canUserModifyCourse(id, userId);
      if (!canModify) {
        throw new ForbiddenException(
          "Vous n'avez pas les permissions pour modifier ce cours",
        );
      }

      const existingCourse = await this.prisma.course.findUnique({
        where: { id },
      });

      if (!existingCourse) {
        throw new NotFoundException("Cours non trouvé");
      }

      const updatedCourse = await this.prisma.course.update({
        where: { id },
        data: {
          ...(updateCourseDto.nom && { nom: updateCourseDto.nom }),
          ...(updateCourseDto.description && {
            description: updateCourseDto.description,
          }),
          ...(updateCourseDto.category && {
            category: updateCourseDto.category,
          }),
        },
        include: {
          creator: {
            select: {
              id: true,
              nom: true,
              prenom: true,
              username: true,
              email: true,
              role: true,
            },
          },
          attachments: {
            include: {
              attachment: true,
            },
          },
        },
      });

      const courseResponse = this.mapToCourseResponse(updatedCourse);

      return {
        message: "Cours mis à jour avec succès",
        data: courseResponse,
        statusCode: 200,
      };
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof ForbiddenException
      ) {
        throw error;
      }
      throw new BadRequestException(
        `Erreur lors de la mise à jour du cours: ${error.message}`,
      );
    }
  }

  async deleteCourse(
    id: string,
    userId: string,
  ): Promise<CourseDeleteResponseDto> {
    try {
      const canModify = await this.canUserModifyCourse(id, userId);
      if (!canModify) {
        throw new ForbiddenException(
          "Vous n'avez pas les permissions pour supprimer ce cours",
        );
      }

      const existingCourse = await this.prisma.course.findUnique({
        where: { id },
        include: {
          attachments: {
            include: {
              attachment: true,
            },
          },
        },
      });

      if (!existingCourse) {
        throw new NotFoundException("Cours non trouvé");
      }

      for (const courseAttachment of existingCourse.attachments) {
        try {
          const resourceType = this.mapMediaTypeToResourceType(
            courseAttachment.attachment.mediaType,
          );
          await this.cloudinaryService.deleteFile(
            courseAttachment.attachment.url,
            resourceType,
          );
        } catch (cloudinaryError) {
          console.error(
            `Erreur lors de la suppression de la pièce jointe ${courseAttachment.attachment.id}:`,
            cloudinaryError,
          );
        }
      }

      await this.prisma.course.delete({
        where: { id },
      });

      return {
        message: "Cours supprimé avec succès",
        statusCode: 200,
      };
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof ForbiddenException
      ) {
        throw error;
      }
      throw new BadRequestException(
        `Erreur lors de la suppression du cours: ${error.message}`,
      );
    }
  }

  async uploadAttachment(
    courseId: string,
    file: Express.Multer.File,
    uploadDto: UploadAttachmentDto,
    userId: string,
  ): Promise<AttachmentUploadResponseDto> {
    try {
      const canModify = await this.canUserModifyCourse(courseId, userId);
      if (!canModify) {
        throw new ForbiddenException(
          "Vous n'avez pas les permissions pour modifier ce cours",
        );
      }

      const course = await this.prisma.course.findUnique({
        where: { id: courseId },
      });

      if (!course) {
        throw new NotFoundException("Cours non trouvé");
      }

      // Validation du format de fichier et détection automatique du type de média
      const fileExtension = file.originalname.split(".").pop()?.toLowerCase();

      if (!fileExtension) {
        throw new BadRequestException("Extension de fichier non détectée");
      }

      // Détection automatique du type de média basé sur l'extension
      const detectedMediaType =
        this.detectMediaTypeFromExtension(fileExtension);

      // Vérification que le type détecté correspond au type demandé
      if (detectedMediaType !== uploadDto.mediaType) {
        throw new BadRequestException(
          `Le type de média spécifié (${uploadDto.mediaType}) ne correspond pas au format du fichier (${fileExtension}). Type attendu: ${detectedMediaType}`,
        );
      }

      const allowedFormats = this.getAllowedFormatsForMediaType(
        uploadDto.mediaType,
      );

      if (!allowedFormats.includes(fileExtension)) {
        throw new BadRequestException(
          `Format de fichier non autorisé. Formats acceptés: ${allowedFormats.join(", ")}`,
        );
      }

      const folder = this.mapMediaTypeToFolder(uploadDto.mediaType);
      const subfolder = "courses";

      const cloudinaryResult = await this.cloudinaryService.uploadFile(
        file,
        folder,
        subfolder,
      );

      const attachment = await this.prisma.attachment.create({
        data: {
          name: uploadDto.name,
          url: cloudinaryResult.secure_url,
          extension: this.mapExtensionToEnum(
            file.originalname.split(".").pop() || "",
          ),
          mediaType: uploadDto.mediaType,
        },
      });

      await this.prisma.courseAttachment.create({
        data: {
          courseId: courseId,
          attachmentId: attachment.id,
        },
      });

      const attachmentResponse: AttachmentResponseDto = {
        id: attachment.id,
        name: attachment.name,
        url: attachment.url,
        extension: attachment.extension,
        mediaType: attachment.mediaType,
        bytes: cloudinaryResult.bytes,
        folder: cloudinaryResult.folder,
        createdAt: new Date(),
      };

      return {
        message: "Pièce jointe uploadée avec succès",
        data: attachmentResponse,
        statusCode: 201,
      };
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof ForbiddenException
      ) {
        throw error;
      }
      throw new BadRequestException(
        `Erreur lors de l'upload de la pièce jointe: ${error.message}`,
      );
    }
  }

  async deleteAttachment(
    courseId: string,
    attachmentId: string,
    userId: string,
  ): Promise<CourseUpdateResponseDto> {
    try {
      const canModify = await this.canUserModifyCourse(courseId, userId);
      if (!canModify) {
        throw new ForbiddenException(
          "Vous n'avez pas les permissions pour modifier ce cours",
        );
      }

      const courseAttachment = await this.prisma.courseAttachment.findFirst({
        where: {
          courseId: courseId,
          attachmentId: attachmentId,
        },
        include: {
          attachment: true,
        },
      });

      if (!courseAttachment) {
        throw new NotFoundException("Pièce jointe non trouvée pour ce cours");
      }

      const resourceType = this.mapMediaTypeToResourceType(
        courseAttachment.attachment.mediaType,
      );
      await this.cloudinaryService.deleteFile(
        courseAttachment.attachment.url,
        resourceType,
      );

      await this.prisma.courseAttachment.delete({
        where: {
          id: courseAttachment.id,
        },
      });

      await this.prisma.attachment.delete({
        where: { id: attachmentId },
      });

      const updatedCourse = await this.prisma.course.findUnique({
        where: { id: courseId },
        include: {
          creator: {
            select: {
              id: true,
              nom: true,
              prenom: true,
              username: true,
              email: true,
              role: true,
            },
          },
          attachments: {
            include: {
              attachment: true,
            },
          },
        },
      });

      const courseResponse = this.mapToCourseResponse(updatedCourse!);

      return {
        message: "Pièce jointe supprimée avec succès",
        data: courseResponse,
        statusCode: 200,
      };
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof ForbiddenException
      ) {
        throw error;
      }
      throw new BadRequestException(
        `Erreur lors de la suppression de la pièce jointe: ${error.message}`,
      );
    }
  }

  async canUserModifyCourse(
    courseId: string,
    userId: string,
  ): Promise<boolean> {
    try {
      const [user, course] = await Promise.all([
        this.prisma.user.findUnique({
          where: { id: userId },
          select: { id: true, role: true },
        }),
        this.prisma.course.findUnique({
          where: { id: courseId },
          select: { id: true, creatorId: true },
        }),
      ]);

      if (!user || !course) {
        return false;
      }

      if (user.role === "ADMIN") {
        return true;
      }

      return false;
    } catch {
      return false;
    }
  }

  private mapToCourseResponse(course: any): CourseResponseDto {
    return {
      id: course.id,
      nom: course.nom,
      description: course.description,
      category: course.category,
      creatorId: course.creatorId,
      creator: course.creator,
      attachments: course.attachments.map((courseAttachment: any) => ({
        id: courseAttachment.attachment.id,
        name: courseAttachment.attachment.name,
        url: courseAttachment.attachment.url,
        extension: courseAttachment.attachment.extension,
        mediaType: courseAttachment.attachment.mediaType,
        bytes: 0,
        folder: "",
        createdAt: courseAttachment.attachment.createdAt || new Date(),
      })),
      createdAt: course.createdAt,
      updatedAt: course.updatedAt,
    };
  }

  private mapMediaTypeToFolder(
    mediaType: string,
  ): "images" | "videos" | "audio" {
    switch (mediaType) {
      case "IMAGE":
        return "images";
      case "VIDEO":
        return "videos";
      case "AUDIO":
        return "audio";
      default:
        return "images";
    }
  }

  private mapMediaTypeToResourceType(
    mediaType: MediaType,
  ): "image" | "video" | "raw" {
    switch (mediaType) {
      case "IMAGE":
        return "image";
      case "VIDEO":
        return "video";
      case "AUDIO":
        return "raw";
      default:
        return "image";
    }
  }

  private mapExtensionToEnum(extension: string): FileExtension {
    const ext = extension.toLowerCase();
    switch (ext) {
      case "pdf":
        return "pdf";
      case "pptx":
        return "pptx";
      case "mp4":
        return "mp4";
      case "mp3":
        return "mp3";
      case "webp":
        return "webp";
      case "png":
        return "png";
      case "jpg":
      case "jpeg":
        return "png";
      default:
        return "png";
    }
  }

  private getAllowedFormatsForMediaType(mediaType: MediaType): string[] {
    switch (mediaType) {
      case MediaType.IMAGE:
        return ["jpg", "jpeg", "png", "webp", "gif"];
      case MediaType.VIDEO:
        return ["mp4", "avi", "mov", "wmv", "flv"];
      case MediaType.AUDIO:
        return ["mp3", "wav", "ogg", "aac"];
      default:
        return ["jpg", "jpeg", "png"];
    }
  }

  private detectMediaTypeFromExtension(extension: string): MediaType {
    const imageExtensions = ["jpg", "jpeg", "png", "webp", "gif"];
    const videoExtensions = ["mp4", "avi", "mov", "wmv", "flv"];
    const audioExtensions = ["mp3", "wav", "ogg", "aac"];

    if (imageExtensions.includes(extension)) {
      return MediaType.IMAGE;
    } else if (videoExtensions.includes(extension)) {
      return MediaType.VIDEO;
    } else if (audioExtensions.includes(extension)) {
      return MediaType.AUDIO;
    } else {
      throw new BadRequestException(
        `Extension de fichier non supportée: ${extension}`,
      );
    }
  }
}
