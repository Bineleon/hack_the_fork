import { Router, Request, Response } from 'express';
import { SUPPLIERS_DATABASE, Supplier } from '../data/suppliers';

const router = Router();

// GET /api/suppliers - Récupérer tous les fournisseurs
router.get('/', (req: Request, res: Response) => {
  try {
    res.json(SUPPLIERS_DATABASE);
  } catch (error) {
    console.error('Erreur lors de la récupération des fournisseurs:', error);
    res.status(500).json({
      error: 'Erreur serveur',
      message: 'Impossible de récupérer les fournisseurs'
    });
  }
});

// GET /api/suppliers/:id - Récupérer un fournisseur spécifique
router.get('/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const supplier = SUPPLIERS_DATABASE.find((s: Supplier) => s.id === id);
    
    if (!supplier) {
      return res.status(404).json({
        error: 'Non trouvé',
        message: `Fournisseur avec l'id "${id}" non trouvé`
      });
    }
    
    res.json(supplier);
  } catch (error) {
    console.error('Erreur lors de la récupération du fournisseur:', error);
    res.status(500).json({
      error: 'Erreur serveur',
      message: 'Impossible de récupérer le fournisseur'
    });
  }
});

export default router;
