export const ORGANIZATION_TYPES = {
  MINISTERE: 'Ministère',
  DIRECTION_GENERALE: 'Direction Générale',
  MAIRIE: 'Mairie',
  ORGANISME_SOCIAL: 'Organisme Social',
  AUTRE: 'Autre',
} as const;

export const USER_ROLES = {
  SUPER_ADMIN: 'Super Administrateur',
  ADMIN: 'Administrateur',
  MANAGER: 'Responsable',
  AGENT: 'Agent',
  USER: 'Citoyen',
} as const;

export const SERVICE_TYPES = {
  // Documents d'État Civil
  ACTE_NAISSANCE: 'Acte de naissance',
  ACTE_MARIAGE: 'Acte de mariage',
  ACTE_DECES: 'Acte de décès',
  CERTIFICAT_VIE: 'Certificat de vie',
  CERTIFICAT_CELIBAT: 'Certificat de célibat',
  
  // Documents d'Identité
  CNI: 'Carte Nationale d\'Identité',
  PASSEPORT: 'Passeport',
  PERMIS_CONDUIRE: 'Permis de conduire',
  CARTE_SEJOUR: 'Carte de séjour',
  
  // Documents Judiciaires
  CASIER_JUDICIAIRE: 'Casier judiciaire',
  CERTIFICAT_NATIONALITE: 'Certificat de nationalité',
  LEGALISATION: 'Légalisation de documents',
  
  // Services Municipaux
  PERMIS_CONSTRUIRE: 'Permis de construire',
  AUTORISATION_COMMERCE: 'Autorisation de commerce',
  CERTIFICAT_RESIDENCE: 'Certificat de résidence',
  ACTE_FONCIER: 'Acte foncier',
  
  // Services Sociaux
  IMMATRICULATION_CNSS: 'Immatriculation CNSS',
  CARTE_CNAMGS: 'Carte CNAMGS',
  ATTESTATION_CHOMAGE: 'Attestation de chômage',
  ATTESTATION_TRAVAIL: 'Attestation de travail',
} as const;

export const REQUEST_STATUS = {
  DRAFT: 'Brouillon',
  SUBMITTED: 'Soumis',
  ASSIGNED: 'Assigné',
  IN_PROGRESS: 'En cours',
  PENDING_DOCUMENTS: 'Documents manquants',
  VALIDATED: 'Validé',
  READY: 'Prêt',
  COMPLETED: 'Terminé',
  REJECTED: 'Rejeté',
  CANCELLED: 'Annulé',
} as const;

export const GABONESE_ORGANIZATIONS = [
  // Ministères
  {
    name: 'Ministère de l\'Intérieur',
    type: 'MINISTERE' as const,
    code: 'MIN_INT',
    services: ['CNI', 'PASSEPORT', 'CARTE_SEJOUR']
  },
  {
    name: 'Ministère de la Justice',
    type: 'MINISTERE' as const,
    code: 'MIN_JUS',
    services: ['CASIER_JUDICIAIRE', 'CERTIFICAT_NATIONALITE', 'LEGALISATION']
  },
  
  // Directions Générales
  {
    name: 'Direction Générale de la Documentation et de l\'Immigration (DGDI)',
    type: 'DIRECTION_GENERALE' as const,
    code: 'DGDI',
    services: ['PASSEPORT', 'CARTE_SEJOUR']
  },
  
  // Mairies
  {
    name: 'Mairie de Libreville',
    type: 'MAIRIE' as const,
    code: 'MAIRE_LBV',
    services: ['ACTE_NAISSANCE', 'ACTE_MARIAGE', 'ACTE_DECES', 'PERMIS_CONSTRUIRE', 'AUTORISATION_COMMERCE']
  },
  {
    name: 'Mairie de Port-Gentil',
    type: 'MAIRIE' as const,
    code: 'MAIRE_PG',
    services: ['ACTE_NAISSANCE', 'ACTE_MARIAGE', 'ACTE_DECES', 'PERMIS_CONSTRUIRE']
  },
  
  // Organismes Sociaux
  {
    name: 'Caisse Nationale de Sécurité Sociale (CNSS)',
    type: 'ORGANISME_SOCIAL' as const,
    code: 'CNSS',
    services: ['IMMATRICULATION_CNSS', 'ATTESTATION_TRAVAIL']
  },
  {
    name: 'Caisse Nationale d\'Assurance Maladie et de Garantie Sociale (CNAMGS)',
    type: 'ORGANISME_SOCIAL' as const,
    code: 'CNAMGS',
    services: ['CARTE_CNAMGS']
  }
];

export const DEMO_ACCOUNTS = [
  {
    email: 'superadmin@admin.ga',
    password: 'SuperAdmin2024!',
    role: 'SUPER_ADMIN' as const,
    firstName: 'Jean-Baptiste',
    lastName: 'NGUEMA',
    organization: null
  },
  {
    email: 'admin.libreville@admin.ga',
    password: 'AdminLib2024!',
    role: 'ADMIN' as const,
    firstName: 'Marie-Claire',
    lastName: 'MBADINGA',
    organization: 'MAIRE_LBV'
  },
  {
    email: 'jean.dupont@gmail.com',
    password: 'User2024!',
    role: 'USER' as const,
    firstName: 'Jean',
    lastName: 'DUPONT',
    organization: null
  }
];