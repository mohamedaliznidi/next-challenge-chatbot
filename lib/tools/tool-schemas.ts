import { z } from 'zod';

// Note: Install zod if not already installed: yarn add zod

// Input schemas for insurance tools
export const getInsuranceProductInfoSchema = z.object({
  productType: z.enum(['auto', 'home', 'life', 'health', 'business']).optional(),
  branch: z.string().optional(),
  subBranch: z.string().optional(),
  planType: z.enum(['standard', 'premium', 'basic']).optional(),
  query: z.string().describe('Specific question about the insurance product'),
});

export const getClientPolicyInfoSchema = z.object({
  clientId: z.string().describe('Unique client identifier'),
  policyNumber: z.string().optional().describe('Specific policy number to lookup'),
  policyType: z.enum(['auto', 'home', 'life', 'health', 'business']).optional(),
});

export const checkClaimCoverageSchema = z.object({
  clientId: z.string().describe('Unique client identifier'),
  policyNumber: z.string().describe('Policy number for coverage check'),
  incidentType: z.string().describe('Type of incident or claim'),
  incidentDetails: z.string().describe('Detailed description of the incident'),
  claimAmount: z.number().optional().describe('Estimated claim amount'),
});

export const getPaymentStatusSchema = z.object({
  clientId: z.string().describe('Unique client identifier'),
  policyNumber: z.string().optional().describe('Specific policy number'),
  period: z.enum(['current', 'last_3_months', 'last_year']).optional().default('current'),
});

export const getClaimStatusSchema = z.object({
  clientId: z.string().describe('Unique client identifier'),
  claimNumber: z.string().optional().describe('Specific claim number'),
  status: z.enum(['submitted', 'processing', 'approved', 'denied', 'paid']).optional(),
});

export const generateQuoteSchema = z.object({
  clientInfo: z.object({
    age: z.number().min(18).max(100),
    location: z.string().describe('Client location (city, state)'),
    riskProfile: z.object({
      drivingRecord: z.string().optional(),
      creditScore: z.number().optional(),
      previousClaims: z.number().optional(),
    }).optional(),
  }),
  productType: z.enum(['auto', 'home', 'life', 'health', 'business']),
  coverageOptions: z.object({
    coverageAmount: z.number().positive(),
    deductible: z.number().positive().optional(),
    additionalCoverage: z.array(z.string()).optional(),
  }),
  additionalInfo: z.record(z.any()).optional(),
});

// Output type definitions
export type InsuranceProductInfo = {
  productType: string;
  branch: string;
  subBranch?: string;
  planType: string;
  guarantees: string[];
  coverage: {
    description: string;
    limits: Record<string, number>;
    exclusions: string[];
  };
  conditions: {
    eligibility: string[];
    requirements: string[];
    terms: string;
  };
  pricing: {
    basePremium: number;
    factors: Record<string, number>;
  };
};

export type ClientPolicyInfo = {
  clientId: string;
  policies: Array<{
    policyNumber: string;
    type: string;
    status: 'active' | 'expired' | 'cancelled' | 'pending';
    holder: string;
    premium: number;
    coverage: number;
    deductible?: number;
    startDate: string;
    endDate: string;
    guarantees: string[];
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
};

export type PaymentStatusResult = {
  clientId: string;
  policyNumber?: string;
  status: 'current' | 'overdue' | 'pending';
  lastPayment: {
    date: string;
    amount: number;
    method: string;
  };
  nextDue: {
    date: string;
    amount: number;
  };
  outstandingBalance: number;
  paymentHistory: Array<{
    date: string;
    amount: number;
    status: string;
  }>;
};

export type ClaimStatusResult = {
  claimNumber: string;
  clientId: string;
  policyNumber: string;
  type: string;
  status: 'submitted' | 'processing' | 'approved' | 'denied' | 'paid';
  description: string;
  amount: number;
  submittedDate: string;
  processedDate?: string | undefined;
  estimatedResolution?: string;
  requiredDocuments?: string[];
  nextSteps?: string[];
};

export type QuoteResult = {
  quoteId: string;
  productType: string;
  premium: {
    monthly: number;
    annual: number;
    semiAnnual: number;
  };
  coverage: {
    limits: Record<string, number>;
    deductible: number;
    additionalCoverage: string[];
  };
  discounts: Array<{
    name: string;
    amount: number;
    percentage: number;
  }>;
  validUntil: string;
  terms: string;
  nextSteps: string[];
};
