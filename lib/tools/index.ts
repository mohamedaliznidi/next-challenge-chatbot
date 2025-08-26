/**
 * Insurance Tools Index
 * 
 * This file exports all insurance-related tools for the BH Assurance chatbot.
 * These tools implement the core requirements from the PRD:
 * 
 * 1. Product Information (getInsuranceProductInfo)
 * 2. Client Data Analysis (getClientPolicyInfo, checkClaimCoverage, getPaymentStatus, getClaimStatus)
 * 3. Quote Generation (generateQuote)
 */

export {
  getInsuranceProductInfo,
  getClientPolicyInfo,
  checkClaimCoverage,
  getPaymentStatus,
  getClaimStatus,
  generateQuote,
} from './insurance-tools';

export * from './tool-schemas';

// Tool registry for easy access
export const insuranceTools = {
  getInsuranceProductInfo: 'getInsuranceProductInfo',
  getClientPolicyInfo: 'getClientPolicyInfo', 
  checkClaimCoverage: 'checkClaimCoverage',
  getPaymentStatus: 'getPaymentStatus',
  getClaimStatus: 'getClaimStatus',
  generateQuote: 'generateQuote',
} as const;

// Tool categories for UI organization
export const toolCategories = {
  productInfo: {
    name: 'Product Information',
    tools: ['getInsuranceProductInfo'],
    description: 'Information about BH Assurance products and guarantees'
  },
  clientServices: {
    name: 'Client Services',
    tools: ['getClientPolicyInfo', 'getPaymentStatus'],
    description: 'Client policy and payment information'
  },
  claims: {
    name: 'Claims Management',
    tools: ['checkClaimCoverage', 'getClaimStatus'],
    description: 'Claim coverage and status information'
  },
  quotes: {
    name: 'Quote Generation',
    tools: ['generateQuote'],
    description: 'Generate new insurance quotes'
  }
} as const;
