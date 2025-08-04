#!/usr/bin/env node
import * as fs from "fs";
import * as path from "path";

const SRC_DIR = path.join(process.cwd(), "src");

function createModuleStructure(moduleName: string) {
  const moduleDir = path.join(SRC_DIR, "modules", moduleName);

  // Structure des dossiers
  const directories = [
    "controllers/__tests__",
    "dto/request",
    "dto/response",
    "services/interfaces",
    "services/impl",
    "services/__tests__",
  ];

  // Créer les dossiers
  directories.forEach((dir) => {
    fs.mkdirSync(path.join(moduleDir, dir), { recursive: true });
  });

  // Créer les fichiers de base
  const files = [
    {
      path: `controllers/${moduleName}.controller.ts`,
      content: `import { Controller } from '@nestjs/common';
import { I${capitalizeFirst(moduleName)}Service } from '../services/interfaces/i-${moduleName}.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('${moduleName}')
@Controller('${moduleName}')
export class ${capitalizeFirst(moduleName)}Controller {
  constructor(
    private readonly ${moduleName}Service: I${capitalizeFirst(moduleName)}Service
  ) {}
}`,
    },
    {
      path: `controllers/__tests__/${moduleName}.controller.spec.ts`,
      content: `import { Test, TestingModule } from '@nestjs/testing';
import { ${capitalizeFirst(moduleName)}Controller } from '../${moduleName}.controller';
import { I${capitalizeFirst(moduleName)}Service } from '../../services/interfaces/i-${moduleName}.service';

describe('${capitalizeFirst(moduleName)}Controller', () => {
  let controller: ${capitalizeFirst(moduleName)}Controller;
  let ${moduleName}Service: I${capitalizeFirst(moduleName)}Service;

  beforeEach(async () => {
    const mockService: I${capitalizeFirst(moduleName)}Service = {};

    const module: TestingModule = await Test.createTestingModule({
      controllers: [${capitalizeFirst(moduleName)}Controller],
      providers: [
        {
          provide: 'I${capitalizeFirst(moduleName)}Service',
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<${capitalizeFirst(moduleName)}Controller>(${capitalizeFirst(moduleName)}Controller);
    ${moduleName}Service = module.get<I${capitalizeFirst(moduleName)}Service>('I${capitalizeFirst(moduleName)}Service');
  });

  describe('when controller is initialized', () => {
    it('should be defined', () => {
      expect(controller).toBeDefined();
    });

    it('should have ${moduleName}Service defined', () => {
      expect(${moduleName}Service).toBeDefined();
    });
  });
});`,
    },
    {
      path: `services/__tests__/${moduleName}.service.spec.ts`,
      content: `import { Test, TestingModule } from '@nestjs/testing';
import { ${capitalizeFirst(moduleName)}Service } from '../impl/${moduleName}.service';
import { PrismaService } from '../../../../core/prisma/prisma.service';

describe('${capitalizeFirst(moduleName)}Service', () => {
  let service: ${capitalizeFirst(moduleName)}Service;

  beforeEach(async () => {
    const mockPrismaService = {
      // Add mock methods here as needed
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ${capitalizeFirst(moduleName)}Service,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<${capitalizeFirst(moduleName)}Service>(${capitalizeFirst(moduleName)}Service);
  });

  describe('when service is initialized', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });
  });
});`,
    },
    {
      path: `dto/request/create-${moduleName}.dto.ts`,
      content: `import { ApiProperty } from '@nestjs/swagger';

export class Create${capitalizeFirst(moduleName)}Dto {
  // Add your DTO properties here
}`,
    },
    {
      path: `services/interfaces/i-${moduleName}.service.ts`,
      content: `export interface I${capitalizeFirst(moduleName)}Service {
  // Define your service interface methods here
}`,
    },
    {
      path: `services/impl/${moduleName}.service.ts`,
      content: `import { Injectable } from '@nestjs/common';
import { I${capitalizeFirst(moduleName)}Service } from '../interfaces/i-${moduleName}.service';
import { PrismaService } from '../../../../core/prisma/prisma.service';

@Injectable()
export class ${capitalizeFirst(moduleName)}Service implements I${capitalizeFirst(moduleName)}Service {
  constructor(private prisma: PrismaService) {}
  
  // Implement your service methods here
}`,
    },
    {
      path: `${moduleName}.module.ts`,
      content: `import { Module } from '@nestjs/common';
import { ${capitalizeFirst(moduleName)}Controller } from './controllers/${moduleName}.controller';
import { ${capitalizeFirst(moduleName)}Service } from './services/impl/${moduleName}.service';
import { PrismaModule } from '../../core/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [${capitalizeFirst(moduleName)}Controller],
  providers: [
    {
      provide: 'I${capitalizeFirst(moduleName)}Service',
      useClass: ${capitalizeFirst(moduleName)}Service,
    },
  ],
  exports: ['I${capitalizeFirst(moduleName)}Service'],
})
export class ${capitalizeFirst(moduleName)}Module {}`,
    },
  ];

  // Créer les fichiers
  files.forEach((file) => {
    fs.writeFileSync(path.join(moduleDir, file.path), file.content, "utf8");
  });

  console.log(`✅ Module ${moduleName} created successfully!`);
  console.log(`📁 Location: src/modules/${moduleName}`);
}

function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Récupérer le nom du module depuis les arguments
const moduleName = process.argv[2];
if (!moduleName) {
  console.error("❌ Please provide a module name");
  process.exit(1);
}

createModuleStructure(moduleName);
