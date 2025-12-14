/**
 * Service de gestion des alternatives végétales
 * Fournit des fonctions de recherche, filtrage et recommandation
 */

import {
  PlantBasedAlternative,
  ProteinType,
  TextureType,
  findAlternativesByProtein,
  searchAlternatives,
  filterAlternatives,
  getAlternativeById,
  getAllAlternatives,
  getRecommendedAlternatives,
  getDatabaseStats,
  PROTEIN_MAPPING
} from '../data/plant-based-alternatives';

export interface AlternativeSearchQuery {
  query?: string;
  proteinType?: ProteinType;
  type?: 'produit_brut' | 'produit_marque';
  prix?: 'économique' | 'moyen' | 'premium';
  disponibilite?: 'facile' | 'moyenne' | 'difficile';
  texture?: TextureType;
  marque?: string;
}

export interface AlternativeRecommendation {
  alternative: PlantBasedAlternative;
  score: number;
  raisons: string[];
}

export class AlternativesService {
  /**
   * Recherche avancée d'alternatives
   */
  static search(searchQuery: AlternativeSearchQuery): PlantBasedAlternative[] {
    let results: PlantBasedAlternative[] = getAllAlternatives();

    // Filtrer par type de protéine
    if (searchQuery.proteinType) {
      results = findAlternativesByProtein(searchQuery.proteinType);
    }

    // Recherche textuelle
    if (searchQuery.query) {
      const textResults = searchAlternatives(searchQuery.query);
      results = results.filter(alt => textResults.some(t => t.id === alt.id));
    }

    // Filtrer par critères
    if (searchQuery.type || searchQuery.prix || searchQuery.disponibilite || searchQuery.texture) {
      const filtered = filterAlternatives({
        type: searchQuery.type,
        prix: searchQuery.prix,
        disponibilite: searchQuery.disponibilite,
        texture: searchQuery.texture
      });
      results = results.filter(alt => filtered.some(f => f.id === alt.id));
    }

    // Filtrer par marque
    if (searchQuery.marque) {
      const marqueSearch = searchQuery.marque.toLowerCase();
      results = results.filter(alt => 
        alt.marque?.toLowerCase().includes(marqueSearch)
      );
    }

    return results;
  }

  /**
   * Obtenir des recommandations personnalisées pour un plat
   */
  static getRecommendationsForDish(
    plat: string,
    proteinType: ProteinType,
    preferences?: {
      budget?: 'économique' | 'moyen' | 'premium';
      difficulte?: 'facile' | 'moyenne' | 'difficile';
      priorite?: 'gout' | 'texture' | 'nutrition' | 'prix';
    }
  ): AlternativeRecommendation[] {
    const alternatives = findAlternativesByProtein(proteinType);
    
    return alternatives.map(alt => {
      let score = 50; // Score de base
      const raisons: string[] = [];

      // Score basé sur la disponibilité
      if (alt.disponibilite === 'facile') {
        score += 15;
        raisons.push('Facile à trouver');
      } else if (alt.disponibilite === 'moyenne') {
        score += 10;
      }

      // Score basé sur le prix
      if (preferences?.budget) {
        if (alt.prix_indicatif === preferences.budget) {
          score += 20;
          raisons.push(`Correspond à votre budget (${preferences.budget})`);
        }
      } else {
        // Favoriser les options économiques par défaut
        if (alt.prix_indicatif === 'économique') {
          score += 15;
          raisons.push('Option économique');
        } else if (alt.prix_indicatif === 'moyen') {
          score += 10;
        }
      }

      // Score basé sur la difficulté de préparation
      if (preferences?.difficulte) {
        if (alt.preparation.difficulte === preferences.difficulte) {
          score += 15;
          raisons.push(`Difficulté adaptée (${preferences.difficulte})`);
        }
      } else {
        // Favoriser les options faciles par défaut
        if (alt.preparation.difficulte === 'facile') {
          score += 10;
          raisons.push('Préparation facile');
        }
      }

      // Score basé sur la nutrition
      if (alt.nutrition.proteines >= 15) {
        score += 10;
        raisons.push(`Riche en protéines (${alt.nutrition.proteines}g/100g)`);
      }

      if (alt.nutrition.fibres >= 5) {
        score += 5;
        raisons.push('Riche en fibres');
      }

      // Score basé sur le type (produits bruts souvent plus polyvalents)
      if (alt.type === 'produit_brut') {
        score += 5;
        raisons.push('Produit brut polyvalent');
      }

      // Bonus pour les produits avec beaucoup d'utilisations
      if (alt.utilisations.plats.length >= 5) {
        score += 5;
        raisons.push('Très polyvalent');
      }

      // Vérifier si le plat correspond aux utilisations suggérées
      const platLower = plat.toLowerCase();
      const matchesUsage = alt.utilisations.plats.some(p => 
        platLower.includes(p.toLowerCase()) || p.toLowerCase().includes(platLower)
      );
      if (matchesUsage) {
        score += 20;
        raisons.push('Parfait pour ce type de plat');
      }

      return {
        alternative: alt,
        score: Math.min(score, 100),
        raisons
      };
    }).sort((a, b) => b.score - a.score);
  }

