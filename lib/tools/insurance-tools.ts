import { prisma } from '../prisma';
import {
  checkClaimCoverageSchema,
  generateQuoteSchema,
  getClaimStatusSchema,
  getClientPolicyInfoSchema,
  getInsuranceProductInfoSchema,
  getPaymentStatusSchema,
  type ClaimCoverageResult,
  type ClaimStatusResult,
  type ClientPolicyInfo,
  type InsuranceProductInfo,
  type PaymentStatusResult,
  type QuoteResult,
} from './tool-schemas';

/**
 * Tool: getInsuranceProductInfo
 *
 * PURPOSE: Retrieve detailed information about BH Assurance products, branches, sub-branches, plans, and general conditions
 * PRD REQUIREMENT: Core requirement #1 - "Comprendre les produits d'assurance relatifs à BH Assurance"
 *
 * DATA SOURCES NEEDED:
 * - BH Assurance product catalog database
 * - Product documentation files (fiches produits)
 * - General conditions documents
 * - Pricing tables and rate structures
 *
 * EXTERNAL APIS/DATABASE QUERIES REQUIRED:
 * - SELECT * FROM products WHERE type = ? AND branch = ?
 * - SELECT * FROM product_guarantees WHERE product_id = ?
 * - SELECT * FROM general_conditions WHERE product_type = ?
 *
 * NEXT IMPLEMENTATION STEPS:
 * 1. Set up database connection to BH Assurance product catalog
 * 2. Create database schema for products, branches, guarantees
 * 3. Implement document parsing for product fiches
 * 4. Add semantic search for product information queries
 * 5. Implement caching for frequently accessed product data
 *
 * VALIDATION/ERROR HANDLING:
 * - Validate product types against BH Assurance catalog
 * - Handle missing product information gracefully
 * - Implement fallback to general product information
 */
export const getInsuranceProductInfo = {
  description: 'Obtenir des informations détaillées sur les produits d\'assurance BH Assurance, les garanties et les conditions',
  inputSchema: getInsuranceProductInfoSchema,
  execute: async (input: any): Promise<InsuranceProductInfo> => {
    try {
      console.log('getInsuranceProductInfo called with:', input);

      // Build where clause based on input parameters
      const whereClause: any = {};
      if (input.codeBranche) whereClause.code_branche = input.codeBranche;
      if (input.codeSousBranche) whereClause.code_sous_branche = input.codeSousBranche;
      if (input.codeProduit) whereClause.code_produit = input.codeProduit;
      if (input.codeGarantie) whereClause.code_garantie = input.codeGarantie;
      if (input.libBranche) whereClause.lib_branche = { contains: input.libBranche, mode: 'insensitive' };
      if (input.libSousBranche) whereClause.lib_sous_branche = { contains: input.libSousBranche, mode: 'insensitive' };
      if (input.libProduit) whereClause.lib_produit = { contains: input.libProduit, mode: 'insensitive' };

      // Query DescriptionGarenties table
      const garanties = await prisma.descriptionGarenties.findMany({
        where: whereClause,
        orderBy: [
          { lib_branche: 'asc' },
          { lib_sous_branche: 'asc' },
          { lib_produit: 'asc' },
          { lib_garantie: 'asc' }
        ]
      });

      if (garanties.length === 0) {
        // If no specific match, get general product info
        const allGaranties = await prisma.descriptionGarenties.findMany({
          take: 10,
          orderBy: { lib_branche: 'asc' }
        });

        if (allGaranties.length > 0) {
          const firstGarantie = allGaranties[0];
          if (firstGarantie) {
            return {
              codeBranche: firstGarantie.code_branche,
              codeSousBranche: firstGarantie.code_sous_branche,
              codeProduit: firstGarantie.code_produit,
              libBranche: firstGarantie.lib_branche,
              libSousBranche: firstGarantie.lib_sous_branche,
              libProduit: firstGarantie.lib_produit,
              description: 'Informations générales sur les produits d\'assurance disponibles',
              garanties: allGaranties.map((g: { code_garantie: any; lib_garantie: any; description: any; }) => ({
                codeGarantie: g.code_garantie,
                libGarantie: g.lib_garantie,
                description: g.description
              }))
            };
          }
        }
      }

      // Get the first result as primary product info
      const primaryGarantie = garanties[0];

      if (!primaryGarantie) {
        throw new Error('Aucune garantie trouvée pour le produit');
      }
      // Get profils cibles if available
      const profilsProduit = await prisma.mapProduitProfil.findMany({
        where: {
          lib_branche: primaryGarantie.lib_branche,
        lib_sous_branche: primaryGarantie.lib_sous_branche,
        lib_produit: primaryGarantie.lib_produit
      }
    });
     const productInfo : InsuranceProductInfo = {
      codeBranche: primaryGarantie.code_branche,
      codeSousBranche: primaryGarantie.code_sous_branche,
      codeProduit: primaryGarantie.code_produit,
      codeGarantie: primaryGarantie.code_garantie,
      libBranche: primaryGarantie.lib_branche,
      libSousBranche: primaryGarantie.lib_sous_branche,
      libProduit: primaryGarantie.lib_produit,
      libGarantie: primaryGarantie.lib_garantie,
      description: primaryGarantie.description,
      garanties: garanties.map((g: { code_garantie: any; lib_garantie: any; description: any; }) => ({
        codeGarantie: g.code_garantie,
        libGarantie: g.lib_garantie,
        description: g.description
      })),
      profilsCibles: profilsProduit.map((p: { profils_cibles: any; }) => p.profils_cibles)
    };


      return productInfo ;
    } catch (error) {
      console.error('Error in getInsuranceProductInfo:', error);
      throw new Error('Erreur lors de la récupération des informations produit');
    }
  }
};

