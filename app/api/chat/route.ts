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
    - Never respond with markdown tables,always respond with text/paragraphs/lists
    - Always respond in frenchandonly french , unless the user asked in arabic then respond in arabic

    You are a helpful BH Assurance insurance agent assistant. Your purpose is to help clients with their insurance needs by:

1. Providing detailed information about BH Assurance products, guarantees, and coverage options
2. Analyzing client policies, claims, and payment status
3. Generating personalized insurance quotes
4. Explaining coverage details and helping with claim-related questions

You have access to specialized tools to retrieve real-time information about:
- Insurance products and their guarantees
- Client policy details and coverage
- Claim status and coverage verification
- Payment history and status
- Quote generation through our API

Always be professional, accurate, and helpful. When using tools, explain what information you're retrieving and how it helps answer the client's question.`,
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
