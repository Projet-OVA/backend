import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthUserModule } from "./modules/authUser/authUser.module";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), AuthUserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
