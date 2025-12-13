# 🚀 Guide de Démarrage Rapide - Hack the Fork

## ⏱️ Installation en 5 minutes

### Étape 1 : Cloner le projet (si applicable)
```bash
git clone https://github.com/votre-repo/hack-the-fork.git
cd hack-the-fork
```

### Étape 2 : Installer les dépendances Backend
```bash
cd backend
npm install
```

### Étape 3 : Configuration (Optionnel)
```bash
# Copier le fichier d'exemple
cp .env.example .env

# Éditer .env et ajouter votre clé API Blackbox (optionnel)
# Sans clé API, l'app fonctionne en mode démo
```

### Étape 4 : Démarrer le Backend
```bash
npm run dev
```

✅ Le backend est maintenant accessible sur `http://localhost:3000`

### Étape 5 : Ouvrir le Frontend

**Option A - Simple (Double-clic)**
```bash
# Ouvrir frontend/index.html dans votre navigateur
```

**Option B - Serveur local (Recommandé)**
```bash
# Dans un nouveau terminal
cd frontend
python -m http.server 5500
# OU
npx http-server . -p 5500
```

✅ Le frontend est maintenant accessible sur `http://localhost:5500`

---

## 🎯 Premier Test

### Test 1 : Saisie Manuelle

1. Ouvrir `http://localhost:5500`
2. Dans la section "Saisie manuelle" :
   - **Plat** : `Boeuf Bourguignon`
   - **Ingrédients** (optionnel) : 
     ```
     Boeuf 300g
     Carottes 200g
     Vin rouge 200ml
     ```
3. Cliquer sur **"Analyser"**
4. Attendre 5-10 secondes
5. ✨ Voir les résultats !

### Test 2 : Scan d'Image

1. Préparer une image de menu (ou utiliser une photo de menu)
2. Cliquer sur la zone d'upload
3. Sélectionner l'image
4. L'OCR extrait automatiquement les plats
5. ✨ Voir les résultats !

---

## 🔧 Résolution de Problèmes

### ❌ "Cannot find module 'express'"
```bash
cd backend
npm install
```

### ❌ "API non disponible"
```bash
# Vérifier que le backend est démarré
cd backend
npm run dev

# Vérifier l'URL dans frontend/js/app.js
# Doit être : const API_URL = 'http://localhost:3000/api/menu';
```

### ❌ "CORS Error"
```bash
# Vérifier le fichier backend/.env
# CORS_ORIGIN=*
# OU
# CORS_ORIGIN=http://localhost:5500
```

### ⚠️ Mode Démo (Sans API Blackbox)
Si vous n'avez pas de clé API Blackbox, l'application fonctionne en mode démo avec des données fictives mais réalistes.

Pour obtenir une clé API :
1. Aller sur https://www.blackbox.ai
2. Créer un compte
3. Générer une clé API
4. Ajouter dans `backend/.env` : `BLACKBOX_API_KEY=votre_cle`

---

## 📊 Vérification de l'Installation

### Backend
```bash
# Test de santé
curl http://localhost:3000/api/menu/health

# Devrait retourner :
# {"status":"ok","services":{"ocr":"ready","blackbox":"..."},...}
```

### Frontend
Ouvrir `http://localhost:5500` dans le navigateur
- ✅ Voir le logo et le titre "Hack the Fork"
- ✅ Voir la zone d'upload
- ✅ Voir le formulaire de saisie manuelle

---

## 🎨 Personnalisation Rapide

### Changer le Port Backend
```bash
# backend/.env
PORT=4000
```

### Changer l'URL de l'API dans le Frontend
```javascript
// frontend/js/app.js (ligne 2)
const API_URL = 'http://localhost:4000/api/menu';
```

### Changer les Couleurs
```css
/* frontend/css/style.css (lignes 2-10) */
:root {
    --primary-color: #10b981;  /* Vert principal */
    --secondary-color: #3b82f6; /* Bleu secondaire */
    /* ... */
}
```

---

## 📝 Commandes Utiles

### Backend
```bash
# Développement (avec hot-reload)
npm run dev

# Build production
npm run build

# Démarrer en production
npm start
```

### Logs
```bash
# Voir les logs du backend
cd backend
npm run dev

# Les logs s'affichent dans le terminal :
# 🚀 Serveur démarré sur le port 3000
# 🔍 Analyse du plat: Boeuf Bourguignon
# ✅ Analyse terminée avec succès
```

---

## 🎯 Prochaines Étapes

1. ✅ Tester avec différents plats
2. ✅ Essayer le scan d'image
3. ✅ Explorer les graphiques et statistiques
4. ✅ Télécharger un rapport
5. 🚀 Déployer en production (voir README.md)

---

## 💡 Astuces

### Performance
- L'OCR peut prendre 10-20 secondes selon la qualité de l'image
- L'analyse IA prend 5-10 secondes
- Utilisez des images claires et bien éclairées pour de meilleurs résultats

### Meilleurs Résultats
- **Images** : Haute résolution, texte lisible, bon éclairage
- **Plats** : Noms complets et descriptifs
- **Ingrédients** : Format "Nom Quantité Unité" (ex: "Boeuf 300g")

### Mode Démo
Le mode démo génère des données réalistes basées sur :
- Moyennes ADEME pour le CO2
- Prix moyens restauration française
- Valeurs nutritionnelles standards

---

## 🆘 Besoin d'Aide ?

- 📖 Documentation complète : [README.md](README.md)
- 🐛 Problèmes : Créer une issue sur GitHub
- 💬 Questions : support@hackthefork.com

---

**Bon hackathon ! 🌱**
