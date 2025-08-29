import { Test, TestingModule } from '@nestjs/testing';
import { CourseController } from '../course.controller';
import { ICourseService } from '../../services/interfaces/i-course.service';

describe('CourseController', () => {
  let controller: CourseController;
  let courseService: ICourseService;

  beforeEach(async () => {
    const mockService: ICourseService = {};

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CourseController],
      providers: [
        {
          provide: 'ICourseService',
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<CourseController>(CourseController);
    courseService = module.get<ICourseService>('ICourseService');
  });

  describe('when controller is initialized', () => {
    it('should be defined', () => {
      expect(controller).toBeDefined();
    });

    it('should have courseService defined', () => {
      expect(courseService).toBeDefined();
    });
  });
});