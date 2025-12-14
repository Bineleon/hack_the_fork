# 🔌 Configuration des APIs - Hack the Fork

## 📋 Vue d'Ensemble des APIs

### APIs Utilisées dans le Projet

1. **Blackbox AI** ✅ (OBLIGATOIRE)
   - Génération des alternatives végétales
   - Calcul des impacts CO2 et économiques
   - Recommandations personnalisées

2. **OpenFoodFacts** ⚠️ (OPTIONNEL - Recommandé pour améliorer)
   - Données nutritionnelles réelles
   - Informations sur les produits
   - Scores Nutri-Score

3. **Tesseract.js** ✅ (DÉJÀ INTÉGRÉ)
   - OCR pour scanner les menus
   - Pas besoin de clé API (local)

---

## 🤖 1. Configuration Blackbox AI (OBLIGATOIRE)

### Étape 1 : Obtenir une Clé API

#### Option A : Via le Site Web
```
1. Aller sur https://www.blackbox.ai
2. Créer un compte (gratuit)
3. Se connecter
4. Aller dans "Settings" ou "API Keys"
5. Cliquer sur "Generate New API Key"
6. Copier la clé (format: sk-xxxxxxxxxxxxxxxx)
```

#### Option B : Via l'Extension VSCode
```
1. Installer l'extension Blackbox AI dans VSCode
2. Se connecter avec votre compte
3. Accéder aux paramètres de l'extension
4. Générer une clé API
```

### Étape 2 : Configurer dans le Projet

**Ouvrir le fichier `backend/.env` :**

```env
# Blackbox AI Configuration
BLACKBOX_API_KEY=sk-votre_cle_api_ici
BLACKBOX_API_URL=https://api.blackbox.ai/v1/chat/completions
```

### Étape 3 : Vérifier la Configuration

**Tester la connexion :**

```powershell
# Démarrer le backend
cd backend
npm run dev

# Dans un autre terminal, tester
Invoke-RestMethod -Uri "http://localhost:3000/api/menu/health" -Method Get | ConvertTo-Json
```

**Résultat attendu :**
```json
{
  "status": "ok",
  "services": {
    "ocr": "ready",
    "blackbox": "connected"  // ✅ Doit être "connected"
  }
}
```

### Étape 4 : Tester une Analyse

```powershell
$body = @{
    plat = "Steak Frites"
    ingredients = @("Boeuf 200g", "Pommes de terre 300g")
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/menu/analyze" -Method Post -Body $body -ContentType "application/json" | ConvertTo-Json -Depth 10
```

**Si ça fonctionne :** Vous verrez une alternative végétale générée avec tous les calculs.

**Si erreur :** Vérifier que la clé API est correcte dans `.env`

---

## 🍎 2. OpenFoodFacts (OPTIONNEL mais Recommandé)

### Pourquoi Ajouter OpenFoodFacts ?

**Avantages :**
- ✅ Données nutritionnelles **réelles** et vérifiées
- ✅ Base de données de **2M+ produits**
- ✅ Scores Nutri-Score officiels
- ✅ **Gratuit** et open-source
- ✅ Pas besoin de clé API

**Inconvénients :**
- ⚠️ Nécessite du code supplémentaire
- ⚠️ Tous les ingrédients ne sont pas dans la base
- ⚠️ Temps de développement additionnel

### Décision : Faut-il l'Intégrer ?

**Pour le Hackathon (MVP) :**
```
❌ NON - Pas nécessaire
```

**Raisons :**
1. Blackbox AI fournit déjà des données nutritionnelles estimées
2. Temps limité pour le hackathon
3. L'IA peut générer des valeurs réalistes basées sur ses connaissances
4. Vous pouvez l'ajouter après le hackathon

**Pour la Version Production :**
```
✅ OUI - Fortement recommandé
```

**Raisons :**
1. Données plus précises et vérifiées
2. Crédibilité accrue
3. Conformité réglementaire
4. Meilleure expérience utilisateur

### Si Vous Voulez l'Intégrer Maintenant

Je peux créer un service OpenFoodFacts pour vous. Voulez-vous que je le fasse ?

**Temps estimé :** 30-45 minutes

---

## 🔧 Architecture Actuelle vs Améliorée

### Architecture Actuelle (MVP)

```
Frontend
   ↓
Backend API
   ↓
Blackbox AI ──→ Génère TOUT
   │            - Alternative végétale
   │            - Nutrition (estimée)
   │            - CO2 (données ADEME via IA)
   │            - Coûts (estimés)
   └──→ Résultats
```

**Avantages :**
- ✅ Simple et rapide
- ✅ Une seule API à gérer
- ✅ Fonctionne sans connexion externe supplémentaire

### Architecture Améliorée (avec OpenFoodFacts)

```
Frontend
   ↓
Backend API
   ├──→ OpenFoodFacts ──→ Nutrition RÉELLE
   │                       - Protéines exactes
   │                       - Calories exactes
   │                       - Nutri-Score
   │
   └──→ Blackbox AI ──→ Génère le reste
                        - Alternative végétale
                        - CO2 (avec données réelles)
                        - Coûts
                        - Recommandations
```

**Avantages :**
- ✅ Données nutritionnelles vérifiées
- ✅ Plus crédible
- ✅ Meilleure précision

**Inconvénients :**
- ⚠️ Plus complexe
- ⚠️ Dépendance à 2 APIs
- ⚠️ Temps de développement

---

## 🎯 Recommandation pour le Hackathon

### Configuration Minimale (Recommandée)

