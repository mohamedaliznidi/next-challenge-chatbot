import {
  checkClaimCoverage,
  generateQuote,
  getClaimStatus,
  getClientPolicyInfo,
  getInsuranceProductInfo,
  getPaymentStatus,
} from '@/lib/tools';
import { convertToModelMessages, stepCountIs, streamText, UIMessage } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const {
    messages,
    model,
    webSearch,
  }: { messages: UIMessage[]; model: string; webSearch: boolean } =
    await req.json();

  const result = streamText({
    model: webSearch ? 'perplexity/sonar' : model,
    messages: convertToModelMessages(messages),
    system: `
    IMPORTANT:
    - Ne jamais répondre avec des tableaux markdown, toujours répondre avec du texte/paragraphes/listes
    - Toujours répondre en français et uniquement en français, sauf si l'utilisateur a demandé en arabe alors répondre en arabe
    - Penser et raisonner en français dans tous vos processus internes
    - Tous vos raisonnements et explications doivent être en français

    Vous êtes un assistant agent d'assurance BH Assurance serviable. Votre objectif est d'aider les clients avec leurs besoins d'assurance en :

1. Fournissant des informations détaillées sur les produits BH Assurance, les garanties et les options de couverture
2. Analysant les polices des clients, les sinistres et le statut des paiements
3. Générant des devis d'assurance personnalisés
4. Expliquant les détails de couverture et aidant avec les questions liées aux sinistres

Vous avez accès à des outils spécialisés pour récupérer des informations en temps réel sur :
- Les produits d'assurance et leurs garanties
- Les détails de police des clients et la couverture
- Le statut des sinistres et la vérification de couverture
- L'historique et le statut des paiements
- La génération de devis via notre API

Soyez toujours professionnel, précis et serviable. Lors de l'utilisation d'outils, expliquez quelles informations vous récupérez et comment cela aide à répondre à la question du client. Pensez et raisonnez en français. tous sommes et montants doivent être en dinars tunisiens`,
    maxRetries: 0,
    stopWhen: stepCountIs(5),
    tools: {
      getInsuranceProductInfo,
      getClientPolicyInfo,
      checkClaimCoverage,
      getPaymentStatus,
      getClaimStatus,
      generateQuote,
    },
  });

  // send sources and reasoning back to the client

  return result.toUIMessageStreamResponse({
    sendSources: true,
    sendReasoning: true,
    onError: (error: unknown) => {
      console.error('Tool execution error:', error);

      // Return user-friendly error messages for different error types
      const errorMessage = error instanceof Error ? error.message : String(error);

      if (errorMessage.includes('database')) {
        return 'Je rencontre actuellement des difficultés pour accéder aux données. Veuillez réessayer dans quelques instants.';
      }

      if (errorMessage.includes('API')) {
        return 'Le service de devis est temporairement indisponible. Veuillez réessayer plus tard.';
      }

      if (errorMessage.includes('authentication')) {
        return 'Problème d\'authentification. Veuillez vérifier vos informations de connexion.';
      }

      // Generic error message
      return 'Une erreur s\'est produite lors du traitement de votre demande. Veuillez réessayer.';
    },
  });
}
