# 🚀 Guide d'Installation et de Test - Hack the Fork

## ⚠️ Prérequis

### 1. Installer Node.js

**Si Node.js n'est pas installé sur votre système :**

**Linux (Ubuntu/Debian) :**
```bash
# Mettre à jour les paquets
sudo apt update

# Installer Node.js et npm
sudo apt install nodejs npm

# Vérifier l'installation
node --version
npm --version
```

**macOS :**
```bash
# Avec Homebrew (recommandé)
brew install node

# Vérifier l'installation
node --version
npm --version
```

**Windows :**
1. Télécharger Node.js depuis : https://nodejs.org/
2. Choisir la version **LTS** (Long Term Support)
3. Exécuter l'installateur
4. Redémarrer votre terminal après l'installation

**Vérifier l'installation :**

**Linux/macOS :**
```bash
node --version
# Devrait afficher : v18.x.x ou v20.x.x

npm --version
# Devrait afficher : 9.x.x ou 10.x.x
```

**Windows :**
```powershell
node --version
npm --version
```

---

## 📦 Installation du Projet

### Étape 1 : Installation Backend

**Linux/macOS :**
```bash
# Aller dans le dossier backend
cd backend

# Installer les dépendances
npm install

# Cela va installer :
# - express, cors, dotenv
# - axios, multer
# - tesseract.js
# - typescript, ts-node-dev
# - @types/* (types TypeScript)
```

**Windows :**
```powershell
# Aller dans le dossier backend
cd backend

# Installer les dépendances
npm install
```

**Temps estimé :** 2-3 minutes

**Résultat attendu :**
```
added 250 packages in 2m
```

### Étape 2 : Configuration

**Linux/macOS :**
```bash
# Le fichier .env existe déjà dans backend/
# Vous pouvez l'éditer pour ajouter votre clé API Blackbox (optionnel)

# Ouvrir le fichier .env avec nano
nano .env

# OU avec vim
vim .env

# Ajouter votre clé API (si vous en avez une)
# BLACKBOX_API_KEY=votre_cle_api_ici
```

**Windows :**
```powershell
# Ouvrir le fichier .env
notepad .env

# Ajouter votre clé API (si vous en avez une)
# BLACKBOX_API_KEY=votre_cle_api_ici
```

**Sans clé API :** L'application fonctionne en mode démo avec des données fictives.

---

## 🧪 Tests Backend

### Test 1 : Compilation TypeScript

```bash
# Dans le dossier backend
npm run build
```

**Résultat attendu :**
- Création du dossier `dist/`
- Aucune erreur de compilation
- Message : "Compilation successful"

**Si erreurs :**
- Vérifier que toutes les dépendances sont installées
- Vérifier les imports dans les fichiers .ts

### Test 2 : Démarrage du Serveur

```bash
# Dans le dossier backend
npm run dev
```

**Résultat attendu :**
```
🌱 ========================================
🌱  Hack the Fork API
🌱 ========================================
🚀 Serveur démarré sur le port 3000
📍 URL: http://localhost:3000
🔧 Environnement: development

📋 Endpoints disponibles:
   GET  http://localhost:3000/
   GET  http://localhost:3000/api/menu/health
   POST http://localhost:3000/api/menu/scan
   POST http://localhost:3000/api/menu/analyze
   POST http://localhost:3000/api/menu/batch-analyze

🌱 ========================================
```

**Si erreurs :**
- Port 3000 déjà utilisé → Changer PORT dans .env
- Module non trouvé → Réinstaller les dépendances

### Test 3 : Health Check

**Ouvrir un NOUVEAU terminal** (laisser le serveur tourner)

**Linux/macOS :**
```bash
# Test avec curl
curl http://localhost:3000/api/menu/health
```

**Windows :**
```powershell
# Test avec Invoke-RestMethod
Invoke-RestMethod -Uri "http://localhost:3000/api/menu/health" -Method Get | ConvertTo-Json
```

**Résultat attendu :**
```json
{
  "status": "ok",
  "services": {
    "ocr": "ready",
    "blackbox": "not_configured"  // ou "connected" si API key configurée
  },
  "version": "1.0.0",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### Test 4 : Analyse d'un Plat

**Linux/macOS :**
```bash
# Envoyer la requête avec curl
curl -X POST http://localhost:3000/api/menu/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "plat": "Boeuf Bourguignon",
    "ingredients": ["Boeuf 300g", "Carottes 200g", "Vin rouge 200ml"]
  }'
