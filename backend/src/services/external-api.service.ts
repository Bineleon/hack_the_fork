/**
 * Service d'intégration d'APIs externes pour enrichir les données d'alternatives végétales
 * - Open Food Facts
 * - Alternative Protein Company Database
 * - USDA FoodData Central
 */

import axios from 'axios';

// Cache simple en mémoire (à remplacer par Redis en production)
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 3600000; // 1 heure

export interface OpenFoodFactsProduct {
  product_name: string;
  brands: string;
  categories: string;
  ingredients_text: string;
  nutriments: {
    proteins_100g?: number;
    energy_kcal_100g?: number;
    fat_100g?: number;
    carbohydrates_100g?: number;
    fiber_100g?: number;
  };
  labels: string;
  ecoscore_grade?: string;
  nutriscore_grade?: string;
}

export interface AlternativeProteinCompany {
  company_name: string;
  country: string;
  products: string[];
  protein_sources: string[];
  categories: string[];
  website?: string;
  description?: string;
}

export class ExternalAPIService {
  private static readonly OPEN_FOOD_FACTS_API = 'https://world.openfoodfacts.org/api/v2';
  private static readonly USDA_API = 'https://api.nal.usda.gov/fdc/v1';
  
  /**
   * Rechercher un produit sur Open Food Facts
   */
  static async searchOpenFoodFacts(query: string): Promise<OpenFoodFactsProduct[]> {
    try {
      const cacheKey = `off_search_${query}`;
      const cached = this.getFromCache(cacheKey);
      if (cached) return cached;

      const response = await axios.get(`${this.OPEN_FOOD_FACTS_API}/search`, {
        params: {
          search_terms: query,
          search_simple: 1,
          action: 'process',
          json: 1,
          page_size: 20,
          fields: 'product_name,brands,categories,ingredients_text,nutriments,labels,ecoscore_grade,nutriscore_grade'
        },
        timeout: 10000
      });

      const products = response.data.products || [];
      this.setCache(cacheKey, products);
      return products;
    } catch (error) {
      console.error('Erreur Open Food Facts:', error);
      return [];
    }
  }

  /**
   * Obtenir les détails d'un produit par code-barres
   */
  static async getProductByBarcode(barcode: string): Promise<OpenFoodFactsProduct | null> {
    try {
      const cacheKey = `off_barcode_${barcode}`;
      const cached = this.getFromCache(cacheKey);
      if (cached) return cached;

      const response = await axios.get(
        `${this.OPEN_FOOD_FACTS_API}/product/${barcode}.json`,
        { timeout: 10000 }
      );

      if (response.data.status === 1) {
        const product = response.data.product;
        this.setCache(cacheKey, product);
        return product;
      }
      return null;
    } catch (error) {
      console.error('Erreur récupération produit:', error);
      return null;
    }
  }

  /**
   * Rechercher des alternatives végétales sur Open Food Facts
   */
  static async searchVeganAlternatives(proteinType: string): Promise<OpenFoodFactsProduct[]> {
    try {
      const searchTerms: { [key: string]: string } = {
        'boeuf': 'vegan beef alternative',
        'poulet': 'vegan chicken alternative',
        'porc': 'vegan pork alternative',
        'poisson': 'vegan fish alternative',
        'lait': 'plant-based milk',
        'fromage': 'vegan cheese'
      };

      const query = searchTerms[proteinType] || `vegan ${proteinType} alternative`;
      return await this.searchOpenFoodFacts(query);
    } catch (error) {
      console.error('Erreur recherche alternatives:', error);
      return [];
    }
  }

  /**
   * Enrichir les données d'une alternative avec Open Food Facts
   */
  static async enrichAlternativeData(alternativeName: string, brand?: string): Promise<{
    nutritionData?: any;
    labels?: string[];
    ecoscore?: string;
    nutriscore?: string;
    ingredients?: string;
  }> {
    try {
      const searchQuery = brand ? `${brand} ${alternativeName}` : alternativeName;
      const products = await this.searchOpenFoodFacts(searchQuery);

      if (products.length === 0) {
        return {};
      }

      // Prendre le premier résultat le plus pertinent
      const product = products[0];

      return {
        nutritionData: product.nutriments,
        labels: product.labels ? product.labels.split(',').map(l => l.trim()) : [],
        ecoscore: product.ecoscore_grade,
        nutriscore: product.nutriscore_grade,
        ingredients: product.ingredients_text
      };
    } catch (error) {
      console.error('Erreur enrichissement données:', error);
      return {};
    }
  }

