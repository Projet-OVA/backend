import { Module } from "@nestjs/common";
import { CourseController } from "./controllers/course.controller";
import { CourseService } from "./services/impl/course.service";
import { PrismaModule } from "../../core/prisma/prisma.module";
import { CloudinaryModule } from "../../core/cloudinary/cloudinary.module";

@Module({
  imports: [PrismaModule, CloudinaryModule],
  controllers: [CourseController],
  providers: [CourseService],
  exports: [CourseService],
})
export class CourseModule {}