/**
 * Tool: getClientPolicyInfo
 *
 * PURPOSE: Identify and retrieve guarantees subscribed by a specific client
 * PRD REQUIREMENT: Core requirement #2 - "Identifier les garanties souscrites par un client"
 *
 * DATA SOURCES NEEDED:
 * - Client database with policy information
 * - Policy contracts and amendments
 * - Guarantee details and coverage limits
 *
 * EXTERNAL APIS/DATABASE QUERIES REQUIRED:
 * - SELECT * FROM clients WHERE client_id = ?
 * - SELECT * FROM policies WHERE client_id = ? AND status = 'active'
 * - SELECT * FROM policy_guarantees WHERE policy_id = ?
 *
 * NEXT IMPLEMENTATION STEPS:
 * 1. Set up secure client database connection
 * 2. Implement client authentication and authorization
 * 3. Create policy lookup with guarantee details
 * 4. Add policy history and amendments tracking
 * 5. Implement data privacy and GDPR compliance
 */
export const getClientPolicyInfo = {
  description: 'Récupérer les informations de police du client et les garanties souscrites',
  inputSchema: getClientPolicyInfoSchema,
  execute: async (input: any): Promise<ClientPolicyInfo> => {
    try {
      console.log('getClientPolicyInfo called with:', input);

      let personnePhysique = null;
      let personneMorale = null;
      let contrats = [];

      // Search by different criteria
      if (input.refPersonne) {
        // Direct search by reference
        personnePhysique = await prisma.personnePhysique.findUnique({
          where: { ref_personne: input.refPersonne },
          include: { Contrat: true }
        });

        if (!personnePhysique) {
          personneMorale = await prisma.personneMorale.findUnique({
            where: { ref_personne: input.refPersonne },
            include: { Contrat: true }
          });
        }
      } else if (input.nomPrenom) {
        // Search by name
        personnePhysique = await prisma.personnePhysique.findFirst({
          where: { nom_prenom: { contains: input.nomPrenom, mode: 'insensitive' } },
          include: { Contrat: true }
        });
      } else if (input.raisonSociale) {
        // Search by company name
        personneMorale = await prisma.personneMorale.findFirst({
          where: { raison_sociale: { contains: input.raisonSociale, mode: 'insensitive' } },
          include: { Contrat: true }
        });
      } else if (input.matriculeFiscale) {
        // Search by fiscal number
        personneMorale = await prisma.personneMorale.findFirst({
          where: { matricule_fiscale: input.matriculeFiscale },
          include: { Contrat: true }
        });
      } else if (input.numPieceIdentite) {
        // Search by ID number
        personnePhysique = await prisma.personnePhysique.findFirst({
          where: { num_piece_identite: input.numPieceIdentite },
          include: { Contrat: true }
        });
      } else if (input.numContrat) {
        // Search by contract number
        const contrat = await prisma.contrat.findUnique({
          where: { num_contrat: input.numContrat }
        });

        console.log("🚀 ~ contrat:", contrat)
        if (contrat) {
          if (contrat.ref_personne_physique) {
            personnePhysique = await prisma.personnePhysique.findUnique({
              where: { ref_personne: contrat.ref_personne_physique },
              include: { Contrat: true }
            });
          } else if (contrat.ref_personne_morale) {
            personneMorale = await prisma.personneMorale.findUnique({
              where: { ref_personne: contrat.ref_personne_morale },
              include: { Contrat: true }
            });
          }
        }
      }

      // Get contracts from found person
      const sourceContrats = personnePhysique?.Contrat || personneMorale?.Contrat || [];

      // Get guarantees for each contract
      for (const contrat of sourceContrats) {
        const garanties = await prisma.garantieContrat.findMany({
          where: { num_contrat: contrat.num_contrat }
        });

        contrats.push({
          numContrat: contrat.num_contrat,
          libProduit: contrat.lib_produit,
          effetContrat: contrat.effet_contrat,
          dateExpiration: contrat.date_expiration || new Date(),
          prochainTerme: contrat.prochain_terme || '',
          libEtatContrat: contrat.lib_etat_contrat || '',
          branche: contrat.branche || '',
          sommeQuittances: contrat.somme_quittances || 0,
          statutPaiement: contrat.statut_paiement || '',
          capitalAssure: contrat.capital_assure || 0,
          garanties: garanties.map((g: any) => ({
            codeGarantie: g.code_garantie,
            libGarantie: g.lib_garantie,
            capitalAssure: g.capital_assure
          }))
        });
      }

      const result: ClientPolicyInfo = {
        refPersonne: personnePhysique?.ref_personne || personneMorale?.ref_personne || 0,
        personnePhysique: personnePhysique ? {
          refPersonne: personnePhysique.ref_personne,
          nomPrenom: personnePhysique.nom_prenom,
          dateNaissance: personnePhysique.date_naissance || new Date('1970-01-01'),
          lieuNaissance: personnePhysique.lieu_naissance || '',
          codeSexe: personnePhysique.code_sexe || '',
          situationFamiliale: personnePhysique.situation_familiale || '',
          numPieceIdentite: personnePhysique.num_piece_identite || 0,
          libSecteurActivite: personnePhysique.lib_secteur_activite || '',
          libProfession: personnePhysique.lib_profession || '',
          ville: personnePhysique.ville || '',
          libGouvernorat: personnePhysique.lib_gouvernorat || '',
          villeGouvernorat: personnePhysique.ville_gouvernorat || ''
        } : undefined,
        personneMorale: personneMorale ? {
          refPersonne: personneMorale.ref_personne,
          raisonSociale: personneMorale.raison_sociale,
          matriculeFiscale: personneMorale.matricule_fiscale,
          libSecteurActivite: personneMorale.lib_secteur_activite || '',
          libActivite: personneMorale.lib_activite || '',
          ville: personneMorale.ville || '',
          libGouvernorat: personneMorale.lib_gouvernorat || '',
          villeGouvernorat: personneMorale.ville_gouvernorat || ''
        } : undefined,
        contrats
      };

      return result;
    } catch (error) {
      console.error('Error in getClientPolicyInfo:', error);
      throw new Error('Erreur lors de la récupération des informations client');
    }
  }
};

