# 🎨 EZVG - Guide d'Identité Visuelle

## 📋 Vue d'ensemble

**Nom officiel :** EZVG (Easy Veggie)  
**Tagline FR :** Simplifiez votre transition végétale  
**Tagline EN :** Simplify your plant-based transition

---

## 🎨 Palette de Couleurs

### Couleurs Principales

#### Vert Principal
- **Hex :** `#22c55e`
- **RGB :** `rgb(34, 197, 94)`
- **Usage :** Couleur primaire, boutons, accents, icônes principales
- **Signification :** Nature, végétal, fraîcheur, croissance

#### Vert Foncé
- **Hex :** `#16a34a`
- **RGB :** `rgb(22, 163, 74)`
- **Usage :** Hover states, éléments actifs, textes sur fond clair
- **Signification :** Stabilité, confiance

#### Jaune/Ambre
- **Hex :** `#f59e0b`
- **RGB :** `rgb(245, 158, 11)`
- **Usage :** Couleur secondaire, accents, warnings, highlights
- **Signification :** Énergie, optimisme, simplicité

#### Jaune Clair
- **Hex :** `#fbbf24`
- **RGB :** `rgb(251, 191, 36)`
- **Usage :** Dégradés, backgrounds légers
- **Signification :** Chaleur, accessibilité

### Couleurs Fonctionnelles

#### Succès
- **Hex :** `#22c55e` (même que vert principal)
- **Usage :** Messages de succès, validations

#### Danger/Erreur
- **Hex :** `#ef4444`
- **RGB :** `rgb(239, 68, 68)`
- **Usage :** Erreurs, alertes, suppressions

#### Warning
- **Hex :** `#fbbf24`
- **Usage :** Avertissements, informations importantes

### Couleurs Neutres

#### Background
- **Hex :** `#fafaf9`
- **RGB :** `rgb(250, 250, 249)`
- **Usage :** Fond de page, zones secondaires

#### Card Background
- **Hex :** `#ffffff`
- **Usage :** Cartes, conteneurs principaux

#### Texte Principal
- **Hex :** `#111827`
- **RGB :** `rgb(17, 24, 39)`
- **Usage :** Titres, textes importants

#### Texte Secondaire
- **Hex :** `#6b7280`
- **RGB :** `rgb(107, 114, 128)`
- **Usage :** Sous-titres, descriptions, labels

#### Bordures
- **Hex :** `#e5e7eb`
- **RGB :** `rgb(229, 231, 235)`
- **Usage :** Séparateurs, contours

---

## 🎨 Dégradés

### Dégradé Principal (Background)
```css
background: linear-gradient(135deg, #22c55e 0%, #fbbf24 100%);
```
**Usage :** Fond de page principal, headers

### Dégradé Carte Fournisseur
```css
background: linear-gradient(135deg, #22c55e 0%, #fbbf24 100%);
```
**Usage :** En-têtes de cartes fournisseurs

### Dégradé Highlight
```css
background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
```
**Usage :** Cartes d'alternatives végétales, éléments mis en avant

---

## 🖼️ Logo

