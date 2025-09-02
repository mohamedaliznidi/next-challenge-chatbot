// Global type definitions for the insurance chat application
import React from 'react';
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  metadata?: {
    model?: string;
    webSearch?: boolean;
    sources?: string[];
    reasoning?: string;
  };
}

export interface InsurancePolicy {
  id: string;
  policyNumber: string;
  type: 'auto' | 'home' | 'life' | 'health' | 'business';
  holder: string;
  premium: number;
  coverage: number;
  deductible?: number;
  startDate: Date;
  endDate: Date;
  status: 'active' | 'expired' | 'cancelled' | 'pending';
}

export interface InsuranceClaim {
  id: string;
  policyId: string;
  claimNumber: string;
  type: string;
  description: string;
  amount: number;
  status: 'submitted' | 'processing' | 'approved' | 'denied' | 'paid';
  submittedDate: Date;
  processedDate?: Date;
  documents?: string[];
}

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  policies: InsurancePolicy[];
  claims: InsuranceClaim[];
  preferences?: {
    notifications: boolean;
    language: string;
    theme: 'light' | 'dark' | 'system';
  };
}

export interface ChatSession {
  id: string;
  userId?: string;
  messages: ChatMessage[];
  context?: {
    currentPolicy?: string;
    currentClaim?: string;
    intent?: 'quote' | 'claim' | 'policy_info' | 'general';
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  metadata?: {
    timestamp: Date;
    requestId: string;
    version: string;
  };
}

export interface ComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface FormFieldProps extends ComponentProps {
  label?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
}

// Utility types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// Environment variables
export interface EnvironmentVariables {
  NODE_ENV: 'development' | 'production' | 'test';
  NEXT_PUBLIC_APP_URL: string;
  DATABASE_URL?: string;
  API_KEY?: string;
  OPENAI_API_KEY?: string;
  DEEPSEEK_API_KEY?: string;
}

// AI/ML related types
export interface ModelConfig {
  name: string;
  value: string;
  provider: 'openai' | 'deepseek' | 'anthropic' | 'google';
  maxTokens?: number;
  temperature?: number;
  topP?: number;
}

export interface ChatCompletionRequest {
  messages: ChatMessage[];
  model: string;
  temperature?: number;
  maxTokens?: number;
  stream?: boolean;
  webSearch?: boolean;
}

export interface ChatCompletionResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Array<{
    index: number;
    message: ChatMessage;
    finishReason: string;
  }>;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

// Component-specific types
export interface ConversationProps extends ComponentProps {
  messages: ChatMessage[];
  isLoading?: boolean;
  onMessageSend?: (message: string) => void;
}

export interface MessageProps extends ComponentProps {
  message: ChatMessage;
  isStreaming?: boolean;
  showSources?: boolean;
  showReasoning?: boolean;
}

export interface PromptInputProps extends ComponentProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  maxLength?: number;
}

// Error types
export class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 500,
    public details?: any
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export class ValidationError extends AppError {
  constructor(message: string, details?: any) {
    super(message, 'VALIDATION_ERROR', 400, details);
    this.name = 'ValidationError';
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string) {
    super(`${resource} not found`, 'NOT_FOUND', 404);
    this.name = 'NotFoundError';
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = 'Unauthorized') {
    super(message, 'UNAUTHORIZED', 401);
    this.name = 'UnauthorizedError';
  }
}

// Event types
export interface AppEvent<T = any> {
  type: string;
  payload: T;
  timestamp: Date;
  source?: string;
}

export type EventHandler<T = any> = (event: AppEvent<T>) => void | Promise<void>;

// Configuration types
export interface AppConfig {
  app: {
    name: string;
    version: string;
    description: string;
    url: string;
  };
  features: {
    webSearch: boolean;
    fileUpload: boolean;
    voiceInput: boolean;
    darkMode: boolean;
  };
  limits: {
    maxMessageLength: number;
    maxMessagesPerSession: number;
    maxFileSize: number;
  };
  ai: {
    defaultModel: string;
    availableModels: ModelConfig[];
    maxTokens: number;
    temperature: number;
  };
}
