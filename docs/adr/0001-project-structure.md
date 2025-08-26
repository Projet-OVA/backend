# ADR-0001: Structure du projet SIRA OVA

## Statut
Accepted

## Date
2025-08-09

## Contexte
Le projet SIRA OVA nécessite une architecture robuste et évolutive pour gérer les impacts des solutions. Nous devons définir la structure du projet pour assurer la maintenabilité et la scalabilité.

## Décision
Adoption d'une architecture modulaire avec séparation claire des responsabilités :

### Backend (NestJS)
- **Architecture**: Modulaire avec modules NestJS
- **Base de données**: PostgreSQL avec Prisma ORM
- **Authentification**: JWT avec Passport
- **Documentation API**: Swagger/OpenAPI
- **Tests**: Jest pour unitaires et e2e

### Frontend (à implémenter)
- **Framework**: flutter/angular
- **State Management**: Zustand ou Pinia
- **UI Components**: Tailwind CSS + Headless UI
- **Tests**: Vitest + Testing Library

### Structure des dossiers
```
project/
├── backend/          # API NestJS
├── frontend/         # Interface utilisateur
├── docs/            # Documentation
│   ├── adr/         # Architecture Decision Records
│   └── api/         # Documentation API
├── .github/         # GitHub Actions
└── docker/          # Configuration Docker
```

## Conséquences
- **Positives**: Séparation claire, maintenabilité, scalabilité
- **Négatives**: Complexité initiale, nécessite plus de configuration
- **Risques**: Gestion des dépendances entre front/back

## Alternatives considérées
- Monolithe simple (rejeté pour la scalabilité)
- Microservices (rejeté pour la complexité initiale)
- Serverless (rejeté pour le contrôle)

## Références
- [NestJS Architecture](https://docs.nestjs.com/architecture)
- [Prisma Best Practices](https://www.prisma.io/docs/guides/best-practices)