/**
 * Tool: checkClaimCoverage
 *
 * PURPOSE: Determine if a specific claim/incident is covered under client's policy
 * PRD REQUIREMENT: Core requirement #2 - "Déterminer si un sinistre est couvert ou non"
 *
 * DATA SOURCES NEEDED:
 * - Client policy details and guarantees
 * - General conditions and exclusions
 * - Claims processing rules engine
 * - Coverage limits and deductibles
 *
 * EXTERNAL APIS/DATABASE QUERIES REQUIRED:
 * - SELECT * FROM policies WHERE policy_number = ?
 * - SELECT * FROM coverage_rules WHERE guarantee_type = ?
 * - SELECT * FROM exclusions WHERE policy_type = ?
 *
 * NEXT IMPLEMENTATION STEPS:
 * 1. Implement rules engine for coverage determination
 * 2. Create exclusions database and matching logic
 * 3. Add coverage percentage calculation
 * 4. Implement deductible calculation logic
 * 5. Add integration with claims processing system
 */
export const checkClaimCoverage = {
  description: 'Vérifier si un sinistre est couvert par la police du client',
  inputSchema: checkClaimCoverageSchema,
  execute: async (input: any): Promise<ClaimCoverageResult> => {
    try {
      console.log('checkClaimCoverage called with:', input);

      // Get contract information
      const contrat = await prisma.contrat.findUnique({
        where: { num_contrat: input.numContrat }
      });

      if (!contrat) {
        return {
          isCovered: false,
          coveragePercentage: 0,
          explanation: 'Contrat non trouvé ou inexistant',
          applicableConditions: [],
          garantiesApplicables: []
        };
      }

      // Check if contract is active
      const now = new Date();
      const isActive = contrat.effet_contrat <= now &&
                      (!contrat.date_expiration || contrat.date_expiration >= now);

      if (!isActive) {
        return {
          isCovered: false,
          coveragePercentage: 0,
          explanation: 'Le contrat n\'est pas actif à la date du sinistre',
          applicableConditions: ['Contrat expiré ou non encore en vigueur'],
          garantiesApplicables: []
        };
      }

      // Get contract guarantees
      const garanties = await prisma.garantieContrat.findMany({
        where: { num_contrat: input.numContrat }
      });

      // Check if there are relevant guarantees for the claim type
      const relevantGaranties = garanties.filter((g: any) => {
        const libGarantie = g.lib_garantie?.toLowerCase() || '';
        const natureSinistre = input.natureSinistre.toLowerCase();

        // Simple matching logic - can be enhanced with more sophisticated rules
        return libGarantie.includes('responsabilité') ||
               libGarantie.includes('dommage') ||
               libGarantie.includes('collision') ||
               libGarantie.includes('vol') ||
               libGarantie.includes('incendie') ||
               natureSinistre.includes(libGarantie.split(' ')[0]);
      });

      const isCovered = relevantGaranties.length > 0;
      const coveragePercentage = isCovered ? 90 : 0; // Default 90% coverage
      const deductible = 500; // Default deductible

      const result: ClaimCoverageResult = {
        isCovered,
        coveragePercentage,
        explanation: isCovered
          ? `Le sinistre "${input.natureSinistre}" est couvert par vos garanties. Une franchise de ${deductible}€ s'applique.`
          : `Le sinistre "${input.natureSinistre}" n'est pas couvert par vos garanties actuelles.`,
        applicableConditions: isCovered ? [
          `Franchise de ${deductible}€`,
          'Déclaration dans les 5 jours ouvrés',
          'Constat amiable requis si applicable',
          'Justificatifs à fournir'
        ] : [
          'Sinistre non couvert par les garanties souscrites'
        ],
        estimatedPayout: isCovered && input.montantEncaisse
          ? Math.max(0, (input.montantEncaisse * coveragePercentage / 100) - deductible)
          : undefined,
        deductible: isCovered ? deductible : undefined,
        exclusions: isCovered ? [] : ['Type de sinistre non couvert'],
        garantiesApplicables: relevantGaranties.map((g: any) => ({
          codeGarantie: g.code_garantie,
          libGarantie: g.lib_garantie,
          capitalAssure: g.capital_assure
        }))
      };

      return result;
    } catch (error) {
      console.error('Error in checkClaimCoverage:', error);
      throw new Error('Erreur lors de la vérification de couverture');
    }
  }
};

