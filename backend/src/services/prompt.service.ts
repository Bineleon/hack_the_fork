import { Ingredient } from '../types';
import { SUPPLIERS_DATABASE } from '../data/suppliers';
import { 
  findAlternativesByProtein, 
  getAlternativeById,
  ProteinType 
} from '../data/plant-based-alternatives';

export class PromptService {
  /**
   * Génère le prompt principal pour l'analyse complète d'un plat
   */
  static buildCompleteAnalysisPrompt(plat: string, ingredients: Ingredient[]): string {
    const ingredientsList = ingredients
      .map(ing => `${ing.nom} (${ing.quantite}${ing.unite || ''})`)
      .join(', ');

    // Détecter le type de protéine principale
    const proteinType = this.detectProteinType(ingredientsList);
    
    // Obtenir les alternatives végétales pertinentes de notre base de données
    let alternativesInfo = '';
    if (proteinType) {
      const alternatives = findAlternativesByProtein(proteinType);
      alternativesInfo = '\n\nAlternatives végétales disponibles:\n' + 
        alternatives.slice(0, 5).map(alt => 
          `- ${alt.nom}: ${alt.gout.description}, ${alt.texture.description} (${alt.nutrition.proteines}g protéines/100g, ${alt.prix_indicatif})`
        ).join('\n');
    }

    // Liste ultra-compacte: seulement les 6 fournisseurs les plus pertinents
    const topSuppliers = SUPPLIERS_DATABASE.slice(0, 6).map(s => 
      `${s.nom}|${s.type}|${s.marques.slice(0, 2).join(',')}`
    ).join('\n');

    return `Expert cuisine végétale. Plat: ${plat}. Ingrédients: ${ingredientsList || 'standards'}${alternativesInfo}

Fournisseurs: ${topSuppliers}

JSON uniquement:

{
  "alternative_vegetale": {
    "nom": "nom du plat végétal équivalent",
    "ingredients": [
      {"nom": "ingrédient 1", "quantite": "200", "unite": "g"},
      {"nom": "ingrédient 2", "quantite": "100", "unite": "g"}
    ],
    "preparation": "description courte de la préparation (2-3 phrases)",
    "temps_preparation": "30 min"
  },
  "nutrition": {
    "original": {
      "proteines": 25,
      "calories": 350,
      "fibres": 2,
      "lipides": 15,
      "glucides": 30
    },
    "vegetale": {
      "proteines": 24,
      "calories": 340,
      "fibres": 8,
      "lipides": 12,
      "glucides": 35
    },
    "equivalence_pourcent": 95,
    "explication": "L'alternative végétale offre un profil nutritionnel très similaire avec plus de fibres"
  },
  "impact_environnemental": {
    "co2_original_kg": 5.2,
    "co2_vegetale_kg": 0.8,
    "gain_co2_kg": 4.4,
    "gain_co2_pourcent": 85,
    "explication": "Réduction significative grâce au remplacement de la viande par des protéines végétales"
  },
  "impact_economique": {
    "cout_original_euros": 12.50,
    "cout_vegetale_euros": 8.30,
    "economie_euros": 4.20,
    "economie_pourcent": 34,
    "explication": "Les protéines végétales sont généralement moins coûteuses que la viande"
  },
  "score_global": 92,
  "recommandations": [
    "Mettre en avant l'aspect environnemental sur le menu",
    "Proposer une dégustation gratuite pour convaincre les clients",
    "Former le personnel sur les bénéfices de cette alternative"
  ],
  "fournisseurs_recommandes": [{"nom":"Nom exact","type":"grossiste","specialites":["Spé1"],"marques_disponibles":["Marque1"],"contact":{"site_web":"url","telephone":"tel"},"livraison":{"zones":["France"],"delai_moyen":"24-48h","commande_minimum":"150€"},"prix_indicatif":"moyen","pertinence":"Pourquoi"}]
}

Règles: Données réalistes CO2 (viande=20-30kg, légumes=0.5-2kg), prix FR, 2 fournisseurs liste, JSON seulement

IMPORTANT: Utilise les alternatives végétales listées ci-dessus pour créer une recette réaliste et savoureuse. Privilégie les alternatives avec le meilleur rapport goût/texture/nutrition/prix.`;
  }

  /**
   * Détecter le type de protéine principale dans les ingrédients
   */
  private static detectProteinType(ingredientsText: string): ProteinType | null {
    const text = ingredientsText.toLowerCase();
    
    const proteinMapping: { [key: string]: ProteinType } = {
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
      'saucisse': 'porc',
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

    for (const [keyword, proteinType] of Object.entries(proteinMapping)) {
      if (text.includes(keyword)) {
        return proteinType;
      }
    }

    return null;
  }

  /**
   * Génère un prompt pour extraire les plats d'un texte OCR (version optimisée)
   */
  static buildMenuExtractionPrompt(ocrText: string): string {
    // Limiter le texte OCR à 1000 caractères pour accélérer le traitement
    const truncatedText = ocrText.length > 1000 ? ocrText.substring(0, 1000) + '...' : ocrText;
    
    return `Extrais les plats principaux de ce menu. JSON uniquement.

MENU:
${truncatedText}

Format JSON:
{"plats":[{"nom":"Plat","ingredients":[{"nom":"Ingrédient","quantite":"200","unite":"g"}],"categorie":"plat","prix":15.5}]}

Règles: Plats principaux uniquement, ignore boissons/desserts, estime quantités standards. JSON seulement.`;
  }

  /**
   * Génère un prompt pour améliorer une alternative existante
   */
  static buildImprovementPrompt(
    platOriginal: string,
    alternativeActuelle: string,
    feedback: string
  ): string {
    return `Tu es un chef cuisinier expert en cuisine végétale.

CONTEXTE:
- Plat original: ${platOriginal}
- Alternative actuelle: ${alternativeActuelle}
- Feedback: ${feedback}

MISSION:
Améliore l'alternative végétale en tenant compte du feedback.

Réponds avec un JSON contenant l'alternative améliorée (même format que buildCompleteAnalysisPrompt).

Réponds UNIQUEMENT avec le JSON.`;
  }

  /**
   * Génère un prompt pour des suggestions de menu complet
   */
  static buildMenuSuggestionsPrompt(plats: string[]): string {
    return `Tu es un consultant en restauration durable.

MENU ACTUEL:
${plats.map((p, i) => `${i + 1}. ${p}`).join('\n')}

MISSION:
Propose une stratégie de végétalisation progressive de ce menu.

Réponds avec un JSON:

{
  "strategie": {
    "phase_1": {
      "plats_a_vegetaliser": ["plat 1", "plat 2"],
      "raison": "explication",
      "impact_estime": "description"
    },
    "phase_2": {
      "plats_a_vegetaliser": ["plat 3"],
      "raison": "explication",
      "impact_estime": "description"
    }
  },
  "impact_global": {
    "reduction_co2_annuelle_kg": 5000,
    "economie_annuelle_euros": 12000,
    "nouveaux_clients_potentiels": "estimation"
  },
  "conseils_marketing": [
    "conseil 1",
    "conseil 2"
  ]
}

Réponds UNIQUEMENT avec le JSON.`;
  }
}
