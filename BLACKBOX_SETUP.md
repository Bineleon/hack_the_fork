# 🔑 Guide Complet - Configuration Blackbox AI

## 🎯 Objectif

Obtenir une clé API Blackbox AI et la configurer dans votre projet en **5 minutes**.

---

## 📋 Méthode 1 : Via le Site Web (Recommandé)

### Étape 1 : Créer un Compte

```
1. Ouvrir votre navigateur
2. Aller sur : https://www.blackbox.ai
3. Cliquer sur "Sign Up" ou "Get Started"
4. Choisir une méthode d'inscription :
   - Email + Mot de passe
   - Google Account
   - GitHub Account
```

### Étape 2 : Accéder aux Paramètres

```
1. Une fois connecté, cliquer sur votre profil (coin supérieur droit)
2. Sélectionner "Settings" ou "Paramètres"
3. Chercher la section "API" ou "Developer"
4. Cliquer sur "API Keys" ou "Clés API"
```

### Étape 3 : Générer une Clé

```
1. Cliquer sur "Generate New API Key" ou "Créer une clé"
2. Donner un nom à la clé : "Hack the Fork - Hackathon"
3. Sélectionner les permissions (si demandé) :
   ✅ Chat Completions
   ✅ Text Generation
4. Cliquer sur "Create" ou "Générer"
```

### Étape 4 : Copier la Clé

```
⚠️ IMPORTANT : La clé ne sera affichée qu'UNE SEULE FOIS !

Format de la clé : sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

1. Cliquer sur "Copy" ou copier manuellement
2. Sauvegarder dans un endroit sûr (Notepad, etc.)
3. NE PAS partager cette clé publiquement
```

---

## 📋 Méthode 2 : Via l'Extension VSCode

### Étape 1 : Installer l'Extension

```
1. Ouvrir VSCode
2. Aller dans Extensions (Ctrl+Shift+X)
3. Chercher "Blackbox AI"
4. Cliquer sur "Install"
```

### Étape 2 : Se Connecter

```
1. Une fois installée, cliquer sur l'icône Blackbox dans la barre latérale
2. Cliquer sur "Sign In" ou "Se connecter"
3. Autoriser l'extension à accéder à votre compte
```

### Étape 3 : Obtenir la Clé

```
1. Dans l'extension, aller dans Settings
2. Chercher "API Key" ou "Clé API"
3. Cliquer sur "Generate" ou "Générer"
4. Copier la clé générée
```

---

## 🔧 Configuration dans le Projet

### Étape 1 : Localiser le Fichier .env

```
Chemin : hack_the_fork/backend/.env

Si le fichier n'existe pas :
1. Copier backend/.env.example
2. Renommer en .env
```

### Étape 2 : Ouvrir le Fichier

**Avec VSCode :**
```
1. Ouvrir VSCode
2. File > Open Folder > Sélectionner hack_the_fork
3. Dans l'explorateur, aller dans backend/
4. Double-cliquer sur .env
```

**Avec Notepad :**
```
1. Naviguer vers hack_the_fork/backend/
2. Clic droit sur .env
3. Ouvrir avec > Notepad
```

### Étape 3 : Coller la Clé

**Avant :**
```env
# Blackbox AI API Configuration
BLACKBOX_API_KEY=
BLACKBOX_API_URL=https://api.blackbox.ai/v1/chat/completions
```

**Après :**
```env
# Blackbox AI API Configuration
BLACKBOX_API_KEY=sk-votre_cle_api_ici_xxxxxxxxxxxxxxxxxx
BLACKBOX_API_URL=https://api.blackbox.ai/v1/chat/completions
```

### Étape 4 : Sauvegarder

```
1. Ctrl+S (ou File > Save)
2. Fermer le fichier
```

---

## ✅ Vérification de la Configuration

### Test 1 : Vérifier le Fichier .env

```powershell
# Afficher le contenu du fichier .env
cd backend
Get-Content .env
```

