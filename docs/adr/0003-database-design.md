# ADR-0003: Conception de la base de données

## Statut
Accepted

## Date
2025-08-09

## Contexte
Le système SIRA OVA nécessite une base de données robuste pour stocker les informations sur les utilisateurs, les solutions et leurs impacts.

## Décision
Utilisation de PostgreSQL avec Prisma ORM pour la gestion de la base de données :

### Technologies choisies
- **SGBD**: PostgreSQL (robustesse, ACID, JSON support)
- **ORM**: Prisma (type safety, migrations automatiques, introspection)
- **Migrations**: Gestion automatique via Prisma CLI

### Schéma initial
```prisma
model User {
  id        Int      @id @default(autoincrement())
  nom       String
  prenom    String
  email     String   @unique
  password  String
  telephone String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### Stratégie de migration
- **Développement**: Migrations automatiques
- **Staging/Production**: Migrations manuelles avec validation
- **Rollback**: Support via Prisma Migrate

### Performance
- **Index**: Sur email (unique), nom, prenom
- **Connection pooling**: Via Prisma
- **Query optimization**: Utilisation des relations Prisma

## Conséquences
- **Positives**: Type safety, migrations automatiques, performance
- **Négatives**: Courbe d'apprentissage Prisma, vendor lock-in
- **Risques**: Évolution du schéma en production

## Alternatives considérées
- TypeORM (rejeté pour la stabilité)
- Sequelize (rejeté pour la maintenance)
- MongoDB (rejeté pour la cohérence des données)

## Références
- [Prisma Documentation](https://www.prisma.io/docs/)
- [PostgreSQL Best Practices](https://www.postgresql.org/docs/current/best-practices.html)
