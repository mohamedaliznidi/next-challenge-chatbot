# Deployment Guide

This guide covers various deployment options for the Insurance Chat application, from development to production environments.

## 🚀 Quick Deployment (Vercel)

### Prerequisites

- GitHub account
- Vercel account
- OpenAI API key
- DeepSeek API key (optional)
- PostgreSQL database (for production)

### Step-by-Step Deployment

1. **Fork the Repository**
   ```bash
   # Fork on GitHub, then clone
   git clone https://github.com/your-username/next-challenge-chatbot.git
   cd insurance-chat
   ```

2. **Connect to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Select the project

3. **Configure Environment Variables**
   In Vercel dashboard, add these environment variables:
   ```
   OPENAI_API_KEY=your_openai_api_key
   DEEPSEEK_API_KEY=your_deepseek_api_key
   DATABASE_URL=your_postgresql_connection_string
   NEXTAUTH_SECRET=your_random_secret_string
   NEXTAUTH_URL=https://your-app.vercel.app
   ```

4. **Deploy**
   - Vercel will automatically build and deploy
   - Your app will be available at `https://your-app.vercel.app`

## 🐳 Docker Deployment

### Dockerfile

Create a `Dockerfile` in the project root:

```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build the application
RUN yarn build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

### Docker Compose

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://postgres:password@db:5432/insurance_chat
      - OPENAI_API_KEY=${OPENAI_API_KEY}
      - DEEPSEEK_API_KEY=${DEEPSEEK_API_KEY}
    depends_on:
      - db

  db:
    image: postgres:15
    environment:
      - POSTGRES_DB=insurance_chat
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

volumes:
  postgres_data:
```

### Build and Run

```bash
# Build and start services
docker-compose up --build

# Run in background
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## ☁️ Cloud Platform Deployments

### AWS Deployment

#### Using AWS Amplify

1. **Connect Repository**
   - Go to AWS Amplify Console
   - Connect your GitHub repository

2. **Configure Build Settings**
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - corepack enable pnpm
           - pnpm install
           - npx prisma generate
       build:
         commands:
           - pnpm build
     artifacts:
       baseDirectory: .next
       files:
         - '**/*'
     cache:
       paths:
         - node_modules/**/*
   ```

3. **Environment Variables**
   Add the same environment variables as Vercel

#### Using AWS ECS

1. **Create ECR Repository**
   ```bash
   aws ecr create-repository --repository-name insurance-chat
   ```

2. **Build and Push Docker Image**
   ```bash
   # Build image
   docker build -t insurance-chat .

   # Tag for ECR
   docker tag insurance-chat:latest 123456789.dkr.ecr.region.amazonaws.com/insurance-chat:latest

   # Push to ECR
   docker push 123456789.dkr.ecr.region.amazonaws.com/insurance-chat:latest
   ```

3. **Create ECS Service**
   - Use the AWS Console or CLI to create an ECS service
   - Configure load balancer and auto-scaling

### Google Cloud Platform

#### Using Cloud Run

1. **Build and Deploy**
   ```bash
   # Enable required APIs
   gcloud services enable run.googleapis.com
   gcloud services enable cloudbuild.googleapis.com

   # Deploy to Cloud Run
   gcloud run deploy insurance-chat \
     --source . \
     --platform managed \
     --region us-central1 \
     --allow-unauthenticated
   ```

2. **Set Environment Variables**
   ```bash
   gcloud run services update insurance-chat \
     --set-env-vars OPENAI_API_KEY=your_key,DATABASE_URL=your_db_url
   ```

### Azure Deployment

#### Using Azure Container Apps

1. **Create Resource Group**
   ```bash
   az group create --name insurance-chat-rg --location eastus
   ```

2. **Create Container App**
   ```bash
   az containerapp create \
     --name insurance-chat \
     --resource-group insurance-chat-rg \
     --environment insurance-chat-env \
     --image your-registry/insurance-chat:latest \
     --target-port 3000 \
     --ingress external
   ```

## 🗄️ Database Setup

### PostgreSQL on Vercel

1. **Create Database**
   - Go to Vercel dashboard
   - Navigate to Storage tab
   - Create new Postgres database

2. **Get Connection String**
   - Copy the connection string
   - Add to environment variables

### External Database Providers

#### Supabase

1. **Create Project**
   - Sign up at [supabase.com](https://supabase.com)
   - Create new project

2. **Get Connection Details**
   ```
   DATABASE_URL=postgresql://postgres:[password]@[host]:5432/postgres
   ```

#### PlanetScale

1. **Create Database**
   - Sign up at [planetscale.com](https://planetscale.com)
   - Create new database

2. **Configure Connection**
   ```
   DATABASE_URL=mysql://[username]:[password]@[host]/[database]?sslaccept=strict
   ```

## 🔧 Environment Configuration

### Production Environment Variables

```bash
# Required
OPENAI_API_KEY=sk-...
DATABASE_URL=postgresql://...

# Optional
DEEPSEEK_API_KEY=...
NEXTAUTH_SECRET=...
NEXTAUTH_URL=https://your-domain.com

# Analytics (Optional)
VERCEL_ANALYTICS_ID=...
NEXT_PUBLIC_GA_MEASUREMENT_ID=...

# Error Tracking (Optional)
SENTRY_DSN=...
NEXT_PUBLIC_SENTRY_DSN=...
```

### Security Considerations

1. **API Keys**
   - Never commit API keys to version control
   - Use environment variables or secret management
   - Rotate keys regularly

2. **Database Security**
   - Use SSL connections
   - Implement proper access controls
   - Regular backups

3. **Application Security**
   - Enable security headers
   - Implement rate limiting
   - Use HTTPS only

## 📊 Monitoring and Logging

### Vercel Analytics

```javascript
// Add to app/layout.tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### Error Tracking with Sentry

1. **Install Sentry**
   ```bash
   pnpm add @sentry/nextjs
   ```

2. **Configure Sentry**
   ```javascript
   // sentry.client.config.ts
   import * as Sentry from "@sentry/nextjs";

   Sentry.init({
     dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
     tracesSampleRate: 1.0,
   });
   ```

## 🚀 CI/CD Pipeline

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 8

      - name: Install dependencies
        run: pnpm install

      - name: Run tests
        run: pnpm test

      - name: Build application
        run: pnpm build

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## 🔍 Health Checks

### Application Health

Create `app/api/health/route.ts`:

```typescript
export async function GET() {
  return Response.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version,
  });
}
```

### Database Health

```typescript
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return Response.json({ database: 'healthy' });
  } catch (error) {
    return Response.json({ database: 'unhealthy' }, { status: 500 });
  }
}
```

## 📈 Performance Optimization

### Build Optimization

```javascript
// next.config.ts
const nextConfig = {
  output: 'standalone',
  compress: true,
  poweredByHeader: false,

  webpack: (config) => {
    config.optimization.splitChunks = {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    };
    return config;
  },
};
```

### Database Optimization

```typescript
// Connection pooling
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});
```

## 🆘 Troubleshooting

### Common Issues

1. **Build Failures**
   - Check Node.js version compatibility
   - Verify environment variables
   - Clear cache: `pnpm clean`

2. **Database Connection**
   - Verify connection string format
   - Check network connectivity
   - Ensure database is running

3. **API Errors**
   - Validate API keys
   - Check rate limits
   - Review error logs

### Debug Mode

```bash
# Enable debug logging
DEBUG=true pnpm dev

# Verbose logging
VERBOSE_LOGGING=true pnpm dev
```
