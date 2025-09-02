'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { AlertCircleIcon, CheckCircleIcon, ClockIcon, CreditCardIcon, FileTextIcon, ShieldCheckIcon, XCircleIcon } from 'lucide-react';
import type { ComponentProps } from 'react';

// Base Tool Component
export type ToolProps = ComponentProps<typeof Card> & {
  toolName: string;
  state: 'input-streaming' | 'input-available' | 'output-available' | 'output-error';
  input?: any;
  output?: any;
  errorText?: string | undefined;
  toolCallId: string;
};

export const Tool = ({
  toolName,
  state,
  input,
  output,
  errorText,
  toolCallId,
  className,
  ...props
}: ToolProps) => {
  const getStateIcon = () => {
    switch (state) {
      case 'input-streaming':
        return <ClockIcon className="h-4 w-4 animate-spin" />;
      case 'input-available':
        return <ClockIcon className="h-4 w-4" />;
      case 'output-available':
        return <CheckCircleIcon className="h-4 w-4 text-green-600" />;
      case 'output-error':
        return <XCircleIcon className="h-4 w-4 text-red-600" />;
    }
  };

  const getStateText = () => {
    switch (state) {
      case 'input-streaming':
        return 'En cours...';
      case 'input-available':
        return 'En cours...';
      case 'output-available':
        return 'Terminé';
      case 'output-error':
        return 'Erreur';
    }
  };

  const getToolDisplayName = (toolName: string) => {
    const toolNames: { [key: string]: string } = {
      'getInsuranceProductInfo': 'Recherche d\'informations produit',
      'getClientPolicyInfo': 'Consultation de votre police',
      'checkClaimCoverage': 'Vérification de couverture',
      'getPaymentStatus': 'Consultation des paiements',
      'getClaimStatus': 'Suivi de sinistre',
      'generateQuote': 'Génération de devis'
    };
    return toolNames[toolName] || 'Traitement en cours';
  };

  return (
    <Card className={cn('w-full max-w-2xl', className)} {...props}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">
            {getToolDisplayName(toolName)}
          </CardTitle>
          <Badge variant="outline" className="flex items-center gap-1">
            {getStateIcon()}
            {getStateText()}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        {state === 'output-error' && (
          <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
            <div className="flex items-center gap-2">
              <AlertCircleIcon className="h-4 w-4" />
              <span className="font-medium">Une erreur s'est produite lors du traitement.</span>
            </div>
          </div>
        )}

        {(state === 'input-streaming' || state === 'input-available') && (
          <div className="text-sm bg-blue-50 p-3 rounded-md">
            <p className="text-blue-700">Analyse de votre demande en cours...</p>
          </div>
        )}

        {state === 'output-available' && (
          <div className="text-sm bg-green-50 p-3 rounded-md">
            <p className="text-green-700">Traitement terminé avec succès.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// Insurance-specific tool components
export type InsurancePolicyDisplayProps = {
  policy: {
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
    };
    personneMorale?: {
      refPersonne: number;
      raisonSociale: string;
      matriculeFiscale: string;
      libSecteurActivite?: string;
      libActivite?: string;
      ville?: string;
      libGouvernorat?: string;
      villeGouvernorat?: string;
    };
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
};

export const InsurancePolicyDisplay = ({ policy }: InsurancePolicyDisplayProps) => {
  // Helper functions
  const formatDate = (date?: Date) => {
    if (!date) return 'Non spécifiée';
    return new Date(date).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount?: number) => {
    if (amount === undefined || amount === null) return 'Non spécifié';
    return `${amount.toLocaleString('fr-FR')} DT`;
  };

  const getStatusInfo = (status?: string) => {
    if (!status) return { variant: 'secondary' as const, text: 'Non spécifié' };

    const lowerStatus = status.toLowerCase();
    if (lowerStatus.includes('actif') || lowerStatus.includes('en cours')) {
      return { variant: 'default' as const, text: status };
    }
    if (lowerStatus.includes('expiré') || lowerStatus.includes('suspendu')) {
      return { variant: 'destructive' as const, text: status };
    }
    if (lowerStatus.includes('en attente')) {
      return { variant: 'secondary' as const, text: status };
    }
    return { variant: 'outline' as const, text: status };
  };

  // Get client name
  const getClientName = () => {
    if (policy.personnePhysique) {
      return policy.personnePhysique.nomPrenom;
    }
    if (policy.personneMorale) {
      return policy.personneMorale.raisonSociale;
    }
    return 'Non spécifié';
  };

  // Get primary contract for header
  const primaryContract = policy.contrats[0];

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <ShieldCheckIcon className="h-5 w-5 text-blue-600" />
          <CardTitle>Informations de Police</CardTitle>
        </div>
        <CardDescription>
          {primaryContract ? `Contrat #${primaryContract.numContrat}` : 'Informations Client'}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Client Information */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-600">Titulaire</p>
            <p className="text-sm">{getClientName()}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Type de Client</p>
            <p className="text-sm">
              {policy.personnePhysique ? 'Personne Physique' :
                policy.personneMorale ? 'Personne Morale' : 'Non spécifié'}
            </p>
          </div>
        </div>

        {/* Additional client details */}
        {policy.personnePhysique && (
          <>
            <Separator />
            <div className="grid grid-cols-2 gap-4">
              {policy.personnePhysique.dateNaissance && (
                <div>
                  <p className="text-sm font-medium text-gray-600">Date de Naissance</p>
                  <p className="text-sm">{formatDate(policy.personnePhysique.dateNaissance)}</p>
                </div>
              )}
              {policy.personnePhysique.libProfession && (
                <div>
                  <p className="text-sm font-medium text-gray-600">Profession</p>
                  <p className="text-sm">{policy.personnePhysique.libProfession}</p>
                </div>
              )}
              {policy.personnePhysique.ville && (
                <div>
                  <p className="text-sm font-medium text-gray-600">Ville</p>
                  <p className="text-sm">{policy.personnePhysique.ville}</p>
                </div>
              )}
            </div>
          </>
        )}

        {policy.personneMorale && (
          <>
            <Separator />
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-600">Matricule Fiscal</p>
                <p className="text-sm">{policy.personneMorale.matriculeFiscale}</p>
              </div>
              {policy.personneMorale.libActivite && (
                <div>
                  <p className="text-sm font-medium text-gray-600">Activité</p>
                  <p className="text-sm">{policy.personneMorale.libActivite}</p>
                </div>
              )}
              {policy.personneMorale.ville && (
                <div>
                  <p className="text-sm font-medium text-gray-600">Ville</p>
                  <p className="text-sm">{policy.personneMorale.ville}</p>
                </div>
              )}
            </div>
          </>
        )}

        {/* Contracts */}
        {policy.contrats.length > 0 && (
          <>
            <Separator />
            <div>
              <p className="text-sm font-medium text-gray-600 mb-3">Contrats</p>
              <div className="space-y-4">
                {policy.contrats.map((contrat, index) => (
                  <div key={contrat.numContrat} className="border rounded-lg p-3 space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-sm">{contrat.libProduit}</p>
                        <p className="text-xs text-gray-500">#{contrat.numContrat}</p>
                      </div>
                      {contrat.libEtatContrat && (
                        <Badge variant={getStatusInfo(contrat.libEtatContrat).variant}>
                          {getStatusInfo(contrat.libEtatContrat).text}
                        </Badge>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-gray-600">Effet: </span>
                        <span>{formatDate(contrat.effetContrat)}</span>
                      </div>
                      {contrat.dateExpiration && (
                        <div>
                          <span className="text-gray-600">Expiration: </span>
                          <span>{formatDate(contrat.dateExpiration)}</span>
                        </div>
                      )}
                      {contrat.capitalAssure && (
                        <div>
                          <span className="text-gray-600">Capital: </span>
                          <span>{formatCurrency(contrat.capitalAssure)}</span>
                        </div>
                      )}
                      {contrat.branche && (
                        <div>
                          <span className="text-gray-600">Branche: </span>
                          <span>{contrat.branche}</span>
                        </div>
                      )}
                    </div>

                    {/* Guarantees */}
                    {contrat.garanties.length > 0 && (
                      <div>
                        <p className="text-xs font-medium text-gray-600 mb-1">Garanties:</p>
                        <div className="flex flex-wrap gap-1">
                          {contrat.garanties.map((garantie, gIndex) => (
                            <Badge key={`${contrat.numContrat}-${garantie.codeGarantie}`} variant="outline" className="text-xs">
                              {garantie.libGarantie || `Garantie ${garantie.codeGarantie}`}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export type ClaimStatusDisplayProps = {
  claim: {
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
};

export const ClaimStatusDisplay = ({ claim }: ClaimStatusDisplayProps) => {
  // Helper function to format dates
  const formatDate = (date?: Date) => {
    if (!date) return 'Non spécifiée';
    return new Date(date).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Helper function to format currency
  const formatCurrency = (amount?: number) => {
    if (amount === undefined || amount === null) return 'Non spécifié';
    return `${amount} DT`;
  };

  // Helper function to get status badge variant and translated text
  const getStatusInfo = (status?: string) => {
    if (!status) return { variant: 'secondary' as const, text: 'Non spécifié' };

    const lowerStatus = status.toLowerCase();

    // Closed/Settled states
    if (lowerStatus.includes('clos') || lowerStatus.includes('réglé') || lowerStatus.includes('payé')) {
      return { variant: 'default' as const, text: status };
    }

    // Open/Processing states
    if (lowerStatus.includes('ouvert') || lowerStatus.includes('en cours') || lowerStatus.includes('traitement')) {
      return { variant: 'outline' as const, text: status };
    }

    // Rejected/Denied states
    if (lowerStatus.includes('refus') || lowerStatus.includes('rejet') || lowerStatus.includes('annul')) {
      return { variant: 'destructive' as const, text: status };
    }

    // Approved/Validated states
    if (lowerStatus.includes('valid') || lowerStatus.includes('accept') || lowerStatus.includes('approuv')) {
      return { variant: 'default' as const, text: status };
    }

    // Pending/Submitted states
    if (lowerStatus.includes('attente') || lowerStatus.includes('soumis') || lowerStatus.includes('déclar')) {
      return { variant: 'secondary' as const, text: status };
    }

    // Default case - return original status
    return { variant: 'secondary' as const, text: status };
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <FileTextIcon className="h-5 w-5 text-orange-600" />
          <CardTitle>Statut du Sinistre</CardTitle>
        </div>
        <CardDescription>Sinistre #{claim.numSinistre}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Basic Information */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-600">Contrat</p>
            <p className="text-sm">{claim.numContrat}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Statut</p>
            <Badge variant={getStatusInfo(claim.libEtatSinistre).variant}>
              {getStatusInfo(claim.libEtatSinistre).text}
            </Badge>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Branche</p>
            <p className="text-sm">{claim.libBranche}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Produit</p>
            <p className="text-sm">{claim.libProduit}</p>
          </div>
        </div>

        <Separator />

        {/* Claim Details */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-600">Nature du Sinistre</p>
            <p className="text-sm">{claim.natureSinistre}</p>
          </div>
          {claim.libTypeSinistre && (
            <div>
              <p className="text-sm font-medium text-gray-600">Type de Sinistre</p>
              <p className="text-sm">{claim.libTypeSinistre}</p>
            </div>
          )}
          {claim.tauxResponsabilite !== undefined && (
            <div>
              <p className="text-sm font-medium text-gray-600">Taux de Responsabilité</p>
              <p className="text-sm">{claim.tauxResponsabilite}%</p>
            </div>
          )}
          {claim.lieuAccident && (
            <div>
              <p className="text-sm font-medium text-gray-600">Lieu de l'Accident</p>
              <p className="text-sm">{claim.lieuAccident}</p>
            </div>
          )}
        </div>

        <Separator />

        {/* Dates */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-600">Date de Survenance</p>
            <p className="text-sm">{formatDate(claim.dateSurvenance)}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Date de Déclaration</p>
            <p className="text-sm">{formatDate(claim.dateDeclaration)}</p>
          </div>
          {claim.dateOuverture && (
            <div>
              <p className="text-sm font-medium text-gray-600">Date d'Ouverture</p>
              <p className="text-sm">{formatDate(claim.dateOuverture)}</p>
            </div>
          )}
        </div>

        <Separator />

        {/* Financial Information */}
        <div className="grid grid-cols-2 gap-4">
          {claim.montantEncaisse !== undefined && (
            <div>
              <p className="text-sm font-medium text-gray-600">Montant Encaissé</p>
              <p className="text-sm font-medium text-green-600">{formatCurrency(claim.montantEncaisse)}</p>
            </div>
          )}
          {claim.montantAEncaisser !== undefined && (
            <div>
              <p className="text-sm font-medium text-gray-600">Montant à Encaisser</p>
              <p className="text-sm font-medium text-blue-600">{formatCurrency(claim.montantAEncaisser)}</p>
            </div>
          )}
        </div>

        {/* Observations and Additional Info */}
        {claim.observationSinistre && (
          <>
            <Separator />
            <div>
              <p className="text-sm font-medium text-gray-600 mb-2">Observations</p>
              <p className="text-sm text-gray-800">{claim.observationSinistre}</p>
            </div>
          </>
        )}

        {claim.motifReouverture && (
          <>
            <Separator />
            <div>
              <p className="text-sm font-medium text-gray-600 mb-2">Motif de Réouverture</p>
              <p className="text-sm text-gray-800">{claim.motifReouverture}</p>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export type PaymentStatusDisplayProps = {
  payment: {
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
};

export const PaymentStatusDisplay = ({ payment }: PaymentStatusDisplayProps) => {
  // Helper functions
  const formatCurrency = (amount?: number) => {
    if (amount === undefined || amount === null) return 'Non spécifié';
    return `${amount.toLocaleString('fr-FR')} DT`;
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Non spécifiée';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  const getPaymentStatusInfo = (status?: string) => {
    if (!status) return { variant: 'secondary' as const, text: 'Non spécifié' };

    const lowerStatus = status.toLowerCase();
    if (lowerStatus.includes('à jour') || lowerStatus.includes('payé') || lowerStatus.includes('current')) {
      return { variant: 'default' as const, text: status };
    }
    if (lowerStatus.includes('retard') || lowerStatus.includes('impayé') || lowerStatus.includes('overdue')) {
      return { variant: 'destructive' as const, text: status };
    }
    if (lowerStatus.includes('attente') || lowerStatus.includes('pending')) {
      return { variant: 'secondary' as const, text: status };
    }
    return { variant: 'outline' as const, text: status };
  };

  // Calculate total outstanding balance
  const totalOutstanding = payment.contrats.reduce((total, contrat) => {
    return total + (contrat.sommeQuittances || 0);
  }, 0);

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <CreditCardIcon className="h-5 w-5 text-green-600" />
          <CardTitle>Statut des Paiements</CardTitle>
        </div>
        {payment.numContrat && (
          <CardDescription>Contrat #{payment.numContrat}</CardDescription>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Overall Payment Status */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-600">Statut Global</p>
            <Badge variant={getPaymentStatusInfo(payment.statutPaiement).variant}>
              {getPaymentStatusInfo(payment.statutPaiement).text}
            </Badge>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Total Quittances</p>
            <p className="text-sm font-medium">{formatCurrency(totalOutstanding)}</p>
          </div>
          {payment.prochainTerme && (
            <div>
              <p className="text-sm font-medium text-gray-600">Prochain Terme</p>
              <p className="text-sm">{formatDate(payment.prochainTerme)}</p>
            </div>
          )}
        </div>

        {/* Contract Details */}
        {payment.contrats.length > 0 && (
          <>
            <Separator />
            <div>
              <p className="text-sm font-medium text-gray-600 mb-3">Détails par Contrat</p>
              <div className="space-y-3">
                {payment.contrats.map((contrat) => (
                  <div key={contrat.numContrat} className="border rounded-lg p-3 space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-sm">{contrat.libProduit}</p>
                        <p className="text-xs text-gray-500">#{contrat.numContrat}</p>
                      </div>
                      {contrat.statutPaiement && (
                        <Badge variant={getPaymentStatusInfo(contrat.statutPaiement).variant}>
                          {getPaymentStatusInfo(contrat.statutPaiement).text}
                        </Badge>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-gray-600">Effet: </span>
                        <span>{formatDate(contrat.effetContrat.toISOString())}</span>
                      </div>
                      {contrat.dateExpiration && (
                        <div>
                          <span className="text-gray-600">Expiration: </span>
                          <span>{formatDate(contrat.dateExpiration.toISOString())}</span>
                        </div>
                      )}
                      {contrat.sommeQuittances !== undefined && (
                        <div>
                          <span className="text-gray-600">Quittances: </span>
                          <span className="font-medium">{formatCurrency(contrat.sommeQuittances)}</span>
                        </div>
                      )}
                      {contrat.prochainTerme && (
                        <div>
                          <span className="text-gray-600">Prochain Terme: </span>
                          <span>{formatDate(contrat.prochainTerme)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};
