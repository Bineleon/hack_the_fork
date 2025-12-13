# 🏗️ Architecture - Hack the Fork

## 📐 Vue d'Ensemble

```
┌─────────────────────────────────────────────────────────────┐
│                         UTILISATEUR                          │
│                    (Restaurateur)                            │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                      FRONTEND (Web)                          │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  HTML5 + CSS3 + JavaScript                           │  │
│  │  - Upload d'images (drag & drop)                     │  │
│  │  - Saisie manuelle                                   │  │
│  │  - Affichage résultats                               │  │
│  │  - Graphiques (Chart.js)                             │  │
│  └──────────────────────────────────────────────────────┘  │
└────────────────────────┬────────────────────────────────────┘
                         │ HTTP/REST
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                   BACKEND API (Node.js)                      │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Express + TypeScript                                │  │
│  │                                                       │  │
│  │  Routes:                                             │  │
│  │  - POST /api/menu/scan                               │  │
│  │  - POST /api/menu/analyze                            │  │
│  │  - POST /api/menu/batch-analyze                      │  │
│  │  - GET  /api/menu/health                             │  │
│  └──────────────────────────────────────────────────────┘  │
│                         │                                    │
│  ┌──────────────────────┼────────────────────────────────┐  │
│  │                      │                                 │  │
│  ▼                      ▼                                 ▼  │
│  ┌─────────┐    ┌──────────┐    ┌──────────────────┐       │
│  │   OCR   │    │ Blackbox │    │  Prompt Service  │       │
│  │ Service │    │    AI    │    │                  │       │
│  │         │    │ Service  │    │  - Prompts       │       │
│  │Tesseract│    │          │    │  - Templates     │       │
│  └─────────┘    └──────────┘    └──────────────────┘       │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    SERVICES EXTERNES                         │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Blackbox AI API (GPT-4)                             │  │
│  │  - Génération alternatives végétales                 │  │
│  │  - Calcul impacts CO2                                │  │
│  │  - Calcul impacts économiques                        │  │
│  │  - Recommandations                                   │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔄 Flux de Données

### Scénario 1 : Upload d'Image

```
1. Utilisateur upload image
   │
   ▼
2. Frontend → POST /api/menu/scan
   │
   ▼
3. Backend reçoit l'image
   │
   ▼
4. OCR Service (Tesseract.js)
   │ Extraction du texte
   ▼
5. Blackbox AI Service
   │ Extraction des plats
   ▼
6. Retour au Frontend
   │ Liste des plats détectés
   ▼
7. Utilisateur sélectionne un plat
   │
   ▼
8. Frontend → POST /api/menu/analyze
   │
   ▼
