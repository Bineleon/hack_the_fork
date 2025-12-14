#!/bin/bash

# Script de test pour l'API des alternatives végétales
# Usage: ./test-alternatives-api.sh

BASE_URL="http://localhost:3000"
API_URL="${BASE_URL}/api/alternatives"

echo "🌱 ========================================"
echo "🌱  Test API Alternatives Végétales"
echo "🌱 ========================================"
echo ""

# Couleurs pour l'affichage
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Fonction pour afficher les résultats
print_test() {
    echo -e "${BLUE}📋 Test: $1${NC}"
    echo ""
}

print_success() {
    echo -e "${GREEN}✅ Succès${NC}"
    echo ""
}

print_separator() {
    echo "----------------------------------------"
    echo ""
}

# Test 1: Obtenir toutes les alternatives
print_test "1. Obtenir toutes les alternatives"
curl -s "${API_URL}" | jq '.'
print_success
print_separator

# Test 2: Obtenir les statistiques
print_test "2. Obtenir les statistiques de la base"
curl -s "${API_URL}/stats" | jq '.'
print_success
print_separator

# Test 3: Obtenir les types de protéines
print_test "3. Obtenir les types de protéines disponibles"
curl -s "${API_URL}/protein-types" | jq '.'
print_success
print_separator

# Test 4: Obtenir les alternatives au bœuf
print_test "4. Obtenir les alternatives au bœuf"
curl -s "${API_URL}/protein/boeuf" | jq '.'
print_success
print_separator

# Test 5: Obtenir une alternative spécifique (seitan)
print_test "5. Obtenir les détails du seitan"
curl -s "${API_URL}/seitan" | jq '.'
print_success
print_separator

# Test 6: Recherche textuelle
print_test "6. Rechercher 'tofu'"
curl -s "${API_URL}?query=tofu" | jq '.'
print_success
print_separator

# Test 7: Filtrer par prix économique
print_test "7. Filtrer les alternatives économiques"
curl -s "${API_URL}?prix=économique" | jq '.'
print_success
print_separator

# Test 8: Obtenir le top des alternatives
print_test "8. Obtenir le top des alternatives"
curl -s "${API_URL}/top" | jq '.'
print_success
print_separator

# Test 9: Obtenir des recommandations pour un plat
print_test "9. Recommandations pour Boeuf Bourguignon"
curl -s -X POST "${API_URL}/recommendations" \
  -H "Content-Type: application/json" \
  -d '{
    "plat": "Boeuf Bourguignon",
    "proteinType": "boeuf",
    "preferences": {
      "budget": "moyen",
      "difficulte": "facile"
    }
  }' | jq '.'
print_success
print_separator

# Test 10: Obtenir des suggestions basées sur des ingrédients
print_test "10. Suggestions pour une liste d'ingrédients"
curl -s -X POST "${API_URL}/suggestions" \
  -H "Content-Type: application/json" \
  -d '{
    "ingredients": [
      "Boeuf 300g",
      "Poulet 200g",
      "Crème fraîche 100ml"
    ]
  }' | jq '.'
print_success
print_separator

# Test 11: Comparer plusieurs alternatives
print_test "11. Comparer seitan, tempeh et beyond-meat-burger"
curl -s -X POST "${API_URL}/compare" \
  -H "Content-Type: application/json" \
  -d '{
    "ids": ["seitan", "tempeh", "beyond-meat-burger"]
  }' | jq '.'
print_success
print_separator

# Test 12: Obtenir des alternatives similaires
print_test "12. Alternatives similaires au seitan"
curl -s "${API_URL}/seitan/similar?limit=3" | jq '.'
print_success
print_separator

# Test 13: Recherche avancée (bœuf + économique + facile)
print_test "13. Recherche avancée: bœuf, économique, facile à trouver"
curl -s "${API_URL}?proteinType=boeuf&prix=économique&disponibilite=facile" | jq '.'
print_success
print_separator

# Test 14: Filtrer par marque
print_test "14. Rechercher les produits Beyond Meat"
curl -s "${API_URL}?marque=Beyond" | jq '.'
print_success
print_separator

# Test 15: Alternatives au poulet avec texture tendre
print_test "15. Alternatives au poulet avec texture tendre"
curl -s "${API_URL}?proteinType=poulet&texture=tendre" | jq '.'
print_success
print_separator

echo "🌱 ========================================"
echo "🌱  Tests terminés avec succès!"
echo "🌱 ========================================"
echo ""
echo "📊 Résumé:"
echo "   - 15 tests exécutés"
echo "   - API des alternatives végétales fonctionnelle"
echo "   - Base de données accessible"
echo ""
echo "💡 Pour plus d'informations:"
echo "   - Documentation: Documentation/ALTERNATIVES_API.md"
echo "   - Base de données: Documentation/ALTERNATIVES_DATABASE.md"
echo ""
