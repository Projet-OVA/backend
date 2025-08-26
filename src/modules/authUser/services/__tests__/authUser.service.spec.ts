import { Test, TestingModule } from "@nestjs/testing";
import { AuthUserService } from "../impl/authUser.service";
import { PrismaService } from "../../../../core/prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";

describe("AuthUserService", () => {
  let service: AuthUserService;
  let prismaService: PrismaService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const mockPrismaService = {
      user: {
        findFirst: jest.fn(),
        create: jest.fn(),
        findUnique: jest.fn(),
      },
    };

    const mockJwtService = {
      sign: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthUserService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    service = module.get<AuthUserService>(AuthUserService);
    prismaService = module.get<PrismaService>(PrismaService);
    jwtService = module.get<JwtService>(JwtService);
  });

  describe("when service is initialized", () => {
    it("should be defined", () => {
      expect(service).toBeDefined();
    });

    it("should have prismaService defined", () => {
      expect(prismaService).toBeDefined();
    });

    it("should have jwtService defined", () => {
      expect(jwtService).toBeDefined();
    });
  });

  describe("generateJwtToken", () => {
    it("should generate a JWT token", () => {
      const payload = {
        sub: "test-id",
        email: "test@example.com",
        username: "testuser",
        nom: "Test",
        prenom: "User",
        role: "CITIZEN",
      };

      const expectedToken = "test-jwt-token";
      jest.spyOn(jwtService, "sign").mockReturnValue(expectedToken);

      const result = service.generateJwtToken(payload);

      expect(jwtService.sign).toHaveBeenCalledWith(payload);
      expect(result).toBe(expectedToken);
    });
  });
});
