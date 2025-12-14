/**
 * Base de données complète des alternatives végétales aux protéines animales
 * Inclut produits bruts et produits de marques avec informations détaillées
 */

export type ProteinType = 'boeuf' | 'poulet' | 'porc' | 'agneau' | 'poisson' | 'fruits_de_mer' | 'oeuf' | 'lait';
export type TextureType = 'tendre' | 'ferme' | 'filandreuse' | 'moelleuse' | 'croquante' | 'fondante';
export type CookingMethod = 'grillé' | 'poêlé' | 'mijoté' | 'frit' | 'cuit_vapeur' | 'cru' | 'mariné';

export interface PlantBasedAlternative {
  id: string;
  nom: string;
  type: 'produit_brut' | 'produit_marque';
  marque?: string;
  
  // Protéines animales remplacées
  remplace: ProteinType[];
  
  // Caractéristiques organoleptiques
  gout: {
    description: string;
    intensite: 'léger' | 'moyen' | 'fort';
    notes: string[];
  };
  
  texture: {
    type: TextureType[];
    description: string;
  };
  
  // Utilisation culinaire
  utilisations: {
    plats: string[];
    preparations: CookingMethod[];
    conseils: string[];
  };
  
  // Informations nutritionnelles (pour 100g)
  nutrition: {
    proteines: number;
    calories: number;
    lipides: number;
    glucides: number;
    fibres: number;
  };
  
  // Informations pratiques
  disponibilite: 'facile' | 'moyenne' | 'difficile';
  prix_indicatif: 'économique' | 'moyen' | 'premium';
  conservation: string;
  
  // Préparation
  preparation: {
    difficulte: 'facile' | 'moyenne' | 'difficile';
    temps_preparation: string;
    astuces: string[];
  };
  
  // Avantages
  avantages: string[];
  
  // Où trouver
  ou_acheter: string[];
}

/**
 * BASE DE DONNÉES COMPLÈTE DES ALTERNATIVES VÉGÉTALES
 */
