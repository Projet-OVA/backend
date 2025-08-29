import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthUserModule } from "./modules/authUser/authUser.module";
import { CourseModule } from "./modules/course/course.module";
import { ConfigModule } from "@nestjs/config";
import { PrismaModule } from "./core/prisma/prisma.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthUserModule,
    CourseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
