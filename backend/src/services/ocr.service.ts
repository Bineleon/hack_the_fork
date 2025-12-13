import Tesseract from 'tesseract.js';
import { OCRResult } from '../types';

export class OCRService {
  /**
   * Extrait le texte d'une image de menu
   */
  async extractTextFromImage(imagePath: string): Promise<OCRResult> {
    try {
      console.log('🔍 Démarrage de l\'OCR...');

      const result = await Tesseract.recognize(
        imagePath,
        'fra', // Langue française
        {
          logger: (m) => {
            if (m.status === 'recognizing text') {
              console.log(`📊 Progression OCR: ${Math.round(m.progress * 100)}%`);
            }
          }
        }
      );

      const text = result.data.text;
      const confidence = result.data.confidence;

      console.log(`✅ OCR terminé (confiance: ${confidence.toFixed(2)}%)`);

      // Extraire les plats potentiels (lignes non vides)
      const plats = this.extractPotentialDishes(text);

      return {
        text,
        confidence,
        plats
      };
    } catch (error: any) {
      console.error('❌ Erreur OCR:', error.message);
      throw new Error(`Erreur lors de l'extraction du texte: ${error.message}`);
    }
  }

  /**
   * Extrait les plats potentiels du texte OCR
   */
  private extractPotentialDishes(text: string): string[] {
    const lines = text.split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 5); // Ignorer les lignes trop courtes

    // Filtrer les lignes qui ressemblent à des plats
    const dishes = lines.filter(line => {
      // Ignorer les lignes avec seulement des chiffres ou des prix
      if (/^\d+[.,]?\d*\s*€?$/.test(line)) return false;
      
      // Ignorer les lignes trop courtes ou trop longues
      if (line.length < 10 || line.length > 100) return false;
      
      // Garder les lignes qui contiennent des mots culinaires
      const culinaryKeywords = [
        'sauce', 'grillé', 'rôti', 'poêlé', 'mariné', 'farci',
        'boeuf', 'poulet', 'porc', 'poisson', 'saumon', 'thon',
        'légumes', 'salade', 'soupe', 'tarte', 'gratin'
      ];
      
      const lowerLine = line.toLowerCase();
      return culinaryKeywords.some(keyword => lowerLine.includes(keyword));
    });

    return dishes;
  }

  /**
   * Nettoie le texte OCR (enlève les caractères parasites)
   */
  cleanOCRText(text: string): string {
    return text
      .replace(/[^\w\s\-.,€]/g, '') // Garder seulement les caractères alphanumériques et ponctuation de base
      .replace(/\s+/g, ' ') // Remplacer les espaces multiples par un seul
      .trim();
  }

  /**
   * Extrait les prix du texte OCR
   */
  extractPrices(text: string): number[] {
    const priceRegex = /(\d+[.,]\d{2})\s*€?/g;
    const matches = text.matchAll(priceRegex);
    
    const prices: number[] = [];
    for (const match of matches) {
      const price = parseFloat(match[1].replace(',', '.'));
      if (price > 0 && price < 100) { // Filtrer les prix réalistes
        prices.push(price);
      }
    }
    
    return prices;
  }

  /**
   * Détecte la langue du texte
   */
  detectLanguage(text: string): string {
    const frenchWords = ['le', 'la', 'de', 'et', 'avec', 'sauce', 'grillé'];
    const englishWords = ['the', 'and', 'with', 'grilled', 'sauce'];
    
    const lowerText = text.toLowerCase();
    
    const frenchCount = frenchWords.filter(word => lowerText.includes(word)).length;
    const englishCount = englishWords.filter(word => lowerText.includes(word)).length;
    
    return frenchCount > englishCount ? 'fra' : 'eng';
  }
}
