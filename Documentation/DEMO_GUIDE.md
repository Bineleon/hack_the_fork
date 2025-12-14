C# 🎬 Guide de la Démo Interactive - EZVG

## 📋 Vue d'ensemble

La page de démo (`demo.html`) est conçue pour présenter EZVG lors du pitch du hackathon de manière fluide et professionnelle, sans aucune intervention manuelle.

## 🚀 Comment utiliser la démo

### Option 1 : Depuis l'application principale
1. Ouvrir `frontend/index.html` dans un navigateur
2. Cliquer sur le bouton **"Démo Interactive"** en haut à droite
3. La démo se lance automatiquement

### Option 2 : Directement
1. Ouvrir `frontend/demo.html` dans un navigateur
2. La démo se lance automatiquement au chargement

## 🎯 Flux de la Démo Automatique

```
Chargement de demo.html
    ↓
📸 Scan du menu (1.5s)
    ↓
🔍 Extraction des plats (1s)
    ↓
🍽️ Analyse de "Bavette de boeuf" (1.5s)
    ↓
✨ Affichage des résultats complets
```

**Durée totale : ~4 secondes**

## 📊 Contenu Affiché

La démo affiche une analyse complète incluant :

1. **Plat Original** : Bavette de boeuf avec ingrédients
2. **Alternative Végétale** : Seitan mariné aux herbes
3. **Comparaison Nutritionnelle** : Graphiques et valeurs
4. **Impact Environnemental** : -85% CO2, -5.4kg économisés
5. **Impact Économique** : -28%, -4.20€ d'économie
6. **Score Global** : 92/100
7. **Business Plan d'Intégration** : 4 étapes sur 3 mois
8. **Fournisseurs Recommandés** : 3 fournisseurs B2B
9. **Recommandations** : Conseils pratiques
10. **Enquête de Satisfaction** : À la toute fin

## 🎨 Avantages pour le Pitch

### ✅ Zéro Intervention Manuelle
- Pas besoin de cliquer sur des boutons
- Pas de saisie de texte
- Pas de risque d'erreur pendant la présentation

### ✅ Timing Parfait
- Animations fluides et professionnelles
- Transitions naturelles
- Durée prévisible (~4 secondes)

### ✅ Données Réalistes
- Menu réel de restaurant
- Plat courant (Bavette de boeuf)
- Impacts chiffrés et crédibles
- Business plan détaillé

### ✅ Expérience Complète
- Toutes les fonctionnalités visibles
- Design professionnel
- Responsive (fonctionne sur projecteur)

## 🎤 Script de Présentation Suggéré

```
"Laissez-moi vous montrer EZVG en action.

[Ouvrir demo.html]

Nous scannons un menu de restaurant...
[Animation de scan - 1.5s]

L'IA extrait automatiquement les plats...
[Animation d'extraction - 1s]

Et analyse le premier plat : Bavette de boeuf.
[Animation d'analyse - 1.5s]

[Résultats affichés]

Voici l'alternative végétale proposée : Seitan mariné aux herbes.

Regardez les impacts :
- 85% de réduction des émissions CO2
- 28% d'économie sur les coûts
- Profil nutritionnel équivalent

Et voici le business plan d'intégration sur 3 mois,
avec un ROI estimé à 6-8 mois.

[Scroller pour montrer les fournisseurs et recommandations]

Tout est prêt pour que le restaurateur passe à l'action !"
```

## 🔧 Personnalisation

### Changer le plat analysé

Modifier dans `demo.html` ligne ~220 :
```javascript
platInput.value = 'Bavette de boeuf';  // Changer ici
```

Options disponibles :
- `'Bavette de boeuf'` (par défaut)
- `'Longe de veau'`
- `'Croustillant de ris de veau'`

### Ajuster les délais

Modifier les valeurs `sleep()` dans `simulateDemoScan()` :
```javascript
await sleep(1500);  // Scan du menu
await sleep(1000);  // Extraction
await sleep(1500);  // Analyse
```

## 📱 Compatibilité

- ✅ Chrome, Firefox, Safari, Edge
- ✅ Desktop et Mobile
- ✅ Projecteur (résolution 1920x1080)
- ✅ Fonctionne hors ligne (mode démo)

## ⚠️ Points d'Attention

### Avant le Pitch

1. **Tester la démo** au moins une fois
2. **Vérifier que le backend est démarré** (`npm run dev`)
3. **Ouvrir demo.html dans un nouvel onglet** (pas de cache)
4. **Tester sur le projecteur** si possible

### Pendant le Pitch

1. **Avoir demo.html déjà ouvert** dans un onglet
2. **Rafraîchir la page** (F5) juste avant de présenter
3. **Ne pas toucher la souris** pendant l'animation
4. **Laisser la démo se dérouler** jusqu'aux résultats

### Plan B

Si problème technique :
1. Ouvrir `index.html`
2. Saisir manuellement "Bavette de boeuf"
3. Cliquer sur "Analyser"

## 🎯 Résultat Attendu

Une présentation fluide de 30-45 secondes montrant :
- Le scan automatique d'un menu
- L'analyse IA d'un plat
- Les résultats complets avec impacts
- Le business plan d'intégration

**Sans aucune intervention manuelle !** 🎊

## 📞 Support

En cas de problème :
1. Vérifier que le backend tourne (`npm run dev`)
2. Vérifier la console du navigateur (F12)
3. Utiliser le mode démo (fonctionne sans API)

---

**Bonne chance pour le hackathon !** 🏆
