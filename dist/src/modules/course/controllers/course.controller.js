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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../../core/guards/jwt-auth.guard");
const roles_guard_1 = require("../../../core/guards/roles.guard");
const roles_decorator_1 = require("../../../core/decorators/roles.decorator");
const client_1 = require("@prisma/client");
const course_service_1 = require("../services/impl/course.service");
const request_1 = require("../dto/request");
const response_1 = require("../dto/response");
let CourseController = class CourseController {
    courseService;
    constructor(courseService) {
        this.courseService = courseService;
    }
    async createCourse(createCourseDto, req) {
        return this.courseService.createCourse(createCourseDto, req.user.id);
    }
    async findAllCourses() {
        return this.courseService.findAllCourses();
    }
    async findCourseById(id) {
        return this.courseService.findCourseById(id);
    }
    async updateCourse(id, updateCourseDto, req) {
        return this.courseService.updateCourse(id, updateCourseDto, req.user.id);
    }
    async deleteCourse(id, req) {
        return this.courseService.deleteCourse(id, req.user.id);
    }
    async uploadAttachment(courseId, file, uploadDto, req) {
        return this.courseService.uploadAttachment(courseId, file, uploadDto, req.user.id);
    }
    async deleteAttachment(courseId, attachmentId, req) {
        return this.courseService.deleteAttachment(courseId, attachmentId, req.user.id);
    }
};
exports.CourseController = CourseController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(client_1.UserRole.ADMIN),
    (0, swagger_1.ApiOperation)({
        summary: "Créer un nouveau cours",
        description: "Permet aux administrateurs de créer un nouveau cours",
    }),
    (0, swagger_1.ApiBearerAuth)("access-token"),
    (0, swagger_1.ApiBody)({ type: request_1.CreateCourseDto }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: "Cours créé avec succès",
        type: response_1.CourseCreateResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: "Accès refusé - Rôle insuffisant",
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: "Données invalides",
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_1.CreateCourseDto, Object]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "createCourse", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: "Récupérer tous les cours",
        description: "Récupère la liste de tous les cours disponibles",
    }),
    (0, swagger_1.ApiBearerAuth)("access-token"),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: "Liste des cours récupérée avec succès",
        type: response_1.CourseListResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: "Erreur lors de la récupération",
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "findAllCourses", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, swagger_1.ApiOperation)({
        summary: "Récupérer un cours par ID",
        description: "Récupère les détails d'un cours spécifique",
    }),
    (0, swagger_1.ApiBearerAuth)("access-token"),
    (0, swagger_1.ApiParam)({
        name: "id",
        description: "ID unique du cours",
        example: "clx1234567890abcdef",
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: "Cours récupéré avec succès",
        type: response_1.CourseDetailResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: "Cours non trouvé",
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: "Erreur lors de la récupération",
    }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "findCourseById", null);
__decorate([
    (0, common_1.Put)(":id"),
    (0, roles_decorator_1.Roles)(client_1.UserRole.ADMIN),
    (0, swagger_1.ApiOperation)({
        summary: "Mettre à jour un cours",
        description: "Permet aux administrateurs de modifier un cours existant",
    }),
    (0, swagger_1.ApiBearerAuth)("access-token"),
    (0, swagger_1.ApiParam)({
        name: "id",
        description: "ID unique du cours à modifier",
        example: "clx1234567890abcdef",
    }),
    (0, swagger_1.ApiBody)({ type: request_1.UpdateCourseDto }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: "Cours mis à jour avec succès",
        type: response_1.CourseUpdateResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: "Cours non trouvé",
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: "Accès refusé - Rôle insuffisant",
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: "Données invalides",
    }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, request_1.UpdateCourseDto, Object]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "updateCourse", null);
