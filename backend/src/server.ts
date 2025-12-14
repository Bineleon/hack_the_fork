// Charger les variables d'environnement EN PREMIER
import dotenv from 'dotenv';
dotenv.config();

// Maintenant importer les autres modules
import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import path from 'path';
import menuRoutes from './routes/menu.routes';
import alternativesRoutes from './routes/alternatives.routes';
import externalDataRoutes from './routes/external-data.routes';

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Logs des requêtes
app.use((req: Request, res: Response, next: NextFunction) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api/menu', menuRoutes);
app.use('/api/alternatives', alternativesRoutes);
app.use('/api/external', externalDataRoutes);

// Route de base
app.get('/', (req: Request, res: Response) => {
  res.json({
    name: 'Hack the Fork API',
    version: '1.0.0',
    description: 'API pour générer des alternatives végétales aux plats carnés',
    endpoints: {
      menu: {
        health: 'GET /api/menu/health',
        scan: 'POST /api/menu/scan',
        analyze: 'POST /api/menu/analyze',
        batchAnalyze: 'POST /api/menu/batch-analyze'
      },
      alternatives: {
        getAll: 'GET /api/alternatives',
        getById: 'GET /api/alternatives/:id',
        getByProtein: 'GET /api/alternatives/protein/:type',
        getSimilar: 'GET /api/alternatives/:id/similar',
        getStats: 'GET /api/alternatives/stats',
        getTop: 'GET /api/alternatives/top',
        getProteinTypes: 'GET /api/alternatives/protein-types',
        recommendations: 'POST /api/alternatives/recommendations',
        compare: 'POST /api/alternatives/compare',
        suggestions: 'POST /api/alternatives/suggestions'
      },
      external: {
        searchProducts: 'GET /api/external/search-products',
        getProduct: 'GET /api/external/product/:barcode',
        veganAlternatives: 'GET /api/external/vegan-alternatives/:proteinType',
        enrichAlternative: 'POST /api/external/enrich-alternative',
        companies: 'GET /api/external/companies',
        aiRecommendations: 'POST /api/external/ai-recommendations',
        cacheStats: 'GET /api/external/cache/stats',
        clearCache: 'DELETE /api/external/cache'
      }
    },
    documentation: 'https://github.com/votre-repo/hack-the-fork'
  });
});

// Route 404
app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: 'NOT_FOUND',
    message: 'Route non trouvée',
    path: req.path
  });
});

// Gestionnaire d'erreurs global
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('❌ Erreur serveur:', err);
  
  res.status(500).json({
    error: 'INTERNAL_ERROR',
    message: 'Une erreur interne est survenue',
    details: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log('');
  console.log('🌱 ========================================');
  console.log('🌱  Hack the Fork API');
  console.log('🌱 ========================================');
  console.log(`🚀 Serveur démarré sur le port ${PORT}`);
  console.log(`📍 URL: http://localhost:${PORT}`);
  console.log(`🔧 Environnement: ${process.env.NODE_ENV || 'development'}`);
  console.log('');
  console.log('📋 Endpoints disponibles:');
  console.log('');
  console.log('   🍽️  Menu:');
  console.log(`   GET  http://localhost:${PORT}/`);
  console.log(`   GET  http://localhost:${PORT}/api/menu/health`);
  console.log(`   POST http://localhost:${PORT}/api/menu/scan`);
  console.log(`   POST http://localhost:${PORT}/api/menu/analyze`);
  console.log(`   POST http://localhost:${PORT}/api/menu/batch-analyze`);
  console.log('');
  console.log('   🌱 Alternatives:');
  console.log(`   GET  http://localhost:${PORT}/api/alternatives`);
  console.log(`   GET  http://localhost:${PORT}/api/alternatives/stats`);
  console.log(`   GET  http://localhost:${PORT}/api/alternatives/top`);
  console.log(`   GET  http://localhost:${PORT}/api/alternatives/protein/:type`);
  console.log(`   POST http://localhost:${PORT}/api/alternatives/recommendations`);
  console.log(`   POST http://localhost:${PORT}/api/alternatives/suggestions`);
  console.log('');
  console.log('   🌍 Données Externes (Open Food Facts, Companies):');
  console.log(`   GET  http://localhost:${PORT}/api/external/search-products`);
  console.log(`   GET  http://localhost:${PORT}/api/external/companies`);
  console.log(`   POST http://localhost:${PORT}/api/external/ai-recommendations`);
  console.log('');
  console.log('🌱 ========================================');
  console.log('');
});

// Gestion de l'arrêt gracieux
process.on('SIGTERM', () => {
  console.log('⚠️  SIGTERM reçu, arrêt du serveur...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('\n⚠️  SIGINT reçu, arrêt du serveur...');
  process.exit(0);
});

export default app;
