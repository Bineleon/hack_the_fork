# Correction des Problèmes - Timeout API & CORS

## Problèmes identifiés

### 1. Timeout API Blackbox
- Timeout de 45 secondes dépassé lors de l'extraction des plats du menu
- L'extraction IA échouait et utilisait le fallback OCR

### 2. Erreur CORS
- Le serveur backend n'autorisait que `http://localhost:5500`
- Le frontend tournait sur `http://0.0.0.0:8080`
- Erreur: "Access-Control-Allow-Origin header has a value that is not equal to the supplied origin"

## Modifications effectuées

### 1. backend/src/services/blackbox.service.ts
✅ **Optimisations de la méthode `callBlackboxAPI`:**
- Ajout de paramètres configurables: `maxTokens` et `timeout`
- Réduction du délai entre retries: 2s → 1s

✅ **Optimisations de la méthode `extractMenuFromOCR`:**
- Timeout réduit: 45s → 30s
- Nombre de retries augmenté: 1 → 2
- Max tokens réduit: 2500 → 1200 (réponse plus rapide)
- Température optimisée: 0.5 → 0.3 (plus déterministe)

### 2. backend/src/services/prompt.service.ts
✅ **Optimisations du prompt d'extraction:**
- Prompt considérablement raccourci (de ~35 lignes à ~10 lignes)
- Limitation du texte OCR à 1000 caractères maximum
- Format JSON plus compact
- Instructions simplifiées

### 3. backend/src/server.ts
✅ **Correction de la configuration CORS:**
- Ajout de plusieurs origines autorisées:
  - `http://localhost:5500`
  - `http://localhost:8080`
  - `http://0.0.0.0:8080`
  - `http://127.0.0.1:8080`
  - `http://127.0.0.1:5500`
- Configuration dynamique avec callback pour vérifier l'origine
- Ajout de `credentials: true` pour les cookies/sessions

### 4. frontend/js/app.js
✅ **Amélioration du débogage:**
- Ajout de logs détaillés pour les erreurs
- Affichage du message d'erreur complet dans le toast

## Résultats obtenus

### Backend
✅ OCR terminé avec succès (68% de confiance)
✅ Extraction réussie dès la première tentative (1/2)
✅ 4 plats extraits correctement

### CORS
✅ Configuration CORS corrigée
✅ Toutes les origines de développement autorisées

## Tests à effectuer
1. ✅ Compiler le backend TypeScript
2. ✅ Identifier le problème CORS
3. ✅ Corriger la configuration CORS
4. ⏳ Redémarrer le serveur backend
5. ⏳ Recharger la page frontend (Ctrl+F5)
6. ⏳ Uploader une image de menu
7. ⏳ Vérifier que l'extraction fonctionne
8. ⏳ Vérifier que les résultats s'affichent correctement

## Notes
- Le système de fallback OCR reste en place comme filet de sécurité
- Aucune modification de l'API publique
- La configuration CORS accepte maintenant plusieurs ports de développement
- En production, il faudra restreindre les origines autorisées
