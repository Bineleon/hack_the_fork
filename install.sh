#!/bin/bash

echo "🌱 ========================================"
echo "🌱  Hack the Fork - Installation"
echo "🌱 ========================================"
echo ""

# Vérifier Node.js
if ! command -v node &> /dev/null
then
    echo "❌ Node.js n'est pas installé"
    echo "📥 Installez Node.js depuis https://nodejs.org"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"
echo ""

# Installation Backend
echo "📦 Installation des dépendances backend..."
cd backend
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dépendances backend installées"
else
    echo "❌ Erreur lors de l'installation des dépendances"
    exit 1
fi

# Vérifier .env
if [ ! -f .env ]; then
    echo "⚠️  Fichier .env non trouvé"
    echo "📝 Création du fichier .env..."
    cp .env.example .env
    echo "✅ Fichier .env créé"
    echo ""
    echo "⚠️  IMPORTANT: Configurez votre clé API Blackbox dans backend/.env"
    echo "   BLACKBOX_API_KEY=votre_cle_api"
    echo ""
fi

cd ..

echo ""
echo "🌱 ========================================"
echo "🌱  Installation terminée !"
echo "🌱 ========================================"
echo ""
echo "🚀 Pour démarrer l'application:"
echo ""
echo "   1. Backend:"
echo "      cd backend"
echo "      npm run dev"
echo ""
echo "   2. Frontend:"
echo "      Ouvrir frontend/index.html dans un navigateur"
echo "      OU"
echo "      cd frontend && python -m http.server 5500"
echo ""
echo "📖 Documentation: README.md"
echo "🚀 Guide rapide: QUICKSTART.md"
echo ""