  /**
   * Comparer plusieurs alternatives
   */
  static compareAlternatives(ids: string[]): {
    alternatives: PlantBasedAlternative[];
    comparison: {
      nutrition: { [key: string]: number[] };
      prix: string[];
      disponibilite: string[];
      difficulte: string[];
    };
  } {
    const alternatives = ids
      .map(id => getAlternativeById(id))
      .filter((alt): alt is PlantBasedAlternative => alt !== undefined);

    return {
      alternatives,
      comparison: {
        nutrition: {
          proteines: alternatives.map(a => a.nutrition.proteines),
          calories: alternatives.map(a => a.nutrition.calories),
          lipides: alternatives.map(a => a.nutrition.lipides),
          glucides: alternatives.map(a => a.nutrition.glucides),
          fibres: alternatives.map(a => a.nutrition.fibres)
        },
        prix: alternatives.map(a => a.prix_indicatif),
        disponibilite: alternatives.map(a => a.disponibilite),
        difficulte: alternatives.map(a => a.preparation.difficulte)
      }
    };
  }

  /**
   * Obtenir des alternatives similaires
   */
  static getSimilarAlternatives(id: string, limit: number = 3): PlantBasedAlternative[] {
    const alternative = getAlternativeById(id);
    if (!alternative) return [];

    const allAlternatives = getAllAlternatives();
    
    // Calculer la similarité avec chaque alternative
    const similarities = allAlternatives
      .filter(alt => alt.id !== id)
      .map(alt => {
        let similarityScore = 0;

        // Même type de protéine remplacée
        const commonProteins = alternative.remplace.filter(p => alt.remplace.includes(p));
        similarityScore += commonProteins.length * 20;

        // Même texture
        const commonTextures = alternative.texture.type.filter(t => alt.texture.type.includes(t));
        similarityScore += commonTextures.length * 15;

        // Même gamme de prix
        if (alternative.prix_indicatif === alt.prix_indicatif) {
          similarityScore += 10;
        }

        // Même disponibilité
        if (alternative.disponibilite === alt.disponibilite) {
          similarityScore += 10;
        }

        // Utilisations similaires
        const commonUsages = alternative.utilisations.plats.filter(p => 
          alt.utilisations.plats.includes(p)
        );
        similarityScore += commonUsages.length * 5;

        return { alternative: alt, score: similarityScore };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);

    return similarities.map(s => s.alternative);
  }

  /**
   * Obtenir les statistiques de la base de données
   */
  static getStats() {
    return getDatabaseStats();
  }

  /**
   * Obtenir toutes les alternatives pour un type de protéine
   */
  static getByProteinType(proteinType: ProteinType): PlantBasedAlternative[] {
    return findAlternativesByProtein(proteinType);
  }

  /**
   * Obtenir une alternative par ID
   */
  static getById(id: string): PlantBasedAlternative | undefined {
    return getAlternativeById(id);
  }

  /**
   * Obtenir toutes les alternatives
   */
  static getAll(): PlantBasedAlternative[] {
    return getAllAlternatives();
  }

  /**
   * Obtenir les types de protéines disponibles
   */
  static getAvailableProteinTypes(): ProteinType[] {
    return Object.keys(PROTEIN_MAPPING) as ProteinType[];
  }

  /**
   * Obtenir des suggestions basées sur des ingrédients
   */
  static getSuggestionsFromIngredients(ingredients: string[]): {
    proteinType: ProteinType;
    alternatives: PlantBasedAlternative[];
  }[] {
    const suggestions: { proteinType: ProteinType; alternatives: PlantBasedAlternative[] }[] = [];
    
    // Mapping d'ingrédients vers types de protéines
    const ingredientMapping: { [key: string]: ProteinType } = {
      'boeuf': 'boeuf',
      'bœuf': 'boeuf',
      'veau': 'boeuf',
      'steak': 'boeuf',
      'poulet': 'poulet',
      'volaille': 'poulet',
      'dinde': 'poulet',
      'porc': 'porc',
      'jambon': 'porc',
      'lard': 'porc',
      'bacon': 'porc',
      'agneau': 'agneau',
      'mouton': 'agneau',
      'poisson': 'poisson',
      'saumon': 'poisson',
      'thon': 'poisson',
      'cabillaud': 'poisson',
      'crevette': 'fruits_de_mer',
      'crevettes': 'fruits_de_mer',
      'fruits de mer': 'fruits_de_mer',
      'oeuf': 'oeuf',
      'œuf': 'oeuf',
      'oeufs': 'oeuf',
      'œufs': 'oeuf',
      'lait': 'lait',
      'crème': 'lait',
      'fromage': 'lait'
    };

    const detectedProteins = new Set<ProteinType>();

    // Détecter les types de protéines dans les ingrédients
    ingredients.forEach(ingredient => {
      const ingredientLower = ingredient.toLowerCase();
      Object.entries(ingredientMapping).forEach(([key, proteinType]) => {
        if (ingredientLower.includes(key)) {
          detectedProteins.add(proteinType);
        }
      });
    });

    // Obtenir les alternatives pour chaque type détecté
    detectedProteins.forEach(proteinType => {
      suggestions.push({
        proteinType,
        alternatives: findAlternativesByProtein(proteinType)
      });
    });

    return suggestions;
  }

  /**
   * Obtenir les meilleures alternatives par catégorie
   */
  static getTopAlternatives(): {
    plus_proteines: PlantBasedAlternative;
    plus_economique: PlantBasedAlternative;
    plus_facile: PlantBasedAlternative;
    plus_polyvalent: PlantBasedAlternative;
  } {
    const all = getAllAlternatives();

    return {
      plus_proteines: all.reduce((prev, current) => 
        current.nutrition.proteines > prev.nutrition.proteines ? current : prev
      ),
      plus_economique: all.filter(a => a.prix_indicatif === 'économique')[0],
      plus_facile: all.filter(a => 
        a.preparation.difficulte === 'facile' && a.disponibilite === 'facile'
      )[0],
      plus_polyvalent: all.reduce((prev, current) => 
        current.utilisations.plats.length > prev.utilisations.plats.length ? current : prev
      )
    };
  }
}
