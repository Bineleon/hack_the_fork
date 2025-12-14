/**
 * Routes API pour les alternatives végétales
 */

import { Router, Request, Response } from 'express';
import { AlternativesService } from '../services/alternatives.service';
import { ProteinType } from '../data/plant-based-alternatives';

const router = Router();

/**
 * GET /api/alternatives
 * Obtenir toutes les alternatives avec filtres optionnels
 */
router.get('/', (req: Request, res: Response) => {
  try {
    const { 
      query, 
      proteinType, 
      type, 
      prix, 
      disponibilite, 
      texture, 
      marque 
    } = req.query;

    const results = AlternativesService.search({
      query: query as string,
      proteinType: proteinType as ProteinType,
      type: type as 'produit_brut' | 'produit_marque',
      prix: prix as 'économique' | 'moyen' | 'premium',
      disponibilite: disponibilite as 'facile' | 'moyenne' | 'difficile',
      texture: texture as any,
      marque: marque as string
    });

    res.json({
      success: true,
      count: results.length,
      data: results
    });
  } catch (error) {
    console.error('Erreur lors de la recherche d\'alternatives:', error);
    res.status(500).json({
      success: false,
      error: 'Erreur lors de la recherche d\'alternatives',
      message: error instanceof Error ? error.message : 'Erreur inconnue'
    });
  }
});

/**
 * GET /api/alternatives/stats
 * Obtenir les statistiques de la base de données
 */
router.get('/stats', (req: Request, res: Response) => {
  try {
    const stats = AlternativesService.getStats();
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des stats:', error);
    res.status(500).json({
      success: false,
      error: 'Erreur lors de la récupération des statistiques'
    });
  }
});

/**
 * GET /api/alternatives/top
 * Obtenir les meilleures alternatives par catégorie
 */
router.get('/top', (req: Request, res: Response) => {
  try {
    const top = AlternativesService.getTopAlternatives();
    res.json({
      success: true,
      data: top
    });
  } catch (error) {
    console.error('Erreur lors de la récupération du top:', error);
    res.status(500).json({
      success: false,
      error: 'Erreur lors de la récupération du top alternatives'
    });
  }
});

/**
 * GET /api/alternatives/protein-types
 * Obtenir tous les types de protéines disponibles
 */
router.get('/protein-types', (req: Request, res: Response) => {
  try {
    const types = AlternativesService.getAvailableProteinTypes();
    res.json({
      success: true,
      data: types
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des types:', error);
    res.status(500).json({
      success: false,
      error: 'Erreur lors de la récupération des types de protéines'
    });
  }
});

/**
 * GET /api/alternatives/protein/:type
 * Obtenir toutes les alternatives pour un type de protéine
 */
router.get('/protein/:type', (req: Request, res: Response) => {
  try {
    const { type } = req.params;
    const alternatives = AlternativesService.getByProteinType(type as ProteinType);

    if (alternatives.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Type de protéine non trouvé ou aucune alternative disponible'
      });
    }

    res.json({
      success: true,
      proteinType: type,
      count: alternatives.length,
      data: alternatives
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des alternatives:', error);
    res.status(500).json({
      success: false,
      error: 'Erreur lors de la récupération des alternatives'
    });
  }
});

/**
 * GET /api/alternatives/:id
 * Obtenir une alternative spécifique par ID
 */
router.get('/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const alternative = AlternativesService.getById(id);

    if (!alternative) {
      return res.status(404).json({
        success: false,
        error: 'Alternative non trouvée'
      });
    }

    res.json({
      success: true,
      data: alternative
    });
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'alternative:', error);
    res.status(500).json({
      success: false,
      error: 'Erreur lors de la récupération de l\'alternative'
    });
  }
});

/**
 * GET /api/alternatives/:id/similar
 * Obtenir des alternatives similaires
 */
router.get('/:id/similar', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const limit = parseInt(req.query.limit as string) || 3;
    
    const similar = AlternativesService.getSimilarAlternatives(id, limit);

    res.json({
      success: true,
      count: similar.length,
      data: similar
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des alternatives similaires:', error);
    res.status(500).json({
      success: false,
      error: 'Erreur lors de la récupération des alternatives similaires'
    });
  }
});

/**
 * POST /api/alternatives/recommendations
 * Obtenir des recommandations personnalisées pour un plat
 */
router.post('/recommendations', (req: Request, res: Response) => {
  try {
    const { plat, proteinType, preferences } = req.body;

    if (!plat || !proteinType) {
      return res.status(400).json({
        success: false,
        error: 'Les champs "plat" et "proteinType" sont requis'
      });
    }

    const recommendations = AlternativesService.getRecommendationsForDish(
      plat,
      proteinType,
      preferences
    );

    res.json({
      success: true,
      plat,
      proteinType,
      count: recommendations.length,
      data: recommendations
    });
  } catch (error) {
    console.error('Erreur lors de la génération des recommandations:', error);
    res.status(500).json({
      success: false,
      error: 'Erreur lors de la génération des recommandations',
      message: error instanceof Error ? error.message : 'Erreur inconnue'
    });
  }
});

/**
 * POST /api/alternatives/compare
 * Comparer plusieurs alternatives
 */
router.post('/compare', (req: Request, res: Response) => {
  try {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Le champ "ids" doit être un tableau non vide d\'identifiants'
      });
    }

    const comparison = AlternativesService.compareAlternatives(ids);

    res.json({
      success: true,
      count: comparison.alternatives.length,
      data: comparison
    });
  } catch (error) {
    console.error('Erreur lors de la comparaison:', error);
    res.status(500).json({
      success: false,
      error: 'Erreur lors de la comparaison des alternatives'
    });
  }
});

/**
 * POST /api/alternatives/suggestions
 * Obtenir des suggestions basées sur des ingrédients
 */
router.post('/suggestions', (req: Request, res: Response) => {
  try {
    const { ingredients } = req.body;

    if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Le champ "ingredients" doit être un tableau non vide'
      });
    }

    const suggestions = AlternativesService.getSuggestionsFromIngredients(ingredients);

    res.json({
      success: true,
      count: suggestions.length,
      data: suggestions
    });
  } catch (error) {
    console.error('Erreur lors de la génération des suggestions:', error);
    res.status(500).json({
      success: false,
      error: 'Erreur lors de la génération des suggestions',
      message: error instanceof Error ? error.message : 'Erreur inconnue'
    });
  }
});

export default router;
