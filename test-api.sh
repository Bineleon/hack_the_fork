#!/bin/bash

echo "🧪 ========================================"
echo "🧪  Hack the Fork - Tests API"
echo "🧪 ========================================"
echo ""

API_URL="http://localhost:3000/api/menu"

# Test 1: Health Check
echo "📋 Test 1: Health Check"
echo "GET $API_URL/health"
echo ""
curl -s $API_URL/health | json_pp
echo ""
echo "✅ Test 1 terminé"
echo ""

# Test 2: Analyse Simple
echo "📋 Test 2: Analyse d'un plat"
echo "POST $API_URL/analyze"
echo ""
curl -s -X POST $API_URL/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "plat": "Boeuf Bourguignon",
    "ingredients": ["Boeuf 300g", "Carottes 200g", "Vin rouge 200ml"]
  }' | json_pp
echo ""
echo "✅ Test 2 terminé"
echo ""

# Test 3: Analyse avec ingrédients complexes
echo "📋 Test 3: Analyse avec ingrédients détaillés"
echo "POST $API_URL/analyze"
echo ""
curl -s -X POST $API_URL/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "plat": "Poulet Rôti aux Herbes",
    "ingredients": [
      "Poulet fermier 1.2kg",
      "Thym frais 20g",
      "Romarin 15g",
      "Ail 3 gousses",
      "Citron 1 pièce"
    ]
  }' | json_pp
echo ""
echo "✅ Test 3 terminé"
echo ""

echo "🧪 ========================================"
echo "🧪  Tous les tests terminés !"
echo "🧪 ========================================"
