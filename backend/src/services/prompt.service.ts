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

    // Liste ultra-compacte: seulement les 6 fournisseurs les plus pertinents
    const topSuppliers = SUPPLIERS_DATABASE.slice(0, 6).map(s => 
      `${s.nom}|${s.type}|${s.marques.slice(0, 2).join(',')}`
    ).join('\n');

    return `Expert cuisine végétale. Plat: ${plat}. Ingrédients: ${ingredientsList || 'standards'}

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
    "explication": "Réduction significante grâce au remplacement de la viande par des protéines végétales"
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
  "business_plan": {
    "titre": "Plan d'Intégration de [Nom Alternative]",
    "objectif": "Intégrer progressivement l'alternative végétale au menu avec succès",
    "duree_totale": "3 mois",
    "investissement_total": "2500-3500€",
    "retour_sur_investissement_estime": "6-8 mois",
    "etapes": [
      {
        "numero": 1,
        "titre": "Phase de Préparation",
        "description": "Préparation de l'équipe et des infrastructures",
        "duree_estimee": "2 semaines",
        "cout_estime": "500-800€",
        "actions_concretes": [
          "Former le chef et l'équipe de cuisine aux techniques végétales",
          "Tester les recettes et ajuster les assaisonnements",
          "Commander les ingrédients auprès des fournisseurs sélectionnés"
        ],
        "kpis": ["Nombre de tests réussis", "Satisfaction équipe (sur 10)"],
        "risques_potentiels": ["Résistance de l'équipe", "Difficulté d'approvisionnement"],
        "conseils_pratiques": ["Organiser une dégustation interne", "Prévoir des alternatives de fournisseurs"]
      },
      {
        "numero": 2,
        "titre": "Lancement Test",
        "description": "Introduction en douceur avec un groupe test de clients",
        "duree_estimee": "3 semaines",
        "cout_estime": "800-1200€",
        "actions_concretes": [
          "Proposer le plat en suggestion du jour",
          "Offrir des dégustations gratuites aux clients réguliers",
          "Recueillir les retours clients via questionnaire"
        ],
        "kpis": ["Taux d'acceptation clients", "Note moyenne (sur 5)", "Nombre de commandes"],
        "risques_potentiels": ["Faible demande initiale", "Retours négatifs"],
        "conseils_pratiques": ["Mettre en avant les bénéfices santé et environnement", "Former le personnel de salle au discours"]
      },
      {
        "numero": 3,
        "titre": "Intégration au Menu",
        "description": "Ajout permanent au menu avec communication ciblée",
        "duree_estimee": "4 semaines",
        "cout_estime": "600-900€",
        "actions_concretes": [
          "Intégrer le plat au menu permanent",
          "Créer des supports marketing (photos, descriptions)",
          "Lancer une campagne sur les réseaux sociaux"
        ],
        "kpis": ["Part des ventes du plat végétal", "Nouveaux clients attirés", "Mentions sur réseaux sociaux"],
        "risques_potentiels": ["Cannibalisation des autres plats", "Coûts marketing élevés"],
        "conseils_pratiques": ["Positionner le plat stratégiquement sur le menu", "Utiliser des visuels appétissants"]
      },
      {
        "numero": 4,
        "titre": "Optimisation Continue",
        "description": "Amélioration basée sur les retours et les données",
        "duree_estimee": "3 semaines",
        "cout_estime": "600-600€",
        "actions_concretes": [
          "Analyser les données de vente et ajuster les portions",
          "Optimiser les coûts avec les fournisseurs",
          "Former continuellement l'équipe aux nouvelles techniques"
        ],
        "kpis": ["Marge bénéficiaire", "Taux de satisfaction client", "Réduction des coûts"],
        "risques_potentiels": ["Baisse de qualité", "Augmentation des coûts"],
        "conseils_pratiques": ["Maintenir un dialogue avec les fournisseurs", "Écouter les retours clients"]
      }
    ],
    "timeline": [
      {
        "phase": "Préparation",
        "periode": "Semaines 1-2",
        "objectifs": ["Formation équipe", "Tests recettes", "Commandes initiales"]
      },
      {
        "phase": "Test",
        "periode": "Semaines 3-5",
        "objectifs": ["Lancement soft", "Collecte feedback", "Ajustements"]
      },
      {
        "phase": "Lancement",
        "periode": "Semaines 6-9",
        "objectifs": ["Menu permanent", "Marketing", "Suivi ventes"]
      },
      {
        "phase": "Optimisation",
        "periode": "Semaines 10-12",
        "objectifs": ["Analyse données", "Optimisation coûts", "Formation continue"]
      }
    ],
    "metriques_succes": [
      "15-20% des ventes totales après 3 mois",
      "Note moyenne client > 4.2/5",
      "Marge bénéficiaire > 60%",
      "Retour sur investissement en 6-8 mois",
      "Augmentation de 10% de nouveaux clients"
    ],
    "points_attention": [
      "Maintenir la qualité constante",
      "Former régulièrement le personnel",
      "Surveiller les coûts d'approvisionnement",
      "Adapter selon les saisons",
      "Communiquer les bénéfices environnementaux"
    ]
  },
  "fournisseurs_recommandes": [{"nom":"Nom exact","type":"grossiste","specialites":["Spé1"],"marques_disponibles":["Marque1"],"contact":{"site_web":"url","telephone":"tel"},"livraison":{"zones":["France"],"delai_moyen":"24-48h","commande_minimum":"150€"},"prix_indicatif":"moyen","pertinence":"Pourquoi"}]
}

Règles: Données réalistes CO2 (viande=20-30kg, légumes=0.5-2kg), prix FR, 2 fournisseurs liste, business_plan adapté au plat spécifique, JSON seulement. TOUT LE TEXTE DOIT ÊTRE EN FRANÇAIS.`;
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