9. [Suite du flux d'analyse]
```

### Scénario 2 : Saisie Manuelle

```
1. Utilisateur saisit plat + ingrédients
   │
   ▼
2. Frontend → POST /api/menu/analyze
   │
   ▼
3. Backend reçoit les données
   │
   ▼
4. Prompt Service
   │ Génération du prompt optimisé
   ▼
5. Blackbox AI Service
   │ Appel API avec prompt
   ▼
6. Blackbox AI (GPT-4)
   │ Génération de la réponse JSON
   │ - Alternative végétale
   │ - Nutrition
   │ - Impact CO2
   │ - Impact économique
   │ - Score global
   │ - Recommandations
   ▼
7. Backend parse la réponse
   │
   ▼
8. Retour au Frontend
   │ Données structurées
   ▼
9. Frontend affiche les résultats
   │ - Graphiques
   │ - Comparaisons
   │ - Recommandations
```

---

## 🗂️ Structure des Données

### Request: Analyse d'un Plat

```typescript
POST /api/menu/analyze
{
  "plat": "Boeuf Bourguignon",
  "ingredients": [
    "Boeuf 300g",
    "Carottes 200g",
    "Vin rouge 200ml"
  ],
  "portions": 4  // optionnel
}
```

### Response: Résultat d'Analyse

```typescript
{
  "success": true,
  "data": {
    "plat_original": "Boeuf Bourguignon",
    "ingredients_originaux": [
      { "nom": "Boeuf", "quantite": "300", "unite": "g" },
      { "nom": "Carottes", "quantite": "200", "unite": "g" },
      { "nom": "Vin rouge", "quantite": "200", "unite": "ml" }
    ],
    "alternative_vegetale": {
      "nom": "Bourguignon de Seitan",
      "ingredients": [
        { "nom": "Seitan", "quantite": "250", "unite": "g" },
        { "nom": "Carottes", "quantite": "200", "unite": "g" },
        { "nom": "Vin rouge", "quantite": "200", "unite": "ml" }
      ],
      "preparation": "Faire revenir le seitan...",
      "temps_preparation": "45 min"
    },
    "nutrition": {
      "original": {
        "proteines": 25,
        "calories": 350,
        "fibres": 2
      },
      "vegetale": {
        "proteines": 24,
        "calories": 320,
        "fibres": 8
      },
      "equivalence_pourcent": 95,
      "explication": "Profil nutritionnel très similaire..."
    },
    "impact_environnemental": {
      "co2_original_kg": 5.4,
      "co2_vegetale_kg": 0.9,
      "gain_co2_kg": 4.5,
      "gain_co2_pourcent": 83,
      "explication": "Réduction majeure des émissions..."
    },
    "impact_economique": {
      "cout_original_euros": 12.50,
      "cout_vegetale_euros": 8.20,
      "economie_euros": 4.30,
      "economie_pourcent": 34,
      "explication": "Les protéines végétales..."
    },
    "score_global": 92,
    "recommandations": [
      "Mettre en avant l'aspect environnemental",
      "Proposer une dégustation gratuite",
      "Former le personnel"
    ]
  }
}
```

---

## 🧩 Composants Backend

### 1. Server (server.ts)
```typescript
Responsabilités:
- Initialisation Express
- Configuration CORS
- Enregistrement des routes
- Gestion des erreurs globales
- Logging des requêtes
```

### 2. Routes (menu.routes.ts)
```typescript
Endpoints:
- POST /scan        → Upload et OCR
- POST /analyze     → Analyse d'un plat
- POST /batch       → Analyse multiple
- GET  /health      → État du service

Responsabilités:
- Validation des inputs
- Gestion des uploads
- Orchestration des services
- Formatage des réponses
```

### 3. Services

#### OCR Service (ocr.service.ts)
```typescript
Méthodes:
- extractTextFromImage()  → Extraction texte
- cleanOCRText()          → Nettoyage
- extractPrices()         → Extraction prix
- detectLanguage()        → Détection langue

Technologies:
- Tesseract.js (OCR)
```

#### Blackbox Service (blackbox.service.ts)
```typescript
Méthodes:
- analyzeMenu()           → Analyse complète
- extractMenuFromOCR()    → Extraction plats
- callBlackboxAPI()       → Appel API
- parseJSONResponse()     → Parse réponse
- getDemoResult()         → Mode démo

Technologies:
- Axios (HTTP)
- Blackbox AI API
```

#### Prompt Service (prompt.service.ts)
```typescript
Méthodes:
- buildCompleteAnalysisPrompt()  → Prompt principal
- buildMenuExtractionPrompt()    → Extraction menu
- buildImprovementPrompt()       → Amélioration
- buildMenuSuggestionsPrompt()   → Suggestions

Responsabilités:
- Génération prompts optimisés
- Templates réutilisables
- Instructions claires pour l'IA
```

---

## 🎨 Composants Frontend

### 1. Interface Utilisateur (index.html)
```html
Sections:
- Header (logo, titre)
- Upload Section (drag & drop)
- Manual Input (formulaire)
- Loading Section (spinner)
- Results Section (résultats)
- Footer (liens)
```

### 2. Styles (style.css)
```css
Composants:
- Variables CSS (couleurs, ombres)
- Cards (upload, résultats)
- Grids (comparaisons, impacts)
- Charts (graphiques)
- Animations (loading, transitions)
- Responsive (mobile, tablette, desktop)
```

### 3. Logique (app.js)
```javascript
Fonctions principales:
- handleFileSelect()          → Upload fichier
- handleManualAnalysis()      → Saisie manuelle
- analyzeMenu()               → Appel API
- displayResults()            → Affichage
- createNutritionChart()      → Graphique nutrition
- createCO2Chart()            → Graphique CO2
- createCostChart()           → Graphique coûts
- downloadReport()            → Export JSON
- shareResults()              → Partage

État:
- currentAnalysis             → Résultat actuel
- API_URL                     → URL backend
```

---

## 🔐 Sécurité

### Backend
```
✅ Validation des inputs
✅ Sanitization des uploads
✅ Limitation taille fichiers (10MB)
✅ CORS configuré
✅ Variables d'environnement (.env)
✅ Gestion des erreurs
⚠️  À ajouter: Rate limiting
⚠️  À ajouter: Authentification
```

### Frontend
```
✅ Validation formulaires
✅ Gestion erreurs réseau
✅ Feedback utilisateur
✅ Timeout requêtes
⚠️  À ajouter: CSP headers
⚠️  À ajouter: XSS protection
```

---

## 📊 Performance

### Backend
```
Temps de réponse:
- Health check:     < 100ms
- OCR:              5-20s (selon image)
- Analyse IA:       5-10s
- Total:            10-30s

Optimisations:
✅ Mode démo (pas d'API)
✅ Cache des prompts
✅ Compression réponses
⚠️  À ajouter: Cache Redis
⚠️  À ajouter: Queue jobs
```

### Frontend
```
Chargement:
- HTML/CSS/JS:      < 1s
- Chart.js:         < 500ms
- Total:            < 2s

Optimisations:
✅ CSS minifié
✅ Images optimisées
✅ Lazy loading
⚠️  À ajouter: Service Worker
⚠️  À ajouter: CDN
```

---

## 🚀 Déploiement

### Backend (Options)
```
1. Heroku
   - Facile à déployer
   - Free tier disponible
   - Buildpack Node.js

2. Railway
   - Déploiement Git
   - Variables d'env
   - Logs en temps réel

3. Vercel
   - Serverless functions
   - Edge network
   - CI/CD intégré
```

### Frontend (Options)
```
1. Vercel
   - Déploiement Git
   - HTTPS automatique
   - CDN global

2. Netlify
   - Drag & drop
   - Forms intégrés
   - Analytics

3. GitHub Pages
   - Gratuit
   - Simple
   - Intégration Git
```

---

## 🔄 Évolutions Futures

### Phase 1 (Court terme)
```
- [ ] Base de données (PostgreSQL)
- [ ] Authentification (JWT)
- [ ] Cache (Redis)
- [ ] Tests unitaires
- [ ] CI/CD (GitHub Actions)
```

### Phase 2 (Moyen terme)
```
- [ ] Application mobile (React Native)
- [ ] API publique (Swagger)
- [ ] Dashboard analytics
- [ ] Intégration OpenFoodFacts
- [ ] Multi-langues
```

### Phase 3 (Long terme)
```
- [ ] Marketplace ingrédients
- [ ] Système de notation
- [ ] Intégration caisses
- [ ] White-label
- [ ] IA personnalisée
```

---

## 📚 Technologies Utilisées

### Backend
- **Node.js** 18+ - Runtime JavaScript
- **Express** 4.18 - Framework web
- **TypeScript** 5.3 - Typage statique
- **Tesseract.js** 5.0 - OCR
- **Axios** 1.6 - Client HTTP
- **Multer** 1.4 - Upload fichiers
- **Dotenv** 16.3 - Variables d'env

### Frontend
- **HTML5** - Structure
- **CSS3** - Styles (Grid, Flexbox, Animations)
- **JavaScript** ES6+ - Logique
- **Chart.js** 4.4 - Graphiques
- **Font Awesome** 6.4 - Icônes

### IA
- **Blackbox AI** - API GPT-4
- **Prompt Engineering** - Optimisation

### DevOps
- **Git** - Versioning
- **npm** - Gestion packages
- **ts-node-dev** - Hot reload

---

**Architecture conçue pour être simple, scalable et maintenable** 🏗️
