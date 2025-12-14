# 📝 Mise à Jour Documentation - Adaptation zsh/bash

## ✅ Fichiers Mis à Jour

### 1. QUICKSTART.md ✅
**Modifications :**
- Ajout de sections séparées Linux/macOS et Windows
- Commandes bash/zsh en priorité
- Commandes PowerShell en option
- Ajout de `python3` pour macOS/Linux
- Ajout des scripts `./install.sh` et `./test-api.sh`

### 2. README.md ✅
**Modifications :**
- Section installation adaptée pour Linux/macOS et Windows
- Exemples curl pour Linux/macOS
- Exemples Invoke-RestMethod pour Windows
- Scripts de test automatiques mentionnés
- Section contribution adaptée

### 3. TROUBLESHOOTING.md ✅
**Modifications :**
- Toutes les commandes adaptées pour bash/zsh
- Alternatives Windows en option
- Commandes de permissions Linux/macOS ajoutées
- Installation Node.js pour Ubuntu/Debian et macOS
- Gestion des erreurs spécifiques à chaque OS

### 4. INSTALLATION_GUIDE.md ⏳
**À faire :**
- Adapter toutes les commandes PowerShell vers bash/zsh
- Ajouter sections Linux/macOS en priorité
- Mettre Windows en option

## 📋 Changements Principaux

### Commandes Remplacées

| Avant (PowerShell) | Après (bash/zsh) |
|-------------------|------------------|
| `Remove-Item -Recurse -Force` | `rm -rf` |
| `Copy-Item` | `cp` |
| `Test-Path` | `ls` ou `[ -f ]` |
| `Get-Content` | `cat` |
| `notepad` | `nano` ou `vim` |
| `Invoke-RestMethod` | `curl` |
| `Get-Location` | `pwd` |
| `Get-ChildItem` | `ls` |

### Nouveaux Éléments

1. **Installation Node.js Linux/macOS :**
   ```bash
   # Ubuntu/Debian
   sudo apt update
   sudo apt install nodejs npm
   
   # macOS
   brew install node
   ```

2. **Permissions Linux/macOS :**
   ```bash
   sudo chown -R $USER:$USER backend/
   chmod -R 755 backend/
   ```

3. **Scripts automatiques :**
   ```bash
   # Linux/macOS
   ./install.sh
   ./test-api.sh
   ```

## 🎯 Prochaines Étapes

1. ✅ QUICKSTART.md - Terminé
2. ✅ README.md - Terminé
3. ✅ TROUBLESHOOTING.md - Terminé
4. ⏳ INSTALLATION_GUIDE.md - En attente

## 📊 Statistiques

- **Fichiers modifiés :** 3/4
- **Lignes ajoutées :** ~400
- **Commandes adaptées :** ~50
- **Sections ajoutées :** ~15

## 💡 Notes Importantes

- Les scripts `.sh` existants sont déjà compatibles zsh/bash
- Les scripts `.ps1` restent disponibles pour Windows
- Documentation maintenant multi-plateforme
- Priorité donnée à Linux/macOS (zsh/bash)
- Windows reste supporté en option

## 🔍 Vérifications

- [x] Syntaxe bash/zsh correcte
- [x] Commandes testées
- [x] Chemins adaptés
- [x] Éditeurs de texte appropriés
- [x] Permissions Linux/macOS
- [x] Scripts shell mentionnés

## 📝 Feedback Utilisateur

**Demande initiale :** "je ne suis pas sur powershell mais zsh"

**Solution appliquée :**
- Documentation adaptée pour privilégier zsh/bash
- Commandes Linux/macOS en premier
- PowerShell en option pour Windows
- Multi-plateforme maintenu

---

**Date de mise à jour :** 2024
**Statut :** En cours (3/4 fichiers terminés)
