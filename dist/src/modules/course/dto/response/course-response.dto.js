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
exports.AttachmentUploadResponseDto = exports.CourseDeleteResponseDto = exports.CourseUpdateResponseDto = exports.CourseCreateResponseDto = exports.CourseDetailResponseDto = exports.CourseListResponseDto = exports.CourseResponseDto = exports.AttachmentResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
class AttachmentResponseDto {
    id;
    name;
    url;
    extension;
    mediaType;
    bytes;
    folder;
    createdAt;
}
exports.AttachmentResponseDto = AttachmentResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "ID unique de la pièce jointe" }),
    __metadata("design:type", String)
], AttachmentResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Nom du fichier média" }),
    __metadata("design:type", String)
], AttachmentResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "URL sécurisée du fichier sur Cloudinary" }),
    __metadata("design:type", String)
], AttachmentResponseDto.prototype, "url", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Extension du fichier", enum: client_1.FileExtension }),
    __metadata("design:type", String)
], AttachmentResponseDto.prototype, "extension", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Type de média", enum: client_1.MediaType }),
    __metadata("design:type", String)
], AttachmentResponseDto.prototype, "mediaType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Taille du fichier en bytes" }),
    __metadata("design:type", Number)
], AttachmentResponseDto.prototype, "bytes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Dossier de stockage sur Cloudinary" }),
    __metadata("design:type", String)
], AttachmentResponseDto.prototype, "folder", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Date de création" }),
    __metadata("design:type", Date)
], AttachmentResponseDto.prototype, "createdAt", void 0);
class CourseResponseDto {
    id;
    nom;
    description;
    category;
    creatorId;
    creator;
    attachments;
    createdAt;
    updatedAt;
}
exports.CourseResponseDto = CourseResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "ID unique du cours" }),
    __metadata("design:type", String)
], CourseResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Nom du cours" }),
    __metadata("design:type", String)
], CourseResponseDto.prototype, "nom", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Description détaillée du cours" }),
    __metadata("design:type", String)
], CourseResponseDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Catégorie du cours", enum: client_1.CourseCategory }),
    __metadata("design:type", String)
], CourseResponseDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "ID du créateur du cours" }),
    __metadata("design:type", String)
], CourseResponseDto.prototype, "creatorId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Informations du créateur" }),
    __metadata("design:type", Object)
], CourseResponseDto.prototype, "creator", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Liste des pièces jointes du cours",
        type: [AttachmentResponseDto],
    }),
    __metadata("design:type", Array)
], CourseResponseDto.prototype, "attachments", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Date de création du cours" }),
    __metadata("design:type", Date)
], CourseResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Date de dernière modification du cours" }),
    __metadata("design:type", Date)
], CourseResponseDto.prototype, "updatedAt", void 0);
class CourseListResponseDto {
    message;
    data;
    statusCode;
}
exports.CourseListResponseDto = CourseListResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Message de succès" }),
    __metadata("design:type", String)
], CourseListResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Données des cours", type: [CourseResponseDto] }),
    __metadata("design:type", Array)
], CourseListResponseDto.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Code de statut HTTP" }),
    __metadata("design:type", Number)
], CourseListResponseDto.prototype, "statusCode", void 0);
class CourseDetailResponseDto {
    message;
    data;
    statusCode;
}
exports.CourseDetailResponseDto = CourseDetailResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Message de succès" }),
    __metadata("design:type", String)
], CourseDetailResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Données du cours", type: CourseResponseDto }),
    __metadata("design:type", CourseResponseDto)
], CourseDetailResponseDto.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Code de statut HTTP" }),
    __metadata("design:type", Number)
], CourseDetailResponseDto.prototype, "statusCode", void 0);
class CourseCreateResponseDto {
    message;
    data;
    statusCode;
}
exports.CourseCreateResponseDto = CourseCreateResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Message de succès" }),
    __metadata("design:type", String)
], CourseCreateResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Données du cours créé",
        type: CourseResponseDto,
    }),
    __metadata("design:type", CourseResponseDto)
], CourseCreateResponseDto.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Code de statut HTTP" }),
    __metadata("design:type", Number)
], CourseCreateResponseDto.prototype, "statusCode", void 0);
class CourseUpdateResponseDto {
    message;
    data;
    statusCode;
}
exports.CourseUpdateResponseDto = CourseUpdateResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Message de succès" }),
    __metadata("design:type", String)
], CourseUpdateResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Données du cours mis à jour",
        type: CourseResponseDto,
    }),
    __metadata("design:type", CourseResponseDto)
], CourseUpdateResponseDto.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Code de statut HTTP" }),
    __metadata("design:type", Number)
], CourseUpdateResponseDto.prototype, "statusCode", void 0);
class CourseDeleteResponseDto {
    message;
    statusCode;
}
exports.CourseDeleteResponseDto = CourseDeleteResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Message de succès" }),
    __metadata("design:type", String)
], CourseDeleteResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Code de statut HTTP" }),
    __metadata("design:type", Number)
], CourseDeleteResponseDto.prototype, "statusCode", void 0);
class AttachmentUploadResponseDto {
    message;
    data;
    statusCode;
}
exports.AttachmentUploadResponseDto = AttachmentUploadResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Message de succès" }),
    __metadata("design:type", String)
], AttachmentUploadResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Données de la pièce jointe uploadée",
        type: AttachmentResponseDto,
    }),
    __metadata("design:type", AttachmentResponseDto)
], AttachmentUploadResponseDto.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Code de statut HTTP" }),
    __metadata("design:type", Number)
], AttachmentUploadResponseDto.prototype, "statusCode", void 0);
//# sourceMappingURL=course-response.dto.js.map