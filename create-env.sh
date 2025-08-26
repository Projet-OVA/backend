#!/bin/bash

# Créer le fichier .env avec les variables d'environnement nécessaires
cat > .env << EOF
# Configuration de la base de données
DATABASE_URL="postgresql://postgres:password@localhost:5432/sira_ova"

# Configuration JWT
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"

# Configuration du serveur
PORT=3000

# Configuration de l'environnement
NODE_ENV=development
EOF

echo "Fichier .env créé avec succès!"
echo "N'oubliez pas de modifier la DATABASE_URL selon votre configuration PostgreSQL." 