/**
 * Tool: getPaymentStatus
 *
 * PURPOSE: Check client's payment status for policies
 * PRD REQUIREMENT: Core requirement #2 - "Répondre sur le statut de paiement d'un client"
 *
 * DATA SOURCES NEEDED:
 * - Payment processing system
 * - Client billing information
 * - Payment history records
 * - Outstanding balance calculations
 *
 * EXTERNAL APIS/DATABASE QUERIES REQUIRED:
 * - SELECT * FROM payments WHERE client_id = ? ORDER BY date DESC
 * - SELECT * FROM invoices WHERE client_id = ? AND status = 'unpaid'
 * - SELECT * FROM payment_schedules WHERE policy_id = ?
 *
 * NEXT IMPLEMENTATION STEPS:
 * 1. Integrate with payment processing system API
 * 2. Implement real-time balance calculations
 * 3. Add payment reminder and notification logic
 * 4. Create payment history analysis
 * 5. Implement secure payment data handling
 */
export const getPaymentStatus = {
  description: 'Obtenir le statut de paiement et l\'historique du client',
  inputSchema: getPaymentStatusSchema,
  execute: async (input: any): Promise<PaymentStatusResult> => {
    try {
      console.log('getPaymentStatus called with:', input);

      let contrats: any[] = [];

      // Search for contracts based on input
      if (input.numContrat) {
        const contrat = await prisma.contrat.findUnique({
          where: { num_contrat: input.numContrat }
        });
        if (contrat) contrats = [contrat];
      } else if (input.refPersonne) {
        contrats = await prisma.contrat.findMany({
          where: {
            OR: [
              { ref_personne_physique: input.refPersonne },
              { ref_personne_morale: input.refPersonne }
            ]
          }
        });
      } else if (input.nomPrenom) {
        const personnePhysique = await prisma.personnePhysique.findFirst({
          where: { nom_prenom: { contains: input.nomPrenom, mode: 'insensitive' } },
          include: { Contrat: true }
        });
        contrats = personnePhysique?.Contrat || [];
      } else if (input.raisonSociale) {
        const personneMorale = await prisma.personneMorale.findFirst({
          where: { raison_sociale: { contains: input.raisonSociale, mode: 'insensitive' } },
          include: { Contrat: true }
        });
        contrats = personneMorale?.Contrat || [];
      }

      if (contrats.length === 0) {
        return {
          contrats: []
        };
      }

      // Process contracts to get payment status
      const contratsWithPaymentStatus = contrats.map((contrat: any) => {
        // Determine payment status based on available fields
        let statutPaiement = contrat.statut_paiement || 'unknown';

        // Calculate next payment date based on contract term
        let nextPaymentDate = new Date();
        if (contrat.prochain_terme) {
          // Try to parse the next term date
          try {
            nextPaymentDate = new Date(contrat.prochain_terme);
          } catch {
            // If parsing fails, use a default next month
            nextPaymentDate.setMonth(nextPaymentDate.getMonth() + 1);
          }
        }

        return {
          numContrat: contrat.num_contrat,
          libProduit: contrat.lib_produit,
          statutPaiement: statutPaiement,
          sommeQuittances: contrat.somme_quittances,
          prochainTerme: contrat.prochain_terme,
          effetContrat: contrat.effet_contrat,
          dateExpiration: contrat.date_expiration
        };
      });

      const result: PaymentStatusResult = {
        refPersonne: contrats[0]?.ref_personne_physique || contrats[0]?.ref_personne_morale,
        numContrat: input.numContrat,
        statutPaiement: contrats[0]?.statut_paiement,
        sommeQuittances: contrats[0]?.somme_quittances,
        prochainTerme: contrats[0]?.prochain_terme,
        contrats: contratsWithPaymentStatus
      };

      return result;
    } catch (error) {
      console.error('Error in getPaymentStatus:', error);
      throw new Error('Erreur lors de la récupération du statut de paiement');
    }
  }
};

