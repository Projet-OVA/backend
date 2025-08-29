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
exports.UploadAttachmentDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class UploadAttachmentDto {
    name;
    mediaType;
    description;
}
exports.UploadAttachmentDto = UploadAttachmentDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Nom du fichier média",
        example: "image_cours_1",
        required: true,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UploadAttachmentDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Type de média (IMAGE, VIDEO, AUDIO)",
        enum: ["IMAGE", "VIDEO", "AUDIO"],
        example: "IMAGE",
        required: true,
    }),
    (0, class_validator_1.IsEnum)(["IMAGE", "VIDEO", "AUDIO"]),
    __metadata("design:type", String)
], UploadAttachmentDto.prototype, "mediaType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Description optionnelle du fichier",
        example: "Image illustrant le concept principal du cours",
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UploadAttachmentDto.prototype, "description", void 0);
//# sourceMappingURL=upload-attachment.dto.js.map