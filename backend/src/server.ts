// Charger les variables d'environnement EN PREMIER
import dotenv from 'dotenv';
dotenv.config();

// Maintenant importer les autres modules
import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import path from 'path';
import menuRoutes from './routes/menu.routes';
import suppliersRoutes from './routes/suppliers.routes';

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
app.use('/api/suppliers', suppliersRoutes);

// Route de base
app.get('/', (req: Request, res: Response) => {
  res.json({
    name: 'Hack the Fork API',
    version: '1.0.0',
    description: 'API pour générer des alternatives végétales aux plats carnés',
    endpoints: {
      health: 'GET /api/menu/health',
      scan: 'POST /api/menu/scan',
      analyze: 'POST /api/menu/analyze',
      batchAnalyze: 'POST /api/menu/batch-analyze'
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
  console.log(`   GET  http://localhost:${PORT}/`);
  console.log(`   GET  http://localhost:${PORT}/api/menu/health`);
  console.log(`   POST http://localhost:${PORT}/api/menu/scan`);
  console.log(`   POST http://localhost:${PORT}/api/menu/analyze`);
  console.log(`   POST http://localhost:${PORT}/api/menu/batch-analyze`);
  console.log(`   GET  http://localhost:${PORT}/api/suppliers`);
  console.log(`   GET  http://localhost:${PORT}/api/suppliers/:id`);
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
