# 🔧 Guide de Dépannage - Hack the Fork

## 🚨 Problème : Modules non reconnus après npm install

### Symptômes
```
❌ Cannot find module 'express'
❌ Cannot find module 'multer'
❌ Cannot find module 'path'
❌ Cannot find module 'fs'
❌ Cannot find name 'console'
❌ Cannot find name 'process'
```

---

## ✅ Solution Complète (Étape par Étape)

### Étape 1 : Vérifier Node.js et npm

**Linux/macOS :**
```bash
# Vérifier les versions
node --version
# Doit afficher : v18.x.x ou v20.x.x

npm --version
# Doit afficher : 9.x.x ou 10.x.x
```

**Windows :**
```powershell
# Vérifier les versions
node --version
npm --version
```

**Si Node.js n'est pas installé :**

**Linux/macOS :**
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install nodejs npm

# macOS (avec Homebrew)
brew install node

# Vérifier l'installation
node --version
npm --version
```

**Windows :**
1. Télécharger depuis https://nodejs.org/
2. Installer la version LTS
3. Redémarrer le terminal
4. Revérifier les versions

### Étape 2 : Nettoyer et Réinstaller

**Linux/macOS :**
```bash
# Aller dans le dossier backend
cd backend

# Supprimer node_modules et package-lock.json
rm -rf node_modules package-lock.json

# Nettoyer le cache npm
npm cache clean --force

# Réinstaller les dépendances
npm install
```

**Windows :**
```powershell
# Aller dans le dossier backend
cd backend

# Supprimer node_modules et package-lock.json
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item -Force package-lock.json -ErrorAction SilentlyContinue

# Nettoyer le cache npm
npm cache clean --force

# Réinstaller les dépendances
npm install
```

**Résultat attendu :**
```
added 250 packages, and audited 251 packages in 2m

found 0 vulnerabilities
```

### Étape 3 : Vérifier l'Installation

**Linux/macOS :**
```bash
# Vérifier que node_modules existe
ls -la node_modules

# Lister les modules installés
ls node_modules | grep -E "express|multer|axios"
```

**Windows :**
```powershell
# Vérifier que node_modules existe
Test-Path node_modules

# Lister les modules installés
Get-ChildItem node_modules | Select-Object Name | Select-String -Pattern "express|multer|axios"
```

**Résultat attendu :**
```
express
multer
axios
cors
dotenv
tesseract.js
```

### Étape 4 : Vérifier les Types TypeScript

**Linux/macOS :**
```bash
# Vérifier que @types/node est installé
ls node_modules/@types/node

# Vérifier les autres types
ls node_modules/@types/
```

**Windows :**
```powershell
# Vérifier que @types/node est installé
Test-Path node_modules/@types/node

# Vérifier les autres types
Get-ChildItem node_modules/@types | Select-Object Name
```

**Résultat attendu :**
```
@types/cors
@types/express
@types/multer
@types/node
```

### Étape 5 : Tester la Compilation

```bash
# Essayer de compiler
npm run build
```

**Si succès :**
```
✅ Compilation réussie
✅ Dossier dist/ créé
```

**Si erreurs :**
Voir les solutions ci-dessous ↓

---

## 🔍 Diagnostics Spécifiques

### Problème 1 : "Cannot find module 'express'"

**Cause :** Module non installé ou node_modules corrompu

**Solution :**

**Linux/macOS :**
```bash
cd backend

# Vérifier si express est installé
ls node_modules/express

# Si erreur, réinstaller
npm install express --save

# Vérifier package.json
cat package.json | grep "express"
```

**Windows :**
```powershell
cd backend

# Vérifier si express est installé
Test-Path node_modules/express

# Si False, réinstaller
npm install express --save

# Vérifier package.json
Get-Content package.json | Select-String "express"
```

### Problème 2 : "Cannot find module 'path' or 'fs'"

**Cause :** Ce sont des modules natifs de Node.js, le problème vient des types TypeScript

**Solution :**
```bash
# Installer/réinstaller @types/node
npm install --save-dev @types/node
```

**Vérifier tsconfig.json :**

**Linux/macOS :**
```bash
cat tsconfig.json | grep "types"
```

**Windows :**
```powershell
Get-Content tsconfig.json | Select-String "types"
```

**Le tsconfig.json doit contenir :**
```json
{
  "compilerOptions": {
    ...
    "types": ["node"]
  }
}
```

### Problème 3 : "Cannot find name 'console' or 'process'"

**Cause :** Types Node.js manquants dans tsconfig.json

**Solution :**

**Dans VSCode :**
1. Ctrl+Shift+P (Cmd+Shift+P sur macOS)
2. Taper "Reload Window"
3. Appuyer sur Entrée

### Problème 4 : Erreurs TypeScript persistantes

**Solution :**

**Linux/macOS :**
```bash
# Supprimer les fichiers de cache TypeScript
rm -rf dist tsconfig.tsbuildinfo

