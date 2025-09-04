/**
 * Custom Hooks Index
 * 
 * This file exports all custom React hooks used throughout the application.
 * Hooks are organized by functionality and provide reusable stateful logic.
 */

// Chat and AI related hooks
export { useChat } from '@ai-sdk/react';

// Future custom hooks will be exported here
// export { useLocalStorage } from './use-local-storage';
// export { useDebounce } from './use-debounce';
// export { useMediaQuery } from './use-media-query';
// export { useInsuranceQuote } from './use-insurance-quote';
// export { useClaimStatus } from './use-claim-status';

/**
 * Hook Categories:
 * 
 * 1. Storage Hooks
 *    - useLocalStorage: Persist data in localStorage
 *    - useSessionStorage: Persist data in sessionStorage
 * 
 * 2. UI Hooks
 *    - useMediaQuery: Responsive design utilities
 *    - useDebounce: Debounce user input
 *    - useToggle: Toggle boolean states
 * 
 * 3. Insurance Hooks
 *    - useInsuranceQuote: Quote generation logic
 *    - useClaimStatus: Claim tracking utilities
 *    - usePolicyInfo: Policy information management
 * 
 * 4. API Hooks
 *    - useApi: Generic API request hook
 *    - useAsyncOperation: Async operation state management
 */
