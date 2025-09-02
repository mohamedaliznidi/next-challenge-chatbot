import { z } from 'zod';


// Input schemas for insurance tools - Updated to match Prisma schema
export const getInsuranceProductInfoSchema = z.object({
  codeBranche: z.number().optional().describe('Code de la branche d\'assurance'),
  codeSousBranche: z.number().optional().describe('Code de la sous-branche'),
  codeProduit: z.number().optional().describe('Code du produit'),
  codeGarantie: z.number().optional().describe('Code de la garantie'),
  libBranche: z.string().optional().describe('Libellé de la branche'),
  libSousBranche: z.string().optional().describe('Libellé de la sous-branche'),
  libProduit: z.string().optional().describe('Libellé du produit'),
  query: z.string().describe('Question spécifique sur le produit d\'assurance'),
});

export const getClientPolicyInfoSchema = z.object({
  refPersonne: z.number().optional().describe('Référence de la personne (physique ou morale)'),
  numContrat: z.string().optional().describe('Numéro de contrat spécifique'),
  raisonSociale: z.string().optional().describe('Raison sociale (pour personne morale)'),
  nomPrenom: z.string().optional().describe('Nom et prénom (pour personne physique)'),
  matriculeFiscale: z.string().optional().describe('Matricule fiscal (pour personne morale)'),
  numPieceIdentite: z.number().optional().describe('Numéro de pièce d\'identité (pour personne physique)'),
});

export const checkClaimCoverageSchema = z.object({
  numContrat: z.string().describe('Numéro de contrat pour vérification de couverture'),
  natureSinistre: z.string().describe('Nature du sinistre'),
  libTypeSinistre: z.string().optional().describe('Type de sinistre'),
  observationSinistre: z.string().optional().describe('Description détaillée du sinistre'),
  montantEncaisse: z.number().optional().describe('Montant estimé du sinistre'),
  lieuAccident: z.string().optional().describe('Lieu de l\'accident'),
});

export const getPaymentStatusSchema = z.object({
  refPersonne: z.number().optional().describe('Référence de la personne'),
  numContrat: z.string().optional().describe('Numéro de contrat spécifique'),
  raisonSociale: z.string().optional().describe('Raison sociale (pour personne morale)'),
  nomPrenom: z.string().optional().describe('Nom et prénom (pour personne physique)'),
});

export const getClaimStatusSchema = z.object({
  numSinistre: z.string().optional().describe('Numéro de sinistre spécifique'),
  numContrat: z.string().optional().describe('Numéro de contrat'),
  refPersonne: z.number().optional().describe('Référence de la personne'),
  libEtatSinistre: z.string().optional().describe('État du sinistre'),
});

export const generateQuoteSchema = z.object({
  clientInfo: z.object({
    // For PersonnePhysique
    nomPrenom: z.string().optional().describe('Nom et prénom du client'),
    dateNaissance: z.string().optional().describe('Date de naissance (YYYY-MM-DD)'),
    lieuNaissance: z.string().optional().describe('Lieu de naissance'),
    codeSexe: z.string().optional().describe('Code sexe (M/F)'),
    situationFamiliale: z.string().optional().describe('Situation familiale'),
    numPieceIdentite: z.number().optional().describe('Numéro de pièce d\'identité (CIN)'),
    libSecteurActivite: z.string().optional().describe('Secteur d\'activité'),
    libProfession: z.string().optional().describe('Profession'),
    ville: z.string().optional().describe('Ville'),
    libGouvernorat: z.string().optional().describe('Gouvernorat'),
    // For PersonneMorale
    raisonSociale: z.string().optional().describe('Raison sociale de l\'entreprise'),
    matriculeFiscale: z.string().optional().describe('Matricule fiscal'),
  }),
  productInfo: z.object({
    libProduit: z.string().describe('Libellé du produit d\'assurance'),
    branche: z.string().optional().describe('Branche d\'assurance'),
    capitalAssure: z.number().positive().optional().describe('Capital assuré souhaité (valeur vénale du véhicule)'),
  }),
  additionalInfo: z.object({
    // Vehicle specific information for auto insurance API
    natureContrat: z.string().optional().describe('Nature du contrat (r pour renouvellement, n pour nouveau)'),
    nombrePlace: z.number().optional().describe('Nombre de places du véhicule'),
    datePremiereMiseEnCirculation: z.string().optional().describe('Date de première mise en circulation (YYYY-MM-DD)'),
    capitalBrisDeGlace: z.number().optional().describe('Capital bris de glace'),
    capitalDommageCollision: z.number().optional().describe('Capital dommage collision'),
    puissance: z.number().optional().describe('Puissance du véhicule'),
    classe: z.number().optional().describe('Classe du véhicule'),
  }).optional(),
});

