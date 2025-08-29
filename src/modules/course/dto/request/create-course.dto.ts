import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsOptional,
  IsArray,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";
import { CourseCategory } from "@prisma/client";

export class CreateAttachmentDto {
  @ApiProperty({
    description: "Nom du fichier média",
    example: "image_cours_1",
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: "Type de média (IMAGE, VIDEO, AUDIO)",
    enum: ["IMAGE", "VIDEO", "AUDIO"],
    example: "IMAGE",
    required: true,
  })
  @IsEnum(["IMAGE", "VIDEO", "AUDIO"])
  mediaType: "IMAGE" | "VIDEO" | "AUDIO";

  @ApiProperty({
    description: "Extension du fichier",
    example: "jpg",
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  extension: string;
}

export class CreateCourseDto {
  @ApiProperty({
    description: "Nom du cours",
    example: "Introduction à la citoyenneté",
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  nom: string;

  @ApiProperty({
    description: "Description détaillée du cours",
    example:
      "Ce cours vous initie aux fondamentaux de la citoyenneté et de vos droits et devoirs.",
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: "Catégorie du cours",
    enum: CourseCategory,
    example: "DROIT_DU_CITOYEN",
    required: true,
  })
  @IsEnum(CourseCategory)
  category: CourseCategory;

  @ApiProperty({
    description: "Liste des pièces jointes (optionnel)",
    type: [CreateAttachmentDto],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateAttachmentDto)
  attachments?: CreateAttachmentDto[];
}