### Description
- **Élément principal :** Feuille-fourchette combinés
- **Style :** Minimaliste, épuré, moderne
- **Couleurs :** Vert (#22c55e) et Jaune (#f59e0b)

### Utilisation
- **Icône FontAwesome :** `fas fa-leaf`
- **Taille standard :** 48px
- **Animation :** Float (mouvement vertical doux)

### Variations
- **Version complète :** Logo + Texte "EZVG"
- **Version icône seule :** Pour favicons, petits espaces
- **Version monochrome :** Pour impressions, fonds colorés

---

## 📝 Typographie

### Police Principale
```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
```

### Hiérarchie

#### Titre Principal (H1)
- **Taille :** 48px (desktop), 32px (mobile)
- **Poids :** 700 (Bold)
- **Couleur :** Blanc (sur fond dégradé)

#### Tagline
- **Taille :** 20px (desktop), 16px (mobile)
- **Poids :** 400 (Regular)
- **Couleur :** Blanc avec opacité 0.9
- **Style :** Léger, aéré

#### Titres de Section (H2)
- **Taille :** 24px
- **Poids :** 600 (Semi-bold)
- **Couleur :** Texte principal (#111827)

#### Titres de Carte (H3)
- **Taille :** 20px
- **Poids :** 600 (Semi-bold)
- **Couleur :** Texte principal (#111827)
- **Icône :** Vert principal (#22c55e)

#### Corps de Texte
- **Taille :** 16px
- **Poids :** 400 (Regular)
- **Couleur :** Texte principal (#111827)
- **Line-height :** 1.6

#### Texte Secondaire
- **Taille :** 14px
- **Poids :** 400 (Regular)
- **Couleur :** Texte secondaire (#6b7280)

---

## 🎭 Style Visuel

### Principes de Design

#### 1. Minimalisme
- Espaces blancs généreux
- Éléments épurés
- Pas de surcharge visuelle

#### 2. Aération
- Padding important dans les cartes (30px)
- Marges entre éléments (20px)
- Espacement vertical cohérent

#### 3. Fluidité
- Transitions douces (0.3s ease)
- Animations subtiles
- Mouvements naturels

#### 4. Clarté
- Hiérarchie visuelle claire
- Contraste suffisant
- Lisibilité optimale

### Ombres

#### Ombre Légère
```css
box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
```
**Usage :** Éléments subtils, hover states

#### Ombre Standard
```css
box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
```
**Usage :** Cartes, conteneurs principaux

### Bordures
- **Rayon standard :** 8px
- **Rayon cartes :** 16px
- **Rayon boutons :** 8px
- **Rayon tags :** 6px
- **Rayon circulaire :** 50% (boutons ronds)

---

## 🔘 Composants

### Boutons

#### Bouton Principal
- **Background :** Vert principal (#22c55e)
- **Texte :** Blanc
- **Hover :** Vert foncé (#16a34a)
- **Padding :** 12px 24px
- **Border-radius :** 8px

#### Bouton Secondaire
- **Background :** Jaune (#f59e0b)
- **Texte :** Blanc
- **Hover :** Transformation Y(-2px)
- **Padding :** 12px 24px

### Cartes
- **Background :** Blanc (#ffffff)
- **Border-radius :** 16px
- **Padding :** 30px
- **Shadow :** Ombre standard
- **Margin-bottom :** 20px

### Tags
- **Background :** Blanc avec bordure
- **Border :** 1px solid #e5e7eb
- **Border-radius :** 6px
- **Padding :** 6px 12px
- **Font-size :** 13px

### Tags Marque (Brand)
- **Background :** Dégradé vert léger
- **Border-color :** Vert principal
- **Color :** Vert foncé
- **Font-weight :** 600

---

## 🌐 Responsive Design

### Breakpoints
- **Mobile :** < 768px
- **Tablet :** 768px - 1024px
- **Desktop :** > 1024px

### Adaptations Mobile
- Réduction des tailles de police
- Padding réduit (20px au lieu de 30px)
- Navigation verticale
- Boutons pleine largeur

---

## ♿ Accessibilité

### Contraste
- Ratio minimum : 4.5:1 pour le texte normal
- Ratio minimum : 3:1 pour le texte large
- Tous les textes respectent les normes WCAG AA

### Focus States
- Outline visible sur tous les éléments interactifs
- Couleur : Vert principal (#22c55e)

### Tailles Tactiles
- Minimum 44x44px pour les éléments cliquables
- Espacement suffisant entre éléments interactifs

---

## 📱 Icônes

### Bibliothèque
**Font Awesome 6.4.0**

### Icônes Principales
- **Logo :** `fas fa-leaf`
- **Upload :** `fas fa-cloud-upload-alt`
- **Analyse :** `fas fa-magic`
- **Plat :** `fas fa-utensils`
- **Végétal :** `fas fa-seedling`
- **Nutrition :** `fas fa-chart-bar`
- **Environnement :** `fas fa-leaf`
- **Économie :** `fas fa-euro-sign`
- **Score :** `fas fa-star`
- **Fournisseurs :** `fas fa-truck`
- **Recommandations :** `fas fa-lightbulb`

### Style
- **Couleur par défaut :** Vert principal (#22c55e)
- **Taille standard :** 16-24px
- **Taille grande :** 48-64px

---

## 🎬 Animations

### Float (Logo)
```css
@keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
}
```
**Durée :** 3s  
**Timing :** ease-in-out  
**Répétition :** infinite

### Spin (Loading)
```css
@keyframes spin {
    to { transform: rotate(360deg); }
}
```
**Durée :** 1s  
**Timing :** linear  
**Répétition :** infinite

### Slide In (Toast)
```css
@keyframes slideIn {
    from {
        transform: translateX(400px);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}
```
**Durée :** 0.3s  
**Timing :** ease

---

## 📐 Grilles et Espacements

### Container
- **Max-width :** 1200px
- **Padding :** 20px
- **Margin :** 0 auto

### Grilles
- **Gap standard :** 20px
- **Colonnes :** auto-fit, minmax(200px, 1fr)

### Espacements
- **Petit :** 10px
- **Moyen :** 20px
- **Grand :** 30px
- **Extra-grand :** 40px

---

## 🎯 Ton et Voix

### Personnalité de la Marque
- **Simple :** Direct, sans jargon
- **Accessible :** Facile à comprendre
- **Positif :** Encourageant, optimiste
- **Professionnel :** Fiable, crédible
- **Moderne :** Innovant, actuel

### Messages Clés
- Simplicité avant tout
- Transition facile vers le végétal
- Impact positif mesurable
- Solution pratique pour restaurateurs

---

## 📄 Applications

### Web
- Interface principale
- Design responsive
- Performance optimisée

### Print (Futur)
- Cartes de visite
- Flyers
- Rapports PDF

### Social Media (Futur)
- Posts Instagram/Facebook
- Stories
- Bannières LinkedIn

---

## ✅ Checklist d'Utilisation

### Pour chaque nouveau composant :
- [ ] Utilise les couleurs de la palette
- [ ] Respecte les espacements définis
- [ ] Applique les border-radius standards
- [ ] Utilise les ombres appropriées
- [ ] Vérifie le contraste (accessibilité)
- [ ] Teste sur mobile
- [ ] Ajoute les transitions (0.3s ease)
- [ ] Utilise les icônes Font Awesome

---

## 📞 Contact

Pour toute question sur l'identité visuelle :
- 📧 Email : design@ezvg.app
- 📝 Documentation : Ce fichier BRANDING.md

---

**Dernière mise à jour :** 2024  
**Version :** 1.0.0  
**Statut :** Actif

🌱 EZVG - Easy Veggie - Simplifiez votre transition végétale
