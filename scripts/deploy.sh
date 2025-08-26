#!/bin/bash

# Script de déploiement pour SIRA OVA
# Usage: ./scripts/deploy.sh [staging|production]

set -e

# Configuration
ENVIRONMENT=${1:-staging}
APP_NAME="sira-ova-backend"
DOCKER_REGISTRY="your-registry.com"

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Fonctions utilitaires
log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Vérification des prérequis
check_prerequisites() {
    log_info "Vérification des prérequis..."
    
    if ! command -v docker &> /dev/null; then
        log_error "Docker n'est pas installé"
        exit 1
    fi
    
    if ! command -v docker-compose &> /dev/null; then
        log_error "Docker Compose n'est pas installé"
        exit 1
    fi
    
    log_info "Prérequis vérifiés ✓"
}

# Build de l'application
build_app() {
    log_info "Build de l'application..."
    
    # Génération du client Prisma
    log_info "Génération du client Prisma..."
    npx prisma generate
    
    # Build de l'application
    log_info "Build de l'application NestJS..."
    npm run build
    
    # Build Docker
    log_info "Build de l'image Docker..."
    docker build -t ${APP_NAME}:${ENVIRONMENT} .
    
    log_info "Build terminé ✓"
}

# Tests
run_tests() {
    log_info "Exécution des tests..."
    
    if npm test; then
        log_info "Tests unitaires réussis ✓"
    else
        log_warn "Tests unitaires échoués, mais continuation du déploiement"
    fi
    
    if npm run test:e2e; then
        log_info "Tests e2e réussis ✓"
    else
        log_warn "Tests e2e échoués, mais continuation du déploiement"
    fi
}

# Déploiement
deploy() {
    log_info "Déploiement en environnement: ${ENVIRONMENT}"
    
    case $ENVIRONMENT in
        "staging")
            deploy_staging
            ;;
        "production")
            deploy_production
            ;;
        *)
            log_error "Environnement invalide: ${ENVIRONMENT}"
            log_info "Usage: $0 [staging|production]"
            exit 1
            ;;
    esac
}

# Déploiement staging
deploy_staging() {
    log_info "Déploiement en staging..."
    
    # Arrêt des services existants
    docker-compose -f docker-compose.staging.yml down || true
    
    # Démarrage des services
    docker-compose -f docker-compose.staging.yml up -d
    
    log_info "Déploiement staging terminé ✓"
}

# Déploiement production
deploy_production() {
    log_info "Déploiement en production..."
    
    # Vérification de la confirmation
    read -p "Êtes-vous sûr de vouloir déployer en production? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        log_warn "Déploiement annulé"
        exit 0
    fi
    
    # Arrêt des services existants
    docker-compose -f docker-compose.production.yml down || true
    
    # Démarrage des services
    docker-compose -f docker-compose.production.yml up -d
    
    log_info "Déploiement production terminé ✓"
}

# Vérification de la santé
health_check() {
    log_info "Vérification de la santé de l'application..."
    
    # Attendre que l'application soit prête
    sleep 10
    
    # Test de l'endpoint de santé
    if curl -f http://localhost:3000/api/health > /dev/null 2>&1; then
        log_info "Application en bonne santé ✓"
    else
        log_error "L'application n'est pas en bonne santé"
        exit 1
    fi
}

# Nettoyage
cleanup() {
    log_info "Nettoyage des ressources..."
    
    # Suppression des images non utilisées
    docker image prune -f
    
    # Suppression des conteneurs arrêtés
    docker container prune -f
    
    log_info "Nettoyage terminé ✓"
}

# Fonction principale
main() {
    log_info "Démarrage du déploiement SIRA OVA..."
    
    check_prerequisites
    build_app
    run_tests
    deploy
    health_check
    cleanup
    
    log_info "Déploiement terminé avec succès! 🎉"
}

# Exécution du script
main "$@"
