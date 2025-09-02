'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import {
  CalculatorIcon,
  ClipboardListIcon,
  CreditCardIcon,
  FileTextIcon,
  HelpCircleIcon,
  ShieldCheckIcon
} from 'lucide-react';

export type ChatSuggestion = {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  prompt: string;
  category: 'product' | 'policy' | 'claim' | 'payment' | 'quote' | 'general';
};

export const insuranceSuggestions: ChatSuggestion[] = [
  {
    id: 'product-info',
    icon: <ShieldCheckIcon className="h-5 w-5" />,
    title: 'Informations Produits',
    description: 'Découvrez nos garanties et couvertures',
    prompt: 'Quelles sont les garanties incluses dans le contrat auto BH Assurance ?',
    category: 'product'
  },
  {
    id: 'policy-details',
    icon: <ClipboardListIcon className="h-5 w-5" />,
    title: 'Ma Police d\'Assurance',
    description: 'Consultez les détails de votre contrat',
    prompt: 'Pouvez-vous me donner les détails de ma police d\'assurance et mes garanties souscrites ?',
    category: 'policy'
  },
  {
    id: 'claim-status',
    icon: <FileTextIcon className="h-5 w-5" />,
    title: 'Statut de Sinistre',
    description: 'Suivez l\'état de votre déclaration',
    prompt: 'Quel est le statut de ma demande de sinistre et quelles sont les prochaines étapes ?',
    category: 'claim'
  },
  {
    id: 'payment-status',
    icon: <CreditCardIcon className="h-5 w-5" />,
    title: 'Statut de Paiement',
    description: 'Vérifiez vos paiements et échéances',
    prompt: 'Quel est le statut de mes paiements et ma prochaine échéance ?',
    category: 'payment'
  },
  {
    id: 'coverage-check',
    icon: <HelpCircleIcon className="h-5 w-5" />,
    title: 'Vérification Couverture',
    description: 'Vérifiez si un sinistre est couvert',
    prompt: 'Mon sinistre est-il couvert par ma police d\'assurance actuelle ?',
    category: 'claim'
  },
  {
    id: 'quote-request',
    icon: <CalculatorIcon className="h-5 w-5" />,
    title: 'Demande de Devis',
    description: 'Obtenez un devis personnalisé',
    prompt: 'Je souhaite obtenir un devis d\'assurance automobile. Pouvez-vous m\'aider ?',
    category: 'quote'
  }
];

export type ChatSuggestionsProps = {
  onSuggestionClick: (prompt: string) => void;
  className?: string;
  maxSuggestions?: number;
  categories?: ChatSuggestion['category'][];
};

export const ChatSuggestions = ({
  onSuggestionClick,
  className,
  maxSuggestions = 6,
  categories,
}: ChatSuggestionsProps) => {
  const filteredSuggestions = categories
    ? insuranceSuggestions.filter(s => categories.includes(s.category))
    : insuranceSuggestions;

  const displaySuggestions = filteredSuggestions.slice(0, maxSuggestions);

  return (
    <div className={cn('w-full max-w-4xl mx-auto p-4', className)}>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Comment puis-je vous aider aujourd'hui ?
        </h3>
        <p className="text-sm text-muted-foreground">
          Choisissez une suggestion ou posez votre question directement
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {displaySuggestions.map((suggestion) => (
          <Card
            key={suggestion.id}
            className="cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-[1.02] border-border hover:border-border"
          >
            <CardContent className="p-4">
              <Button
                variant="ghost"
                className="w-full h-auto p-0 justify-start text-left hover:bg-transparent"
                onClick={() => onSuggestionClick(suggestion.prompt)}
              >
                <div className="flex items-start gap-3 w-full">
                  <div className="flex-shrink-0 p-2 bg-secondary/10 rounded-lg text-secondary">
                    {suggestion.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-foreground text-sm mb-1">
                      {suggestion.title}
                    </h4>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {suggestion.description}
                    </p>
                  </div>
                </div>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export type WelcomeMessageProps = {
  onSuggestionClick: (prompt: string) => void;
  className?: string;
};

export const WelcomeMessage = ({ onSuggestionClick, className }: WelcomeMessageProps) => (
  <div className={cn('text-center py-8', className)}>
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-secondary mb-2">
        Bienvenue chez BH Assurance
      </h1>
      <p className="text-muted-foreground max-w-2xl mx-auto">
        Je suis votre assistant virtuel spécialisé en assurance.
        Je peux vous aider avec vos polices, sinistres, paiements et devis.
      </p>
    </div>

    <ChatSuggestions
      onSuggestionClick={onSuggestionClick}
      maxSuggestions={6}
    />
  </div>
);