// Output type definitions - Updated to match Prisma schema
export type InsuranceProductInfo = {
  codeBranche?: number;
  codeSousBranche?: number;
  codeProduit?: number;
  codeGarantie?: number;
  libBranche: string;
  libSousBranche?: string;
  libProduit: string;
  libGarantie?: string;
  description: string;
  garanties: Array<{
    codeGarantie: number;
    libGarantie: string;
    description: string;
  }>;
  profilsCibles?: string[];
};

export type ClientPolicyInfo = {
  refPersonne?: number;
  personnePhysique?: {
    refPersonne: number;
    nomPrenom: string;
    dateNaissance?: Date;
    lieuNaissance?: string;
    codeSexe?: string;
    situationFamiliale?: string;
    numPieceIdentite: number;
    libSecteurActivite?: string;
    libProfession?: string;
    ville?: string;
    libGouvernorat?: string;
    villeGouvernorat?: string;
  } | undefined;
  personneMorale?: {
    refPersonne: number;
    raisonSociale: string;
    matriculeFiscale: string;
    libSecteurActivite?: string;
    libActivite?: string;
    ville?: string;
    libGouvernorat?: string;
    villeGouvernorat?: string;
  } | undefined;
  contrats: Array<{
    numContrat: string;
    libProduit: string;
    effetContrat: Date;
    dateExpiration?: Date;
    prochainTerme?: string;
    libEtatContrat?: string;
    branche?: string;
    sommeQuittances?: number;
    statutPaiement?: string;
    capitalAssure?: number;
    garanties: Array<{
      codeGarantie: number;
      libGarantie?: string;
      capitalAssure?: number;
    }>;
  }>;
};

export type ClaimCoverageResult = {
  isCovered: boolean;
  coveragePercentage: number;
  explanation: string;
  applicableConditions: string[];
  estimatedPayout?: number | undefined;
  deductible?: number | undefined;
  exclusions?: string[] | undefined;
  garantiesApplicables: Array<{
    codeGarantie: number;
    libGarantie?: string;
    capitalAssure?: number;
  }>;
};

export type PaymentStatusResult = {
  refPersonne?: number;
  numContrat?: string;
  statutPaiement?: string;
  sommeQuittances?: number;
  prochainTerme?: string;
  contrats: Array<{
    numContrat: string;
    libProduit: string;
    statutPaiement?: string;
    sommeQuittances?: number;
    prochainTerme?: string;
    effetContrat: Date;
    dateExpiration?: Date;
  }>;
};

export type ClaimStatusResult = {
  numSinistre: string;
  numContrat: string;
  libBranche: string;
  libSousBranche: string;
  libProduit: string;
  natureSinistre: string;
  libTypeSinistre?: string;
  tauxResponsabilite?: number;
  dateSurvenance?: Date;
  dateDeclaration?: Date;
  dateOuverture?: Date;
  observationSinistre?: string;
  libEtatSinistre?: string;
  lieuAccident?: string;
  motifReouverture?: string;
  montantEncaisse?: number;
  montantAEncaisser?: number;
};

export type QuoteResult = {
  quoteId: string;
  libProduit: string;
  branche?: string;
  capitalAssure?: number;
  prime: {
    mensuelle: number;
    annuelle: number;
    semestrielle: number;
  };
  garanties: Array<{
    codeGarantie: number;
    libGarantie: string;
    capitalAssure?: number;
    description: string;
  }>;
  remises: Array<{
    nom: string;
    montant: number;
    pourcentage: number;
  }>;
  validJusquau: string;
  conditions: string;
  prochainEtapes: string[];
};
