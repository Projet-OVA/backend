import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsEnum, IsOptional } from "class-validator";

export class UploadAttachmentDto {
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
    description: "Description optionnelle du fichier",
    example: "Image illustrant le concept principal du cours",
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;
}