export const PLANT_BASED_ALTERNATIVES: PlantBasedAlternative[] = [
  
  // ========================================
  // ALTERNATIVES AU BŒUF
  // ========================================
  
  {
    id: 'seitan',
    nom: 'Seitan',
    type: 'produit_brut',
    remplace: ['boeuf', 'porc'],
    gout: {
      description: 'Goût neutre à légèrement umami, absorbe bien les marinades',
      intensite: 'léger',
      notes: ['umami', 'neutre', 'savoureux mariné']
    },
    texture: {
      type: ['ferme', 'filandreuse'],
      description: 'Texture dense et fibreuse, très proche de la viande'
    },
    utilisations: {
      plats: ['Bourguignon', 'Steak', 'Brochettes', 'Ragoût', 'Émincé', 'Kebab'],
      preparations: ['grillé', 'poêlé', 'mijoté', 'mariné'],
      conseils: [
        'Mariner au moins 2h pour plus de saveur',
        'Excellent pour remplacer le bœuf dans les plats mijotés',
        'Peut être tranché finement ou en cubes'
      ]
    },
    nutrition: {
      proteines: 25,
      calories: 120,
      lipides: 2,
      glucides: 4,
      fibres: 1
    },
    disponibilite: 'facile',
    prix_indicatif: 'moyen',
    conservation: 'Réfrigéré: 5-7 jours, Congelé: 3 mois',
    preparation: {
      difficulte: 'moyenne',
      temps_preparation: '15-20 min (+ marinade)',
      astuces: [
        'Rincer avant utilisation pour enlever l\'excès de gluten',
        'Mariner dans sauce soja, ail, épices',
        'Peut être fait maison avec farine de gluten'
      ]
    },
    avantages: [
      'Très riche en protéines (25g/100g)',
      'Texture très proche de la viande',
      'Absorbe bien les saveurs',
      'Faible en calories et lipides'
    ],
    ou_acheter: ['Magasins bio', 'Soy', 'Tossolia', 'Metro', 'Biocoop']
  },

  {
    id: 'tempeh',
    nom: 'Tempeh',
    type: 'produit_brut',
    remplace: ['boeuf', 'porc'],
    gout: {
      description: 'Goût de noisette, légèrement fermenté, umami prononcé',
      intensite: 'moyen',
      notes: ['noisette', 'fermenté', 'umami', 'terreux']
    },
    texture: {
      type: ['ferme', 'croquante'],
      description: 'Texture ferme et compacte, légèrement granuleuse'
    },
    utilisations: {
      plats: ['Émincé', 'Curry', 'Sauté', 'Burger', 'Bolognaise', 'Tacos'],
      preparations: ['poêlé', 'grillé', 'mariné', 'frit'],
      conseils: [
        'Faire blanchir 10 min pour adoucir le goût',
        'Excellent mariné puis grillé',
        'Peut être émietté pour remplacer la viande hachée'
      ]
    },
    nutrition: {
      proteines: 19,
      calories: 195,
      lipides: 11,
      glucides: 9,
      fibres: 6
    },
    disponibilite: 'moyenne',
    prix_indicatif: 'moyen',
    conservation: 'Réfrigéré: 7-10 jours, Congelé: 6 mois',
    preparation: {
      difficulte: 'facile',
      temps_preparation: '10-15 min',
      astuces: [
        'Blanchir 10 min pour réduire l\'amertume',
        'Couper en tranches ou cubes',
        'Mariner dans sauce soja, gingembre, ail'
      ]
    },
    avantages: [
      'Riche en protéines et probiotiques',
      'Contient tous les acides aminés essentiels',
      'Riche en fibres',
      'Source de vitamines B'
    ],
    ou_acheter: ['Magasins bio', 'Tossolia', 'Soy', 'Biocoop', 'Magasins asiatiques']
  },

  {
    id: 'jackfruit',
    nom: 'Fruit de Jaquier (Jackfruit)',
    type: 'produit_brut',
    remplace: ['boeuf', 'porc', 'poulet'],
    gout: {
      description: 'Goût neutre à légèrement sucré, absorbe très bien les épices',
      intensite: 'léger',
      notes: ['neutre', 'légèrement sucré', 'végétal']
    },
    texture: {
      type: ['filandreuse', 'tendre'],
      description: 'Texture filandreuse unique, parfaite pour effilocher'
    },
    utilisations: {
      plats: ['Pulled pork', 'Tacos', 'Burger', 'Curry', 'Ragoût', 'Sandwich'],
      preparations: ['mijoté', 'poêlé', 'mariné'],
      conseils: [
        'Utiliser le fruit jeune en conserve (non mûr)',
        'Effilocher à la fourchette après cuisson',
        'Parfait pour les plats effilochés type pulled pork'
      ]
    },
    nutrition: {
      proteines: 2,
      calories: 95,
      lipides: 0.3,
      glucides: 23,
      fibres: 2
    },
    disponibilite: 'moyenne',
    prix_indicatif: 'économique',
    conservation: 'Conserve: 2 ans, Ouvert réfrigéré: 3-4 jours',
    preparation: {
      difficulte: 'facile',
      temps_preparation: '20-30 min',
      astuces: [
        'Bien égoutter et rincer',
        'Effilocher à la fourchette',
        'Faire mijoter dans une sauce épicée'
      ]
    },
    avantages: [
      'Texture filandreuse unique',
      'Très faible en calories',
      'Absorbe parfaitement les saveurs',
      'Économique'
    ],
    ou_acheter: ['Magasins asiatiques', 'Épiceries bio', 'En ligne', 'Magasins exotiques']
  },

  {
    id: 'proteines-soja-texturees',
    nom: 'Protéines de Soja Texturées (PST)',
    type: 'produit_brut',
    remplace: ['boeuf', 'porc', 'poulet'],
    gout: {
      description: 'Goût neutre, absorbe complètement les saveurs de cuisson',
      intensite: 'léger',
      notes: ['neutre', 'légèrement soja']
    },
    texture: {
      type: ['ferme', 'filandreuse'],
      description: 'Texture spongieuse qui devient ferme après réhydratation'
    },
    utilisations: {
      plats: ['Bolognaise', 'Chili', 'Tacos', 'Hachis', 'Farce', 'Sauce'],
      preparations: ['mijoté', 'poêlé'],
      conseils: [
        'Réhydrater dans bouillon chaud 10-15 min',
        'Bien essorer avant utilisation',
        'Parfait pour remplacer la viande hachée'
      ]
    },
    nutrition: {
      proteines: 52,
      calories: 330,
      lipides: 1,
      glucides: 30,
      fibres: 18
    },
    disponibilite: 'facile',
    prix_indicatif: 'économique',
    conservation: 'Sec: 1 an, Réhydraté réfrigéré: 3 jours',
    preparation: {
      difficulte: 'facile',
      temps_preparation: '15 min (réhydratation)',
      astuces: [
        'Réhydrater dans bouillon pour plus de goût',
        'Essorer fermement',
        'Faire revenir avec oignons et épices'
      ]
    },
    avantages: [
      'Très riche en protéines (52g/100g)',
      'Très économique',
      'Longue conservation',
      'Polyvalent'
    ],
    ou_acheter: ['Magasins bio', 'Soy', 'Biocoop', 'En ligne', 'Magasins asiatiques']
  },

  // ========================================
  // PRODUITS DE MARQUES - ALTERNATIVES BŒUF
  // ========================================

  {
    id: 'beyond-meat-burger',
    nom: 'Beyond Burger',
    type: 'produit_marque',
    marque: 'Beyond Meat',
    remplace: ['boeuf'],
    gout: {
      description: 'Goût très proche du bœuf, umami prononcé',
      intensite: 'fort',
      notes: ['bœuf', 'umami', 'grillé', 'juteux']
    },
    texture: {
      type: ['tendre', 'moelleuse'],
      description: 'Texture juteuse et fibreuse, saigne comme un burger de bœuf'
    },
    utilisations: {
      plats: ['Burger', 'Steak haché', 'Boulettes', 'Tacos'],
      preparations: ['grillé', 'poêlé'],
      conseils: [
        'Cuire à feu moyen-vif',
        'Ne pas trop cuire pour garder le moelleux',
        'Peut être utilisé comme viande hachée'
      ]
    },
    nutrition: {
      proteines: 20,
      calories: 250,
      lipides: 18,
      glucides: 3,
      fibres: 2
    },
    disponibilite: 'facile',
    prix_indicatif: 'premium',
    conservation: 'Réfrigéré: 10 jours, Congelé: 6 mois',
    preparation: {
      difficulte: 'facile',
      temps_preparation: '10 min',
      astuces: [
        'Cuire 3-4 min par côté',
        'Ne pas décongeler avant cuisson',
        'Assaisonner généreusement'
      ]
    },
    avantages: [
      'Goût et texture très proches du bœuf',
      'Riche en protéines',
      'Sans OGM',
      'Prêt à cuire'
    ],
    ou_acheter: ['Metro', 'Transgourmet', 'Sysco', 'Carrefour', 'Monoprix']
  },

  {
    id: 'la-vie-lardons',
    nom: 'Lardons Fumés',
    type: 'produit_marque',
    marque: 'La Vie',
    remplace: ['porc'],
    gout: {
      description: 'Goût fumé authentique, saveur de lard traditionnel',
      intensite: 'fort',
      notes: ['fumé', 'salé', 'lard', 'bacon']
    },
    texture: {
      type: ['ferme', 'croquante'],
      description: 'Texture ferme qui devient croustillante à la cuisson'
    },
    utilisations: {
      plats: ['Carbonara', 'Quiche', 'Salade', 'Tartiflette', 'Flammekueche'],
      preparations: ['poêlé', 'grillé'],
      conseils: [
        'Faire revenir à feu vif pour croustillant',
        'Pas besoin d\'huile',
        'Parfait pour les plats traditionnels'
      ]
    },
    nutrition: {
      proteines: 14,
      calories: 180,
      lipides: 12,
      glucides: 8,
      fibres: 3
    },
    disponibilite: 'moyenne',
    prix_indicatif: 'premium',
    conservation: 'Réfrigéré: 21 jours, Congelé: 6 mois',
    preparation: {
      difficulte: 'facile',
      temps_preparation: '5 min',
      astuces: [
        'Faire revenir sans matière grasse',
        'Cuire jusqu\'à coloration dorée',
        'Utiliser comme des lardons classiques'
      ]
    },
    avantages: [
      'Goût fumé authentique',
      'Fabrication française',
      'Sans OGM',
      'Prêt à l\'emploi'
    ],
    ou_acheter: ['Metro', 'La Vie (direct)', 'Un Monde Vegan', 'Magasins bio']
  },

  // ========================================
  // ALTERNATIVES AU POULET
  // ========================================

  {
    id: 'tofu-ferme',
    nom: 'Tofu Ferme',
    type: 'produit_brut',
    remplace: ['poulet', 'poisson'],
    gout: {
      description: 'Goût neutre et doux, absorbe les marinades',
      intensite: 'léger',
      notes: ['neutre', 'soja doux', 'crémeux']
    },
    texture: {
      type: ['ferme', 'tendre'],
      description: 'Texture ferme mais tendre, peut être croustillante si frit'
    },
    utilisations: {
      plats: ['Curry', 'Sauté', 'Brochettes', 'Nuggets', 'Scramble', 'Salade'],
      preparations: ['poêlé', 'grillé', 'frit', 'mariné'],
      conseils: [
        'Presser pour enlever l\'excès d\'eau',
        'Mariner au moins 30 min',
        'Couper en cubes ou tranches'
      ]
    },
    nutrition: {
      proteines: 12,
      calories: 120,
      lipides: 7,
      glucides: 2,
      fibres: 1
    },
    disponibilite: 'facile',
    prix_indicatif: 'économique',
    conservation: 'Réfrigéré dans l\'eau: 5-7 jours',
    preparation: {
      difficulte: 'facile',
      temps_preparation: '10 min (+ marinade)',
      astuces: [
        'Presser entre deux assiettes 15 min',
        'Mariner dans sauce soja, gingembre, ail',
        'Enrober de fécule pour croustillant'
      ]
    },
    avantages: [
      'Riche en protéines complètes',
      'Très polyvalent',
      'Économique',
      'Source de calcium et fer'
    ],
    ou_acheter: ['Tous supermarchés', 'Soy', 'Tossolia', 'Magasins asiatiques']
  },

  {
    id: 'heura-poulet',
    nom: 'Morceaux de Poulet',
    type: 'produit_marque',
    marque: 'Heura',
    remplace: ['poulet'],
    gout: {
      description: 'Goût de poulet authentique, légèrement assaisonné',
      intensite: 'moyen',
      notes: ['poulet', 'herbes', 'savoureux']
    },
    texture: {
      type: ['tendre', 'filandreuse'],
      description: 'Texture fibreuse très proche du poulet'
    },
    utilisations: {
      plats: ['Curry', 'Fajitas', 'Sauté', 'Brochettes', 'Salade César', 'Wrap'],
      preparations: ['poêlé', 'grillé', 'mijoté'],
      conseils: [
        'Cuire à feu moyen-vif',
        'Ajouter en fin de cuisson dans les sauces',
        'Parfait pour les plats asiatiques'
      ]
    },
    nutrition: {
      proteines: 19,
      calories: 160,
      lipides: 6,
      glucides: 8,
      fibres: 4
    },
    disponibilite: 'moyenne',
    prix_indicatif: 'premium',
    conservation: 'Réfrigéré: 5 jours, Congelé: 6 mois',
    preparation: {
      difficulte: 'facile',
      temps_preparation: '8-10 min',
      astuces: [
        'Faire revenir 3-4 min par côté',
        'Ne pas trop cuire',
        'Assaisonner selon le plat'
      ]
    },
    avantages: [
      'Texture très proche du poulet',
      'Riche en protéines',
      'Sans OGM',
      'Prêt à cuire'
    ],
    ou_acheter: ['Metro', 'Transgourmet', 'Heura (direct)', 'Un Monde Vegan']
  },

  {
    id: 'tofu-soyeux',
    nom: 'Tofu Soyeux',
    type: 'produit_brut',
    remplace: ['oeuf', 'lait'],
    gout: {
      description: 'Goût très doux et neutre, crémeux',
      intensite: 'léger',
      notes: ['neutre', 'crémeux', 'doux']
    },
    texture: {
      type: ['moelleuse', 'fondante'],
      description: 'Texture crémeuse et lisse, comme un flan'
    },
    utilisations: {
      plats: ['Mousse', 'Quiche', 'Cheesecake', 'Smoothie', 'Sauce', 'Mayonnaise'],
      preparations: ['cru', 'cuit_vapeur', 'mijoté'],
      conseils: [
        'Mixer pour obtenir une texture lisse',
        'Parfait pour les desserts',
        'Remplace les œufs dans les quiches'
      ]
    },
    nutrition: {
      proteines: 5,
      calories: 55,
      lipides: 3,
      glucides: 2,
      fibres: 0
    },
    disponibilite: 'facile',
    prix_indicatif: 'économique',
    conservation: 'Réfrigéré: 3-5 jours après ouverture',
    preparation: {
      difficulte: 'facile',
      temps_preparation: '5 min',
      astuces: [
        'Mixer pour texture crémeuse',
        'Ajouter du citron pour mayonnaise',
        'Parfait pour les desserts sans cuisson'
      ]
    },
    avantages: [
      'Très polyvalent',
      'Remplace œufs et crème',
      'Faible en calories',
      'Texture crémeuse'
    ],
    ou_acheter: ['Tous supermarchés', 'Soy', 'Magasins asiatiques']
  },

  // ========================================
  // ALTERNATIVES AU POISSON
  // ========================================

  {
    id: 'algues-nori',
    nom: 'Algues Nori',
    type: 'produit_brut',
    remplace: ['poisson'],
    gout: {
      description: 'Goût iodé et marin, umami prononcé',
      intensite: 'fort',
      notes: ['iodé', 'marin', 'umami', 'océan']
    },
    texture: {
      type: ['croquante'],
      description: 'Texture croustillante qui devient tendre dans les liquides'
    },
    utilisations: {
      plats: ['Sushi', 'Salade', 'Soupe', 'Poke bowl', 'Onigiri', 'Assaisonnement'],
      preparations: ['cru', 'grillé'],
      conseils: [
        'Utiliser pour apporter un goût marin',
        'Parfait pour les sushi végétaux',
        'Peut être émietté comme assaisonnement'
      ]
    },
    nutrition: {
      proteines: 6,
      calories: 35,
      lipides: 0.3,
      glucides: 5,
      fibres: 3
    },
    disponibilite: 'facile',
    prix_indicatif: 'moyen',
    conservation: 'Sec: 1 an, À l\'abri de l\'humidité',
    preparation: {
      difficulte: 'facile',
      temps_preparation: '2 min',
      astuces: [
        'Griller légèrement pour plus de saveur',
        'Émietter dans les plats',
        'Utiliser pour enrouler les sushi'
      ]
    },
    avantages: [
      'Goût marin authentique',
      'Riche en iode et minéraux',
      'Faible en calories',
      'Longue conservation'
    ],
    ou_acheter: ['Magasins asiatiques', 'Supermarchés', 'Magasins bio']
  },

  {
    id: 'coeurs-palmier',
    nom: 'Cœurs de Palmier',
    type: 'produit_brut',
    remplace: ['poisson', 'fruits_de_mer'],
    gout: {
      description: 'Goût doux et délicat, légèrement acidulé',
      intensite: 'léger',
      notes: ['doux', 'délicat', 'légèrement acidulé']
    },
    texture: {
      type: ['tendre', 'ferme'],
      description: 'Texture ferme et tendre, rappelle le poisson blanc'
    },
    utilisations: {
      plats: ['Ceviche', 'Salade', 'Tartare', 'Poke bowl', 'Fish & chips'],
      preparations: ['cru', 'mariné', 'poêlé'],
      conseils: [
        'Mariner dans jus de citron pour ceviche',
        'Peut être pané et frit',
        'Parfait pour remplacer le poisson blanc'
      ]
    },
    nutrition: {
      proteines: 2.5,
      calories: 28,
      lipides: 0.2,
      glucides: 5,
      fibres: 2
    },
    disponibilite: 'facile',
    prix_indicatif: 'moyen',
    conservation: 'Conserve: 2 ans, Ouvert réfrigéré: 3-4 jours',
    preparation: {
      difficulte: 'facile',
      temps_preparation: '5 min',
      astuces: [
        'Bien égoutter',
        'Mariner dans citron, coriandre, piment',
        'Peut être tranché ou émietté'
      ]
    },
    avantages: [
      'Texture proche du poisson',
      'Très faible en calories',
      'Prêt à l\'emploi',
      'Polyvalent'
    ],
    ou_acheter: ['Tous supermarchés', 'Épiceries fines']
  },

  {
    id: 'tofu-fume',
    nom: 'Tofu Fumé',
    type: 'produit_brut',
    remplace: ['poisson', 'poulet'],
    gout: {
      description: 'Goût fumé prononcé, rappelle le poisson fumé',
      intensite: 'moyen',
      notes: ['fumé', 'boisé', 'savoureux']
    },
    texture: {
      type: ['ferme'],
      description: 'Texture ferme et compacte'
    },
    utilisations: {
      plats: ['Salade', 'Sandwich', 'Quiche', 'Pâtes', 'Tartine', 'Wrap'],
      preparations: ['cru', 'poêlé', 'grillé'],
      conseils: [
        'Peut être consommé froid',
        'Trancher finement pour sandwichs',
        'Parfait pour remplacer le saumon fumé'
      ]
    },
    nutrition: {
      proteines: 16,
      calories: 150,
      lipides: 9,
      glucides: 3,
      fibres: 2
    },
    disponibilite: 'facile',
    prix_indicatif: 'moyen',
    conservation: 'Réfrigéré: 7-10 jours',
    preparation: {
      difficulte: 'facile',
      temps_preparation: '2 min',
      astuces: [
        'Trancher finement',
        'Peut être consommé directement',
        'Faire griller pour plus de croustillant'
      ]
    },
    avantages: [
      'Goût fumé authentique',
      'Prêt à consommer',
      'Riche en protéines',
      'Polyvalent'
    ],
    ou_acheter: ['Magasins bio', 'Soy', 'Tossolia', 'Supermarchés']
  },

  // ========================================
  // ALTERNATIVES AUX PRODUITS LAITIERS
  // ========================================

  {
    id: 'yaourt-soja',
    nom: 'Yaourt au Soja',
    type: 'produit_brut',
    remplace: ['lait'],
    gout: {
      description: 'Goût doux et crémeux, légèrement soja',
      intensite: 'léger',
      notes: ['crémeux', 'doux', 'légèrement soja']
    },
    texture: {
      type: ['moelleuse', 'fondante'],
      description: 'Texture crémeuse et onctueuse'
    },
    utilisations: {
      plats: ['Dessert', 'Smoothie', 'Sauce', 'Marinade', 'Petit-déjeuner'],
      preparations: ['cru'],
      conseils: [
        'Utiliser nature pour les sauces',
        'Parfait pour les marinades',
        'Remplace le yaourt classique'
      ]
    },
    nutrition: {
      proteines: 4,
      calories: 50,
      lipides: 2,
      glucides: 5,
      fibres: 1
    },
    disponibilite: 'facile',
    prix_indicatif: 'économique',
    conservation: 'Réfrigéré: selon DLC (environ 3 semaines)',
    preparation: {
      difficulte: 'facile',
      temps_preparation: '0 min',
      astuces: [
        'Utiliser nature pour cuisiner',
        'Ajouter des fruits pour dessert',
        'Parfait pour les sauces tzatziki'
      ]
    },
    avantages: [
      'Riche en protéines',
      'Sans lactose',
      'Polyvalent',
      'Économique'
    ],
    ou_acheter: ['Tous supermarchés', 'Soy', 'Alpro', 'Sojasun']
  },

  {
    id: 'creme-soja',
    nom: 'Crème de Soja',
    type: 'produit_brut',
    remplace: ['lait'],
    gout: {
      description: 'Goût neutre et crémeux, légèrement soja',
      intensite: 'léger',
      notes: ['crémeux', 'neutre', 'onctueux']
    },
    texture: {
      type: ['fondante'],
      description: 'Texture onctueuse et crémeuse'
    },
    utilisations: {
      plats: ['Sauce', 'Gratin', 'Quiche', 'Soupe', 'Pâtes', 'Dessert'],
      preparations: ['mijoté', 'cuit_vapeur'],
      conseils: [
        'Remplace la crème fraîche 1:1',
        'Ne pas faire bouillir',
        'Parfait pour les sauces'
      ]
    },
    nutrition: {
      proteines: 3,
      calories: 120,
      lipides: 11,
      glucides: 3,
      fibres: 0
    },
    disponibilite: 'facile',
    prix_indicatif: 'économique',
    conservation: 'Réfrigéré: 3-5 jours après ouverture',
    preparation: {
      difficulte: 'facile',
      temps_preparation: '0 min',
      astuces: [
        'Ajouter en fin de cuisson',
        'Ne pas faire bouillir',
        'Fouetter pour plus d\'onctuosité'
      ]
    },
    avantages: [
      'Remplace parfaitement la crème',
      'Sans lactose',
      'Texture onctueuse',
      'Polyvalent'
    ],
    ou_acheter: ['Tous supermarchés', 'Soy', 'Alpro', 'Bjorg']
  },

  // ========================================
  // ALTERNATIVES AUX ŒUFS
  // ========================================

  {
    id: 'aquafaba',
    nom: 'Aquafaba (jus de pois chiches)',
    type: 'produit_brut',
    remplace: ['oeuf'],
    gout: {
      description: 'Goût neutre après cuisson',
      intensite: 'léger',
      notes: ['neutre', 'légèrement pois chiche']
    },
    texture: {
      type: ['moelleuse'],
      description: 'Texture mousseuse quand monté en neige'
    },
    utilisations: {
      plats: ['Mousse', 'Meringue', 'Macaron', 'Mayonnaise', 'Gâteau'],
      preparations: ['cru', 'cuit_vapeur'],
      conseils: [
        '3 cuillères à soupe = 1 œuf',
        'Monter en neige comme des blancs d\'œufs',
        'Parfait pour les desserts'
      ]
    },
    nutrition: {
      proteines: 0.5,
      calories: 10,
      lipides: 0,
      glucides: 2,
      fibres: 0
    },
    disponibilite: 'facile',
    prix_indicatif: 'économique',
    conservation: 'Réfrigéré: 3-4 jours, Congelé: 3 mois',
    preparation: {
      difficulte: 'moyenne',
      temps_preparation: '10 min',
      astuces: [
        'Utiliser le jus de conserve de pois chiches',
        'Monter en neige avec batteur électrique',
        'Ajouter crème de tartre pour stabiliser'
      ]
    },
    avantages: [
      'Gratuit (jus de conserve)',
      'Monte en neige comme des blancs',
      'Sans allergènes',
      'Polyvalent'
    ],
    ou_acheter: ['Récupérer des conserves de pois chiches']
  },

  {
    id: 'graines-lin',
    nom: 'Graines de Lin Moulues',
    type: 'produit_brut',
    remplace: ['oeuf'],
    gout: {
      description: 'Goût de noisette léger',
      intensite: 'léger',
      notes: ['noisette', 'neutre']
    },
    texture: {
      type: ['moelleuse'],
      description: 'Texture gélatineuse quand mélangé à l\'eau'
    },
    utilisations: {
      plats: ['Gâteau', 'Muffin', 'Pancake', 'Pain', 'Cookie'],
      preparations: ['cru'],
      conseils: [
        '1 cuillère à soupe + 3 cuillères d\'eau = 1 œuf',
        'Laisser reposer 5 min',
        'Parfait pour la pâtisserie'
      ]
    },
    nutrition: {
      proteines: 18,
      calories: 534,
      lipides: 42,
      glucides: 29,
      fibres: 27
    },
    disponibilite: 'facile',
    prix_indicatif: 'économique',
    conservation: 'Sec: 6 mois, Réfrigéré: 1 an',
    preparation: {
      difficulte: 'facile',
      temps_preparation: '5 min',
      astuces: [
        'Moudre juste avant utilisation',
        'Mélanger avec eau et laisser reposer',
        'Utiliser dans les recettes sucrées ou salées'
      ]
    },
    avantages: [
      'Riche en oméga-3',
      'Économique',
      'Longue conservation',
      'Riche en fibres'
    ],
    ou_acheter: ['Tous supermarchés', 'Magasins bio']
  }
];

