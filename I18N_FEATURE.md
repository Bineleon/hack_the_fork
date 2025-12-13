# 🌍 Système d'Internationalisation (i18n) - Hack the Fork

## 🎯 Fonctionnalité Ajoutée

Système complet de changement de langue français/anglais avec persistance locale.

---

## ✨ Caractéristiques

### 1. **Bouton de Changement de Langue**
- Position fixe en haut à droite
- Design moderne avec icône 🌐
- Affiche la langue cible (FR → EN ou EN → FR)
- Animation au survol
- Responsive (adapté mobile)

### 2. **Traductions Complètes**
**Sections traduites:**
- ✅ Header (titre, tagline)
- ✅ Section upload (titres, placeholders, boutons)
- ✅ Section loading (messages de progression)
- ✅ Section résultats (tous les titres de cartes)
- ✅ Navigation multi-plats (boutons Précédent/Suivant)
- ✅ Actions (télécharger, partager)
- ✅ Messages toast (succès, erreurs, avertissements)
- ✅ Footer

### 3. **Persistance**
- Langue sauvegardée dans `localStorage`
- Restauration automatique au rechargement
- Pas besoin de reconfigurer à chaque visite

### 4. **Changement Instantané**
- Mise à jour de toute l'interface en temps réel
- Pas de rechargement de page nécessaire
- Notification toast lors du changement

---

## 💻 Implémentation Technique

### Fichiers Créés/Modifiés

#### 1. **frontend/js/i18n.js** (NOUVEAU)
```javascript
// Dictionnaire de traductions
const translations = {
    fr: { /* traductions françaises */ },
    en: { /* traductions anglaises */ }
};

// Fonctions principales
function t(key) // Obtenir une traduction
function setLanguage(lang) // Changer la langue
function getCurrentLanguage() // Langue actuelle
function updatePageLanguage() // Mettre à jour l'interface
```

#### 2. **frontend/index.html**
```html
<!-- Bouton de changement de langue -->
<button id="languageToggle" class="language-toggle">
    <i class="fas fa-language"></i> EN
</button>

<!-- Scripts -->
<script src="js/i18n.js"></script>
<script src="js/app.js"></script>
```

#### 3. **frontend/css/style.css**
```css
/* Bouton de langue fixe */
.language-toggle {
    position: fixed;
    top: 20px;
    right: 20px;
    /* ... styles ... */
}
```

#### 4. **frontend/js/app.js**
```javascript
// Initialisation
updatePageLanguage();

// Event listener
languageToggle.addEventListener('click', toggleLanguage);

// Utilisation des traductions
showToast(t('toastApiError'), 'error');
```

---

## 📋 Traductions Disponibles

### Français (fr)
```javascript
{
    appTitle: "Hack the Fork",
    tagline: "Transformez votre menu en alternatives végétales durables",
    uploadTitle: "Scanner un Menu",
    dishLabel: "Nom du plat",
    analyzeButton: "Analyser",
    // ... 50+ traductions
}
```

### Anglais (en)
```javascript
{
    appTitle: "Hack the Fork",
    tagline: "Transform your menu into sustainable plant-based alternatives",
    uploadTitle: "Scan a Menu",
    dishLabel: "Dish name",
    analyzeButton: "Analyze",
    // ... 50+ traductions
}
```

---

## 🎨 Interface Utilisateur

### Bouton de Langue

**Position:**
- Desktop: Coin supérieur droit (20px du bord)
- Mobile: Coin supérieur droit (10px du bord)

