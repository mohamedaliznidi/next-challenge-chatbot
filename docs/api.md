# API Documentation

This document provides comprehensive information about the Insurance Chat API endpoints and their usage.

## Base URL

```
Development: http://localhost:3000
Production: https://mohamedaliznidi-next-challenge.vercel.app
```

## Authentication

Currently, the API does not require authentication for basic chat functionality. Future versions may include API key authentication.

## Endpoints

### Chat API

#### POST `/api/chat`

Main chat endpoint for AI-powered insurance assistance.

**Request Body:**
```json
{
  "messages": [
    {
      "id": "string",
      "role": "user" | "assistant",
      "content": "string",
      "createdAt": "ISO 8601 date string"
    }
  ]
}
```

**Response:**
- Content-Type: `text/plain; charset=utf-8`
- Streaming response with AI-generated content

**Example Request:**
```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {
        "id": "1",
        "role": "user",
        "content": "What insurance products does BH Assurance offer?",
        "createdAt": "2025-01-09T10:00:00Z"
      }
    ]
  }'
```

## AI Tools

The chat API has access to several specialized insurance tools:

### 1. getInsuranceProductInfo

Retrieves detailed information about BH Assurance products.

**Parameters:**
- `codeBranche` (optional): Branch code
- `codeSousBranche` (optional): Sub-branch code
- `codeProduit` (optional): Product code
- `query`: Specific question about insurance products

### 2. getClientPolicyInfo

Retrieves client policy information.

**Parameters:**
- `refPersonne` (optional): Person reference
- `numContrat` (optional): Contract number
- `raisonSociale` (optional): Company name
- `nomPrenom` (optional): Individual name

### 3. generateQuote

Generates insurance quotes using BH Assurance API.

**Parameters:**
- `clientInfo`: Client information object
- `productInfo`: Product details
- `additionalInfo`: Additional parameters

### 4. checkClaimCoverage

Checks if a claim is covered by the client's policy.

**Parameters:**
- `numContrat`: Contract number
- `natureSinistre`: Nature of the claim
- `montantSinistre`: Claim amount

### 5. getPaymentStatus

Retrieves payment status for client policies.

**Parameters:**
- `refPersonne` (optional): Person reference
- `numContrat` (optional): Contract number

### 6. getClaimStatus

Retrieves claim processing status.

**Parameters:**
- `numSinistre` (optional): Claim number
- `numContrat` (optional): Contract number

## Error Handling

The API returns appropriate HTTP status codes:

- `200`: Success
- `400`: Bad Request - Invalid input parameters
- `401`: Unauthorized - Authentication required
- `429`: Too Many Requests - Rate limit exceeded
- `500`: Internal Server Error - Server-side error

**Error Response Format:**
```json
{
  "error": "Error message",
  "code": "ERROR_CODE",
  "details": "Additional error details"
}
```

## Rate Limiting

- Default: 100 requests per 15 minutes per IP
- Configurable via environment variables
- Rate limit headers included in responses

## Response Headers

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 99
X-RateLimit-Reset: 1641234567
```

## Examples

### Basic Chat Interaction

```javascript
const response = await fetch('/api/chat', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    messages: [
      {
        id: '1',
        role: 'user',
        content: 'I need information about car insurance',
        createdAt: new Date().toISOString()
      }
    ]
  })
});

const reader = response.body.getReader();
const decoder = new TextDecoder();

while (true) {
  const { done, value } = await reader.read();
  if (done) break;
  
  const chunk = decoder.decode(value);
  console.log(chunk);
}
```

### Quote Generation

```javascript
const quoteRequest = {
  messages: [
    {
      id: '1',
      role: 'user',
      content: 'Generate a quote for car insurance for a 30-year-old driver',
      createdAt: new Date().toISOString()
    }
  ]
};

const response = await fetch('/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(quoteRequest)
});
```

## SDK Integration

The API is built using the AI SDK, which provides:

- Streaming responses
- Tool calling capabilities
- Type-safe interfaces
- Error handling
- Rate limiting

## Testing

Use the provided test endpoints for development:

```bash
# Health check
curl http://localhost:3000/api/health

# Test chat endpoint
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"id":"1","role":"user","content":"Hello","createdAt":"2025-01-09T10:00:00Z"}]}'
```

## Monitoring

The API includes built-in monitoring and logging:

- Request/response logging
- Error tracking
- Performance metrics
- Rate limit monitoring

For production deployments, consider integrating with:
- Sentry for error tracking
- Vercel Analytics for performance monitoring
- Custom logging solutions
