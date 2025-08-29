import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  Request,
  HttpStatus,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
  ApiConsumes,
  ApiParam,
} from "@nestjs/swagger";
import { JwtAuthGuard } from "../../../core/guards/jwt-auth.guard";
import { RolesGuard } from "../../../core/guards/roles.guard";
import { Roles } from "../../../core/decorators/roles.decorator";
import { UserRole } from "@prisma/client";
import { CourseService } from "../services/impl/course.service";
import {
  CreateCourseDto,
  UpdateCourseDto,
  UploadAttachmentDto,
} from "../dto/request";
import {
  CourseListResponseDto,
  CourseDetailResponseDto,
  CourseCreateResponseDto,
  CourseUpdateResponseDto,
  CourseDeleteResponseDto,
  AttachmentUploadResponseDto,
} from "../dto/response";

@ApiTags("Cours")
@Controller("courses")
@UseGuards(JwtAuthGuard, RolesGuard)
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  @Roles(UserRole.ADMIN)
  @ApiOperation({
    summary: "Créer un nouveau cours",
    description: "Permet aux administrateurs de créer un nouveau cours",
  })
  @ApiBearerAuth("access-token")
  @ApiBody({ type: CreateCourseDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Cours créé avec succès",
    type: CourseCreateResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: "Accès refusé - Rôle insuffisant",
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Données invalides",
  })
  async createCourse(
    @Body() createCourseDto: CreateCourseDto,
    @Request() req: any,
  ): Promise<CourseCreateResponseDto> {
    return this.courseService.createCourse(createCourseDto, req.user.id);
  }

  @Get()
  @ApiOperation({
    summary: "Récupérer tous les cours",
    description: "Récupère la liste de tous les cours disponibles",
  })
  @ApiBearerAuth("access-token")
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Liste des cours récupérée avec succès",
    type: CourseListResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Erreur lors de la récupération",
  })
  async findAllCourses(): Promise<CourseListResponseDto> {
    return this.courseService.findAllCourses();
  }

  @Get(":id")
  @ApiOperation({
    summary: "Récupérer un cours par ID",
    description: "Récupère les détails d'un cours spécifique",
  })
  @ApiBearerAuth("access-token")
  @ApiParam({
    name: "id",
    description: "ID unique du cours",
    example: "clx1234567890abcdef",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Cours récupéré avec succès",
    type: CourseDetailResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Cours non trouvé",
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Erreur lors de la récupération",
  })
  async findCourseById(
    @Param("id") id: string,
  ): Promise<CourseDetailResponseDto> {
    return this.courseService.findCourseById(id);
  }

  @Put(":id")
  @Roles(UserRole.ADMIN)
  @ApiOperation({
    summary: "Mettre à jour un cours",
    description: "Permet aux administrateurs de modifier un cours existant",
  })
  @ApiBearerAuth("access-token")
  @ApiParam({
    name: "id",
    description: "ID unique du cours à modifier",
    example: "clx1234567890abcdef",
  })
  @ApiBody({ type: UpdateCourseDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Cours mis à jour avec succès",
    type: CourseUpdateResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Cours non trouvé",
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: "Accès refusé - Rôle insuffisant",
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Données invalides",
  })
  async updateCourse(
    @Param("id") id: string,
    @Body() updateCourseDto: UpdateCourseDto,
    @Request() req: any,
  ): Promise<CourseUpdateResponseDto> {
    return this.courseService.updateCourse(id, updateCourseDto, req.user.id);
  }

  @Delete(":id")
  @Roles(UserRole.ADMIN)
  @ApiOperation({
    summary: "Supprimer un cours",
    description:
      "Permet aux administrateurs de supprimer un cours et ses pièces jointes",
  })
  @ApiBearerAuth("access-token")
  @ApiParam({
    name: "id",
    description: "ID unique du cours à supprimer",
    example: "clx1234567890abcdef",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Cours supprimé avec succès",
    type: CourseDeleteResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Cours non trouvé",
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: "Accès refusé - Rôle insuffisant",
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Erreur lors de la suppression",
  })
  async deleteCourse(
    @Param("id") id: string,
    @Request() req: any,
  ): Promise<CourseDeleteResponseDto> {
    return this.courseService.deleteCourse(id, req.user.id);
  }

  @Post(":id/attachments")
  @Roles(UserRole.ADMIN)
  @UseInterceptors(FileInterceptor("file"))
  @ApiOperation({
    summary: "Uploader une pièce jointe pour un cours",
    description: "Permet aux administrateurs d'ajouter des médias à un cours",
  })
  @ApiBearerAuth("access-token")
  @ApiConsumes("multipart/form-data")
  @ApiParam({
    name: "id",
    description: "ID unique du cours",
    example: "clx1234567890abcdef",
  })
  @ApiBody({
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
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Pièce jointe uploadée avec succès",
    type: AttachmentUploadResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Cours non trouvé",
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: "Accès refusé - Rôle insuffisant",
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Fichier invalide ou données manquantes",
  })
  async uploadAttachment(
    @Param("id") courseId: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 10 * 1024 * 1024 }), // 10MB max
          new FileTypeValidator({
            fileType: /(jpg|jpeg|png|webp|mp4|mp3|pdf)$/,
          }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Body() uploadDto: UploadAttachmentDto,
    @Request() req: any,
  ): Promise<AttachmentUploadResponseDto> {
    return this.courseService.uploadAttachment(
      courseId,
      file,
      uploadDto,
      req.user.id,
    );
  }

  @Delete(":courseId/attachments/:attachmentId")
  @Roles(UserRole.ADMIN)
  @ApiOperation({
    summary: "Supprimer une pièce jointe d'un cours",
    description: "Permet aux administrateurs de supprimer un média d'un cours",
  })
  @ApiBearerAuth("access-token")
  @ApiParam({
    name: "courseId",
    description: "ID unique du cours",
    example: "clx1234567890abcdef",
  })
  @ApiParam({
    name: "attachmentId",
    description: "ID unique de la pièce jointe",
    example: "clx1234567890abcdef",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Pièce jointe supprimée avec succès",
    type: CourseUpdateResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Cours ou pièce jointe non trouvé",
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: "Accès refusé - Rôle insuffisant",
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Erreur lors de la suppression",
  })
  async deleteAttachment(
    @Param("courseId") courseId: string,
    @Param("attachmentId") attachmentId: string,
    @Request() req: any,
  ): Promise<CourseUpdateResponseDto> {
    return this.courseService.deleteAttachment(
      courseId,
      attachmentId,
      req.user.id,
    );
  }
}
