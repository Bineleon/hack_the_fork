# 🌱 API des Alternatives Végétales

Documentation complète de l'API pour rechercher et obtenir des informations sur les alternatives végétales aux protéines animales.

## 📋 Table des Matières

- [Vue d'ensemble](#vue-densemble)
- [Base de données](#base-de-données)
- [Endpoints](#endpoints)
- [Exemples d'utilisation](#exemples-dutilisation)
- [Types de données](#types-de-données)

---

## Vue d'ensemble

L'API des alternatives végétales fournit une base de données complète de **20+ alternatives** aux protéines animales, incluant :

- **Produits bruts** : Seitan, tempeh, tofu, jackfruit, PST, etc.
- **Produits de marques** : Beyond Meat, Heura, La Vie, etc.
- **Informations détaillées** : Goût, texture, nutrition, prix, préparation
- **Mapping intelligent** : Correspondances protéines animales → alternatives végétales

### Statistiques de la base

```json
{
  "total_alternatives": 20,
  "produits_bruts": 15,
  "produits_marques": 5,
  "par_proteine": {
    "boeuf": 5,
    "poulet": 5,
    "porc": 5,
    "poisson": 4,
    "oeuf": 3,
    "lait": 3
  }
}
```

---

## Base de données

### Types de protéines supportés

- `boeuf` - Bœuf, veau, steak
- `poulet` - Poulet, volaille, dinde
- `porc` - Porc, jambon, lard, bacon
- `agneau` - Agneau, mouton
- `poisson` - Poisson, saumon, thon, cabillaud
- `fruits_de_mer` - Crevettes, fruits de mer
- `oeuf` - Œufs
- `lait` - Lait, crème, fromage

### Alternatives disponibles

#### Alternatives au Bœuf
- **Seitan** - Texture fibreuse, riche en protéines (25g/100g)
- **Tempeh** - Goût de noisette, fermenté (19g/100g)
- **Jackfruit** - Texture effilochée, parfait pour pulled pork
- **PST** - Protéines de soja texturées (52g/100g)
- **Beyond Burger** - Goût très proche du bœuf

#### Alternatives au Poulet
- **Tofu ferme** - Polyvalent, absorbe les saveurs
- **Heura** - Texture fibreuse proche du poulet
- **Seitan** - Peut remplacer le poulet dans de nombreux plats

#### Alternatives au Porc
- **La Vie Lardons** - Goût fumé authentique
- **Seitan** - Texture dense
- **Tempeh** - Fermenté, savoureux

#### Alternatives au Poisson
- **Tofu fumé** - Goût fumé rappelant le poisson
- **Algues Nori** - Goût iodé et marin
- **Cœurs de palmier** - Texture proche du poisson blanc

#### Alternatives aux Œufs
- **Tofu soyeux** - Pour quiches et desserts
- **Aquafaba** - Monte en neige comme des blancs
- **Graines de lin** - Pour la pâtisserie

#### Alternatives au Lait
- **Yaourt de soja** - Riche en protéines
- **Crème de soja** - Remplace la crème fraîche
- **Tofu soyeux** - Pour sauces et desserts

---

## Endpoints

### 1. Obtenir toutes les alternatives

```http
GET /api/alternatives
```

**Paramètres de requête (optionnels)** :
- `query` - Recherche textuelle
- `proteinType` - Type de protéine (boeuf, poulet, etc.)
- `type` - produit_brut | produit_marque
- `prix` - économique | moyen | premium
- `disponibilite` - facile | moyenne | difficile
- `texture` - tendre | ferme | filandreuse | moelleuse | croquante | fondante
- `marque` - Nom de marque

**Exemple** :
```bash
curl "http://localhost:3000/api/alternatives?proteinType=boeuf&prix=économique"
```

**Réponse** :
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "id": "seitan",
      "nom": "Seitan",
      "type": "produit_brut",
      "remplace": ["boeuf", "porc"],
      "gout": {
        "description": "Goût neutre à légèrement umami",
        "intensite": "léger",
        "notes": ["umami", "neutre", "savoureux mariné"]
      },
      "nutrition": {
        "proteines": 25,
        "calories": 120,
        "lipides": 2,
        "glucides": 4,
        "fibres": 1
      },
      "prix_indicatif": "moyen",
      "disponibilite": "facile"
    }
  ]
}
```

---

### 2. Obtenir une alternative par ID

```http
GET /api/alternatives/:id
```

**Exemple** :
```bash
curl "http://localhost:3000/api/alternatives/seitan"
```

---

### 3. Obtenir les alternatives par type de protéine

```http
GET /api/alternatives/protein/:type
```

**Exemple** :
```bash
curl "http://localhost:3000/api/alternatives/protein/boeuf"
```

**Réponse** :
```json
{
  "success": true,
  "proteinType": "boeuf",
  "count": 5,
  "data": [...]
}
```

---

### 4. Obtenir des recommandations personnalisées

```http
POST /api/alternatives/recommendations
```

**Body** :
```json
{
  "plat": "Boeuf Bourguignon",
  "proteinType": "boeuf",
  "preferences": {
    "budget": "moyen",
    "difficulte": "facile",
    "priorite": "gout"
  }
}
```

**Réponse** :
```json
{
  "success": true,
  "plat": "Boeuf Bourguignon",
  "proteinType": "boeuf",
  "count": 5,
  "data": [
    {
      "alternative": {
        "id": "seitan",
        "nom": "Seitan",
        ...
      },
      "score": 85,
      "raisons": [
        "Parfait pour ce type de plat",
        "Facile à trouver",
        "Riche en protéines (25g/100g)",
        "Préparation facile"
      ]
    }
  ]
}
```

---

### 5. Obtenir des suggestions basées sur des ingrédients

```http
POST /api/alternatives/suggestions
```

**Body** :
```json
{
  "ingredients": [
    "Boeuf 300g",
    "Poulet 200g",
    "Crème fraîche 100ml"
  ]
}
```

**Réponse** :
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "proteinType": "boeuf",
      "alternatives": [...]
    },
    {
      "proteinType": "poulet",
      "alternatives": [...]
    },
    {
      "proteinType": "lait",
      "alternatives": [...]
    }
  ]
}
```

---

### 6. Comparer plusieurs alternatives

```http
POST /api/alternatives/compare
```

**Body** :
```json
{
  "ids": ["seitan", "tempeh", "beyond-meat-burger"]
}
```

**Réponse** :
```json
{
  "success": true,
  "count": 3,
  "data": {
    "alternatives": [...],
    "comparison": {
      "nutrition": {
        "proteines": [25, 19, 20],
        "calories": [120, 195, 250],
        "lipides": [2, 11, 18],
        "glucides": [4, 9, 3],
        "fibres": [1, 6, 2]
      },
      "prix": ["moyen", "moyen", "premium"],
      "disponibilite": ["facile", "moyenne", "facile"],
      "difficulte": ["moyenne", "facile", "facile"]
    }
  }
}
```

---

### 7. Obtenir des alternatives similaires

```http
GET /api/alternatives/:id/similar?limit=3
```

**Exemple** :
```bash
curl "http://localhost:3000/api/alternatives/seitan/similar?limit=3"
```

---

### 8. Obtenir les statistiques

```http
GET /api/alternatives/stats
```

**Réponse** :
```json
{
  "success": true,
  "data": {
    "total_alternatives": 20,
    "produits_bruts": 15,
    "produits_marques": 5,
    "par_proteine": [
      { "protein": "boeuf", "count": 5 },
      { "protein": "poulet", "count": 5 },
      ...
    ]
  }
}
```

---

### 9. Obtenir le top des alternatives

```http
GET /api/alternatives/top
```

**Réponse** :
```json
{
  "success": true,
  "data": {
    "plus_proteines": { "id": "proteines-soja-texturees", ... },
    "plus_economique": { "id": "proteines-soja-texturees", ... },
    "plus_facile": { "id": "tofu-ferme", ... },
    "plus_polyvalent": { "id": "seitan", ... }
  }
}
```

---

### 10. Obtenir les types de protéines disponibles

```http
GET /api/alternatives/protein-types
```

**Réponse** :
```json
{
  "success": true,
  "data": [
    "boeuf",
    "poulet",
    "porc",
    "agneau",
    "poisson",
    "fruits_de_mer",
    "oeuf",
    "lait"
  ]
}
```

---

## Exemples d'utilisation

### Exemple 1 : Rechercher des alternatives au bœuf économiques

```bash
curl "http://localhost:3000/api/alternatives?proteinType=boeuf&prix=économique"
```

### Exemple 2 : Obtenir des recommandations pour un Bœuf Bourguignon

```bash
curl -X POST http://localhost:3000/api/alternatives/recommendations \
  -H "Content-Type: application/json" \
  -d '{
    "plat": "Boeuf Bourguignon",
    "proteinType": "boeuf",
    "preferences": {
      "budget": "moyen",
      "difficulte": "facile"
    }
  }'
```

### Exemple 3 : Obtenir des suggestions pour une liste d'ingrédients

```bash
curl -X POST http://localhost:3000/api/alternatives/suggestions \
  -H "Content-Type: application/json" \
  -d '{
    "ingredients": [
      "Boeuf 300g",
      "Poulet 200g",
      "Crème 100ml"
    ]
  }'
```

### Exemple 4 : Comparer Seitan, Tempeh et Beyond Burger

```bash
curl -X POST http://localhost:3000/api/alternatives/compare \
  -H "Content-Type: application/json" \
  -d '{
    "ids": ["seitan", "tempeh", "beyond-meat-burger"]
  }'
```

---

## Types de données

### PlantBasedAlternative

```typescript
interface PlantBasedAlternative {
  id: string;
  nom: string;
  type: 'produit_brut' | 'produit_marque';
  marque?: string;
  
  remplace: ProteinType[];
  
  gout: {
    description: string;
    intensite: 'léger' | 'moyen' | 'fort';
    notes: string[];
  };
  
  texture: {
    type: TextureType[];
    description: string;
  };
  
  utilisations: {
    plats: string[];
    preparations: CookingMethod[];
    conseils: string[];
  };
  
  nutrition: {
    proteines: number;
    calories: number;
    lipides: number;
    glucides: number;
    fibres: number;
  };
  
  disponibilite: 'facile' | 'moyenne' | 'difficile';
  prix_indicatif: 'économique' | 'moyen' | 'premium';
  conservation: string;
  
  preparation: {
    difficulte: 'facile' | 'moyenne' | 'difficile';
    temps_preparation: string;
    astuces: string[];
  };
  
  avantages: string[];
  ou_acheter: string[];
}
```

---

## Intégration avec l'analyse de menu

L'API des alternatives peut être utilisée en complément de l'API d'analyse de menu :

1. **Analyser un plat** avec `/api/menu/analyze`
2. **Obtenir des recommandations** avec `/api/alternatives/recommendations`
3. **Comparer les options** avec `/api/alternatives/compare`
4. **Choisir la meilleure alternative** basée sur le score et les critères

### Exemple de workflow complet

```javascript
// 1. Analyser le plat
const analysis = await fetch('http://localhost:3000/api/menu/analyze', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    plat: 'Boeuf Bourguignon',
    ingredients: ['Boeuf 300g', 'Carottes 200g']
  })
});

// 2. Obtenir des recommandations détaillées
const recommendations = await fetch('http://localhost:3000/api/alternatives/recommendations', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    plat: 'Boeuf Bourguignon',
    proteinType: 'boeuf',
    preferences: { budget: 'moyen' }
  })
});

// 3. Comparer les meilleures options
const topIds = recommendations.data.slice(0, 3).map(r => r.alternative.id);
const comparison = await fetch('http://localhost:3000/api/alternatives/compare', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ ids: topIds })
});
```

---

## Sources de données

### APIs externes recommandées (à intégrer)

1. **Open Food Facts** - https://world.openfoodfacts.org/api/v2
   - Base de données mondiale de produits alimentaires
   - Données nutritionnelles, ingrédients, labels
   - Gratuit et open source

2. **USDA FoodData Central** - https://fdc.nal.usda.gov/api-guide.html
   - Données nutritionnelles officielles
   - Gratuit

3. **Base CIQUAL** (France) - https://ciqual.anses.fr/
   - Données nutritionnelles françaises
   - Téléchargeable en CSV

---

## Prochaines étapes

- [ ] Intégration Open Food Facts API
- [ ] Ajout de plus d'alternatives (objectif: 50+)
- [ ] Système de notation par les utilisateurs
- [ ] Photos des produits
- [ ] Recettes détaillées pour chaque alternative
- [ ] Calcul automatique des équivalences nutritionnelles
- [ ] Suggestions de fournisseurs locaux

---

## Support

Pour toute question ou suggestion :
- 📧 Email : hello@hackthefork.com
- 🐛 Issues : GitHub Issues
- 📖 Documentation : /Documentation

---

**🌱 Hack the Fork - Transformez votre menu en végétal**
