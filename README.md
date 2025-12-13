# 🌱 Hack the Fork

**MVP Hackathon - Alternative Végétale pour Restaurateurs**

Application permettant aux restaurateurs de scanner un menu et obtenir des alternatives végétales pour leurs plats, avec calcul des impacts environnementaux et économiques.

![Hack the Fork](https://img.shields.io/badge/Status-MVP-green)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)

## 🎯 Fonctionnalités

- ✅ **Scan de menu** - Upload d'image avec OCR (Tesseract.js)
- ✅ **Génération d'alternatives végétales** - Via Blackbox AI
- ✅ **Comparaison nutritionnelle** - Protéines, calories, fibres
- ✅ **Impact environnemental** - Calcul des émissions CO2 économisées
- ✅ **Impact économique** - Calcul des économies en €
- ✅ **Score global** - Évaluation de la qualité de l'alternative
- ✅ **Recommandations** - Conseils personnalisés

## 🏗️ Architecture

```
hack_the_fork/
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

```bash
cd backend
npm install
```

### 2. Configuration

Créer un fichier `.env` dans le dossier `backend/` :

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

Ouvrir `frontend/index.html` dans un navigateur ou utiliser un serveur local :

```bash
# Option 1: Python
cd frontend
python -m http.server 5500

# Option 2: Node.js (http-server)
npx http-server frontend -p 5500

# Option 3: VS Code Live Server
# Clic droit sur index.html > "Open with Live Server"
```

Le frontend est accessible sur `http://localhost:5500`

## 📡 API Endpoints

### Health Check
```http
GET /api/menu/health
```

### Scan de Menu
```http
POST /api/menu/scan
Content-Type: multipart/form-data

Body: { menu: <image_file> }
```

### Analyse d'un Plat
```http
POST /api/menu/analyze
Content-Type: application/json

{
  "plat": "Boeuf Bourguignon",
  "ingredients": ["Boeuf 300g", "Carottes 200g", "Vin rouge 200ml"]
}
```

### Analyse Batch
```http
POST /api/menu/batch-analyze
Content-Type: application/json

{
  "plats": [
    { "nom": "Plat 1", "ingredients": [...] },
    { "nom": "Plat 2", "ingredients": [...] }
  ]
}
```

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

```bash
cd backend
npm run dev

# Dans un autre terminal
curl http://localhost:3000/api/menu/health
```

### Test Analyse

```bash
curl -X POST http://localhost:3000/api/menu/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "plat": "Steak Frites",
    "ingredients": ["Boeuf 200g", "Pommes de terre 300g"]
  }'
```

## 📊 Données et Sources

### Émissions CO2
- Source : ADEME (Agence de l'Environnement et de la Maîtrise de l'Énergie)
- Viande rouge : ~20-30 kg CO2eq/kg
- Légumineuses : ~0.5-2 kg CO2eq/kg

### Prix
- Source : Moyennes nationales restauration française
- Données contextuelles via Blackbox AI

### Nutrition
- Source : Tables CIQUAL/USDA
- Calculs via Blackbox AI

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

### Version 1.1 (Post-Hackathon)
- [ ] Authentification utilisateurs
- [ ] Sauvegarde des analyses
- [ ] Export PDF des rapports
- [ ] Intégration OpenFoodFacts
- [ ] Support multi-langues

### Version 2.0
- [ ] Application mobile (React Native)
- [ ] Base de données PostgreSQL
- [ ] Dashboard restaurateur
- [ ] API publique
- [ ] Système de notation communautaire

## 🤝 Contribution

Ce projet est un MVP de hackathon. Les contributions sont les bienvenues !

```bash
# Fork le projet
git clone https://github.com/votre-username/hack-the-fork.git
cd hack-the-fork

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
- **Tesseract.js** - Pour l'OCR open-source
- **ADEME** - Pour les données environnementales
- **Chart.js** - Pour les graphiques

## 📞 Support

Pour toute question ou problème :
- 📧 Email : support@hackthefork.com
- 💬 Discord : [Lien Discord]
- 🐛 Issues : [GitHub Issues](https://github.com/votre-repo/hack-the-fork/issues)

---

**Fait avec 💚 pour un avenir plus durable**

🌱 Hack the Fork - Transformez votre menu en végétal
