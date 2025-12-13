# TODO - Intégration Fournisseurs B2B

## ✅ Tâches Complétées

### Backend
- [x] Créer la base de données des fournisseurs (`backend/src/data/suppliers.ts`)
  - [x] 12 fournisseurs B2B français
  - [x] Marques premium: Beyond Meat, Heura, La Vie
  - [x] Informations complètes: contact, livraison, prix
  - [x] Fonctions de recherche (par spécialité, par marque)

- [x] Mettre à jour les types TypeScript (`backend/src/types/index.ts`)
  - [x] Interface `SupplierInfo`
  - [x] Ajout `fournisseurs_recommandes` dans `AnalysisResult`

- [x] Modifier le service de prompts (`backend/src/services/prompt.service.ts`)
  - [x] Inclure la liste des fournisseurs dans le prompt
  - [x] Instructions pour l'IA sur la sélection des fournisseurs
  - [x] Format JSON avec fournisseurs

- [x] Mettre à jour le service Blackbox (`backend/src/services/blackbox.service.ts`)
  - [x] Mode démo avec fournisseurs (Metro + Tossolia)
  - [x] Parsing des fournisseurs dans la réponse IA

- [x] Créer la documentation (`SUPPLIERS_FEATURE.md`)

### Fixes API
- [x] Fix erreur 401 (authentification)
  - [x] Déplacer `dotenv.config()` avant les imports
- [x] Fix erreur 400 (modèle invalide)
  - [x] Changer de `gpt-4o` à `blackboxai/meta-llama/llama-3.3-70b-instruct:free`

## 🔄 Tâches en Cours

### Tests
- [ ] Redémarrer le serveur avec les nouvelles modifications
- [ ] Tester l'endpoint `/api/menu/analyze` avec un plat
- [ ] Vérifier que les fournisseurs sont bien retournés
- [ ] Tester avec différents types de plats (viande, poisson, etc.)

## 📋 Tâches Restantes

### Frontend (Optionnel)
- [ ] Afficher les fournisseurs recommandés dans l'interface
- [ ] Créer une section "Où acheter les ingrédients"
- [ ] Ajouter des liens cliquables vers les sites des fournisseurs
- [ ] Afficher les informations de contact

### Backend (Améliorations)
- [ ] Créer un endpoint dédié `/api/suppliers`
  - [ ] GET `/api/suppliers` - Liste tous les fournisseurs
  - [ ] GET `/api/suppliers/search?specialty=tofu` - Recherche par spécialité
  - [ ] GET `/api/suppliers/search?brand=Heura` - Recherche par marque
- [ ] Ajouter un système de cache pour les recommandations
- [ ] Logger les fournisseurs recommandés pour analytics

### Documentation
- [ ] Mettre à jour README.md avec la nouvelle fonctionnalité
- [ ] Ajouter des exemples de réponses avec fournisseurs
- [ ] Créer un guide pour ajouter de nouveaux fournisseurs

### Tests Unitaires (Post-Hackathon)
- [ ] Tests pour `suppliers.ts` (recherche, filtrage)
- [ ] Tests pour l'intégration IA + fournisseurs
- [ ] Tests du mode démo avec fournisseurs

## 🎯 Prochaines Étapes Immédiates

1. **Redémarrer le serveur**
   ```bash
   cd backend
   npm run dev
   ```

2. **Tester l'API**
   ```bash
   curl -X POST http://localhost:3000/api/menu/analyze \
     -H "Content-Type: application/json" \
     -d '{"plat": "Poulet rôti", "ingredients": ["Poulet 300g", "Herbes"]}'
   ```

3. **Vérifier la réponse**
   - Doit contenir `fournisseurs_recommandes`
   - 2-3 fournisseurs pertinents
   - Informations complètes pour chaque fournisseur

4. **Tester différents plats**
   - Plat avec viande rouge → Fournisseurs avec Beyond Meat
   - Plat avec poulet → Fournisseurs avec Heura
   - Plat avec poisson → Fournisseurs avec alternatives marines

## 📊 Métriques de Succès

- [ ] API retourne des fournisseurs dans 100% des cas
- [ ] Fournisseurs recommandés sont pertinents (vérification manuelle)
- [ ] Temps de réponse < 10 secondes
- [ ] Mode démo fonctionne sans API

## 🐛 Bugs Connus

Aucun pour le moment.

## 💡 Idées Futures

- Intégration avec des APIs de fournisseurs réels
- Système de notation des fournisseurs par les restaurateurs
- Alertes sur les promotions des fournisseurs
- Comparateur de prix en temps réel
- Gestion des stocks et commandes
- Programme de partenariat avec les fournisseurs

---

**Dernière mise à jour:** 13 décembre 2025
**Statut:** ✅ Backend complet, en attente de tests