# Recompiler
npm run build
```

**Windows :**
```powershell
# Supprimer les fichiers de cache TypeScript
Remove-Item -Recurse -Force dist -ErrorAction SilentlyContinue
Remove-Item -Force tsconfig.tsbuildinfo -ErrorAction SilentlyContinue

# Recompiler
npm run build
```

---

## 🛠️ Solutions Avancées

### Solution 1 : Réinstallation Complète

**Linux/macOS :**
```bash
# Aller dans le dossier backend
cd backend

# Supprimer tout
rm -rf node_modules package-lock.json

# Réinstaller avec verbose
npm install --verbose
```

**Windows :**
```powershell
# Aller dans le dossier backend
cd backend

# Supprimer tout
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item -Force package-lock.json -ErrorAction SilentlyContinue

# Réinstaller avec verbose
npm install --verbose
```

### Solution 2 : Utiliser npm ci (Clean Install)

**Linux/macOS :**
```bash
cd backend

# Supprimer node_modules
rm -rf node_modules

# Installation propre
npm ci
```

**Windows :**
```powershell
cd backend

# Supprimer node_modules
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue

# Installation propre
npm ci
```

### Solution 3 : Vérifier les Permissions

**Linux/macOS :**
```bash
# Vérifier les permissions du dossier
ls -la backend/

# Si problème de permissions
sudo chown -R $USER:$USER backend/
chmod -R 755 backend/

# Réessayer npm install
cd backend
npm install
```

**Windows :**
```powershell
# Vérifier les permissions du dossier
Get-Acl backend | Format-List

# Si problème de permissions, exécuter PowerShell en Admin
# Puis réessayer npm install
```

### Solution 4 : Changer le Registre npm

```powershell
# Si problème de réseau/proxy
npm config set registry https://registry.npmjs.org/

# Réessayer
npm install
```

---

## 📋 Checklist de Vérification

### Avant de Démarrer le Serveur

- [ ] Node.js installé (v18+)
- [ ] npm installé (v9+)
- [ ] `backend/node_modules/` existe
- [ ] `backend/node_modules/express/` existe
- [ ] `backend/node_modules/@types/node/` existe
- [ ] `backend/package-lock.json` existe
- [ ] `backend/tsconfig.json` contient `"types": ["node"]`
- [ ] Aucune erreur lors de `npm install`
- [ ] Compilation réussie avec `npm run build`

### Test Final

```powershell
cd backend

# Test 1 : Vérifier les modules
node -e "console.log(require('express'))"
# Doit afficher : [Function: createApplication]

# Test 2 : Vérifier TypeScript
npx tsc --version
# Doit afficher : Version 5.3.3

# Test 3 : Compiler
npm run build
# Doit créer le dossier dist/

# Test 4 : Démarrer
npm run dev
# Doit afficher le message de démarrage
```

---

## 🐛 Erreurs Courantes et Solutions

### Erreur 1 : "EACCES: permission denied"

**Solution :**

**Linux/macOS :**
```bash
# Changer les permissions
sudo chown -R $USER:$USER ~/.npm
sudo chown -R $USER:$USER backend/

# Réessayer
npm install
```

**Windows :**
```powershell
# Exécuter PowerShell en tant qu'Administrateur
# Puis réessayer npm install
```

### Erreur 2 : "ENOENT: no such file or directory"

**Solution :**

**Linux/macOS :**
```bash
# Vérifier que vous êtes dans le bon dossier
pwd
# Doit afficher : .../hack_the_fork/backend

# Si non, naviguer vers le bon dossier
cd ~/hack_the_fork/backend
```

**Windows :**
```powershell
# Vérifier que vous êtes dans le bon dossier
Get-Location
# Doit afficher : .../hack_the_fork/backend

# Si non, naviguer vers le bon dossier
cd //wsl.localhost/Ubuntu/home/juvitry/hack_the_fork/backend
```

### Erreur 3 : "npm ERR! code ELIFECYCLE"

**Solution :**

**Linux/macOS :**
```bash
# Supprimer node_modules et réinstaller
rm -rf node_modules
npm install
```

**Windows :**
```powershell
# Supprimer node_modules et réinstaller
Remove-Item -Recurse -Force node_modules
npm install
```

### Erreur 4 : "Module not found: Error: Can't resolve"

**Solution :**
```powershell
# Vérifier les imports dans les fichiers
# S'assurer qu'ils utilisent la bonne syntaxe

# Exemple correct :
import express from 'express';
import path from 'path';
import fs from 'fs';
```

### Erreur 5 : "Cannot use import statement outside a module"

**Solution :**
```json
// Vérifier package.json
{
  "type": "commonjs"  // OU enlever cette ligne
}

// Vérifier tsconfig.json
{
  "compilerOptions": {
    "module": "commonjs"  // ✅ Correct
  }
}
```

---

## 🔄 Procédure de Réinitialisation Complète

Si rien ne fonctionne, suivez cette procédure :

**Linux/macOS :**
```bash
# 1. Aller dans le dossier backend
cd backend

