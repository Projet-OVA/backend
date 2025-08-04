#!/bin/bash

echo "🚀 Initializing development tools setup..."

# Créer la structure des dossiers
mkdir -p tools/templates
mkdir -p src/modules
mkdir -p src/core/{config,constants,decorators,exceptions,guards,interfaces,middlewares,utils}

# Installer les dépendances nécessaires
echo "📦 Installing required dependencies..."
npm install --save-dev ts-node rimraf @compodoc/compodoc

# Créer le fichier generate-module.ts s'il n'existe pas
if [ ! -f tools/generate-module.ts ]; then
    echo "📝 Creating module generator script..."
    cat > tools/generate-module.ts << 'EOL'
#!/usr/bin/env node
import * as fs from 'fs';
import * as path from 'path';

// Le contenu sera créé séparément dans generate-module.ts
console.log('Module generator created. See generate-module.ts for implementation.');
EOL
    chmod +x tools/generate-module.ts
fi

# Créer les fichiers de base dans core
echo "🏗️ Creating core structure..."

# Configuration de base
cat > src/core/config/configuration.ts << 'EOL'
export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    url: process.env.DATABASE_URL
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  }
});
EOL

# Constants
cat > src/core/constants/index.ts << 'EOL'
export const MESSAGES = {
  UNAUTHORIZED: 'Unauthorized access',
  FORBIDDEN: 'Forbidden resource',
  NOT_FOUND: 'Resource not found'
};
EOL

# Base Exception
cat > src/core/exceptions/base.exception.ts << 'EOL'
import { HttpException, HttpStatus } from '@nestjs/common';

export class BaseException extends HttpException {
  constructor(message: string, status: HttpStatus) {
    super(message, status);
  }
}
EOL

echo "✅ Development tools setup completed!"
echo "📘 You can now use the following commands:"
echo "   - npm run generate:module <module-name>"
echo "   - npm run build"
echo "   - npm run dev"