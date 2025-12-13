import { Ingredient } from '../types';
import { SUPPLIERS_DATABASE } from '../data/suppliers';

export class PromptService {
  /**
   * Génère le prompt principal pour l'analyse complète d'un plat
   */
  static buildCompleteAnalysisPrompt(plat: string, ingredients: Ingredient[]): string {
    const ingredientsList = ingredients
      .map(ing => `${ing.nom} (${ing.quantite}${ing.unite || ''})`)
      .join(', ');

    // Liste simplifiée des fournisseurs pour réduire la taille du prompt
    const suppliersInfo = SUPPLIERS_DATABASE.map(s => 
      `${s.nom} (${s.type}): ${s.specialites.slice(0, 2).join(', ')} - ${s.marques.slice(0, 3).join(', ')}`
    ).join('\n');

    return `Expert en nutrition et cuisine végétale.

CONTEXTE:
Un restaurateur souhaite proposer une alternative végétale pour le plat suivant:
- Plat: ${plat}
- Ingrédients: ${ingredientsList}

FOURNISSEURS B2B FRANCE:
${suppliersInfo}

MISSION:
Analyse ce plat et fournis une alternative végétale complète avec tous les impacts ET recommande 2-3 fournisseurs B2B appropriés.

IMPORTANT: Réponds UNIQUEMENT avec un objet JSON valide, sans texte avant ou après. Format exact:

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
  "fournisseurs_recommandes": [
    {
      "nom": "Nom exact du fournisseur (depuis la liste fournie)",
      "type": "grossiste|distributeur|fabricant",
      "specialites": ["spécialité 1", "spécialité 2"],
      "marques_disponibles": ["Beyond Meat", "Heura"],
      "contact": {
        "site_web": "https://...",
        "telephone": "+33...",
        "email": "..."
      },
      "livraison": {
        "zones": ["France métropolitaine"],
        "delai_moyen": "24-48h",
        "commande_minimum": "150€ HT"
      },
      "prix_indicatif": "économique|moyen|premium",
      "pertinence": "Explication de pourquoi ce fournisseur est recommandé pour cette alternative (ex: 'Spécialisé en alternatives au poulet, propose Heura qui convient parfaitement')"
    }
  ]
}

RÈGLES IMPORTANTES:
1. Utilise des données réalistes basées sur:
   - ADEME pour les émissions CO2 (kg CO2eq par kg d'aliment)
   - Prix moyens de la restauration française
   - Tables nutritionnelles CIQUAL/USDA
2. L'alternative doit être savoureuse et réaliste pour un restaurant
3. Le score_global (0-100) évalue la qualité globale de l'alternative
4. Les émissions CO2 doivent refléter la réalité (viande rouge = 20-30 kg CO2/kg, légumineuses = 0.5-2 kg CO2/kg)
5. Pour les fournisseurs:
   - Recommande 2-3 fournisseurs UNIQUEMENT depuis la liste fournie
   - Choisis les fournisseurs les plus pertinents selon les ingrédients de l'alternative
   - Privilégie les fournisseurs avec les marques premium (Beyond Meat, Heura, La Vie) si l'alternative les utilise
   - Explique clairement pourquoi chaque fournisseur est recommandé
   - Utilise les informations EXACTES de la liste (ne modifie pas les noms, contacts, etc.)
6. Réponds UNIQUEMENT avec le JSON, rien d'autre`;
  }

  /**
   * Génère un prompt pour extraire les plats d'un texte OCR
   */
  static buildMenuExtractionPrompt(ocrText: string): string {
    return `Tu es un expert en analyse de menus de restaurant.

TEXTE EXTRAIT D'UN MENU:
${ocrText}

MISSION:
Extrais tous les plats principaux de ce menu avec leurs ingrédients.

Réponds UNIQUEMENT avec un JSON valide:

{
  "plats": [
    {
      "nom": "nom du plat",
      "ingredients": [
        {"nom": "ingrédient 1", "quantite": "200", "unite": "g"},
        {"nom": "ingrédient 2", "quantite": "100", "unite": "ml"}
      ],
      "categorie": "entrée|plat|dessert",
      "prix": 15.50
    }
  ]
}

RÈGLES:
1. Ignore les boissons, accompagnements seuls, et desserts simples
2. Concentre-toi sur les plats principaux avec protéines
3. Estime les quantités si non spécifiées (portions standards restaurant)
4. Si le texte est illisible ou incomplet, retourne un tableau vide
5. Réponds UNIQUEMENT avec le JSON`;
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
