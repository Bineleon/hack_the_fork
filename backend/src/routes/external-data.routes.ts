/**
 * Routes pour les données externes enrichies
 * Intégration Open Food Facts et Alternative Protein Companies
 */

import { Router, Request, Response } from 'express';
import { ExternalAPIService } from '../services/external-api.service';

const router = Router();

/**
 * GET /api/external/search-products
 * Rechercher des produits sur Open Food Facts
 */
router.get('/search-products', async (req: Request, res: Response) => {
  try {
    const { query } = req.query;

    if (!query || typeof query !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Le paramètre "query" est requis'
      });
    }

    const products = await ExternalAPIService.searchOpenFoodFacts(query);

    res.json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    console.error('Erreur recherche produits:', error);
    res.status(500).json({
      success: false,
      error: 'Erreur lors de la recherche de produits',
      message: error instanceof Error ? error.message : 'Erreur inconnue'
    });
  }
});

/**
 * GET /api/external/product/:barcode
 * Obtenir un produit par code-barres
 */
router.get('/product/:barcode', async (req: Request, res: Response) => {
  try {
    const { barcode } = req.params;

    const product = await ExternalAPIService.getProductByBarcode(barcode);

    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Produit non trouvé'
      });
    }

    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    console.error('Erreur récupération produit:', error);
    res.status(500).json({
      success: false,
      error: 'Erreur lors de la récupération du produit'
    });
  }
});

/**
 * GET /api/external/vegan-alternatives/:proteinType
 * Rechercher des alternatives végétales sur Open Food Facts
 */
router.get('/vegan-alternatives/:proteinType', async (req: Request, res: Response) => {
  try {
    const { proteinType } = req.params;

    const products = await ExternalAPIService.searchVeganAlternatives(proteinType);

    res.json({
      success: true,
      proteinType,
      count: products.length,
      data: products
    });
  } catch (error) {
    console.error('Erreur recherche alternatives:', error);
    res.status(500).json({
      success: false,
      error: 'Erreur lors de la recherche d\'alternatives'
    });
  }
});

/**
 * POST /api/external/enrich-alternative
 * Enrichir les données d'une alternative avec Open Food Facts
 */
router.post('/enrich-alternative', async (req: Request, res: Response) => {
  try {
    const { alternativeName, brand } = req.body;

    if (!alternativeName) {
      return res.status(400).json({
        success: false,
        error: 'Le champ "alternativeName" est requis'
      });
    }

    const enrichedData = await ExternalAPIService.enrichAlternativeData(
      alternativeName,
      brand
    );

    res.json({
      success: true,
      alternativeName,
      brand,
      data: enrichedData
    });
  } catch (error) {
    console.error('Erreur enrichissement données:', error);
    res.status(500).json({
      success: false,
      error: 'Erreur lors de l\'enrichissement des données'
    });
  }
});

/**
 * GET /api/external/companies
 * Obtenir la liste des entreprises de protéines alternatives
 */
router.get('/companies', async (req: Request, res: Response) => {
  try {
    const { country, proteinSource } = req.query;

    const companies = await ExternalAPIService.searchAlternativeProteinCompanies(
      country as string,
      proteinSource as string
    );

    res.json({
      success: true,
      count: companies.length,
      filters: {
        country: country || 'all',
        proteinSource: proteinSource || 'all'
      },
      data: companies
    });
  } catch (error) {
    console.error('Erreur récupération entreprises:', error);
    res.status(500).json({
      success: false,
      error: 'Erreur lors de la récupération des entreprises'
    });
  }
});

/**
 * POST /api/external/ai-recommendations
 * Obtenir des recommandations enrichies par l'IA
 */
router.post('/ai-recommendations', async (req: Request, res: Response) => {
  try {
    const { proteinType, preferences } = req.body;

    if (!proteinType) {
      return res.status(400).json({
        success: false,
        error: 'Le champ "proteinType" est requis'
      });
    }

    const recommendations = await ExternalAPIService.getAIEnrichedRecommendations(
      proteinType,
      preferences || {}
    );

    res.json({
      success: true,
      proteinType,
      preferences,
      data: recommendations
    });
  } catch (error) {
    console.error('Erreur génération recommandations IA:', error);
    res.status(500).json({
      success: false,
      error: 'Erreur lors de la génération des recommandations',
      message: error instanceof Error ? error.message : 'Erreur inconnue'
    });
  }
});

/**
 * GET /api/external/cache/stats
 * Obtenir les statistiques du cache
 */
router.get('/cache/stats', (req: Request, res: Response) => {
  try {
    const stats = ExternalAPIService.getCacheStats();

    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Erreur stats cache:', error);
    res.status(500).json({
      success: false,
      error: 'Erreur lors de la récupération des stats du cache'
    });
  }
});

/**
 * DELETE /api/external/cache
 * Vider le cache
 */
router.delete('/cache', (req: Request, res: Response) => {
  try {
    ExternalAPIService.clearCache();

    res.json({
      success: true,
      message: 'Cache vidé avec succès'
    });
  } catch (error) {
    console.error('Erreur vidage cache:', error);
    res.status(500).json({
      success: false,
      error: 'Erreur lors du vidage du cache'
    });
  }
});

export default router;
