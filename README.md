# SIRA OVA - Système d'Impact des Solutions

## 🚀 Vue d'ensemble

SIRA OVA est une plateforme moderne pour évaluer et gérer l'impact des solutions technologiques. Le projet utilise une architecture modulaire avec NestJS pour le backend et une approche CI/CD robuste.

## 🏗️ Architecture

### Backend (NestJS)
- **Framework**: NestJS avec TypeScript
- **Base de données**: PostgreSQL avec Prisma ORM
- **Authentification**: JWT avec Passport
- **Documentation**: Swagger/OpenAPI
- **Tests**: Jest pour unitaires et e2e

### Frontend (À implémenter)
- **Framework**: React/Next.js ou Vue.js
- **State Management**: Zustand ou Pinia
- **UI Components**: Tailwind CSS + Headless UI
- **Tests**: Vitest + Testing Library

## 📁 Structure du projet

```
project/
├── backend/                 # API NestJS
│   ├── src/
│   │   ├── modules/        # Modules de l'application
│   │   ├── core/           # Configuration et services core
│   │   └── main.ts         # Point d'entrée
│   ├── prisma/             # Schéma et migrations Prisma
│   └── Dockerfile          # Image Docker
├── .github/                # GitHub Actions
├── scripts/                # Scripts de déploiement
└── docker-compose.yml      # Configuration Docker
```

## 🚀 Démarrage rapide

### Prérequis
- Node.js 20+
- Docker et Docker Compose
- PostgreSQL (optionnel, Docker fourni)

### Installation

1. **Cloner le repository**
```bash
git clone <repository-url>
cd sira-ova
```

2. **Configuration de l'environnement**
```bash
cd backend
cp .env.example .env
# Modifier les variables dans .env
```

3. **Démarrer avec Docker**
```bash
docker-compose up -d
```

4. **Ou démarrer localement**
```bash
cd backend
npm install
npx prisma generate
npx prisma migrate dev
npm run start:dev
```

5. **Accéder à l'API**
- API: http://localhost:3000/api
- Documentation Swagger: http://localhost:3000/api/docs

## 🔧 Configuration CI/CD

### GitHub Actions

Le projet inclut deux workflows GitHub Actions :

1. **CI Pipeline** (`.github/workflows/ci.yml`)
   - Tests automatiques
   - Build de l'application
   - Déploiement staging/production

2. **Deploy to Render** (`.github/workflows/deploy-render.yml`)
   - Déploiement automatique sur Render
   - Déclenché sur push main/master

### Configuration des secrets

Pour le déploiement automatique, configurez ces secrets dans GitHub :

1. **RENDER_SERVICE_ID**: ID de votre service Render
2. **RENDER_API_KEY**: Clé API Render

#### Comment trouver RENDER_SERVICE_ID :
- Allez sur https://dashboard.render.com
- Cliquez sur votre service
- L'URL contient l'ID : `https://dashboard.render.com/web/srv-xxxxxxxxxxxxx`

#### Comment trouver RENDER_API_KEY :
- Cliquez sur votre avatar → Account Settings
- Menu gauche → API Keys
- Créez une nouvelle clé API

## 📚 Documentation

### Architecture Decision Records (ADR)
- [ADR-0001: Structure du projet](docs/adr/0001-project-structure.md)
- [ADR-0002: Stratégie d'authentification](docs/adr/0002-authentication-strategy.md)
- [ADR-0003: Conception de la base de données](docs/adr/0003-database-design.md)

### API Documentation
- [Documentation complète](docs/api/README.md)
- [Swagger UI](http://localhost:3000/api/docs) (quand l'app est démarrée)

## 🧪 Tests

```bash
# Tests unitaires
npm test

# Tests e2e
npm run test:e2e

# Couverture de code
npm run test:cov

# Tests avec watch mode
npm run test:watch
```

## 🚀 Déploiement

### Déploiement manuel
```bash
# Staging
./scripts/deploy.sh staging

# Production
./scripts/deploy.sh production
```

### Déploiement automatique
- **Staging**: Déclenché sur push vers `develop`
- **Production**: Déclenché sur push vers `main` ou `master`

## 🔒 Sécurité

- **Authentification**: JWT avec expiration automatique
- **Validation**: Validation automatique des entrées
- **Rate Limiting**: Protection contre les attaques par déni de service
- **CORS**: Configuration sécurisée pour la production

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📝 Changelog

### [Unreleased]
- Setup CI/CD initial
- Documentation ADR
- Structure front/back cohérente

### [0.1.0] - 2025-08-09
- Initialisation du projet
- Module d'authentification
- Configuration Prisma + PostgreSQL

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/your-repo/issues)
- **Email**: support@sira-ova.com
- **Documentation**: [docs/](docs/)

## 🙏 Remerciements

- [NestJS](https://nestjs.com/) - Framework backend
- [Prisma](https://www.prisma.io/) - ORM moderne
- [GitHub Actions](https://github.com/features/actions) - CI/CD
- [Render](https://render.com/) - Plateforme de déploiement


<!-- verify ports en cours -->
lsof -ti:5000
netstat -tulpn | grep :5000
kill -9 29706
netstat -tulpn | grep :5000