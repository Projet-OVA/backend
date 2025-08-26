# ADR-0002: Stratégie d'authentification

## Statut
Accepted

## Date
2025-08-09

## Contexte
Le système SIRA OVA nécessite une authentification sécurisée pour protéger les données sensibles et contrôler l'accès aux fonctionnalités.

## Décision
Implémentation de l'authentification JWT avec les caractéristiques suivantes :

### Mécanisme d'authentification
- **JWT (JSON Web Tokens)** pour la gestion des sessions
- **bcrypt** pour le hachage des mots de passe (12 rounds)
- **Passport.js** pour l'intégration avec NestJS

### Structure du token JWT
```typescript
interface JwtPayload {
  sub: number;        // ID utilisateur
  email: string;      // Email utilisateur
  nom: string;        // Nom de famille
  prenom: string;     // Prénom
  iat: number;        // Date d'émission
  exp: number;        // Date d'expiration
}
```

### Endpoints d'authentification
- `POST /api/auth/register` - Inscription
- `POST /api/auth/login` - Connexion
- `POST /api/auth/logout` - Déconnexion (optionnel)

### Sécurité
- **Salt rounds**: 12 (équilibre sécurité/performance)
- **Expiration token**: 24h par défaut
- **Refresh tokens**: À implémenter dans le futur

## Conséquences
- **Positives**: Stateless, scalable, sécurisé
- **Négatives**: Gestion manuelle de l'expiration côté client
- **Risques**: Tokens volés (mitigé par expiration courte)

## Alternatives considérées
- Sessions avec Redis (rejeté pour la complexité)
- OAuth 2.0 (rejeté pour la complexité initiale)
- Basic Auth (rejeté pour la sécurité)

## Références
- [JWT Best Practices](https://auth0.com/blog/a-look-at-the-latest-draft-for-jwt-bcp/)
- [NestJS Authentication](https://docs.nestjs.com/security/authentication)
