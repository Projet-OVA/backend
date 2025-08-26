# Documentation API SIRA OVA

## Vue d'ensemble

L'API SIRA OVA est une API REST construite avec NestJS qui permet de gérer les utilisateurs et l'authentification du système d'impact des solutions.

## Base URL

- **Développement**: `http://localhost:3000/api`
- **Staging**: `https://staging.sira-ova.com/api`
- **Production**: `https://api.sira-ova.com/api`

## Authentification

L'API utilise l'authentification JWT. Pour les endpoints protégés, incluez le token dans le header :

```http
Authorization: Bearer <your-jwt-token>
```

## Endpoints

### Authentification

#### POST /auth/register
Inscription d'un nouvel utilisateur.

**Request Body:**
```json
{
  "nom": "Diop",
  "prenom": "Amadou",
  "email": "amadou.diop@example.com",
  "password": "password123",
  "telephone": "+221701234567"
}
```

**Response (201):**
```json
{
  "message": "Utilisateur créé avec succès",
  "data": {
    "id": 1,
    "nom": "Diop",
    "prenom": "Amadou",
    "email": "amadou.diop@example.com",
    "telephone": "+221701234567",
    "createdAt": "2025-08-09T12:00:00.000Z"
  },
  "statusCode": 201
}
```

#### POST /auth/login
Connexion d'un utilisateur.

**Request Body:**
```json
{
  "email": "amadou.diop@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "message": "Utilisateur connecté avec succès",
  "data": {
    "user": {
      "id": 1,
      "nom": "Diop",
      "prenom": "Amadou",
      "email": "amadou.diop@example.com",
      "telephone": "+221701234567",
      "createdAt": "2025-08-09T12:00:00.000Z"
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "statusCode": 200
}
```

#### POST /auth/logout
Déconnexion d'un utilisateur (nécessite authentification).

**Response (200):**
```json
{
  "message": "Déconnexion réussie",
  "data": null,
  "statusCode": 200
}
```

## Codes de statut HTTP

- `200` - Succès
- `201` - Créé avec succès
- `400` - Requête invalide
- `401` - Non autorisé
- `409` - Conflit (utilisateur déjà existant)
- `500` - Erreur serveur interne

## Gestion des erreurs

Toutes les erreurs suivent le format standard :

```json
{
  "message": "Description de l'erreur",
  "error": "Type d'erreur",
  "statusCode": 400
}
```

## Rate Limiting

- **Limite**: 100 requêtes par minute par IP
- **Headers de réponse**:
  - `X-RateLimit-Limit`: Limite de requêtes
  - `X-RateLimit-Remaining`: Requêtes restantes
  - `X-RateLimit-Reset`: Temps de réinitialisation

## Validation

L'API valide automatiquement :
- Format des emails
- Complexité des mots de passe
- Champs obligatoires
- Types de données

## Tests

Pour tester l'API localement :

```bash
# Démarrer l'application
npm run start:dev

# Tester l'endpoint de base
curl http://localhost:3000/api

# Tester l'inscription
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"nom": "Test", "prenom": "User", "email": "test@example.com", "password": "password123"}'
```

## Support

Pour toute question ou problème :
- **Issues**: [GitHub Issues](https://github.com/your-repo/issues)
- **Documentation**: [Swagger UI](http://localhost:3000/api/docs)
- **Email**: support@sira-ova.com