# 2. Sauvegarder .env (si configuré)
cp .env .env.backup 2>/dev/null || true

# 3. Supprimer node_modules et caches
rm -rf node_modules package-lock.json dist tsconfig.tsbuildinfo

# 4. Nettoyer npm
npm cache clean --force

# 5. Réinstaller
npm install

# 6. Restaurer .env
cp .env.backup .env 2>/dev/null || true

# 7. Tester
npm run build
npm run dev
```

**Windows :**
```powershell
# 1. Aller dans le dossier backend
cd backend

# 2. Sauvegarder .env (si configuré)
Copy-Item .env .env.backup -ErrorAction SilentlyContinue

# 3. Supprimer node_modules et caches
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item -Force package-lock.json -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force dist -ErrorAction SilentlyContinue
Remove-Item -Force tsconfig.tsbuildinfo -ErrorAction SilentlyContinue

# 4. Nettoyer npm
npm cache clean --force

# 5. Réinstaller
npm install

# 6. Restaurer .env
Copy-Item .env.backup .env -ErrorAction SilentlyContinue

# 7. Tester
npm run build
npm run dev
```

---

## 📞 Support Supplémentaire

### Si le Problème Persiste

1. **Vérifier les logs détaillés :**

**Linux/macOS :**
```bash
npm install --verbose > install.log 2>&1
cat install.log
```

**Windows :**
```powershell
npm install --verbose > install.log 2>&1
Get-Content install.log
```

2. **Vérifier la version de Node.js :**
```bash
node --version
# Si < v18, mettre à jour Node.js
```

3. **Essayer avec WSL (si sur Windows) :**
```bash
# Dans WSL Ubuntu
cd /home/juvitry/hack_the_fork/backend
npm install
npm run dev
```

4. **Créer une issue GitHub :**
- Copier les logs d'erreur
- Indiquer votre OS et versions (Node, npm)
- Décrire les étapes effectuées

---

## ✅ Confirmation que Tout Fonctionne

### Test Final Complet

**Linux/macOS :**
```bash
cd backend

# 1. Modules installés
ls node_modules/express
ls node_modules/multer
ls node_modules/@types/node
# Tous doivent exister

# 2. Compilation réussie
npm run build
# Doit créer dist/ sans erreurs

# 3. Serveur démarre
npm run dev
# Doit afficher :
# 🚀 Serveur démarré sur le port 3000

# 4. Health check fonctionne (dans un autre terminal)
curl http://localhost:3000/api/menu/health
# Doit retourner : {"status":"ok",...}
```

**Windows :**
```powershell
cd backend

# 1. Modules installés
Test-Path node_modules/express
Test-Path node_modules/multer
Test-Path node_modules/@types/node
# Tous doivent retourner : True

# 2. Compilation réussie
npm run build
# Doit créer dist/ sans erreurs

# 3. Serveur démarre
npm run dev
# Doit afficher :
# 🚀 Serveur démarré sur le port 3000

# 4. Health check fonctionne (dans un autre terminal)
Invoke-RestMethod -Uri "http://localhost:3000/api/menu/health"
# Doit retourner : {"status":"ok",...}
```

**Si tous les tests passent : 🎉 Installation réussie !**

---

## 📚 Fichiers de Configuration Importants

### package.json
```json
{
  "dependencies": {
    "express": "^4.18.2",      // ✅ Doit être présent
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "axios": "^1.6.0",
    "multer": "^1.4.5-lts.1",
    "tesseract.js": "^5.0.0"
  },
  "devDependencies": {
    "@types/express": "^4.17.21",  // ✅ Types nécessaires
    "@types/cors": "^2.8.17",
    "@types/multer": "^1.4.11",
    "@types/node": "^20.10.5",     // ✅ Important !
    "typescript": "^5.3.3",
    "ts-node-dev": "^2.0.0"
  }
}
```

### tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "types": ["node"],              // ✅ Ajouté pour résoudre les erreurs
    "esModuleInterop": true,
    "skipLibCheck": true,
    "moduleResolution": "node"
  }
}
```

---

## 🎯 Résumé des Commandes Essentielles

**Linux/macOS :**
```bash
# Installation propre
cd backend
rm -rf node_modules package-lock.json
npm cache clean --force
npm install

# Compilation
npm run build

# Démarrage
npm run dev

# Test
curl http://localhost:3000/api/menu/health
```

**Windows :**
```powershell
# Installation propre
cd backend
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item -Force package-lock.json -ErrorAction SilentlyContinue
npm cache clean --force
npm install

# Compilation
npm run build

# Démarrage
npm run dev

# Test
Invoke-RestMethod -Uri "http://localhost:3000/api/menu/health"
```

---

**Problème résolu ? Passez à BLACKBOX_SETUP.md pour configurer l'API !**
