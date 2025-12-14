# 🌱 EZVG - Easy Veggie

**Simplifiez votre transition végétale**

Application permettant aux restaurateurs de scanner un menu et obtenir des alternatives végétales pour leurs plats, avec calcul des impacts environnementaux et économiques.

![EZVG](https://img.shields.io/badge/Status-MVP-green)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)

## 🎯 Fonctionnalités

### Core Features
- ✅ **Scan de menu** - Upload d'image avec OCR (Tesseract.js)
- ✅ **Génération d'alternatives végétales** - Via Blackbox AI enrichi
- ✅ **Comparaison nutritionnelle** - Protéines, calories, fibres
- ✅ **Impact environnemental** - Calcul des émissions CO2 économisées
- ✅ **Impact économique** - Calcul des économies en €
- ✅ **Score global** - Évaluation de la qualité de l'alternative
- ✅ **Recommandations** - Conseils personnalisés

### 🆕 Nouvelles Fonctionnalités (v2.0)
- ✅ **Base de données d'alternatives** - 20+ alternatives végétales documentées
- ✅ **API de recherche avancée** - Filtres multiples et recommandations intelligentes
- ✅ **Intégration Open Food Facts** - Enrichissement avec données réelles
- ✅ **Alternative Protein Companies** - 10+ entreprises référencées
- ✅ **Recommandations IA enrichies** - Basées sur données réelles et scoring intelligent
- ✅ **Comparaison de produits** - Analyse comparative détaillée
- ✅ **Suggestions automatiques** - Détection des ingrédients et suggestions adaptées

## 🏗️ Architecture

```
ezvg/
├── backend/                    # API Node.js + TypeScript
│   ├── src/
│   │   ├── server.ts          # Serveur Express
│   │   ├── routes/            # Routes API
│   │   ├── services/          # Services (OCR, Blackbox AI)
│   │   └── types/             # Types TypeScript
│   ├── package.json
│   └── tsconfig.json
├── frontend/                   # Interface web
│   ├── index.html
│   ├── css/style.css
│   └── js/app.js
└── README.md
```

## 🚀 Installation Rapide

### Prérequis

- Node.js 18+ et npm
- Clé API Blackbox AI (optionnel - mode démo disponible)

### 1. Installation Backend

**Linux/macOS :**
```bash
cd backend
npm install
```

**Windows :**
```powershell
cd backend
npm install
```

### 2. Configuration

**Linux/macOS :**
```bash
# Créer le fichier .env dans backend/
cd backend
cp .env.example .env

# Éditer avec votre éditeur préféré
nano .env
# OU
vim .env
```

**Windows :**
```powershell
# Créer le fichier .env dans backend/
cd backend
Copy-Item .env.example .env

# Éditer
notepad .env
```

Contenu du fichier `.env` :
```env
PORT=3000
NODE_ENV=development
BLACKBOX_API_KEY=votre_cle_api_blackbox
BLACKBOX_API_URL=https://api.blackbox.ai/v1/chat/completions
CORS_ORIGIN=*
MAX_FILE_SIZE=10485760
UPLOAD_DIR=uploads
```

> **Note**: Sans clé API Blackbox, l'application fonctionne en mode démo avec des données fictives.

### 3. Démarrage Backend

```bash
cd backend
npm run dev
```

Le serveur démarre sur `http://localhost:3000`

### 4. Démarrage Frontend

**Option 1: Double-clic (Simple)**
```bash
# Ouvrir frontend/index.html dans votre navigateur
```

**Option 2: Serveur local (Recommandé)**

**Linux/macOS :**
```bash
cd frontend
python3 -m http.server 5500
# OU
npx http-server . -p 5500
```

**Windows :**
```powershell
cd frontend
python -m http.server 5500
# OU
npx http-server . -p 5500
```

**Option 3: VS Code Live Server**
```
Clic droit sur index.html > "Open with Live Server"
```

Le frontend est accessible sur `http://localhost:5500`

## 📡 API Endpoints

### Menu Analysis
```http
GET  /api/menu/health                    # Health check
POST /api/menu/scan                      # Scan menu image (OCR)
POST /api/menu/analyze                   # Analyze single dish
POST /api/menu/batch-analyze             # Analyze multiple dishes
```

### 🆕 Alternatives Database
```http
GET  /api/alternatives                   # List all alternatives (with filters)
GET  /api/alternatives/:id               # Get alternative details
GET  /api/alternatives/protein/:type     # Get alternatives by protein type
GET  /api/alternatives/:id/similar       # Get similar alternatives
GET  /api/alternatives/stats             # Database statistics
GET  /api/alternatives/top               # Top alternatives by category
GET  /api/alternatives/protein-types     # Available protein types
POST /api/alternatives/recommendations   # Personalized recommendations
POST /api/alternatives/compare           # Compare multiple alternatives
POST /api/alternatives/suggestions       # Suggestions from ingredients
```

### 🆕 External Data (Open Food Facts, Companies)
```http
GET    /api/external/search-products        # Search Open Food Facts
GET    /api/external/product/:barcode       # Get product by barcode
GET    /api/external/vegan-alternatives/:type # Search vegan alternatives
POST   /api/external/enrich-alternative     # Enrich alternative data
GET    /api/external/companies              # List protein companies
POST   /api/external/ai-recommendations     # AI-enriched recommendations
GET    /api/external/cache/stats            # Cache statistics
DELETE /api/external/cache                  # Clear cache
```

**📖 Documentation complète**: [API Documentation](Documentation/ALTERNATIVES_API.md)

## 🎨 Utilisation

### 1. Scanner un Menu

1. Cliquez sur la zone d'upload ou glissez une image
2. L'OCR extrait automatiquement les plats
3. L'IA génère les alternatives végétales

### 2. Saisie Manuelle

1. Entrez le nom du plat
2. (Optionnel) Ajoutez les ingrédients
3. Cliquez sur "Analyser"

### 3. Résultats

- **Alternative végétale** avec recette complète
- **Comparaison nutritionnelle** avec graphiques
- **Impact CO2** : Émissions économisées
- **Impact économique** : Économies en €
- **Score global** : Qualité de l'alternative (0-100)
- **Recommandations** : Conseils personnalisés

## 🤖 Configuration Blackbox AI

### Obtenir une Clé API

1. Créer un compte sur [Blackbox AI](https://www.blackbox.ai)
2. Générer une clé API
3. Ajouter la clé dans `.env`

### Prompts Optimisés

Les prompts sont configurés dans `backend/src/services/prompt.service.ts` pour :
- Générer des alternatives végétales réalistes
- Calculer les impacts environnementaux (données ADEME)
- Estimer les coûts (prix moyens restauration)
- Fournir des recommandations contextuelles

## 🧪 Tests

### Test Backend

**Linux/macOS :**
```bash
cd backend
npm run dev

# Dans un autre terminal
curl http://localhost:3000/api/menu/health
```

**Windows :**
```powershell
cd backend
npm run dev

# Dans un autre terminal PowerShell
Invoke-RestMethod -Uri "http://localhost:3000/api/menu/health" -Method Get | ConvertTo-Json
```

### Test Analyse

**Linux/macOS :**
```bash
curl -X POST http://localhost:3000/api/menu/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "plat": "Steak Frites",
    "ingredients": ["Boeuf 200g", "Pommes de terre 300g"]
  }'
```

**Windows :**
```powershell
$body = @{
    plat = "Steak Frites"
    ingredients = @("Boeuf 200g", "Pommes de terre 300g")
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/menu/analyze" -Method Post -Body $body -ContentType "application/json" | ConvertTo-Json -Depth 10
```

### Scripts de Test Automatiques

**Linux/macOS :**
```bash
# Installation automatique
./install.sh

# Tests API complets
./test-api.sh
```

**Windows :**
```powershell
# Installation automatique
.\install.ps1

# Tests API complets
.\test-api.ps1
```

## 📊 Données et Sources

### Base de Données d'Alternatives
- **20+ alternatives végétales** documentées en détail
- **8 types de protéines** couverts (bœuf, poulet, porc, poisson, œuf, lait, etc.)
- **Informations complètes**: goût, texture, nutrition, prix, préparation, disponibilité
- **Produits**: Seitan, Tempeh, Tofu, Jackfruit, PST, Beyond Meat, Heura, La Vie, etc.

### Émissions CO2
- Source : ADEME (Agence de l'Environnement et de la Maîtrise de l'Énergie)
- Viande rouge : ~20-30 kg CO2eq/kg
- Légumineuses : ~0.5-2 kg CO2eq/kg

### Prix
- Source : Moyennes nationales restauration française
- Données contextuelles via Blackbox AI
- Prix réels des alternatives végétales

### Nutrition
- Source : Tables CIQUAL/USDA
- **Open Food Facts** : 2M+ produits alimentaires
- Calculs enrichis via Blackbox AI

### Entreprises
- **10+ entreprises** de protéines alternatives référencées
- Beyond Meat, Heura, La Vie, Impossible Foods, Oatly, Tossolia, etc.
- Informations: produits, sources de protéines, pays, sites web

**📖 Catalogue complet**: [Alternatives Database](Documentation/ALTERNATIVES_DATABASE.md)

## 🛠️ Technologies

### Backend
- **Node.js** + **Express** - Serveur API
- **TypeScript** - Typage statique
- **Tesseract.js** - OCR pour extraction de texte
- **Axios** - Requêtes HTTP
- **Multer** - Upload de fichiers

### Frontend
- **HTML5** + **CSS3** + **JavaScript**
- **Chart.js** - Graphiques interactifs
- **Font Awesome** - Icônes
- **Fetch API** - Communication avec le backend

### IA
- **Blackbox AI** - Génération d'alternatives et calculs

## 🚧 Roadmap

### ✅ Version 2.0 (Actuelle)
- ✅ Base de données d'alternatives végétales (20+)
- ✅ API de recherche et recommandations
- ✅ Intégration Open Food Facts
- ✅ Alternative Protein Companies Database
- ✅ Recommandations IA enrichies
- ✅ Système de comparaison de produits

### Version 2.1 (En cours)
- [ ] Ajouter 30+ alternatives supplémentaires
- [ ] Photos des produits
- [ ] Recettes détaillées pour chaque alternative
- [ ] Système de notation par utilisateurs
- [ ] Intégration CIQUAL (données françaises)

### Version 3.0 (Futur)
- [ ] Application mobile (React Native)
- [ ] Base de données PostgreSQL
- [ ] Dashboard restaurateur avancé
- [ ] Machine Learning pour recommandations
- [ ] Marketplace intégrée
- [ ] API publique avec authentification
- [ ] Support multi-langues complet

## 🤝 Contribution

Ce projet est un MVP de hackathon. Les contributions sont les bienvenues !

**Linux/macOS :**
```bash
# Fork le projet
git clone https://github.com/votre-username/ezvg.git
cd ezvg

# Créer une branche
git checkout -b feature/ma-fonctionnalite

# Commit et push
git commit -m "Ajout de ma fonctionnalité"
git push origin feature/ma-fonctionnalite

# Créer une Pull Request
```

**Windows :**
```powershell
# Fork le projet
git clone https://github.com/votre-username/ezvg.git
cd ezvg

# Créer une branche
git checkout -b feature/ma-fonctionnalite

# Commit et push
git commit -m "Ajout de ma fonctionnalité"
git push origin feature/ma-fonctionnalite

# Créer une Pull Request
```

## 📝 License

MIT License - Voir [LICENSE](LICENSE) pour plus de détails.

## 👥 Équipe

Développé lors du Hackathon [Nom du Hackathon] 2024

## 🙏 Remerciements

- **Blackbox AI** - Pour l'API d'intelligence artificielle
- **Open Food Facts** - Pour la base de données alimentaire mondiale
- **Tesseract.js** - Pour l'OCR open-source
- **ADEME** - Pour les données environnementales
- **Chart.js** - Pour les graphiques
- **Alternative Protein Companies** - Pour les données sur les entreprises

## 📞 Support

Pour toute question ou problème :
- 📧 Email : support@ezvg.app
- 💬 Discord : [Lien Discord]
- 🐛 Issues : [GitHub Issues](https://github.com/votre-repo/ezvg/issues)

---

**Fait avec 💚 pour un avenir plus durable**

🌱 EZVG - Easy Veggie - Simplifiez votre transition végétale