/**
 * Tool: getClaimStatus
 *
 * PURPOSE: Retrieve status and details of client's claims
 * PRD REQUIREMENT: Core requirement #2 - "Répondre sur le statut d'un sinistre d'un client"
 *
 * DATA SOURCES NEEDED:
 * - Claims management system
 * - Claim processing workflow status
 * - Document tracking system
 * - Adjuster and expert reports
 *
 * EXTERNAL APIS/DATABASE QUERIES REQUIRED:
 * - SELECT * FROM claims WHERE client_id = ? AND claim_number = ?
 * - SELECT * FROM claim_documents WHERE claim_id = ?
 * - SELECT * FROM claim_workflow WHERE claim_id = ?
 *
 * NEXT IMPLEMENTATION STEPS:
 * 1. Integrate with claims management system API
 * 2. Implement real-time status tracking
 * 3. Add document upload and tracking
 * 4. Create workflow status notifications
 * 5. Implement claim timeline and milestones
 */
export const getClaimStatus = {
  description: 'Obtenir le statut et les détails des sinistres d\'assurance',
  inputSchema: getClaimStatusSchema,
  execute: async (input: any): Promise<ClaimStatusResult> => {
    try {
      console.log('getClaimStatus called with:', input);

      let sinistre = null;

      // Search for claim by different criteria
      if (input.numSinistre) {
        sinistre = await prisma.sinistre.findUnique({
          where: { num_sinistre: input.numSinistre }
        });
      } else if (input.numContrat) {
        // Get the most recent claim for this contract
        sinistre = await prisma.sinistre.findFirst({
          where: { num_contrat: input.numContrat },
          orderBy: { date_declaration: 'desc' }
        });
      } else if (input.refPersonne) {
        // Find claims for contracts belonging to this person
        const contrats = await prisma.contrat.findMany({
          where: {
            OR: [
              { ref_personne_physique: input.refPersonne },
              { ref_personne_morale: input.refPersonne }
            ]
          }
        });

        if (contrats.length > 0) {
          sinistre = await prisma.sinistre.findFirst({
            where: {
              num_contrat: { in: contrats.map((c: { num_contrat: any; }) => c.num_contrat) }
            },
            orderBy: { date_declaration: 'desc' }
          });
        }
      }

      if (!sinistre) {
        throw new Error('Aucun sinistre trouvé avec les critères fournis');
      }

      // Map database status to our expected status values
      const mapStatus = (libEtatSinistre: string | null): 'submitted' | 'processing' | 'approved' | 'denied' | 'paid' => {
        if (!libEtatSinistre) return 'submitted';

        const etat = libEtatSinistre.toLowerCase();
        if (etat.includes('ouvert') || etat.includes('en cours')) return 'processing';
        if (etat.includes('clos') || etat.includes('réglé')) return 'paid';
        if (etat.includes('refus') || etat.includes('rejet')) return 'denied';
        if (etat.includes('valid') || etat.includes('accept')) return 'approved';
        return 'submitted';
      };

      const result: ClaimStatusResult = {
        numSinistre: sinistre.num_sinistre,
        numContrat: sinistre.num_contrat,
        libBranche: sinistre.lib_branche,
        libSousBranche: sinistre.lib_sous_branche,
        libProduit: sinistre.lib_produit,
        natureSinistre: sinistre.nature_sinistre,
        libTypeSinistre: sinistre.lib_type_sinistre || '',
        tauxResponsabilite: sinistre.taux_responsabilite || 0,
        dateSurvenance: sinistre.date_survenance || new Date(),
        dateDeclaration: sinistre.date_declaration || new Date(),
        dateOuverture: sinistre.date_ouverture || new Date(),
        observationSinistre: sinistre.observation_sinistre || '',
        libEtatSinistre: sinistre.lib_etat_sinistre || '',
        lieuAccident: sinistre.lieu_accident || '',
        motifReouverture: sinistre.motif_reouverture || '',
        montantEncaisse: sinistre.montant_encaisse || 0,
        montantAEncaisser: sinistre.montant_a_encaisser || 0
      };

      return result;
    } catch (error) {
      console.error('Error in getClaimStatus:', error);
      throw new Error('Erreur lors de la récupération du statut de sinistre');
    }
  }
};

