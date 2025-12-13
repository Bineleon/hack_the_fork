# 🏪 Fonctionnalité Fournisseurs B2B

## Vue d'ensemble

Cette fonctionnalité recommande automatiquement des fournisseurs B2B français d'ingrédients végétaux pour chaque alternative végétale générée.

## Fournisseurs Disponibles

### Grossistes
- **Metro France** - Gamme Végétale (Beyond Meat, Heura, La Vie, Garden Gourmet)
- **Transgourmet** - Veggie (Beyond Meat, Heura, Oatly, Alpro Pro)
- **Sysco France** - Gamme Végétale (Beyond Meat, Garden Gourmet, Quorn)
- **Pomona** - Gamme Végétale (Soy, Bjorg, Lima, Natali)

### Distributeurs
- **Soy** - Spécialiste soja et tofu (Soy, Tossolia, Taifun)
- **Un Monde Vegan Pro** - Large gamme (Beyond Meat, Violife, Sheese)
- **Greenweez Pro** - Produits bio (Bjorg, Alpro, Sojasun, Lima)
- **Biocoop Restauration** - Bio et équitable
- **Végétal World** - Alternatives variées (Heura, Violife, Oatly)

### Fabricants Directs
- **La Vie** - Charcuterie végétale premium
- **Heura Foods** - Alternatives au poulet
- **Tossolia** - Tofu, tempeh, seitan français bio
- **Beyond Meat** - Via distributeurs

## Comment ça fonctionne

### 1. Base de données statique
Fichier: `backend/src/data/suppliers.ts`
- 12 fournisseurs B2B français
- Informations complètes: contact, livraison, marques, prix

### 2. Intégration IA
L'IA Blackbox reçoit la liste des fournisseurs et recommande les 2-3 plus pertinents selon:
- Les ingrédients de l'alternative végétale
- Les marques disponibles
- Le type de cuisine
- Le budget

### 3. Réponse enrichie
Chaque analyse de plat retourne maintenant:
```json
{
  "alternative_vegetale": {...},
  "nutrition": {...},
  "impact_environnemental": {...},
  "impact_economique": {...},
  "fournisseurs_recommandes": [
    {
      "nom": "Metro France - Gamme Végétale",
      "type": "grossiste",
      "specialites": ["Alternatives à la viande"],
      "marques_disponibles": ["Beyond Meat", "Heura", "La Vie"],
      "contact": {
        "site_web": "https://www.metro.fr",
        "telephone": "+33 800 09 09 09"
      },
      "livraison": {
        "zones": ["France métropolitaine"],
        "delai_moyen": "24-48h",
        "commande_minimum": "Selon magasin"
      },
      "prix_indicatif": "moyen",
      "pertinence": "Grossiste majeur avec large gamme de marques premium..."
    }
  ]
}
```

## Utilisation

### API Endpoint
```bash
POST /api/menu/analyze
Content-Type: application/json

{
  "plat": "Poulet rôti",
  "ingredients": ["Poulet 300g", "Herbes de Provence"]
}
```

### Réponse
La réponse inclut automatiquement 2-3 fournisseurs recommandés avec:
- ✅ Nom et type (grossiste/distributeur/fabricant)
- ✅ Spécialités et marques disponibles
- ✅ Contact complet (site web, téléphone, email)
- ✅ Informations de livraison
- ✅ Prix indicatif
- ✅ Explication de la pertinence

## Avantages pour les Restaurateurs

### 🎯 Gain de temps
- Plus besoin de chercher des fournisseurs
- Recommandations ciblées selon le plat

### 💰 Optimisation des coûts
- Comparaison des prix (économique/moyen/premium)
- Commandes minimales indiquées

### 📦 Logistique simplifiée
- Zones de livraison claires
- Délais de livraison estimés
- Contacts directs fournis

### 🌱 Qualité garantie
- Marques premium (Beyond Meat, Heura, La Vie)
- Fournisseurs certifiés (Bio, Vegan)
- Fabricants français privilégiés

## Marques Premium Disponibles

### Alternatives à la Viande
- **Beyond Meat** - Burgers, saucisses, viande hachée
- **Heura** - Poulet végétal, nuggets, lanières
- **La Vie** - Lardons, bacon végétal
- **Garden Gourmet** - Large gamme Nestlé

### Produits Laitiers Végétaux
- **Violife** - Fromages végétaux
- **Oatly** - Boissons et crèmes à l'avoine
- **Alpro Pro** - Gamme professionnelle

### Produits Français
- **Tossolia** - Tofu, tempeh, seitan bio
- **Soy** - Spécialités soja
- **Bjorg** - Épicerie bio

## Mode Démo

Même sans API Blackbox, le mode démo retourne des fournisseurs:
- Metro France (marques premium)
- Tossolia (fabricant français bio)

## Évolutions Futures

### Phase 2
- [ ] Filtrage par région/ville
- [ ] Intégration prix en temps réel
- [ ] Système de notation fournisseurs
- [ ] Historique des commandes

### Phase 3
- [ ] API partenaires fournisseurs
- [ ] Commande directe depuis l'app
- [ ] Gestion des stocks
- [ ] Alertes promotions

## Support

Pour ajouter un nouveau fournisseur:
1. Éditer `backend/src/data/suppliers.ts`
2. Ajouter l'objet `Supplier` avec toutes les informations
3. Redémarrer le serveur

## Exemples de Recommandations

### Pour un Burger
- Metro France (Beyond Meat)
- Transgourmet (Beyond Meat, Garden Gourmet)

### Pour un Plat Asiatique
- Végétal World (produits asiatiques)
- Tossolia (tofu, tempeh)

### Pour de la Charcuterie
- La Vie (lardons, bacon)
- Un Monde Vegan Pro (large gamme)

### Pour du Poulet
- Heura Foods (spécialiste poulet)
- Metro France (Heura disponible)

---

**Cette fonctionnalité transforme Hack the Fork en un véritable outil B2B complet pour les restaurateurs!** 🚀