**États:**
- **Français actif:** Affiche "EN" (pour passer à l'anglais)
- **Anglais actif:** Affiche "FR" (pour passer au français)

**Apparence:**
```
┌─────────────────┐
│ 🌐 EN          │  ← Langue actuelle: FR
└─────────────────┘

┌─────────────────┐
│ 🌐 FR          │  ← Langue actuelle: EN
└─────────────────┘
```

### Notification de Changement
```
Clic sur bouton → Toast notification:
- "🇫🇷 Français" (si passage au français)
- "🇬🇧 English" (si passage à l'anglais)
```

---

## 🔧 Utilisation dans le Code

### Obtenir une Traduction
```javascript
// Simple
const title = t('uploadTitle');

// Dans un template
showToast(t('toastApiError'), 'error');

// Conditionnel
const text = getCurrentLanguage() === 'fr' 
    ? `Analyse ${i}/${total}` 
    : `Analysis ${i}/${total}`;
```

### Changer la Langue
```javascript
// Automatique via bouton
languageToggle.addEventListener('click', toggleLanguage);

// Programmatique
setLanguage('en'); // Passer à l'anglais
setLanguage('fr'); // Passer au français
```

### Vérifier la Langue Actuelle
```javascript
const currentLang = getCurrentLanguage(); // 'fr' ou 'en'

if (currentLang === 'fr') {
    // Code spécifique français
}
```

---

## 📊 Sections Traduites

### 1. Header
- Titre de l'application
- Tagline

### 2. Upload Section
- Titre "Scanner un Menu" / "Scan a Menu"
- Sous-titre
- Texte de la zone d'upload
- Types de fichiers acceptés
- Titre saisie manuelle
- Labels des champs
- Placeholders
- Bouton "Analyser" / "Analyze"

### 3. Loading Section
- "Analyse en cours..." / "Analysis in progress..."
- "Scan de l'image..." / "Scanning image..."
- "Extraction du texte..." / "Extracting text..."
- "Analyse nutritionnelle..." / "Nutritional analysis..."

### 4. Results Section
- "Résultats de l'analyse" / "Analysis Results"
- "Plat Original" / "Original Dish"
- "Alternative Végétale" / "Plant-Based Alternative"
- "Comparaison Nutritionnelle" / "Nutritional Comparison"
- "Impact Environnemental" / "Environmental Impact"
- "Impact Économique" / "Economic Impact"
- "Score Global" / "Overall Score"
- "Fournisseurs Recommandés" / "Recommended Suppliers"
- "Recommandations" / "Recommendations"

### 5. Navigation
- "Précédent" / "Previous"
- "Suivant" / "Next"

### 6. Actions
- "Nouvelle Analyse" / "New Analysis"
- "Télécharger le Rapport" / "Download Report"
- "Partager" / "Share"

### 7. Toast Messages
- Tous les messages de succès, erreur et avertissement

---

## 🎯 Avantages

### Pour les Utilisateurs
✅ **Accessibilité:** Application utilisable en français et anglais
✅ **Confort:** Choisir sa langue préférée
✅ **Persistance:** Langue sauvegardée automatiquement
✅ **Simplicité:** Un clic pour changer

### Pour le Développement
✅ **Maintenable:** Traductions centralisées dans un fichier
✅ **Extensible:** Facile d'ajouter de nouvelles langues
✅ **Propre:** Séparation du code et des traductions
✅ **Réutilisable:** Fonction `t()` simple à utiliser

---

## 🚀 Ajout de Nouvelles Langues

### Étape 1: Ajouter les Traductions
```javascript
// Dans i18n.js
const translations = {
    fr: { /* ... */ },
    en: { /* ... */ },
    es: { // Nouvelle langue: Espagnol
        appTitle: "Hack the Fork",
        tagline: "Transforma tu menú en alternativas vegetales sostenibles",
        // ... autres traductions
    }
};
```

### Étape 2: Modifier le Bouton
```javascript
// Logique de rotation des langues
function toggleLanguage() {
    const langs = ['fr', 'en', 'es'];
    const currentIndex = langs.indexOf(getCurrentLanguage());
    const nextIndex = (currentIndex + 1) % langs.length;
    setLanguage(langs[nextIndex]);
}
```

---

## 📱 Responsive Design

### Desktop (> 768px)
```css
.language-toggle {
    top: 20px;
    right: 20px;
    padding: 10px 20px;
    font-size: 14px;
}
```

### Mobile (< 768px)
```css
.language-toggle {
    top: 10px;
    right: 10px;
    padding: 8px 16px;
    font-size: 12px;
}
```

---

## ✅ Checklist Implémentation

- [x] Fichier i18n.js créé avec traductions FR/EN
- [x] Bouton de changement de langue ajouté
- [x] Styles CSS pour le bouton
- [x] Event listener configuré
- [x] Fonction toggleLanguage implémentée
- [x] Fonction updatePageLanguage implémentée
- [x] Persistance localStorage
- [x] Notification toast lors du changement
- [x] Toutes les sections traduites
- [x] Messages d'erreur traduits
- [x] Responsive design
- [x] Documentation complète

---

## 🎊 Résultat Final

**Hack the Fork est maintenant bilingue!**

### Fonctionnalités
- 🇫🇷 **Français** (langue par défaut)
- 🇬🇧 **English** (disponible en un clic)
- 💾 **Persistance** (langue sauvegardée)
- ⚡ **Changement instantané** (pas de rechargement)
- 📱 **Responsive** (mobile et desktop)

### Expérience Utilisateur
- Bouton visible et accessible
- Changement fluide et instantané
- Notification de confirmation
- Interface complètement traduite
- Préférence mémorisée

**L'application est prête pour un public international!** 🌍🚀