```

**Windows :**
```powershell
# Créer le body de la requête
$body = @{
    plat = "Boeuf Bourguignon"
    ingredients = @("Boeuf 300g", "Carottes 200g", "Vin rouge 200ml")
} | ConvertTo-Json

# Envoyer la requête
Invoke-RestMethod -Uri "http://localhost:3000/api/menu/analyze" -Method Post -Body $body -ContentType "application/json" | ConvertTo-Json -Depth 10
```

**Résultat attendu :**
```json
{
  "success": true,
  "data": {
    "plat_original": "Boeuf Bourguignon",
    "alternative_vegetale": {
      "nom": "Bourguignon de Seitan",
      "ingredients": [...],
      "preparation": "..."
    },
    "nutrition": {...},
    "impact_environnemental": {
      "co2_original_kg": 5.4,
      "co2_vegetale_kg": 0.9,
      "gain_co2_kg": 4.5,
      "gain_co2_pourcent": 83
    },
    "impact_economique": {
      "cout_original_euros": 12.50,
      "cout_vegetale_euros": 8.20,
      "economie_euros": 4.30
    },
    "score_global": 92
  }
}
```

**Temps de réponse :**
- Mode démo : 1-2 secondes
- Avec API Blackbox : 5-10 secondes

---

## 🎨 Tests Frontend

### Test 1 : Ouvrir l'Interface

**Option A : Double-clic**
```
1. Aller dans le dossier frontend/
2. Double-cliquer sur index.html
3. L'application s'ouvre dans votre navigateur par défaut
```

**Option B : Serveur local (Recommandé)**

**Linux/macOS :**
```bash
# Avec Python 3
cd frontend
python3 -m http.server 5500

# OU avec Node.js
npx http-server . -p 5500

# Ouvrir http://localhost:5500 dans le navigateur
```

**Windows :**
```powershell
# Avec Python
cd frontend
python -m http.server 5500

# OU avec Node.js
npx http-server . -p 5500

# Ouvrir http://localhost:5500 dans le navigateur
```

### Test 2 : Vérification Visuelle

**Checklist Interface :**
- [ ] Logo et titre "Hack the Fork" visibles
- [ ] Zone d'upload avec icône cloud
- [ ] Formulaire de saisie manuelle
- [ ] Design moderne avec dégradé violet
- [ ] Pas d'erreurs dans la console (F12)

**Si problèmes d'affichage :**
- Vérifier la console (F12) pour les erreurs
- Vérifier que les fichiers CSS et JS sont chargés
- Essayer un autre navigateur (Chrome, Firefox, Edge)

### Test 3 : Saisie Manuelle

```
1. Dans le champ "Plat" : Boeuf Bourguignon
2. Dans "Ingrédients" (optionnel) :
   Boeuf 300g
   Carottes 200g
   Vin rouge 200ml
