# Diagramme d'Architecture du Projet

## Architecture Globale

```mermaid
graph TB
    subgraph "Frontend (React Native/Expo)"
        A[Mobile App]
        B[Web App]
    end
    
    subgraph "Backend (NestJS)"
        C[API Gateway]
        D[Auth Module]
        E[User Module]
        F[Profile Module]
        G[File Module]
        H[Notification Module]
        I[Monitoring Module]
    end
    
    subgraph "Infrastructure Core"
        J[Logger Service]
        K[Cache Service]
        L[Security Middlewares]
        M[Validation Pipes]
        N[Exception Filters]
    end
    
    subgraph "Base de Données"
        O[(PostgreSQL)]
        P[(Redis Cache)]
    end
    
    subgraph "Services Externes"
        Q[JWT Service]
        R[File Storage]
        S[Email Service]
    end
    
    A --> C
    B --> C
    C --> D
    C --> E
    C --> F
    C --> G
    C --> H
    C --> I
    
    D --> J
    E --> J
    F --> J
    G --> J
    H --> J
    I --> J
    
    D --> K
    E --> K
    F --> K
    
    C --> L
    C --> M
    C --> N
    
    D --> O
    E --> O
    F --> O
    G --> O
    H --> O
    I --> O
    
    K --> P
    
    D --> Q
    G --> R
    H --> S
```

## Flux d'Authentification

```mermaid
sequenceDiagram
    participant Client
    participant AuthController
    participant AuthService
    participant PrismaService
    participant Database
    participant JWTService
    
    Client->>AuthController: POST /api/auth/register
    AuthController->>AuthService: register(userData)
    AuthService->>PrismaService: createUser(userData)
    PrismaService->>Database: INSERT INTO users
    Database-->>PrismaService: User created
    PrismaService-->>AuthService: User object
    AuthService-->>AuthController: RegisterResponse
    AuthController-->>Client: 201 Created
    
    Client->>AuthController: POST /api/auth/login
    AuthController->>AuthService: login(credentials)
    AuthService->>PrismaService: findUserByEmail(email)
    PrismaService->>Database: SELECT FROM users
    Database-->>PrismaService: User data
    PrismaService-->>AuthService: User object
    AuthService->>JWTService: generateToken(user)
    JWTService-->>AuthService: JWT token
    AuthService-->>AuthController: AuthResponse with token
    AuthController-->>Client: 200 OK + JWT
```

## Structure des Modules

```mermaid
graph LR
    subgraph "Core Layer"
        A[ConfigModule]
        B[LoggerModule]
        C[PrismaModule]
        D[CacheModule]
    end
    
    subgraph "Business Modules"
        E[AuthUserModule]
        F[UserModule]
        G[ProfileModule]
        H[FileModule]
        I[NotificationModule]
        J[MonitoringModule]
    end
    
    subgraph "Shared Services"
        K[LoggerService]
        L[CacheService]
        M[SecurityService]
        N[ValidationService]
    end
    
    A --> E
    A --> F
    A --> G
    A --> H
    A --> I
    A --> J
    
    B --> K
    C --> L
    D --> M
    
    E --> K
    F --> K
    G --> K
    H --> K
    I --> K
    J --> K
```

## Pipeline de Sécurité

```mermaid
flowchart TD
    A[Request Incoming] --> B[CORS Check]
    B --> C[Rate Limiting]
    C --> D[Helmet Headers]
    D --> E[JWT Validation]
    E --> F[Input Validation]
    F --> G[Business Logic]
    G --> H[Response Sanitization]
    H --> I[Security Headers]
    I --> J[Response Outgoing]
    
    B -->|Block| K[403 Forbidden]
    C -->|Block| L[429 Too Many Requests]
    E -->|Block| M[401 Unauthorized]
    F -->|Block| N[400 Bad Request]
```

## Modèle de Données

```mermaid
erDiagram
    User {
        int id PK
        string nom
        string prenom
        string email UK
        string password
        string telephone
        enum role
        boolean isActive
        datetime lastLogin
        datetime createdAt
        datetime updatedAt
    }
    
    Profile {
        int id PK
        int userId FK
        string avatar
        string bio
        json preferences
        datetime createdAt
        datetime updatedAt
    }
    
    Notification {
        int id PK
        int userId FK
        enum type
        string title
        string message
        boolean isRead
        datetime createdAt
    }
    
    File {
        int id PK
        int userId FK
        string filename
        string originalName
        string mimeType
        int size
        string path
        datetime createdAt
    }
    
    User ||--|| Profile : has
    User ||--o{ Notification : receives
    User ||--o{ File : uploads
```

## Roadmap d'Implémentation

```mermaid
gantt
    title Roadmap Technique - 4 Semaines
    dateFormat  YYYY-MM-DD
    section Semaine 1
    Extension Routes     :a1, 2024-01-01, 7d
    Module User          :a2, 2024-01-01, 5d
    Module Profile       :a3, 2024-01-03, 4d
    
    section Semaine 2
    Middlewares Sécurité :b1, 2024-01-08, 7d
    Rate Limiting        :b2, 2024-01-08, 3d
    Helmet Headers       :b3, 2024-01-10, 2d
    Validation Avancée   :b4, 2024-01-11, 3d
    
    section Semaine 3
    Monitoring           :c1, 2024-01-15, 7d
    Cache Redis          :c2, 2024-01-15, 4d
    Métriques Avancées   :c3, 2024-01-18, 3d
    Gestion Erreurs      :c4, 2024-01-19, 3d
    
    section Semaine 4
    Tests & Docs         :d1, 2024-01-22, 7d
    Tests Performance    :d2, 2024-01-22, 3d
    Tests Sécurité       :d3, 2024-01-24, 2d
    Documentation API    :d4, 2024-01-25, 3d
```

## Métriques de Performance

```mermaid
graph LR
    subgraph "Monitoring Endpoints"
        A[/health]
        B[/metrics]
        C[/logs]
        D[/security-events]
    end
    
    subgraph "Métriques Collectées"
        E[Response Time]
        F[Throughput]
        G[Error Rate]
        H[Memory Usage]
        I[Database Queries]
        J[Cache Hit Rate]
    end
    
    A --> E
    A --> H
    B --> F
    B --> G
    B --> I
    B --> J
    C --> G
    D --> G
```

## Points de Collaboration Architectes

```mermaid
mindmap
  root((Collaboration<br/>Architectes))
    Architecture Review
      Choix Techniques
      Patterns Design
      Standards Code
    Modèle Données
      Schéma Prisma
      Relations
      Indexes
    Sécurité
      Politiques
      Standards
      Audits
    Performance
      Métriques
      Seuils
      Optimisations
    Déploiement
      Stratégie
      Environnements
      Monitoring
```