```
✅ Blackbox AI uniquement
❌ Pas d'OpenFoodFacts pour l'instant
```

**Pourquoi ?**
1. **Temps limité** : Concentrez-vous sur le MVP fonctionnel
2. **Blackbox AI suffit** : L'IA génère des données réalistes
3. **Moins de bugs** : Moins de dépendances = moins de problèmes
4. **Démo plus fluide** : Une seule API à gérer

### Configuration Complète (Post-Hackathon)

```
✅ Blackbox AI
✅ OpenFoodFacts
✅ Cache Redis (pour performance)
✅ Base de données (pour historique)
```

---

## 📝 Guide de Configuration Rapide

### Configuration Actuelle (Prête à l'Emploi)

**Fichier : `backend/.env`**

```env
# Server
PORT=3000
NODE_ENV=development

# Blackbox AI (OBLIGATOIRE)
BLACKBOX_API_KEY=sk-votre_cle_ici
BLACKBOX_API_URL=https://api.blackbox.ai/v1/chat/completions

# CORS
CORS_ORIGIN=*

# Upload
MAX_FILE_SIZE=10485760
UPLOAD_DIR=uploads
```

**C'est tout ! Aucune autre API n'est nécessaire pour le MVP.**

---

## 🔍 Comment Blackbox AI Génère les Données

### 1. Nutrition
```
L'IA utilise ses connaissances sur :
- Tables nutritionnelles CIQUAL/USDA
- Compositions moyennes des aliments
- Équivalences nutritionnelles

Résultat : Valeurs réalistes et cohérentes
```

### 2. Émissions CO2
```
L'IA se base sur :
- Données ADEME (Agence de l'Environnement)
- Études scientifiques
- Moyennes par catégorie d'aliments

Résultat : Estimations fiables (±10%)
```

### 3. Coûts
```
L'IA estime selon :
- Prix moyens restauration française
- Variations saisonnières
- Catégories de produits

Résultat : Ordres de grandeur corrects
```

---

## 🚀 Étapes de Configuration (Résumé)

### Étape 1 : Obtenir la Clé Blackbox
```
1. Aller sur https://www.blackbox.ai
2. Créer un compte
3. Générer une clé API
4. Copier la clé
```

### Étape 2 : Configurer le Backend
```
1. Ouvrir backend/.env
2. Coller : BLACKBOX_API_KEY=sk-votre_cle
3. Sauvegarder
```

### Étape 3 : Tester
```powershell
cd backend
npm install
npm run dev
```

### Étape 4 : Vérifier
```
Ouvrir http://localhost:3000/api/menu/health
Vérifier : "blackbox": "connected"
```

---

## ❓ FAQ

### Q1 : Blackbox AI est-il gratuit ?
**R :** Oui, il y a un plan gratuit avec des limites. Pour le hackathon, c'est largement suffisant.

### Q2 : Que se passe-t-il sans clé API ?
**R :** L'application fonctionne en "mode démo" avec des données fictives mais réalistes.

### Q3 : OpenFoodFacts est-il vraiment nécessaire ?
**R :** Non pour le MVP. Oui pour la production. Blackbox AI suffit pour le hackathon.

### Q4 : Puis-je utiliser une autre IA ?
**R :** Oui, mais il faudra adapter le code. Blackbox AI est recommandé car il est optimisé pour ce cas d'usage.

### Q5 : Comment obtenir des données plus précises ?
**R :** Après le hackathon, intégrez OpenFoodFacts pour les données nutritionnelles réelles.

---

## 🎨 Exemple de Réponse Blackbox AI

**Prompt envoyé :**
```
Analyse ce plat et fournis une alternative végétale :
- Plat : Boeuf Bourguignon
- Ingrédients : Boeuf 300g, Carottes 200g, Vin rouge 200ml
```

**Réponse reçue :**
```json
{
  "alternative_vegetale": {
    "nom": "Bourguignon de Seitan",
    "ingredients": [
      {"nom": "Seitan", "quantite": "250", "unite": "g"},
      {"nom": "Carottes", "quantite": "200", "unite": "g"},
      {"nom": "Vin rouge", "quantite": "200", "unite": "ml"}
    ],
    "preparation": "Faire mariner le seitan..."
  },
  "nutrition": {
    "original": {"proteines": 25, "calories": 350, "fibres": 2},
    "vegetale": {"proteines": 24, "calories": 320, "fibres": 8},
    "equivalence_pourcent": 95
  },
  "impact_environnemental": {
    "co2_original_kg": 5.4,
    "co2_vegetale_kg": 0.9,
    "gain_co2_kg": 4.5,
    "gain_co2_pourcent": 83
  },
  "impact_economique": {
    "cout_original_euros": 12.50,
    "cout_vegetale_euros": 8.20,
    "economie_euros": 4.30,
    "economie_pourcent": 34
  }
}
```

**Tout est généré par l'IA en une seule requête !**

---

## 🎯 Conclusion

### Pour le Hackathon (Maintenant)
```
✅ Configurer Blackbox AI uniquement
❌ Ne pas ajouter OpenFoodFacts
✅ Se concentrer sur la démo
✅ Préparer le pitch
```

### Pour la Production (Après)
```
✅ Garder Blackbox AI
✅ Ajouter OpenFoodFacts
✅ Ajouter cache Redis
✅ Ajouter base de données
✅ Ajouter authentification
```

---

**Besoin d'aide pour configurer ? Suivez les étapes ci-dessus ou consultez INSTALLATION_GUIDE.md**

**Voulez-vous que je crée le service OpenFoodFacts maintenant ? Répondez "oui" ou "non".**
