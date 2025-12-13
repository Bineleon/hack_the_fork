/**
 * Base de données des fournisseurs B2B d'ingrédients végétaux en France
 */

export interface Supplier {
  id: string;
  nom: string;
  type: 'grossiste' | 'distributeur' | 'fabricant';
  specialites: string[];
  marques: string[];
  contact: {
    site_web?: string;
    telephone?: string;
    email?: string;
  };
  livraison: {
    zones: string[];
    delai_moyen: string;
    commande_minimum?: string;
  };
  prix_indicatif: 'économique' | 'moyen' | 'premium';
  certifications?: string[];
}

export const SUPPLIERS_DATABASE: Supplier[] = [
  {
    id: 'soy',
    nom: 'Soy',
    type: 'distributeur',
    specialites: ['Alternatives à la viande', 'Produits à base de soja', 'Tofu', 'Tempeh'],
    marques: ['Soy', 'Tossolia', 'Taifun'],
    contact: {
      site_web: 'https://www.soy.fr',
      telephone: '+33 1 48 04 30 60',
      email: 'pro@soy.fr'
    },
    livraison: {
      zones: ['France métropolitaine', 'Belgique', 'Luxembourg'],
      delai_moyen: '48-72h',
      commande_minimum: '150€ HT'
    },
    prix_indicatif: 'moyen',
    certifications: ['Bio', 'Vegan']
  },
  {
    id: 'metro',
    nom: 'Metro France - Gamme Végétale',
    type: 'grossiste',
    specialites: ['Alternatives à la viande', 'Produits laitiers végétaux', 'Légumes'],
    marques: ['Beyond Meat', 'Heura', 'La Vie', 'Garden Gourmet', 'Violife'],
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
    certifications: []
  },
  {
    id: 'transgourmet',
    nom: 'Transgourmet - Veggie',
    type: 'grossiste',
    specialites: ['Alternatives à la viande', 'Produits végétaux', 'Épicerie bio'],
    marques: ['Beyond Meat', 'Heura', 'Oatly', 'Alpro Pro'],
    contact: {
      site_web: 'https://www.transgourmet.fr',
      telephone: '+33 825 00 22 44'
    },
    livraison: {
      zones: ['France métropolitaine'],
      delai_moyen: '24-48h',
      commande_minimum: '200€ HT'
    },
    prix_indicatif: 'moyen',
    certifications: []
  },
  {
    id: 'la-vie',
    nom: 'La Vie (Direct Fabricant)',
    type: 'fabricant',
    specialites: ['Alternatives au lard', 'Charcuterie végétale'],
    marques: ['La Vie'],
    contact: {
      site_web: 'https://www.la-vie.com',
      email: 'pro@la-vie.com'
    },
    livraison: {
      zones: ['France', 'Europe'],
      delai_moyen: '3-5 jours',
      commande_minimum: 'Sur devis'
    },
    prix_indicatif: 'premium',
    certifications: ['Vegan']
  },
  {
    id: 'heura',
    nom: 'Heura Foods (Direct Fabricant)',
    type: 'fabricant',
    specialites: ['Alternatives au poulet', 'Protéines végétales'],
    marques: ['Heura'],
    contact: {
      site_web: 'https://www.heurafoods.com',
      email: 'b2b@heurafoods.com'
    },
    livraison: {
      zones: ['France', 'Europe'],
      delai_moyen: '3-5 jours',
      commande_minimum: 'Sur devis'
    },
    prix_indicatif: 'premium',
    certifications: ['Vegan', 'Sans OGM']
  },
  {
    id: 'tossolia',
    nom: 'Tossolia',
    type: 'fabricant',
    specialites: ['Tofu', 'Tempeh', 'Seitan', 'Alternatives à la viande'],
    marques: ['Tossolia'],
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
    certifications: ['Bio', 'Vegan', 'Fabrication française']
  },
  {
    id: 'vegan-store-pro',
    nom: 'Un Monde Vegan Pro',
    type: 'distributeur',
    specialites: ['Large gamme végétale', 'Fromages végétaux', 'Charcuterie végétale'],
    marques: ['Beyond Meat', 'Violife', 'Sheese', 'Vegusto', 'Wilmersburger'],
    contact: {
      site_web: 'https://www.unmondevegan.com/pro',
      telephone: '+33 4 78 37 88 84',
      email: 'pro@unmondevegan.com'
    },
    livraison: {
      zones: ['France métropolitaine', 'DOM-TOM'],
      delai_moyen: '48-96h',
      commande_minimum: '150€ HT'
    },
    prix_indicatif: 'moyen',
    certifications: ['Vegan']
  },
  {
    id: 'greenweez-pro',
    nom: 'Greenweez Pro',
    type: 'distributeur',
    specialites: ['Produits bio', 'Alternatives végétales', 'Épicerie'],
    marques: ['Bjorg', 'Alpro', 'Sojasun', 'Lima'],
    contact: {
      site_web: 'https://www.greenweez.com/pro',
      email: 'pro@greenweez.com'
    },
    livraison: {
      zones: ['France métropolitaine'],
      delai_moyen: '48-72h',
      commande_minimum: '200€ HT'
    },
    prix_indicatif: 'moyen',
    certifications: ['Bio']
  },
  {
    id: 'sysco',
    nom: 'Sysco France - Gamme Végétale',
    type: 'grossiste',
    specialites: ['Alternatives à la viande', 'Produits surgelés végétaux'],
    marques: ['Beyond Meat', 'Garden Gourmet', 'Quorn'],
    contact: {
      site_web: 'https://www.sysco.fr',
      telephone: '+33 1 69 79 67 00'
    },
    livraison: {
      zones: ['France métropolitaine'],
      delai_moyen: '24-48h',
      commande_minimum: '250€ HT'
    },
    prix_indicatif: 'moyen',
    certifications: []
  },
  {
    id: 'biocoop-pro',
    nom: 'Biocoop Restauration',
    type: 'distributeur',
    specialites: ['Produits bio', 'Légumineuses', 'Céréales', 'Alternatives végétales'],
    marques: ['Bjorg', 'Lima', 'Natali', 'Soy'],
    contact: {
      site_web: 'https://www.biocoop.fr/professionnels',
      telephone: '+33 1 44 76 70 00'
    },
    livraison: {
      zones: ['France métropolitaine'],
      delai_moyen: '48-72h',
      commande_minimum: '150€ HT'
    },
    prix_indicatif: 'moyen',
    certifications: ['Bio', 'Commerce équitable']
  },
  {
    id: 'pomona',
    nom: 'Pomona - Gamme Végétale',
    type: 'grossiste',
    specialites: ['Fruits et légumes bio', 'Alternatives végétales', 'Épicerie bio'],
    marques: ['Soy', 'Bjorg', 'Lima', 'Natali'],
    contact: {
      site_web: 'https://www.pomona.fr',
      telephone: '+33 4 90 84 02 21'
    },
    livraison: {
      zones: ['France métropolitaine'],
      delai_moyen: '24-48h',
      commande_minimum: '180€ HT'
    },
    prix_indicatif: 'moyen',
    certifications: ['Bio']
  },
  {
    id: 'vegetal-world',
    nom: 'Végétal World',
    type: 'distributeur',
    specialites: ['Alternatives à la viande', 'Fromages végétaux', 'Produits asiatiques'],
    marques: ['Heura', 'Violife', 'Oatly', 'Koko'],
    contact: {
      site_web: 'https://www.vegetalworld.fr',
      email: 'contact@vegetalworld.fr'
    },
    livraison: {
      zones: ['France métropolitaine'],
      delai_moyen: '48-72h',
      commande_minimum: '120€ HT'
    },
    prix_indicatif: 'économique',
    certifications: ['Vegan']
  }
];

/**
 * Recherche de fournisseurs par spécialité
 */
export function findSuppliersBySpecialty(specialty: string): Supplier[] {
  const searchTerm = specialty.toLowerCase();
  return SUPPLIERS_DATABASE.filter(supplier =>
    supplier.specialites.some(s => s.toLowerCase().includes(searchTerm)) ||
    supplier.marques.some(m => m.toLowerCase().includes(searchTerm))
  );
}

/**
 * Recherche de fournisseurs par marque
 */
export function findSuppliersByBrand(brand: string): Supplier[] {
  const searchTerm = brand.toLowerCase();
  return SUPPLIERS_DATABASE.filter(supplier =>
    supplier.marques.some(m => m.toLowerCase().includes(searchTerm))
  );
}

/**
 * Obtenir tous les fournisseurs
 */
export function getAllSuppliers(): Supplier[] {
  return SUPPLIERS_DATABASE;
}
