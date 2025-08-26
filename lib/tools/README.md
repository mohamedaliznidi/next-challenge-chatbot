# Insurance Tools Implementation

This directory contains the server-side tools implementation for the BH Assurance chatbot, designed to fulfill the requirements specified in the PRD (`cahier_charges_genai.md`).

## Overview

The tools are organized into three main categories that directly address the PRD's core functional requirements:

1. **Product Information** - Understanding BH Assurance products
2. **Client Data Analysis** - Analyzing client database information  
3. **Quote Generation** - Generating quotes via API integration

## File Structure

```
lib/tools/
├── README.md                 # This documentation
├── index.ts                  # Tool exports and registry
├── tool-schemas.ts           # Zod schemas and TypeScript types
└── insurance-tools.ts        # Tool implementations with execute functions
```

## Available Tools

### High Priority Tools (Core PRD Requirements)

#### 1. `getInsuranceProductInfo`
- **Purpose**: Retrieve BH Assurance product information, guarantees, and conditions
- **PRD Requirement**: Core requirement #1 - Product understanding
- **Status**: ✅ Placeholder implementation ready
- **Next Steps**: Connect to product catalog database

#### 2. `getClientPolicyInfo`
- **Purpose**: Retrieve client policy details and subscribed guarantees
- **PRD Requirement**: Core requirement #2 - Client data analysis
- **Status**: ✅ Placeholder implementation ready
- **Next Steps**: Connect to client database with proper authentication

#### 3. `checkClaimCoverage`
- **Purpose**: Determine if a claim is covered under client's policy
- **PRD Requirement**: Core requirement #2 - Coverage determination
- **Status**: ✅ Placeholder implementation ready
- **Next Steps**: Implement coverage rules engine

#### 4. `getPaymentStatus`
- **Purpose**: Check client payment status and history
- **PRD Requirement**: Core requirement #2 - Payment status queries
- **Status**: ✅ Placeholder implementation ready
- **Next Steps**: Integrate with payment processing system

#### 5. `getClaimStatus`
- **Purpose**: Retrieve claim status and processing details
- **PRD Requirement**: Core requirement #2 - Claim status queries
- **Status**: ✅ Placeholder implementation ready
- **Next Steps**: Connect to claims management system

#### 6. `generateQuote`
- **Purpose**: Generate insurance quotes using API Devis
- **PRD Requirement**: Core requirement #3 - Quote generation via API
- **Status**: ✅ Placeholder implementation ready
- **Next Steps**: Integrate with BH Assurance API Devis

## Implementation Status

### ✅ Completed
- Tool schemas and TypeScript interfaces
- Placeholder implementations with mock data
- Comprehensive documentation and next steps
- Error handling structure
- Input validation schemas

### 🔄 In Progress
- Frontend tool UI components
- Tool integration with chat interface

### ⏳ Pending
- Database connections
- External API integrations
- Authentication and authorization
- Real data implementation

## Usage Example

```typescript
import { getInsuranceProductInfo } from '@/lib/tools';

// In your API route
const result = await getInsuranceProductInfo.execute({
  productType: 'auto',
  query: 'Quelles sont les garanties incluses dans le contrat auto?'
});
```

## Integration with AI SDK

Each tool is designed to work with the AI SDK's `streamText` function:

```typescript
import { streamText } from 'ai';
import { getInsuranceProductInfo, getClientPolicyInfo } from '@/lib/tools';

const result = streamText({
  model: openai('gpt-4o'),
  messages: convertToModelMessages(messages),
  tools: {
    getInsuranceProductInfo,
    getClientPolicyInfo,
    // ... other tools
  },
});
```

## Data Sources Required

### Database Tables Needed
- `products` - BH Assurance product catalog
- `clients` - Client information
- `policies` - Policy contracts and details
- `claims` - Claims and processing status
- `payments` - Payment history and status
- `guarantees` - Guarantee definitions and coverage

### External APIs Required
- **BH Assurance API Devis** - For quote generation
- **Payment Processing API** - For payment status
- **Claims Management API** - For claim processing

### Document Sources
- Product documentation files (fiches produits)
- General conditions documents
- Coverage and exclusion rules

## Security Considerations

- Client data access requires proper authentication
- Sensitive information should be masked in logs
- API keys must be stored securely in environment variables
- Database queries should use parameterized statements
- GDPR compliance for client data handling

## Testing Strategy

1. **Unit Tests** - Test each tool's execute function
2. **Integration Tests** - Test with actual database/API connections
3. **Mock Data Tests** - Validate with current placeholder implementations
4. **Error Handling Tests** - Test failure scenarios

## Next Implementation Steps

1. **Week 1**: Set up database connections and basic data retrieval
2. **Week 2**: Implement API Devis integration for quote generation
3. **Week 3**: Add authentication and security measures
4. **Week 4**: Testing, optimization, and documentation updates

## Environment Variables Required

```env
# Database
DATABASE_URL=postgresql://...

# BH Assurance API
BH_API_KEY=your_api_key
BH_API_BASE_URL=https://api.bh-assurance.com

# Authentication
JWT_SECRET=your_jwt_secret
```

## Contributing

When adding new tools:
1. Add schema to `tool-schemas.ts`
2. Implement tool in `insurance-tools.ts`
3. Export from `index.ts`
4. Update this README
5. Add comprehensive documentation comments
