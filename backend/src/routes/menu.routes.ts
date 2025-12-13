import { Router, Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { BlackboxService } from '../services/blackbox.service';
import { OCRService } from '../services/ocr.service';
import { MenuAnalysisRequest, ErrorResponse } from '../types';

const router = Router();
const blackboxService = new BlackboxService();
const ocrService = new OCRService();

// Configuration de multer pour l'upload d'images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = process.env.UPLOAD_DIR || 'uploads';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'menu-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE || '10485760') // 10MB par défaut
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Seules les images sont autorisées (jpeg, jpg, png, gif, webp)'));
    }
  }
});

/**
 * POST /api/menu/scan
 * Upload et scan d'une image de menu
 */
router.post('/scan', upload.single('menu'), async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        error: 'NO_FILE',
        message: 'Aucune image fournie'
      } as ErrorResponse);
    }

    console.log(`📸 Image reçue: ${req.file.filename}`);

    // Extraction du texte via OCR
    const ocrResult = await ocrService.extractTextFromImage(req.file.path);

    // Extraction des plats via Blackbox AI
    let plats = [];
    try {
      const menuData = await blackboxService.extractMenuFromOCR(ocrResult.text);
      plats = menuData.plats || [];
    } catch (error) {
      console.warn('⚠️  Extraction IA échouée, utilisation des plats détectés par OCR');
      plats = ocrResult.plats.map((nom: string) => ({
        nom,
        ingredients: [],
        categorie: 'plat',
        prix: null
      }));
    }

    // Nettoyer le fichier uploadé
    fs.unlinkSync(req.file.path);

    res.json({
      success: true,
      ocr: {
        text: ocrResult.text,
        confidence: ocrResult.confidence
      },
      plats,
      message: `${plats.length} plat(s) détecté(s)`
    });

  } catch (error: any) {
    console.error('❌ Erreur lors du scan:', error.message);
    
    // Nettoyer le fichier en cas d'erreur
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    res.status(500).json({
      error: 'SCAN_ERROR',
      message: 'Erreur lors du scan du menu',
      details: error.message
    } as ErrorResponse);
  }
});

/**
 * POST /api/menu/analyze
 * Analyse un plat et génère une alternative végétale
 */
router.post('/analyze', async (req: Request, res: Response) => {
  try {
    const { plat, ingredients, portions } = req.body as MenuAnalysisRequest;

    if (!plat) {
      return res.status(400).json({
        error: 'MISSING_PLAT',
        message: 'Le nom du plat est requis'
      } as ErrorResponse);
    }

    console.log(`🔍 Analyse demandée pour: ${plat}`);

    // Préparer les ingrédients
    const ingredientsList = ingredients && ingredients.length > 0
      ? ingredients.map(ing => {
          if (typeof ing === 'string') {
            return { nom: ing, quantite: '100', unite: 'g' };
          }
          return ing;
        })
      : [{ nom: 'Ingrédients standards', quantite: '1', unite: 'portion' }];

    // Analyse via Blackbox AI
    const result = await blackboxService.analyzeMenu(plat, ingredientsList);

    res.json({
      success: true,
      data: result,
      message: 'Analyse terminée avec succès'
    });

  } catch (error: any) {
    console.error('❌ Erreur lors de l\'analyse:', error.message);
    
    res.status(500).json({
      error: 'ANALYSIS_ERROR',
      message: 'Erreur lors de l\'analyse du plat',
      details: error.message
    } as ErrorResponse);
  }
});

/**
 * GET /api/menu/health
 * Vérification de l'état du service
 */
router.get('/health', async (req: Request, res: Response) => {
  const isBlackboxConfigured = blackboxService.isConfigured();
  
  let blackboxStatus = 'not_configured';
  if (isBlackboxConfigured) {
    try {
      const isConnected = await blackboxService.testConnection();
      blackboxStatus = isConnected ? 'connected' : 'error';
    } catch (error) {
      blackboxStatus = 'error';
    }
  }

  res.json({
    status: 'ok',
    services: {
      ocr: 'ready',
      blackbox: blackboxStatus
    },
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

/**
 * POST /api/menu/batch-analyze
 * Analyse plusieurs plats en une seule requête
 */
router.post('/batch-analyze', async (req: Request, res: Response) => {
  try {
    const { plats } = req.body;

    if (!plats || !Array.isArray(plats) || plats.length === 0) {
      return res.status(400).json({
        error: 'INVALID_REQUEST',
        message: 'Un tableau de plats est requis'
      } as ErrorResponse);
    }

    console.log(`🔍 Analyse batch de ${plats.length} plats`);

    const results = [];
    for (const platData of plats) {
      try {
        const ingredientsList = platData.ingredients || [
          { nom: 'Ingrédients standards', quantite: '1', unite: 'portion' }
        ];
        
        const result = await blackboxService.analyzeMenu(platData.nom, ingredientsList);
        results.push({
          success: true,
          plat: platData.nom,
          data: result
        });
      } catch (error: any) {
        results.push({
          success: false,
          plat: platData.nom,
          error: error.message
        });
      }
    }

    res.json({
      success: true,
      results,
      total: plats.length,
      successful: results.filter(r => r.success).length
    });

  } catch (error: any) {
    console.error('❌ Erreur lors de l\'analyse batch:', error.message);
    
    res.status(500).json({
      error: 'BATCH_ANALYSIS_ERROR',
      message: 'Erreur lors de l\'analyse batch',
      details: error.message
    } as ErrorResponse);
  }
});

export default router;
