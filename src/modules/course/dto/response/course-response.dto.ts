import { ApiProperty } from "@nestjs/swagger";
import { CourseCategory, MediaType, FileExtension } from "@prisma/client";

export class AttachmentResponseDto {
  @ApiProperty({ description: "ID unique de la pièce jointe" })
  id: string;

  @ApiProperty({ description: "Nom du fichier média" })
  name: string;

  @ApiProperty({ description: "URL sécurisée du fichier sur Cloudinary" })
  url: string;

  @ApiProperty({ description: "Extension du fichier", enum: FileExtension })
  extension: FileExtension;

  @ApiProperty({ description: "Type de média", enum: MediaType })
  mediaType: MediaType;

  @ApiProperty({ description: "Taille du fichier en bytes" })
  bytes: number;

  @ApiProperty({ description: "Dossier de stockage sur Cloudinary" })
  folder: string;

  @ApiProperty({ description: "Date de création" })
  createdAt: Date;
}

export class CourseResponseDto {
  @ApiProperty({ description: "ID unique du cours" })
  id: string;

  @ApiProperty({ description: "Nom du cours" })
  nom: string;

  @ApiProperty({ description: "Description détaillée du cours" })
  description: string;

  @ApiProperty({ description: "Catégorie du cours", enum: CourseCategory })
  category: CourseCategory;

  @ApiProperty({ description: "ID du créateur du cours" })
  creatorId: string;

  @ApiProperty({ description: "Informations du créateur" })
  creator: {
    id: string;
    nom: string;
    prenom: string;
    username: string;
    email: string;
    role: string;
  };

  @ApiProperty({
    description: "Liste des pièces jointes du cours",
    type: [AttachmentResponseDto],
  })
  attachments: AttachmentResponseDto[];

  @ApiProperty({ description: "Date de création du cours" })
  createdAt: Date;

  @ApiProperty({ description: "Date de dernière modification du cours" })
  updatedAt: Date;
}

export class CourseListResponseDto {
  @ApiProperty({ description: "Message de succès" })
  message: string;

  @ApiProperty({ description: "Données des cours", type: [CourseResponseDto] })
  data: CourseResponseDto[];

  @ApiProperty({ description: "Code de statut HTTP" })
  statusCode: number;
}

export class CourseDetailResponseDto {
  @ApiProperty({ description: "Message de succès" })
  message: string;

  @ApiProperty({ description: "Données du cours", type: CourseResponseDto })
  data: CourseResponseDto;

  @ApiProperty({ description: "Code de statut HTTP" })
  statusCode: number;
}

export class CourseCreateResponseDto {
  @ApiProperty({ description: "Message de succès" })
  message: string;

  @ApiProperty({
    description: "Données du cours créé",
    type: CourseResponseDto,
  })
  data: CourseResponseDto;

  @ApiProperty({ description: "Code de statut HTTP" })
  statusCode: number;
}

export class CourseUpdateResponseDto {
  @ApiProperty({ description: "Message de succès" })
  message: string;

  @ApiProperty({
    description: "Données du cours mis à jour",
    type: CourseResponseDto,
  })
  data: CourseResponseDto;

  @ApiProperty({ description: "Code de statut HTTP" })
  statusCode: number;
}

export class CourseDeleteResponseDto {
  @ApiProperty({ description: "Message de succès" })
  message: string;

  @ApiProperty({ description: "Code de statut HTTP" })
  statusCode: number;
}

export class AttachmentUploadResponseDto {
  @ApiProperty({ description: "Message de succès" })
  message: string;

  @ApiProperty({
    description: "Données de la pièce jointe uploadée",
    type: AttachmentResponseDto,
  })
  data: AttachmentResponseDto;

  @ApiProperty({ description: "Code de statut HTTP" })
  statusCode: number;
}