  /**
   * Obtenir des données nutritionnelles depuis USDA (si clé API disponible)
   */
  static async getUSDANutrition(foodName: string): Promise<any> {
    try {
      const apiKey = process.env.USDA_API_KEY;
      if (!apiKey) {
        console.log('⚠️  Clé API USDA non configurée');
        return null;
      }

      const cacheKey = `usda_${foodName}`;
      const cached = this.getFromCache(cacheKey);
      if (cached) return cached;

      const response = await axios.get(`${this.USDA_API}/foods/search`, {
        params: {
          api_key: apiKey,
          query: foodName,
          pageSize: 5
        },
        timeout: 10000
      });

      const data = response.data.foods?.[0] || null;
      if (data) {
        this.setCache(cacheKey, data);
      }
      return data;
    } catch (error) {
      console.error('Erreur USDA API:', error);
      return null;
    }
  }

  /**
   * Rechercher des entreprises de protéines alternatives
   * (Simulation - à remplacer par l'API réelle si disponible)
   */
  static async searchAlternativeProteinCompanies(
    country?: string,
    proteinSource?: string
  ): Promise<AlternativeProteinCompany[]> {
    // Base de données simulée d'entreprises
    // En production, cela viendrait d'une API externe ou d'une base de données
    const companies: AlternativeProteinCompany[] = [
      {
        company_name: 'Beyond Meat',
        country: 'USA',
        products: ['Beyond Burger', 'Beyond Sausage', 'Beyond Meatballs'],
        protein_sources: ['pea protein', 'mung bean', 'rice protein'],
        categories: ['meat alternatives', 'plant-based'],
        website: 'https://www.beyondmeat.com',
        description: 'Leader mondial des alternatives à la viande à base de protéines végétales'
      },
      {
        company_name: 'Heura Foods',
        country: 'Spain',
        products: ['Heura Chicken', 'Heura Burger', 'Heura Meatballs'],
        protein_sources: ['soy protein', 'pea protein'],
        categories: ['meat alternatives', 'plant-based'],
        website: 'https://www.heurafoods.com',
        description: 'Entreprise espagnole spécialisée dans les alternatives au poulet'
      },
      {
        company_name: 'La Vie',
        country: 'France',
        products: ['La Vie Bacon', 'La Vie Lardons', 'La Vie Saucisse'],
        protein_sources: ['soy protein', 'wheat protein'],
        categories: ['meat alternatives', 'plant-based', 'french'],
        website: 'https://www.la-vie.com',
        description: 'Marque française spécialisée dans les alternatives au porc'
      },
      {
        company_name: 'Impossible Foods',
        country: 'USA',
        products: ['Impossible Burger', 'Impossible Sausage', 'Impossible Nuggets'],
        protein_sources: ['soy protein', 'heme'],
        categories: ['meat alternatives', 'plant-based'],
        website: 'https://www.impossiblefoods.com',
        description: 'Pionnier des alternatives à la viande avec technologie heme'
      },
      {
        company_name: 'Oatly',
        country: 'Sweden',
        products: ['Oat Milk', 'Oat Cream', 'Oat Yogurt'],
        protein_sources: ['oat'],
        categories: ['dairy alternatives', 'plant-based'],
        website: 'https://www.oatly.com',
        description: 'Leader des alternatives laitières à base d\'avoine'
      },
      {
        company_name: 'Tossolia',
        country: 'France',
        products: ['Tofu', 'Tempeh', 'Seitan'],
        protein_sources: ['soy', 'wheat gluten'],
        categories: ['traditional alternatives', 'plant-based', 'french'],
        website: 'https://www.tossolia.com',
        description: 'Fabricant français bio de tofu, tempeh et seitan'
      },
      {
        company_name: 'Redefine Meat',
        country: 'Israel',
        products: ['3D Printed Steak', '3D Printed Lamb', '3D Printed Beef'],
        protein_sources: ['soy protein', 'pea protein', 'chickpea protein'],
        categories: ['meat alternatives', 'plant-based', '3d-printed'],
        website: 'https://www.redefinemeat.com',
        description: 'Viande végétale imprimée en 3D pour restaurants'
      },
      {
        company_name: 'Planted',
        country: 'Switzerland',
        products: ['Planted Chicken', 'Planted Kebab', 'Planted Pulled'],
        protein_sources: ['pea protein', 'sunflower protein'],
        categories: ['meat alternatives', 'plant-based'],
        website: 'https://www.eatplanted.com',
        description: 'Alternatives à la viande à base de protéines de pois'
      },
      {
        company_name: 'Vivera',
        country: 'Netherlands',
        products: ['Vivera Steak', 'Vivera Shawarma', 'Vivera Burger'],
        protein_sources: ['soy protein', 'wheat protein'],
        categories: ['meat alternatives', 'plant-based'],
        website: 'https://www.vivera.com',
        description: 'Marque européenne d\'alternatives à la viande'
      },
      {
        company_name: 'Quorn',
        country: 'UK',
        products: ['Quorn Pieces', 'Quorn Mince', 'Quorn Nuggets'],
        protein_sources: ['mycoprotein'],
        categories: ['meat alternatives', 'fungal protein'],
        website: 'https://www.quorn.com',
        description: 'Alternatives à base de mycoprotéine (champignon)'
      }
    ];

    // Filtrer par pays si spécifié
    let filtered = companies;
    if (country) {
      filtered = filtered.filter(c => 
        c.country.toLowerCase() === country.toLowerCase()
      );
    }

    // Filtrer par source de protéine si spécifié
    if (proteinSource) {
      filtered = filtered.filter(c =>
        c.protein_sources.some(ps => 
          ps.toLowerCase().includes(proteinSource.toLowerCase())
        )
      );
    }

    return filtered;
  }

