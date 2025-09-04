# Architecture Overview

This document provides a comprehensive overview of the Insurance Chat application architecture, including system design, component relationships, and data flow.

## 🏗️ System Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   External      │
│   (Next.js)     │    │   (API Routes)  │    │   Services      │
├─────────────────┤    ├─────────────────┤    ├─────────────────┤
│ • React 19      │◄──►│ • AI SDK        │◄──►│ • OpenAI        │
│ • TypeScript    │    │ • Prisma ORM    │    │ • DeepSeek      │
│ • Tailwind CSS  │    │ • Insurance     │    │ • BH Assurance  │
│ • Radix UI      │    │   Tools         │    │   API           │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 📱 Frontend Architecture

### Component Structure

```
components/
├── ai-elements/           # AI-specific components
│   ├── chat-interface/    # Main chat UI
│   ├── message-display/   # Message rendering
│   └── tool-responses/    # Tool result displays
├── ui/                    # Reusable UI components
│   ├── button/           # Button variants
│   ├── input/            # Form inputs
│   ├── card/             # Card layouts
│   └── ...               # Other UI primitives
└── layout/               # Layout components
    ├── header/           # Application header
    ├── sidebar/          # Navigation sidebar
    └── footer/           # Application footer
```

### State Management

- **Local State**: React hooks (useState, useReducer)
- **Server State**: AI SDK's useChat hook
- **Global State**: React Context (when needed)
- **Form State**: React Hook Form (for complex forms)

### Styling Architecture

- **Base**: Tailwind CSS 4 with custom configuration
- **Components**: CSS-in-JS with Tailwind classes
- **Themes**: CSS variables for dark/light mode
- **Responsive**: Mobile-first approach

## 🔧 Backend Architecture

### API Structure

```
app/api/
├── chat/                 # Main chat endpoint
│   └── route.ts         # POST /api/chat
├── health/              # Health check endpoint
│   └── route.ts         # GET /api/health
└── tools/               # Tool-specific endpoints (future)
    ├── quotes/          # Quote generation
    ├── claims/          # Claim processing
    └── policies/        # Policy information
```

### AI Integration

```
┌─────────────────┐
│   Chat Request  │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│   AI SDK        │
│   streamText()  │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐    ┌─────────────────┐
│   Tool Router   │◄──►│   Insurance     │
│                 │    │   Tools         │
└─────────┬───────┘    └─────────────────┘
          │
          ▼
┌─────────────────┐
│   LLM Provider  │
│   (OpenAI/      │
│    DeepSeek)    │
└─────────────────┘
```

### Tool Architecture

```
lib/tools/
├── index.ts              # Tool exports and registry
├── tool-schemas.ts       # Zod schemas and types
├── insurance-tools.ts    # Tool implementations
└── README.md            # Tool documentation
```

Each tool follows this pattern:
```typescript
export const toolName = {
  description: 'Tool description',
  inputSchema: zodSchema,
  execute: async (input: InputType): Promise<OutputType> => {
    // Tool implementation
  }
};
```

## 🗄️ Data Architecture

### Database Schema (Prisma)

```
┌─────────────────┐    ┌─────────────────┐
│   PersonnePhys  │    │   PersonneMor   │
│   ique          │    │   ale           │
├─────────────────┤    ├─────────────────┤
│ • refPersonne   │    │ • refPersonne   │
│ • nomPrenom     │    │ • raisonSociale │
│ • dateNaissance │    │ • matriculeFisc │
│ • ...           │    │ • ...           │
└─────────┬───────┘    └─────────┬───────┘
          │                      │
          └──────────┬───────────┘
                     │
                     ▼
          ┌─────────────────┐
          │    Contrat      │
          ├─────────────────┤
          │ • numContrat    │
          │ • refPersonne   │
          │ • codeProduit   │
          │ • effetContrat  │
          │ • ...           │
          └─────────┬───────┘
                    │
                    ▼
          ┌─────────────────┐
          │    Sinistre     │
          ├─────────────────┤
          │ • numSinistre   │
          │ • numContrat    │
          │ • natureSinistre│
          │ • ...           │
          └─────────────────┘
```

### Data Flow

1. **User Input** → Frontend chat interface
2. **Message Processing** → AI SDK streamText
3. **Tool Invocation** → Insurance tools with database queries
4. **External API Calls** → BH Assurance API for quotes
5. **Response Streaming** → Real-time UI updates

## 🔐 Security Architecture

### Authentication & Authorization

- **Current**: No authentication (public demo)
- **Future**: NextAuth.js with multiple providers
- **API Security**: Rate limiting and input validation

### Data Protection

- **Environment Variables**: Secure API key storage
- **Input Validation**: Zod schemas for all inputs
- **SQL Injection**: Prisma ORM protection
- **XSS Protection**: React's built-in sanitization

### Security Headers

```typescript
// next.config.ts
headers: [
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  // ... more security headers
]
```

## 🚀 Performance Architecture

### Frontend Optimization

- **Code Splitting**: Next.js automatic splitting
- **Image Optimization**: Next.js Image component
- **Bundle Analysis**: Webpack bundle analyzer
- **Caching**: Browser and CDN caching

### Backend Optimization

- **Database**: Connection pooling with Prisma
- **API Responses**: Streaming for real-time updates
- **Caching**: Redis for frequently accessed data (future)
- **Rate Limiting**: Prevent abuse and ensure fair usage

### Monitoring

- **Error Tracking**: Sentry integration (optional)
- **Performance**: Vercel Analytics
- **Logging**: Structured logging with Winston (future)
- **Metrics**: Custom metrics for tool usage

## 🔄 Deployment Architecture

### Development

```
Local Development
├── Next.js Dev Server (port 3000)
├── PostgreSQL Database (local)
├── Environment Variables (.env.local)
└── Hot Reloading & Fast Refresh
```

### Production (Vercel)

```
Vercel Platform
├── Edge Functions (API routes)
├── Static Site Generation (pages)
├── CDN Distribution (global)
├── Environment Variables (secure)
└── Automatic Deployments (Git-based)
```

### Database Deployment

- **Development**: Local PostgreSQL
- **Production**: Vercel Postgres or external provider
- **Migrations**: Prisma migrate
- **Seeding**: Prisma seed scripts

## 📈 Scalability Considerations

### Horizontal Scaling

- **Stateless Design**: No server-side sessions
- **Database Scaling**: Read replicas for queries
- **CDN Usage**: Static asset distribution
- **Microservices**: Tool separation (future)

### Vertical Scaling

- **Memory Optimization**: Efficient data structures
- **CPU Optimization**: Async/await patterns
- **Database Optimization**: Query optimization
- **Caching Strategy**: Multi-level caching

## 🔮 Future Architecture

### Planned Enhancements

1. **Microservices**: Separate tool services
2. **Event Sourcing**: Audit trail for all actions
3. **CQRS**: Command Query Responsibility Segregation
4. **Message Queues**: Async processing with Redis
5. **GraphQL**: Flexible data fetching
6. **WebSockets**: Real-time notifications

### Technology Roadmap

- **Authentication**: NextAuth.js implementation
- **Testing**: Comprehensive test suite
- **Monitoring**: Advanced observability
- **CI/CD**: GitHub Actions workflows
- **Documentation**: OpenAPI specifications