/**
 * MAPPING PROTÉINES ANIMALES → ALTERNATIVES VÉGÉTALES
 */
export const PROTEIN_MAPPING: Record<ProteinType, string[]> = {
  boeuf: [
    'seitan',
    'tempeh',
    'jackfruit',
    'proteines-soja-texturees',
    'beyond-meat-burger'
  ],
  poulet: [
    'tofu-ferme',
    'heura-poulet',
    'seitan',
    'tempeh',
    'jackfruit'
  ],
  porc: [
    'seitan',
    'tempeh',
    'jackfruit',
    'la-vie-lardons',
    'proteines-soja-texturees'
  ],
  agneau: [
    'seitan',
    'tempeh',
    'proteines-soja-texturees'
  ],
  poisson: [
    'tofu-ferme',
    'tofu-fume',
    'algues-nori',
    'coeurs-palmier'
  ],
  fruits_de_mer: [
    'coeurs-palmier',
    'algues-nori',
    'tofu-ferme'
  ],
  oeuf: [
    'tofu-soyeux',
    'aquafaba',
    'graines-lin'
  ],
  lait: [
    'yaourt-soja',
    'creme-soja',
    'tofu-soyeux'
  ]
};

/**
 * Recherche d'alternatives par type de protéine animale
 */
export function findAlternativesByProtein(proteinType: ProteinType): PlantBasedAlternative[] {
  const alternativeIds = PROTEIN_MAPPING[proteinType] || [];
  return PLANT_BASED_ALTERNATIVES.filter(alt => alternativeIds.includes(alt.id));
}

