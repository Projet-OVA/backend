import { Test, TestingModule } from "@nestjs/testing";
import { AuthUserController } from "../authUser.controller";
import { IAuthUserService } from "../../services/interfaces/i-authUser.service";
import { RegisterUserDto } from "../../dto/request/register-user.dto";
import { LoginUserDto } from "../../dto/request/login-user.dto";
import { AuthResponseDto, RegisterResponseDto, LogoutResponseDto } from "../../dto/response/auth-response.dto";

describe("AuthUserController", () => {
  let controller: AuthUserController;
  let authUserService: IAuthUserService;

  beforeEach(async () => {
    const mockService: IAuthUserService = {
      register: jest.fn(),
      login: jest.fn(),
      logout: jest.fn(),
      validateUser: jest.fn(),
      generateJwtToken: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthUserController],
      providers: [
        {
          provide: "IAuthUserService",
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<AuthUserController>(AuthUserController);
    authUserService = module.get<IAuthUserService>("IAuthUserService");
  });

  describe("when controller is initialized", () => {
    it("should be defined", () => {
      expect(controller).toBeDefined();
    });

    it("should have authUserService defined", () => {
      expect(authUserService).toBeDefined();
    });
  });

  describe("register", () => {
    it("should call authUserService.register", async () => {
      const registerDto: RegisterUserDto = {
        nom: "Test",
        prenom: "User",
        email: "test@example.com",
        username: "testuser",
        password: "password123",
        phoneNumber: "+221701234567",
      };

      const expectedResult: RegisterResponseDto = {
        message: "Utilisateur créé avec succès",
        data: {
          id: "test-id",
          nom: "Test",
          prenom: "User",
          email: "test@example.com",
          username: "testuser",
          phoneNumber: "+221701234567",
          role: "CITIZEN",
          createdAt: new Date(),
        },
        statusCode: 201,
      };

      jest.spyOn(authUserService, "register").mockResolvedValue(expectedResult);

      const result = await controller.register(registerDto);

      expect(authUserService.register).toHaveBeenCalledWith(registerDto);
      expect(result).toEqual(expectedResult);
    });
  });

  describe("login", () => {
    it("should call authUserService.login", async () => {
      const loginDto: LoginUserDto = {
        emailOrUsername: "test@example.com",
        password: "password123",
      };

      const expectedResult: AuthResponseDto = {
        message: "Utilisateur connecté avec succès",
        data: {
          user: {
            id: "test-id",
            nom: "Test",
            prenom: "User",
            email: "test@example.com",
            username: "testuser",
            phoneNumber: "+221701234567",
            role: "CITIZEN",
            createdAt: new Date(),
          },
          accessToken: "test-token",
        },
        statusCode: 200,
      };

      jest.spyOn(authUserService, "login").mockResolvedValue(expectedResult);

      const result = await controller.login(loginDto);

      expect(authUserService.login).toHaveBeenCalledWith(loginDto);
      expect(result).toEqual(expectedResult);
    });
  });
});