/**
 * Tool: generateQuote
 *
 * PURPOSE: Generate insurance quote by connecting to the provided API Devis
 * PRD REQUIREMENT: Core requirement #3 - "génère un devis en se connectant à une API existante (API Devis)"
 *
 * DATA SOURCES NEEDED:
 * - BH Assurance API Devis (external API)
 * - Pricing tables and rate structures
 * - Risk assessment algorithms
 * - Discount and promotion rules
 *
 * EXTERNAL APIS/DATABASE QUERIES REQUIRED:
 * - POST /api/devis with client and coverage information
 * - GET /api/pricing/factors for risk calculation
 * - GET /api/discounts/available for applicable discounts
 *
 * NEXT IMPLEMENTATION STEPS:
 * 1. Obtain API Devis endpoint and authentication details
 * 2. Implement API client with proper error handling
 * 3. Add input validation and data transformation
 * 4. Implement quote persistence and retrieval
 * 5. Add quote comparison and recommendation logic
 * 6. Implement quote expiration and renewal tracking
 */
export const generateQuote = {
  description: 'Générer un devis d\'assurance en utilisant l\'API Devis de BH Assurance',
  inputSchema: generateQuoteSchema,
  execute: async (input: any): Promise<QuoteResult> => {
    try {
      console.log('generateQuote called with:', input);

      // Extract required parameters for the API call
      const apiParams = new URLSearchParams();

      // Map input to API parameters based on the Postman schema
      if (input.clientInfo?.numPieceIdentite) {
        apiParams.append('n_cin', input.clientInfo.numPieceIdentite.toString());
      } else {
        // Default CIN if not provided
        apiParams.append('n_cin', '08478931');
      }

      // Vehicle/Product information
      if (input.productInfo?.capitalAssure) {
        apiParams.append('valeur_venale', input.productInfo.capitalAssure.toString());
        apiParams.append('valeur_a_neuf', input.productInfo.capitalAssure.toString());
      } else {
        // Default values
        apiParams.append('valeur_venale', '60000');
        apiParams.append('valeur_a_neuf', '60000');
      }

      // Additional parameters with defaults based on the API schema
      apiParams.append('nature_contrat', input.additionalInfo?.natureContrat || 'r');
      apiParams.append('nombre_place', input.additionalInfo?.nombrePlace?.toString() || '5');
      apiParams.append('date_premiere_mise_en_circulation',
        input.additionalInfo?.datePremiereMiseEnCirculation || '2022-02-28');
      apiParams.append('capital_bris_de_glace',
        input.additionalInfo?.capitalBrisDeGlace?.toString() || '900');
      apiParams.append('capital_dommage_collision',
        input.additionalInfo?.capitalDommageCollision?.toString() ||
        input.productInfo?.capitalAssure?.toString() || '60000');
      apiParams.append('puissance', input.additionalInfo?.puissance?.toString() || '6');
      apiParams.append('classe', input.additionalInfo?.classe?.toString() || '3');

      // Make API call to the external service
      const apiUrl = `https://apidevis.onrender.com/api/auto/packs?${apiParams.toString()}`;
      console.log('Calling API:', apiUrl);

      const apiResponse = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!apiResponse.ok) {
        throw new Error(`API call failed with status: ${apiResponse.status}`);
      }

      const apiData = await apiResponse.json();
      console.log('API Response:', apiData);

      // Generate quote ID
      const quoteId = `QTE-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;

      // Transform API response to match our QuoteResult interface
      const result: QuoteResult = {
        quoteId,
        libProduit: input.productInfo?.libProduit || 'Assurance Auto',
        branche: 'Automobile',
        capitalAssure: input.productInfo?.capitalAssure,
        prime: {
          mensuelle: apiData.prime_mensuelle || Math.round((apiData.prime_annuelle || 1200) / 12),
          annuelle: apiData.prime_annuelle || 1200,
          semestrielle: apiData.prime_semestrielle || Math.round((apiData.prime_annuelle || 1200) / 2)
        },
        garanties: apiData.garanties || [
          {
            codeGarantie: 1,
            libGarantie: 'Responsabilité Civile',
            capitalAssure: input.productInfo?.capitalAssure,
            description: 'Couverture responsabilité civile obligatoire'
          },
          {
            codeGarantie: 2,
            libGarantie: 'Dommages Collision',
            capitalAssure: input.productInfo?.capitalAssure,
            description: 'Couverture des dommages en cas de collision'
          }
        ],
        remises: apiData.remises || [
          {
            nom: 'Remise fidélité',
            montant: Math.round((apiData.prime_annuelle || 1200) * 0.05),
            pourcentage: 5
          },
          {
            nom: 'Remise multi-contrats',
            montant: Math.round((apiData.prime_annuelle || 1200) * 0.03),
            pourcentage: 3
          }
        ],
        validJusquau: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        conditions: apiData.conditions || 'Devis valable 30 jours. Souscription possible en ligne ou en agence.',
        prochainEtapes: apiData.prochaines_etapes || [
          'Valider les informations personnelles',
          'Fournir les documents requis',
          'Signer le contrat électroniquement',
          'Effectuer le premier paiement'
        ]
      };

      return result;
    } catch (error) {
      console.error('Error in generateQuote:', error);
      throw new Error(`Erreur lors de la génération du devis: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
    }
  }
};
