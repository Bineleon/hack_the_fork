import axios from 'axios';
import { BlackboxRequest, BlackboxResponse, AnalysisResult, Ingredient } from '../types';
import { PromptService } from './prompt.service';

export class BlackboxService {
  private apiKey: string;
  private apiUrl: string;

  constructor() {
    this.apiKey = process.env.BLACKBOX_API_KEY || '';
    this.apiUrl = process.env.BLACKBOX_API_URL || 'https://api.blackbox.ai/v1/chat/completions';

    if (!this.apiKey) {
      console.warn('⚠️  BLACKBOX_API_KEY non configurée. Utilisation du mode démo.');
    }
  }

  /**
   * Appel générique à l'API Blackbox avec retry
   */
  private async callBlackboxAPI(
    prompt: string, 
    temperature: number = 0.7, 
    retries: number = 1,
    maxTokens: number = 2500,
    timeout: number = 45000
  ): Promise<string> {
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        const request: BlackboxRequest = {
          messages: [
            {
              role: 'system',
              content: 'Expert nutrition et cuisine végétale. JSON uniquement.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          model: 'blackboxai/meta-llama/llama-3.3-70b-instruct:free',
          temperature,
          max_tokens: maxTokens
        };

        console.log(`🔄 Tentative ${attempt}/${retries}...`);

        const response = await axios.post<BlackboxResponse>(
          this.apiUrl,
          request,
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${this.apiKey}`
            },
            timeout
          }
        );

        return response.data.choices[0].message.content;
      } catch (error: any) {
        console.error(`❌ Tentative ${attempt} échouée:`, error.message);
        
        if (attempt === retries) {
          throw new Error(`Erreur API Blackbox: ${error.message}`);
        }
        
        // Attendre 1 seconde avant de réessayer (réduit de 2s à 1s)
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
    
    throw new Error('Toutes les tentatives ont échoué');
  }

  /**
   * Analyse complète d'un plat avec génération d'alternative végétale
   */
  async analyzeMenu(plat: string, ingredients: Ingredient[]): Promise<AnalysisResult> {
    try {
      console.log(`🔍 Analyse du plat: ${plat}`);

      const prompt = PromptService.buildCompleteAnalysisPrompt(plat, ingredients);
      const response = await this.callBlackboxAPI(prompt, 0.7);

      // Parser la réponse JSON
      const result = this.parseJSONResponse(response);

      // Ajouter les informations du plat original
      result.plat_original = plat;
      result.ingredients_originaux = ingredients;

      console.log('✅ Analyse terminée avec succès');
      return result as AnalysisResult;
    } catch (error: any) {
      console.error('❌ Erreur lors de l\'analyse:', error.message);
      
      // Retourner un résultat de démo en cas d'erreur
      return this.getDemoResult(plat, ingredients);
    }
  }

  /**
   * Extrait les plats d'un texte OCR
   */
  async extractMenuFromOCR(ocrText: string): Promise<any> {
    try {
      console.log('📄 Extraction des plats du menu...');

      const prompt = PromptService.buildMenuExtractionPrompt(ocrText);
      // Paramètres optimisés pour extraction rapide:
      // - température 0.3 (plus déterministe)
      // - 2 retries
      // - 1200 max_tokens (réduit pour réponse plus rapide)
      // - 30s timeout (réduit de 45s)
      const response = await this.callBlackboxAPI(prompt, 0.3, 2, 1200, 30000);

      const result = this.parseJSONResponse(response);
      console.log(`✅ ${result.plats?.length || 0} plats extraits`);

      return result;
    } catch (error: any) {
      console.error('❌ Erreur lors de l\'extraction:', error.message);
      throw error;
    }
  }

  /**
   * Parse une réponse JSON de l'API (gère les cas où le JSON est entouré de texte)
   */
  private parseJSONResponse(response: string): any {
    try {
      // Essayer de parser directement
      return JSON.parse(response);
    } catch (e) {
      // Si échec, chercher le JSON dans la réponse
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      throw new Error('Impossible de parser la réponse JSON');
    }
  }

  /**
   * Résultat de démo pour les tests sans API
   */
  private getDemoResult(plat: string, ingredients: Ingredient[]): AnalysisResult {
    console.log('🎭 Mode démo activé - Génération de données fictives');

    return {
      plat_original: plat,
      ingredients_originaux: ingredients,
      alternative_vegetale: {
        nom: `${plat} Végétal`,
        ingredients: [
          { nom: 'Seitan', quantite: '200', unite: 'g' },
          { nom: 'Légumes de saison', quantite: '150', unite: 'g' },
          { nom: 'Sauce maison', quantite: '50', unite: 'ml' }
        ],
        preparation: 'Faire revenir le seitan avec les légumes, ajouter la sauce et laisser mijoter 15 minutes.',
        temps_preparation: '30 min'
      },
      nutrition: {
        original: {
          proteines: 25,
          calories: 350,
          fibres: 2,
          lipides: 15,
          glucides: 30
        },
        vegetale: {
          proteines: 24,
          calories: 320,
          fibres: 8,
          lipides: 10,
          glucides: 35
        },
        equivalence_pourcent: 92,
        explication: 'Profil nutritionnel très similaire avec plus de fibres et moins de lipides saturés.'
      },
      impact_environnemental: {
        co2_original_kg: 5.4,
        co2_vegetale_kg: 0.9,
        gain_co2_kg: 4.5,
        gain_co2_pourcent: 83,
        explication: 'Réduction majeure des émissions grâce au remplacement des protéines animales par des protéines végétales.'
      },
      impact_economique: {
        cout_original_euros: 12.50,
        cout_vegetale_euros: 8.20,
        economie_euros: 4.30,
        economie_pourcent: 34,
        explication: 'Les protéines végétales sont significativement moins coûteuses que la viande.'
      },
      score_global: 90,
      recommandations: [
        'Mettre en avant l\'impact environnemental sur le menu',
        'Proposer une dégustation pour convaincre les clients sceptiques',
        'Former le personnel sur les bénéfices nutritionnels et environnementaux'
      ],
      fournisseurs_recommandes: [
        {
          nom: 'Metro France - Gamme Végétale',
          type: 'grossiste',
          specialites: ['Alternatives à la viande', 'Produits laitiers végétaux'],
          marques_disponibles: ['Beyond Meat', 'Heura', 'La Vie', 'Garden Gourmet'],
          contact: {
            site_web: 'https://www.metro.fr',
            telephone: '+33 800 09 09 09'
          },
          livraison: {
            zones: ['France métropolitaine'],
            delai_moyen: '24-48h',
            commande_minimum: 'Selon magasin'
          },
          prix_indicatif: 'moyen',
          pertinence: 'Grossiste majeur avec large gamme de marques premium (Beyond Meat, Heura, La Vie) et livraison rapide'
        },
        {
          nom: 'Tossolia',
          type: 'fabricant',
          specialites: ['Tofu', 'Tempeh', 'Seitan', 'Alternatives à la viande'],
          marques_disponibles: ['Tossolia'],
          contact: {
            site_web: 'https://www.tossolia.com',
            telephone: '+33 5 61 06 31 21',
            email: 'contact@tossolia.com'
          },
          livraison: {
            zones: ['France métropolitaine'],
            delai_moyen: '48-72h',
            commande_minimum: '100€ HT'
          },
          prix_indicatif: 'moyen',
          pertinence: 'Fabricant français bio spécialisé en seitan et tofu, parfait pour alternatives maison de qualité'
        }
      ]
    };
  }

  /**
   * Vérifie si l'API est configurée
   */
  isConfigured(): boolean {
    return !!this.apiKey && this.apiKey !== '';
  }

  /**
   * Test de connexion à l'API
   */
  async testConnection(): Promise<boolean> {
    try {
      const response = await this.callBlackboxAPI('Réponds simplement "OK"', 0.1);
      return response.toLowerCase().includes('ok');
    } catch (error) {
      return false;
    }
  }
}