3. Cliquer sur "Analyser"
4. Attendre 5-10 secondes
5. Vérifier l'affichage des résultats
```

**Résultats attendus :**
- [ ] Loading spinner s'affiche
- [ ] Message "Analyse en cours..."
- [ ] Résultats s'affichent après quelques secondes
- [ ] Alternative végétale visible
- [ ] Graphiques nutritionnels affichés
- [ ] Impact CO2 et économique visibles
- [ ] Score global affiché (0-100)
- [ ] Recommandations listées

### Test 4 : Upload d'Image

```
1. Préparer une image de menu (JPG, PNG)
2. Cliquer sur la zone d'upload OU glisser l'image
3. Attendre l'analyse OCR (10-20 secondes)
4. Vérifier l'extraction des plats
5. Sélectionner un plat pour l'analyser
```

**Note :** L'OCR peut prendre plus de temps selon la qualité de l'image.

### Test 5 : Graphiques

**Vérifier que les graphiques s'affichent :**
- [ ] Graphique en barres (Nutrition)
- [ ] Graphique en donut (CO2)
- [ ] Graphique en barres (Coûts)
- [ ] Animations fluides
- [ ] Légendes visibles

### Test 6 : Actions

**Tester les boutons :**
- [ ] "Télécharger le rapport" → Télécharge un fichier JSON
- [ ] "Partager" → Copie dans le presse-papier
- [ ] "Nouvelle analyse" → Retour au formulaire

---

## 🔍 Tests d'Intégration

### Scénario 1 : Flux Complet (Saisie Manuelle)

```
1. Ouvrir frontend (http://localhost:5500)
2. Vérifier que le backend tourne (http://localhost:3000)
3. Saisir "Poulet Rôti" dans le formulaire
4. Ajouter ingrédients : "Poulet 1.2kg, Thym 20g, Citron 1"
5. Cliquer "Analyser"
6. Attendre les résultats
7. Vérifier tous les éléments affichés
8. Télécharger le rapport
9. Cliquer "Nouvelle analyse"
10. Recommencer avec un autre plat
```

**Temps total :** ~2 minutes par analyse

### Scénario 2 : Flux Complet (Upload Image)

```
1. Préparer une image de menu claire
2. Uploader l'image
3. Attendre l'OCR
4. Vérifier les plats extraits
5. Analyser le premier plat
6. Vérifier les résultats
```

**Temps total :** ~3-4 minutes

### Scénario 3 : Gestion d'Erreurs

**Tester les cas d'erreur :**
- [ ] Backend arrêté → Message d'erreur clair
- [ ] Champ plat vide → Validation
- [ ] Image trop volumineuse → Message d'erreur
- [ ] Timeout API → Gestion gracieuse

---

## 📊 Checklist Complète

### Backend ✅
- [ ] Node.js installé
- [ ] Dépendances installées (`npm install`)
- [ ] Compilation réussie (`npm run build`)
- [ ] Serveur démarre (`npm run dev`)
- [ ] Health check fonctionne
- [ ] Endpoint analyze fonctionne
- [ ] Mode démo fonctionne
- [ ] Avec API Blackbox fonctionne (si configuré)

### Frontend ✅
- [ ] Interface s'affiche correctement
- [ ] Formulaire de saisie fonctionne
- [ ] Upload d'image fonctionne
- [ ] Connexion au backend OK
- [ ] Résultats s'affichent
- [ ] Graphiques s'affichent
- [ ] Téléchargement fonctionne
- [ ] Partage fonctionne
- [ ] Responsive (mobile/tablette)

### Intégration ✅
- [ ] Flux complet saisie manuelle
- [ ] Flux complet upload image
- [ ] Gestion des erreurs
- [ ] Performance acceptable (<15s)
- [ ] Pas d'erreurs console

---

## 🐛 Problèmes Courants

### 1. "npm n'est pas reconnu"
**Solution :** Installer Node.js depuis https://nodejs.org/

### 2. "Port 3000 already in use"
**Solution :** 
```powershell
# Changer le port dans backend/.env
PORT=4000

# Puis mettre à jour frontend/js/app.js
const API_URL = 'http://localhost:4000/api/menu';
```

### 3. "Cannot find module"
**Solution :**
```powershell
cd backend
Remove-Item -Recurse -Force node_modules
npm install
```

### 4. "CORS Error"
**Solution :**
```env
# Dans backend/.env
CORS_ORIGIN=*
```

### 5. "Graphiques ne s'affichent pas"
**Solution :**
- Vérifier la console (F12)
- Vérifier que Chart.js est chargé
- Essayer un autre navigateur

### 6. "OCR ne fonctionne pas"
**Solution :**
- Utiliser une image claire et bien éclairée
- Format JPG ou PNG
- Taille < 10MB
- Texte lisible

---

## 📈 Résultats Attendus

### Performance
- **Health check :** < 100ms
- **Analyse (mode démo) :** 1-2s
- **Analyse (avec API) :** 5-10s
- **OCR :** 10-20s
- **Chargement frontend :** < 2s

### Qualité
- **Alternatives végétales :** Réalistes et savoureuses
- **Calculs CO2 :** Basés sur données ADEME
- **Calculs coûts :** Prix moyens restauration
- **Score global :** 80-95/100 en moyenne

---

## 🎯 Prêt pour le Hackathon

Une fois tous les tests passés :

1. ✅ **Préparer la démo**
   - Tester avec 3-4 plats différents
   - Préparer des images de menus
   - Chronométrer les temps de réponse

2. ✅ **Préparer le pitch**
   - Lire PITCH.md
   - Préparer les slides (optionnel)
   - Répéter la présentation

3. ✅ **Anticiper les questions**
   - Comment ça marche ?
   - Quelle est la précision ?
   - Quel est le business model ?
   - Quelle est la roadmap ?

4. ✅ **Avoir confiance**
   - Vous avez un MVP fonctionnel
   - Documentation complète
   - Impact mesurable
   - Vision claire

---

**Bonne chance pour le hackathon ! 🌱🚀**

**Des questions ? Consultez README.md ou QUICKSTART.md**
