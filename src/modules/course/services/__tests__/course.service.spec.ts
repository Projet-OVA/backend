import { Test, TestingModule } from '@nestjs/testing';
import { CourseService } from '../impl/course.service';
import { PrismaService } from '../../../../core/prisma/prisma.service';

describe('CourseService', () => {
  let service: CourseService;

  beforeEach(async () => {
    const mockPrismaService = {
      // Add mock methods here as needed
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CourseService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<CourseService>(CourseService);
  });

  describe('when service is initialized', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });
  });
});