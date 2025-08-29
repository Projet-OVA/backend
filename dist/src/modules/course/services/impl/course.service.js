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
exports.CourseService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../../core/prisma/prisma.service");
const cloudinary_service_1 = require("../../../../core/cloudinary/cloudinary.service");
const client_1 = require("@prisma/client");
let CourseService = class CourseService {
    prisma;
    cloudinaryService;
    constructor(prisma, cloudinaryService) {
        this.prisma = prisma;
        this.cloudinaryService = cloudinaryService;
    }
    async createCourse(createCourseDto, creatorId) {
        try {
            const user = await this.prisma.user.findUnique({
                where: { id: creatorId },
                select: { id: true, role: true },
            });
            if (!user) {
                throw new common_1.NotFoundException("Utilisateur non trouvé");
            }
            if (user.role !== "ADMIN") {
                throw new common_1.ForbiddenException("Seuls les administrateurs peuvent créer des cours");
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
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException ||
                error instanceof common_1.ForbiddenException) {
                throw error;
            }
            throw new common_1.BadRequestException(`Erreur lors de la création du cours: ${error.message}`);
        }
    }
    async findAllCourses() {
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
            const coursesResponse = courses.map((course) => this.mapToCourseResponse(course));
            return {
                message: "Cours récupérés avec succès",
                data: coursesResponse,
                statusCode: 200,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(`Erreur lors de la récupération des cours: ${error.message}`);
        }
    }
    async findCourseById(id) {
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
                throw new common_1.NotFoundException("Cours non trouvé");
            }
            const courseResponse = this.mapToCourseResponse(course);
            return {
                message: "Cours récupéré avec succès",
                data: courseResponse,
                statusCode: 200,
            };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.BadRequestException(`Erreur lors de la récupération du cours: ${error.message}`);
        }
    }
    async updateCourse(id, updateCourseDto, userId) {
        try {
            const canModify = await this.canUserModifyCourse(id, userId);
            if (!canModify) {
                throw new common_1.ForbiddenException("Vous n'avez pas les permissions pour modifier ce cours");
            }
            const existingCourse = await this.prisma.course.findUnique({
                where: { id },
            });
            if (!existingCourse) {
                throw new common_1.NotFoundException("Cours non trouvé");
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
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException ||
                error instanceof common_1.ForbiddenException) {
                throw error;
            }
            throw new common_1.BadRequestException(`Erreur lors de la mise à jour du cours: ${error.message}`);
        }
    }
    async deleteCourse(id, userId) {
        try {
            const canModify = await this.canUserModifyCourse(id, userId);
            if (!canModify) {
                throw new common_1.ForbiddenException("Vous n'avez pas les permissions pour supprimer ce cours");
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
                throw new common_1.NotFoundException("Cours non trouvé");
            }
            for (const courseAttachment of existingCourse.attachments) {
                try {
                    const resourceType = this.mapMediaTypeToResourceType(courseAttachment.attachment.mediaType);
                    await this.cloudinaryService.deleteFile(courseAttachment.attachment.url, resourceType);
                }
                catch (cloudinaryError) {
                    console.error(`Erreur lors de la suppression de la pièce jointe ${courseAttachment.attachment.id}:`, cloudinaryError);
                }
            }
            await this.prisma.course.delete({
                where: { id },
            });
            return {
                message: "Cours supprimé avec succès",
                statusCode: 200,
            };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException ||
                error instanceof common_1.ForbiddenException) {
                throw error;
            }
            throw new common_1.BadRequestException(`Erreur lors de la suppression du cours: ${error.message}`);
        }
    }
    async uploadAttachment(courseId, file, uploadDto, userId) {
        try {
            const canModify = await this.canUserModifyCourse(courseId, userId);
            if (!canModify) {
                throw new common_1.ForbiddenException("Vous n'avez pas les permissions pour modifier ce cours");
            }
            const course = await this.prisma.course.findUnique({
                where: { id: courseId },
            });
            if (!course) {
                throw new common_1.NotFoundException("Cours non trouvé");
            }
            const fileExtension = file.originalname.split(".").pop()?.toLowerCase();
            if (!fileExtension) {
                throw new common_1.BadRequestException("Extension de fichier non détectée");
            }
            const detectedMediaType = this.detectMediaTypeFromExtension(fileExtension);
            if (detectedMediaType !== uploadDto.mediaType) {
                throw new common_1.BadRequestException(`Le type de média spécifié (${uploadDto.mediaType}) ne correspond pas au format du fichier (${fileExtension}). Type attendu: ${detectedMediaType}`);
            }
            const allowedFormats = this.getAllowedFormatsForMediaType(uploadDto.mediaType);
            if (!allowedFormats.includes(fileExtension)) {
                throw new common_1.BadRequestException(`Format de fichier non autorisé. Formats acceptés: ${allowedFormats.join(", ")}`);
            }
            const folder = this.mapMediaTypeToFolder(uploadDto.mediaType);
            const subfolder = "courses";
            const cloudinaryResult = await this.cloudinaryService.uploadFile(file, folder, subfolder);
            const attachment = await this.prisma.attachment.create({
                data: {
                    name: uploadDto.name,
                    url: cloudinaryResult.secure_url,
                    extension: this.mapExtensionToEnum(file.originalname.split(".").pop() || ""),
                    mediaType: uploadDto.mediaType,
                },
            });
            await this.prisma.courseAttachment.create({
                data: {
                    courseId: courseId,
                    attachmentId: attachment.id,
                },
            });
            const attachmentResponse = {
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
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException ||
                error instanceof common_1.ForbiddenException) {
                throw error;
            }
            throw new common_1.BadRequestException(`Erreur lors de l'upload de la pièce jointe: ${error.message}`);
        }
    }
    async deleteAttachment(courseId, attachmentId, userId) {
        try {
            const canModify = await this.canUserModifyCourse(courseId, userId);
            if (!canModify) {
                throw new common_1.ForbiddenException("Vous n'avez pas les permissions pour modifier ce cours");
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
                throw new common_1.NotFoundException("Pièce jointe non trouvée pour ce cours");
            }
            const resourceType = this.mapMediaTypeToResourceType(courseAttachment.attachment.mediaType);
            await this.cloudinaryService.deleteFile(courseAttachment.attachment.url, resourceType);
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
            const courseResponse = this.mapToCourseResponse(updatedCourse);
            return {
                message: "Pièce jointe supprimée avec succès",
                data: courseResponse,
                statusCode: 200,
            };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException ||
                error instanceof common_1.ForbiddenException) {
                throw error;
            }
            throw new common_1.BadRequestException(`Erreur lors de la suppression de la pièce jointe: ${error.message}`);
        }
    }
    async canUserModifyCourse(courseId, userId) {
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
        }
        catch {
            return false;
        }
    }
    mapToCourseResponse(course) {
        return {
            id: course.id,
            nom: course.nom,
            description: course.description,
            category: course.category,
            creatorId: course.creatorId,
            creator: course.creator,
            attachments: course.attachments.map((courseAttachment) => ({
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
    mapMediaTypeToFolder(mediaType) {
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
    mapMediaTypeToResourceType(mediaType) {
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
    mapExtensionToEnum(extension) {
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
    getAllowedFormatsForMediaType(mediaType) {
        switch (mediaType) {
            case client_1.MediaType.IMAGE:
                return ["jpg", "jpeg", "png", "webp", "gif"];
            case client_1.MediaType.VIDEO:
                return ["mp4", "avi", "mov", "wmv", "flv"];
            case client_1.MediaType.AUDIO:
                return ["mp3", "wav", "ogg", "aac"];
            default:
                return ["jpg", "jpeg", "png"];
        }
    }
    detectMediaTypeFromExtension(extension) {
        const imageExtensions = ["jpg", "jpeg", "png", "webp", "gif"];
        const videoExtensions = ["mp4", "avi", "mov", "wmv", "flv"];
        const audioExtensions = ["mp3", "wav", "ogg", "aac"];
        if (imageExtensions.includes(extension)) {
            return client_1.MediaType.IMAGE;
        }
        else if (videoExtensions.includes(extension)) {
            return client_1.MediaType.VIDEO;
        }
        else if (audioExtensions.includes(extension)) {
            return client_1.MediaType.AUDIO;
        }
        else {
            throw new common_1.BadRequestException(`Extension de fichier non supportée: ${extension}`);
        }
    }
};
exports.CourseService = CourseService;
exports.CourseService = CourseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        cloudinary_service_1.CloudinaryService])
], CourseService);
//# sourceMappingURL=course.service.js.map