__decorate([
    (0, common_1.Delete)(":id"),
    (0, roles_decorator_1.Roles)(client_1.UserRole.ADMIN),
    (0, swagger_1.ApiOperation)({
        summary: "Supprimer un cours",
        description: "Permet aux administrateurs de supprimer un cours et ses pièces jointes",
    }),
    (0, swagger_1.ApiBearerAuth)("access-token"),
    (0, swagger_1.ApiParam)({
        name: "id",
        description: "ID unique du cours à supprimer",
        example: "clx1234567890abcdef",
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: "Cours supprimé avec succès",
        type: response_1.CourseDeleteResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: "Cours non trouvé",
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: "Accès refusé - Rôle insuffisant",
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: "Erreur lors de la suppression",
    }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "deleteCourse", null);
__decorate([
    (0, common_1.Post)(":id/attachments"),
    (0, roles_decorator_1.Roles)(client_1.UserRole.ADMIN),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("file")),
    (0, swagger_1.ApiOperation)({
        summary: "Uploader une pièce jointe pour un cours",
        description: "Permet aux administrateurs d'ajouter des médias à un cours",
    }),
    (0, swagger_1.ApiBearerAuth)("access-token"),
    (0, swagger_1.ApiConsumes)("multipart/form-data"),
    (0, swagger_1.ApiParam)({
        name: "id",
        description: "ID unique du cours",
        example: "clx1234567890abcdef",
    }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: "object",
            properties: {
                file: {
                    type: "string",
                    format: "binary",
                    description: "Fichier média à uploader",
                },
                name: {
                    type: "string",
                    description: "Nom du fichier média",
                    example: "image_cours_1",
                },
                mediaType: {
                    type: "string",
                    enum: ["IMAGE", "VIDEO", "AUDIO"],
                    description: "Type de média",
                    example: "IMAGE",
                },
                description: {
                    type: "string",
                    description: "Description optionnelle du fichier",
                    example: "Image illustrant le concept principal du cours",
                },
            },
            required: ["file", "name", "mediaType"],
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: "Pièce jointe uploadée avec succès",
        type: response_1.AttachmentUploadResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: "Cours non trouvé",
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: "Accès refusé - Rôle insuffisant",
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: "Fichier invalide ou données manquantes",
    }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.UploadedFile)(new common_1.ParseFilePipe({
        validators: [
            new common_1.MaxFileSizeValidator({ maxSize: 10 * 1024 * 1024 }),
            new common_1.FileTypeValidator({
                fileType: /(jpg|jpeg|png|webp|mp4|mp3|pdf)$/,
            }),
        ],
    }))),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, request_1.UploadAttachmentDto, Object]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "uploadAttachment", null);
__decorate([
    (0, common_1.Delete)(":courseId/attachments/:attachmentId"),
    (0, roles_decorator_1.Roles)(client_1.UserRole.ADMIN),
    (0, swagger_1.ApiOperation)({
        summary: "Supprimer une pièce jointe d'un cours",
        description: "Permet aux administrateurs de supprimer un média d'un cours",
    }),
    (0, swagger_1.ApiBearerAuth)("access-token"),
    (0, swagger_1.ApiParam)({
        name: "courseId",
        description: "ID unique du cours",
        example: "clx1234567890abcdef",
    }),
    (0, swagger_1.ApiParam)({
        name: "attachmentId",
        description: "ID unique de la pièce jointe",
        example: "clx1234567890abcdef",
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: "Pièce jointe supprimée avec succès",
        type: response_1.CourseUpdateResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.NOT_FOUND,
        description: "Cours ou pièce jointe non trouvé",
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.FORBIDDEN,
        description: "Accès refusé - Rôle insuffisant",
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: "Erreur lors de la suppression",
    }),
    __param(0, (0, common_1.Param)("courseId")),
    __param(1, (0, common_1.Param)("attachmentId")),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "deleteAttachment", null);
exports.CourseController = CourseController = __decorate([
    (0, swagger_1.ApiTags)("Cours"),
    (0, common_1.Controller)("courses"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [course_service_1.CourseService])
], CourseController);
//# sourceMappingURL=course.controller.js.map