**Résultat attendu :**
```
PORT=3000
NODE_ENV=development
BLACKBOX_API_KEY=sk-xxxxxxxxxxxxxxxxxx  # ✅ Doit contenir votre clé
BLACKBOX_API_URL=https://api.blackbox.ai/v1/chat/completions
...
```

### Test 2 : Démarrer le Serveur

```powershell
cd backend
npm install  # Si pas encore fait
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
```

**Si erreur "BLACKBOX_API_KEY non configurée" :**
- Vérifier que la clé est bien dans .env
- Vérifier qu'il n'y a pas d'espace avant/après la clé
- Redémarrer le serveur

### Test 3 : Health Check

**Ouvrir un NOUVEAU terminal :**

```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/menu/health" -Method Get | ConvertTo-Json
```

**Résultat attendu :**
```json
{
  "status": "ok",
  "services": {
    "ocr": "ready",
    "blackbox": "connected"  // ✅ Doit être "connected"
  },
  "version": "1.0.0"
}
```

**Si "blackbox": "not_configured" :**
- La clé n'est pas détectée
- Vérifier le fichier .env
- Redémarrer le serveur

**Si "blackbox": "error" :**
- La clé est invalide ou expirée
- Générer une nouvelle clé
- Vérifier votre compte Blackbox AI

### Test 4 : Analyse Complète

```powershell
$body = @{
    plat = "Boeuf Bourguignon"
    ingredients = @("Boeuf 300g", "Carottes 200g")
} | ConvertTo-Json

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
      "ingredients": [...]
    },
    "nutrition": {...},
    "impact_environnemental": {
      "co2_original_kg": 5.4,
      "co2_vegetale_kg": 0.9,
      "gain_co2_kg": 4.5
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

**Si ça fonctionne : 🎉 Configuration réussie !**

---

## 🔒 Sécurité de la Clé API

### ✅ Bonnes Pratiques

```
✅ Garder la clé dans .env (jamais dans le code)
✅ Ajouter .env au .gitignore (déjà fait)
✅ Ne jamais commit la clé sur Git
✅ Ne pas partager la clé publiquement
✅ Régénérer la clé si compromise
```

### ❌ À Éviter

```
❌ Mettre la clé directement dans le code
❌ Commit .env sur GitHub
❌ Partager la clé sur Discord/Slack
❌ Utiliser la même clé en production
❌ Laisser la clé dans les screenshots
```

### 🔄 Régénération de la Clé

**Si la clé est compromise :**
```
1. Aller sur https://www.blackbox.ai
2. Settings > API Keys
3. Cliquer sur "Revoke" sur l'ancienne clé
4. Générer une nouvelle clé
5. Mettre à jour backend/.env
6. Redémarrer le serveur
```

---

## 🆓 Plans Blackbox AI

### Plan Gratuit (Free)
```
✅ Parfait pour le hackathon
✅ Limites :
   - 100 requêtes/jour
   - 10 requêtes/minute
   - Modèle GPT-3.5 ou GPT-4 (selon disponibilité)

Pour le hackathon : LARGEMENT SUFFISANT
```

### Plan Pro (Payant)
```
💰 ~20-30€/mois
✅ Avantages :
   - Requêtes illimitées
   - Priorité sur les requêtes
   - Accès GPT-4 garanti
   - Support prioritaire

Pour le hackathon : PAS NÉCESSAIRE
```

---

## 🐛 Problèmes Courants

### Problème 1 : "API Key not found"

**Cause :** Le fichier .env n'est pas lu

**Solution :**
```powershell
# Vérifier que .env existe
cd backend
Test-Path .env  # Doit retourner True

# Vérifier le contenu
Get-Content .env