/**
 * Recherche d'alternatives par nom ou marque
 */
export function searchAlternatives(query: string): PlantBasedAlternative[] {
  const searchTerm = query.toLowerCase();
  return PLANT_BASED_ALTERNATIVES.filter(alt =>
    alt.nom.toLowerCase().includes(searchTerm) ||
    alt.marque?.toLowerCase().includes(searchTerm) ||
    alt.gout.notes.some(note => note.toLowerCase().includes(searchTerm)) ||
    alt.utilisations.plats.some(plat => plat.toLowerCase().includes(searchTerm))
  );
}

/**
 * Filtrer par critères
 */
export function filterAlternatives(filters: {
  type?: 'produit_brut' | 'produit_marque';
  prix?: 'économique' | 'moyen' | 'premium';
  disponibilite?: 'facile' | 'moyenne' | 'difficile';
  texture?: TextureType;
}): PlantBasedAlternative[] {
  return PLANT_BASED_ALTERNATIVES.filter(alt => {
    if (filters.type && alt.type !== filters.type) return false;
    if (filters.prix && alt.prix_indicatif !== filters.prix) return false;
    if (filters.disponibilite && alt.disponibilite !== filters.disponibilite) return false;
    if (filters.texture && !alt.texture.type.includes(filters.texture)) return false;
    return true;
  });
}

