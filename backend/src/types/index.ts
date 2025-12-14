export interface Ingredient {
  nom: string;
  quantite: string;
  unite?: string;
}

export interface NutritionInfo {
  proteines: number;
  calories: number;
  fibres: number;
  lipides?: number;
  glucides?: number;
}

export interface AlternativeVegetale {
  nom: string;
  ingredients: Ingredient[];
  preparation: string;
  temps_preparation?: string;
}

export interface ImpactEnvironnemental {
  co2_original_kg: number;
  co2_vegetale_kg: number;
  gain_co2_kg: number;
  gain_co2_pourcent: number;
  explication: string;
}

export interface ImpactEconomique {
  cout_original_euros: number;
  cout_vegetale_euros: number;
  economie_euros: number;
  economie_pourcent: number;
  explication: string;
}

export interface NutritionComparison {
  original: NutritionInfo;
  vegetale: NutritionInfo;
  equivalence_pourcent: number;
  explication: string;
}

export interface SupplierInfo {
  nom: string;
  type: 'grossiste' | 'distributeur' | 'fabricant';
  specialites: string[];
  marques_disponibles: string[];
  contact: {
    site_web?: string;
    telephone?: string;
    email?: string;
  };
  livraison: {
    zones: string[];
    delai_moyen: string;
    commande_minimum?: string;
  };
  prix_indicatif: 'économique' | 'moyen' | 'premium';
  pertinence: string; // Pourquoi ce fournisseur est recommandé
}

export interface EtapeBusinessPlan {
  numero: number;
  titre: string;
  description: string;
  duree_estimee: string;
  cout_estime?: string;
  actions_concretes: string[];
  kpis?: string[]; // Indicateurs de performance
  risques_potentiels?: string[];
  conseils_pratiques?: string[];
}

export interface BusinessPlanIntegration {
  titre: string;
  objectif: string;
  duree_totale: string;
  investissement_total?: string;
  retour_sur_investissement_estime?: string;
  etapes: EtapeBusinessPlan[];
  timeline: {
    phase: string;
    periode: string;
    objectifs: string[];
  }[];
  metriques_succes: string[];
  points_attention: string[];
}

export interface AnalysisResult {
  plat_original: string;
  ingredients_originaux: Ingredient[];
  alternative_vegetale: AlternativeVegetale;
  nutrition: NutritionComparison;
  impact_environnemental: ImpactEnvironnemental;
  impact_economique: ImpactEconomique;
  score_global: number;
  recommandations?: string[];
  business_plan?: BusinessPlanIntegration;
  fournisseurs_recommandes?: SupplierInfo[];
}

export interface OCRResult {
  text: string;
  confidence: number;
  plats: string[];
}

export interface BlackboxRequest {
  messages: Array<{
    role: 'system' | 'user' | 'assistant';
    content: string;
  }>;
  model?: string;
  temperature?: number;
  max_tokens?: number;
}

export interface BlackboxResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

export interface MenuAnalysisRequest {
  plat: string;
  ingredients?: string[];
  portions?: number;
}

export interface ErrorResponse {
  error: string;
  message: string;
  details?: any;
}
