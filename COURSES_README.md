# Module de Gestion des Cours - SIRA OVA

## 🎯 Vue d'ensemble

Ce module permet la gestion complète des cours avec support des médias (images, vidéos, audio) via Cloudinary. Il implémente un système de permissions basé sur les rôles utilisateur.

## 🔐 Gestion des Permissions

- **ADMIN** : Peut créer, modifier, supprimer des cours et gérer leurs pièces jointes
- **CITIZEN** : Peut uniquement consulter les cours

## 📚 Fonctionnalités

### 1. Gestion des Cours
- ✅ Créer un cours
- ✅ Lister tous les cours
- ✅ Consulter un cours par ID
- ✅ Modifier un cours
- ✅ Supprimer un cours

### 2. Gestion des Médias
- ✅ Upload d'images (jpg, jpeg, png, webp, gif)
- ✅ Upload de vidéos (mp4, avi, mov, wmv, flv)
- ✅ Upload d'audio (mp3, wav, ogg, aac)
- ✅ Upload de documents (pdf, pptx)
- ✅ Suppression de médias

### 3. Organisation Cloudinary
- 📁 **images/courses/** : Images des cours
- 📁 **videos/courses/** : Vidéos des cours
- 📁 **audio/courses/** : Fichiers audio des cours

## 🚀 Endpoints API

### Base URL
```
/api/courses
```

### 1. Créer un cours
```http
POST /api/courses
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "nom": "Introduction à la citoyenneté",
  "description": "Ce cours vous initie aux fondamentaux de la citoyenneté",
  "category": "DROIT_DU_CITOYEN"
}
```

**Réponse :**
```json
{
  "message": "Cours créé avec succès",
  "data": {
    "id": "clx1234567890abcdef",
    "nom": "Introduction à la citoyenneté",
    "description": "Ce cours vous initie aux fondamentaux de la citoyenneté",
    "category": "DROIT_DU_CITOYEN",
    "creatorId": "user_id",
    "creator": { ... },
    "attachments": [],
    "createdAt": "2025-08-26T10:00:00.000Z",
    "updatedAt": "2025-08-26T10:00:00.000Z"
  },
  "statusCode": 201
}
```

### 2. Lister tous les cours
```http
GET /api/courses
Authorization: Bearer <JWT_TOKEN>
```

**Réponse :**
```json
{
  "message": "Cours récupérés avec succès",
  "data": [
    {
      "id": "clx1234567890abcdef",
      "nom": "Introduction à la citoyenneté",
      "description": "...",
      "category": "DROIT_DU_CITOYEN",
      "creator": { ... },
      "attachments": [ ... ],
      "createdAt": "2025-08-26T10:00:00.000Z",
      "updatedAt": "2025-08-26T10:00:00.000Z"
    }
  ],
  "statusCode": 200
}
```

### 3. Consulter un cours
```http
GET /api/courses/{id}
Authorization: Bearer <JWT_TOKEN>
```

### 4. Modifier un cours
```http
PUT /api/courses/{id}
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "nom": "Introduction à la citoyenneté - Mise à jour",
  "description": "Description mise à jour"
}
```

### 5. Supprimer un cours
```http
DELETE /api/courses/{id}
Authorization: Bearer <JWT_TOKEN>
```

### 6. Upload d'une pièce jointe
```http
POST /api/courses/{id}/attachments
Authorization: Bearer <JWT_TOKEN>
Content-Type: multipart/form-data

file: [fichier]
name: "image_cours_1"
mediaType: "IMAGE"
description: "Image illustrant le concept principal"
```

**Limites :**
- Taille max : 10MB
- Formats supportés : jpg, jpeg, png, webp, gif, mp4, mp3, pdf

### 7. Supprimer une pièce jointe
```http
DELETE /api/courses/{courseId}/attachments/{attachmentId}
Authorization: Bearer <JWT_TOKEN>
```

## 🏗️ Architecture Technique

### Structure des Modules
```
src/modules/course/
├── controllers/
│   └── course.controller.ts      # Contrôleur principal
├── services/
│   ├── interfaces/
│   │   └── i-course.service.ts   # Interface du service
│   └── impl/
│       └── course.service.ts     # Implémentation du service
├── dto/
│   ├── request/                  # DTOs de requête
│   │   ├── create-course.dto.ts
│   │   ├── update-course.dto.ts
│   │   └── upload-attachment.dto.ts
│   └── response/                 # DTOs de réponse
│       └── course-response.dto.ts
└── course.module.ts              # Module NestJS
```

### Services Utilisés
- **PrismaService** : Gestion de la base de données
- **CloudinaryService** : Upload et gestion des médias
- **JwtAuthGuard** : Authentification JWT
- **RolesGuard** : Vérification des rôles

### Modèles de Base de Données
- **Course** : Informations principales du cours
- **Attachment** : Métadonnées des fichiers médias
- **CourseAttachment** : Relation many-to-many entre cours et médias
- **User** : Créateur du cours

## 🔧 Configuration

### Variables d'environnement requises
```bash
# Cloudinary
CLOUDINARY_CLOUD_NAME=dzfyjdn9q
CLOUDINARY_API_KEY=797811382858495
CLOUDINARY_API_SECRET=8nVX5uW80N4s6b6N0Pc4kBa5eEk
CLOUDINARY_URL=cloudinary://797811382858495:8nVX5uW80N4s6b6N0Pc4kBa5eEk@dzfyjdn9q

# Base de données
DATABASE_URL=postgresql://postgres:password@localhost:5432/sira_ova

# JWT
JWT_SECRET=your-super-secret-jwt-key
```

## 📝 Exemples d'utilisation

### Créer un cours avec des pièces jointes
1. Créer d'abord le cours
2. Uploader les médias un par un via l'endpoint d'upload
3. Les médias sont automatiquement liés au cours

### Workflow complet
```bash
# 1. Créer un cours
curl -X POST http://localhost:5000/api/courses \
  -H "Authorization: Bearer <JWT_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "nom": "Mon cours",
    "description": "Description du cours",
    "category": "ENVIRONNEMENT"
  }'

# 2. Uploader une image
curl -X POST http://localhost:5000/api/courses/{courseId}/attachments \
  -H "Authorization: Bearer <JWT_TOKEN>" \
  -F "file=@image.jpg" \
  -F "name=image_cours" \
  -F "mediaType=IMAGE"

# 3. Consulter le cours avec ses médias
curl -X GET http://localhost:5000/api/courses/{courseId} \
  -H "Authorization: Bearer <JWT_TOKEN>"
```

## 🚨 Gestion des Erreurs

### Codes d'erreur courants
- **400** : Données invalides
- **401** : Non authentifié
- **403** : Accès refusé (rôle insuffisant)
- **404** : Ressource non trouvée
- **409** : Conflit (ex: nom de cours déjà existant)

### Messages d'erreur
- "Seuls les administrateurs peuvent créer des cours"
- "Vous n'avez pas les permissions pour modifier ce cours"
- "Cours non trouvé"
- "Pièce jointe non trouvée pour ce cours"

## 🔒 Sécurité

- **Authentification JWT** obligatoire pour tous les endpoints
- **Vérification des rôles** pour les opérations sensibles
- **Validation des fichiers** (taille, type, format)
- **Nettoyage automatique** des fichiers Cloudinary lors de la suppression

## 🧪 Tests

### Lancer les tests
```bash
# Tests unitaires
npm test

# Tests e2e
npm run test:e2e

# Tests avec couverture
npm run test:cov
```

## 📚 Documentation Swagger

Accédez à la documentation interactive :
```
http://localhost:5000/api/docs
```

## 🤝 Contribution

Pour contribuer au module :
1. Respecter l'architecture existante
2. Ajouter des tests pour les nouvelles fonctionnalités
3. Documenter les nouveaux endpoints
4. Suivre les conventions de nommage

## 📞 Support

En cas de problème :
1. Vérifier les logs de l'application
2. Contrôler la configuration Cloudinary
3. Vérifier les permissions de la base de données
4. Consulter la documentation Swagger





