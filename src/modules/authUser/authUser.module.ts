import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AuthUserController } from "./controllers/authUser.controller";
import { AuthUserService } from "./services/impl/authUser.service";
import { IAuthUserService } from "./services/interfaces/i-authUser.service";
import { PrismaModule } from "../../core/prisma/prisma.module";
import { JwtStrategy } from "src/core/guards/jwt.strategy";

@Module({
  imports: [
    PrismaModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || "your-secret-key",
      signOptions: { expiresIn: "24h" },
    }),
  ],
  controllers: [AuthUserController],
  providers: [
    {
      provide: IAuthUserService,
      useClass: AuthUserService,
    },
    JwtStrategy,
  ],
  exports: [IAuthUserService],
})
export class AuthUserModule {}