  /**
   * Obtenir des recommandations de produits basées sur l'IA
   * Utilise les données enrichies pour améliorer les suggestions
   */
  static async getAIEnrichedRecommendations(
    proteinType: string,
    preferences: {
      taste_priority?: boolean;
      texture_priority?: boolean;
      nutrition_priority?: boolean;
      price_priority?: boolean;
    }
  ): Promise<{
    products: OpenFoodFactsProduct[];
    companies: AlternativeProteinCompany[];
    recommendations: string[];
  }> {
    try {
      // Rechercher des produits sur Open Food Facts
      const products = await this.searchVeganAlternatives(proteinType);

      // Rechercher des entreprises pertinentes
      const companies = await this.searchAlternativeProteinCompanies();

      // Générer des recommandations basées sur les préférences
      const recommendations: string[] = [];

      if (preferences.taste_priority) {
        recommendations.push(
          'Privilégier les produits avec des notes gustatives élevées',
          'Tester plusieurs marques pour trouver votre préférence'
        );
      }

      if (preferences.texture_priority) {
        recommendations.push(
          'Rechercher des produits avec texture fibreuse pour plus de réalisme',
          'Les produits à base de seitan ou protéines texturées offrent la meilleure texture'
        );
      }

      if (preferences.nutrition_priority) {
        recommendations.push(
          'Vérifier le Nutri-Score et privilégier les produits A ou B',
          'Comparer les teneurs en protéines (minimum 15g/100g recommandé)'
        );
      }

      if (preferences.price_priority) {
        recommendations.push(
          'Les produits bruts (tofu, tempeh, seitan) sont plus économiques',
          'Acheter en gros pour réduire les coûts'
        );
      }

      return {
        products: products.slice(0, 10), // Top 10
        companies: companies.filter(c => 
          c.categories.includes('meat alternatives')
        ).slice(0, 5),
        recommendations
      };
    } catch (error) {
      console.error('Erreur génération recommandations enrichies:', error);
      return {
        products: [],
        companies: [],
        recommendations: []
      };
    }
  }

  /**
   * Cache helpers
   */
  private static getFromCache(key: string): any {
    const cached = cache.get(key);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return cached.data;
    }
    cache.delete(key);
    return null;
  }

  private static setCache(key: string, data: any): void {
    cache.set(key, { data, timestamp: Date.now() });
  }

  /**
   * Nettoyer le cache
   */
  static clearCache(): void {
    cache.clear();
  }

  /**
   * Obtenir les statistiques du cache
   */
  static getCacheStats(): { size: number; keys: string[] } {
    return {
      size: cache.size,
      keys: Array.from(cache.keys())
    };
  }
}