/**
 * Obtenir une alternative par ID
 */
export function getAlternativeById(id: string): PlantBasedAlternative | undefined {
  return PLANT_BASED_ALTERNATIVES.find(alt => alt.id === id);
}

/**
 * Obtenir toutes les alternatives
 */
export function getAllAlternatives(): PlantBasedAlternative[] {
  return PLANT_BASED_ALTERNATIVES;
}

/**
 * Obtenir les alternatives recommandées pour un plat
 */
export function getRecommendedAlternatives(
  plat: string,
  proteinType: ProteinType
): PlantBasedAlternative[] {
  const alternatives = findAlternativesByProtein(proteinType);
  
  // Trier par pertinence (disponibilité et prix)
  return alternatives.sort((a, b) => {
    const scoreA = (a.disponibilite === 'facile' ? 3 : a.disponibilite === 'moyenne' ? 2 : 1) +
                   (a.prix_indicatif === 'économique' ? 3 : a.prix_indicatif === 'moyen' ? 2 : 1);
    const scoreB = (b.disponibilite === 'facile' ? 3 : b.disponibilite === 'moyenne' ? 2 : 1) +
                   (b.prix_indicatif === 'économique' ? 3 : b.prix_indicatif === 'moyen' ? 2 : 1);
    return scoreB - scoreA;
  });
}

/**
 * Statistiques de la base de données
 */
export function getDatabaseStats() {
  return {
    total_alternatives: PLANT_BASED_ALTERNATIVES.length,
    produits_bruts: PLANT_BASED_ALTERNATIVES.filter(a => a.type === 'produit_brut').length,
    produits_marques: PLANT_BASED_ALTERNATIVES.filter(a => a.type === 'produit_marque').length,
    par_proteine: Object.entries(PROTEIN_MAPPING).map(([protein, alternatives]) => ({
      protein,
      count: alternatives.length
    }))
  };
}