# Redémarrer le serveur
npm run dev
```

### Problème 2 : "Invalid API Key"

**Cause :** La clé est incorrecte ou expirée

**Solution :**
```
1. Vérifier qu'il n'y a pas d'espace dans la clé
2. Vérifier que la clé commence par "sk-"
3. Régénérer une nouvelle clé sur blackbox.ai
4. Mettre à jour .env
```

### Problème 3 : "Rate limit exceeded"

**Cause :** Trop de requêtes (limite gratuite)

**Solution :**
```
1. Attendre quelques minutes
2. Réduire la fréquence des tests
3. Utiliser le mode démo temporairement
4. Upgrader vers le plan Pro (si nécessaire)
```

### Problème 4 : "Connection timeout"

**Cause :** Problème réseau ou API Blackbox down

**Solution :**
```
1. Vérifier votre connexion internet
2. Vérifier le statut de Blackbox AI
3. Réessayer dans quelques minutes
4. Utiliser le mode démo temporairement
```

---

## 🎭 Mode Démo (Sans Clé API)

### Quand l'Utiliser ?

```
✅ Pour tester l'interface
✅ Pour la démo si problème API
✅ Pour développer sans consommer de crédits
✅ Pour montrer le concept
```

### Comment l'Activer ?

**C'est automatique !**

```env
# Dans backend/.env
BLACKBOX_API_KEY=   # Laisser vide
```

**Le serveur détectera automatiquement l'absence de clé et utilisera le mode démo.**

### Différences Mode Démo vs API Réelle

| Fonctionnalité | Mode Démo | API Réelle |
|----------------|-----------|------------|
| Alternatives végétales | ✅ Prédéfinies | ✅ Générées par IA |
| Nutrition | ✅ Valeurs fixes | ✅ Calculées |
| CO2 | ✅ Valeurs fixes | ✅ Calculées |
| Coûts | ✅ Valeurs fixes | ✅ Calculés |
| Recommandations | ✅ Génériques | ✅ Personnalisées |
| Temps de réponse | ⚡ Instantané | 🕐 5-10s |

---

## 📊 Monitoring de l'Utilisation

### Vérifier les Crédits Restants

```
1. Aller sur https://www.blackbox.ai
2. Se connecter
3. Dashboard > Usage ou Utilisation
4. Voir les statistiques :
   - Requêtes utilisées aujourd'hui
   - Requêtes restantes
   - Historique
```

### Optimiser l'Utilisation

```
✅ Utiliser le mode démo pour les tests
✅ Tester avec des données réelles seulement avant la démo
✅ Mettre en cache les résultats (post-hackathon)
✅ Limiter les requêtes pendant le développement
```

---

## 🎯 Checklist Finale

### Avant le Hackathon

- [ ] Compte Blackbox AI créé
- [ ] Clé API générée
- [ ] Clé configurée dans backend/.env
- [ ] Serveur démarre sans erreur
- [ ] Health check retourne "connected"
- [ ] Test d'analyse fonctionne
- [ ] Mode démo testé (backup)

### Pendant le Hackathon

- [ ] Vérifier les crédits restants
- [ ] Avoir le mode démo prêt (backup)
- [ ] Tester avant chaque démo
- [ ] Monitorer les erreurs

### Après le Hackathon

- [ ] Analyser l'utilisation
- [ ] Décider si upgrade nécessaire
- [ ] Régénérer la clé (sécurité)
- [ ] Ajouter cache Redis

---

## 📞 Support

### Si Problème avec Blackbox AI

**Support Blackbox :**
- 📧 Email : support@blackbox.ai
- 💬 Discord : [Lien dans l'app]
- 📖 Docs : https://docs.blackbox.ai

**Support Projet :**
- 📖 Voir INSTALLATION_GUIDE.md
- 📖 Voir API_CONFIGURATION.md
- 🐛 Créer une issue GitHub

---

## ✅ Résumé en 5 Étapes

```
1️⃣ Créer compte sur blackbox.ai
2️⃣ Générer clé API
3️⃣ Coller dans backend/.env
4️⃣ Démarrer serveur (npm run dev)
5️⃣ Tester (health check + analyse)
```

**Temps total : 5 minutes ⏱️**

---

**Configuration terminée ? Passez à INSTALLATION_GUIDE.md pour tester l'application complète !**
