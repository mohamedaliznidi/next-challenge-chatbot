# Insurance Chat Application

A modern AI-powered insurance chat application built with Next.js 15, React 19, and TypeScript. This
application provides intelligent assistance for insurance-related queries, policy management, and
claims processing.

## 🚀 Features

### 🤖 AI-Powered Insurance Assistant

- **Intelligent Chat**: Advanced AI responses using OpenAI GPT-4o and Deepseek R1 models
- **Insurance Tools**: Specialized tools for quotes, claims, policy information, and coverage
  analysis
- **Real-time Streaming**: Live response streaming for immediate user feedback
- **Context Awareness**: Maintains conversation context for natural interactions

### 🏢 BH Assurance Integration

- **Product Information**: Comprehensive insurance product catalog and details
- **Quote Generation**: Real-time insurance quote generation via BH Assurance API
- **Policy Management**: Client policy information retrieval and analysis
- **Claims Processing**: Claim status tracking and coverage verification
- **Payment Status**: Payment history and outstanding balance checking

### 💻 Modern Technology Stack

- **Next.js 15**: Latest App Router with React 19 features
- **TypeScript**: Full type safety with strict checking
- **Prisma ORM**: Type-safe database operations with PostgreSQL
- **Tailwind CSS 4**: Modern utility-first styling
- **Radix UI**: Accessible, unstyled UI primitives

### 🎨 User Experience

- **Responsive Design**: Mobile-first approach with seamless desktop experience
- **Dark/Light Mode**: Automatic theme switching based on user preference
- **Accessibility**: WCAG 2.1 compliant with screen reader support
- **Performance**: Optimized loading with code splitting and caching

### 🔧 Developer Experience

- **Code Quality**: ESLint, Prettier, and comprehensive linting rules
- **Testing**: Unit tests with Jest and React Testing Library
- **CI/CD**: Automated testing and deployment with GitHub Actions
- **Docker**: Containerized deployment with multi-stage builds
- **Monitoring**: Performance tracking and error monitoring

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Runtime**: React 19
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI
- **AI Integration**: AI SDK with OpenAI and Deepseek
- **Code Quality**: ESLint 9, Prettier
- **Package Manager**: Yarn
- **Database**: Prisma ORM with PostgreSQL

## 📋 Prerequisites

- Node.js 18.17 or later
- Yarn package manager
- Git
- PostgreSQL database (for production)

## 🚀 Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/mohamedaliznidi/next-challenge-chatbot.git
   cd insurance-chat
   ```

2. **Install dependencies**

   ```bash
   yarn install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Add your API keys:

   ```env
   OPENAI_API_KEY=your_openai_api_key
   DEEPSEEK_API_KEY=your_deepseek_api_key
   DATABASE_URL=your_database_url
   ```

4. **Set up the database**

   ```bash
   yarn prisma generate
   yarn prisma db push
   ```

5. **Run the development server**

   ```bash
   yarn dev
   ```

6. **Open your browser** Navigate to [http://localhost:3000](http://localhost:3000)

## 🎬 Demo & Screenshots

### Live Demo

🌐 **[Try the live application](https://mohamedaliznidi-next-challenge.vercel.app)**

### Key Features Showcase

#### 💬 Intelligent Chat Interface

The application features a modern, responsive chat interface that provides:

- Real-time AI responses with streaming
- Contextual insurance assistance
- Professional BH Assurance branding
- Mobile-optimized design

#### 🔧 Insurance Tools Integration

Specialized AI tools for insurance operations:

- **Quote Generation**: Get instant insurance quotes
- **Policy Information**: Retrieve detailed policy data
- **Claims Processing**: Check claim status and coverage
- **Payment Tracking**: Monitor payment history and status

#### 📊 Professional UI Components

Built with modern design principles:

- Clean, accessible interface using Radix UI
- Consistent styling with Tailwind CSS
- Dark/light mode support
- Responsive design for all devices

### Example Interactions

#### Getting an Insurance Quote

```
User: "I need a quote for car insurance for my 2020 Toyota Camry"

AI Assistant: I'll help you generate a car insurance quote. Let me gather some information...

[AI uses the generateQuote tool to fetch real-time pricing from BH Assurance API]

AI Assistant: Here's your personalized quote:
• Product: Auto Insurance - All Risks
• Monthly Premium: 45 TND
• Annual Premium: 540 TND
• Coverage: Comprehensive with 500 TND deductible
• Valid until: [Date + 30 days]
```

#### Checking Policy Information

```
User: "What's the status of my policy BH-ABC123?"

AI Assistant: Let me check your policy information...

[AI uses the getClientPolicyInfo tool to retrieve policy details]

AI Assistant: Here are your policy details:
• Policy Number: BH-ABC123
• Product: Home Insurance
• Status: Active
• Next Payment Due: 15/02/2025
• Coverage Amount: 150,000 TND
```

## 🏆 Technical Achievements

### 🚀 Performance Optimizations

- **Fast Loading**: Sub-2 second initial page load
- **Code Splitting**: Automatic route-based code splitting with Next.js
- **Image Optimization**: WebP/AVIF format support with responsive sizing
- **Bundle Analysis**: Optimized bundle size with tree shaking
- **Caching Strategy**: Efficient caching for static assets and API responses

### 🔒 Security & Best Practices

- **Type Safety**: 100% TypeScript coverage with strict mode
- **Input Validation**: Zod schemas for all API inputs and forms
- **Security Headers**: Comprehensive security headers configuration
- **Rate Limiting**: API rate limiting to prevent abuse
- **Error Handling**: Graceful error handling with user-friendly messages

### 🧪 Quality Assurance

- **Automated Testing**: Unit tests with Jest and React Testing Library
- **Code Quality**: ESLint with strict rules and Prettier formatting
- **CI/CD Pipeline**: Automated testing and deployment with GitHub Actions
- **Dependency Security**: Automated security audits and dependency updates
- **Performance Monitoring**: Real-time performance tracking and error monitoring

### 🌐 Modern Architecture

- **Microservices Ready**: Modular tool architecture for easy scaling
- **Database Design**: Normalized PostgreSQL schema with Prisma ORM
- **API Design**: RESTful API with streaming support
- **Component Architecture**: Reusable, accessible UI components
- **Documentation**: Comprehensive documentation and code comments

### 📱 Accessibility & UX

- **WCAG 2.1 Compliance**: Full accessibility support
- **Responsive Design**: Mobile-first approach with all screen sizes
- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **Dark Mode**: Automatic theme switching based on user preference

## 📝 Available Scripts

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn start` - Start production server
- `yarn lint` - Run ESLint
- `yarn typecheck` - Run TypeScript type checking
- `yarn format` - Format code with Prettier
- `yarn test` - Run tests
- `yarn clean` - Clean build artifacts
- `yarn preview` - Preview production build

## 🏗️ Project Structure

```text
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ai-elements/       # AI-specific components
│   └── ui/                # Reusable UI components
├── lib/                   # Utility functions and tools
│   ├── tools/             # AI tools and schemas
│   ├── prisma.ts          # Database client
│   └── utils.ts           # Utility functions
├── prisma/                # Database schema and migrations
├── types/                 # TypeScript type definitions
├── public/                # Static assets
├── next.config.ts         # Next.js configuration
├── tailwind.config.ts     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
├── eslint.config.mjs      # ESLint configuration
└── package.json           # Dependencies and scripts
```

## ⚙️ Configuration

### TypeScript Configuration

The project uses strict TypeScript settings with:

- ES2022 target for modern JavaScript features
- Strict type checking enabled
- Path mapping for clean imports
- Additional safety checks

### ESLint Configuration

Comprehensive linting rules including:

- Next.js and React best practices
- TypeScript-specific rules
- Accessibility checks
- Import/export organization
- Code quality enforcement

### Tailwind CSS Configuration

Modern Tailwind CSS 4 setup with:

- Custom color scheme
- Typography plugin
- Animation utilities
- Responsive design utilities
- Dark mode support

### Next.js Configuration

Optimized for performance with:

- React 19 compiler enabled
- Image optimization
- Security headers
- Bundle optimization
- Webpack customizations

## 🎨 Styling

This project uses Tailwind CSS 4 with a custom design system:

- **Colors**: Custom color palette with CSS variables
- **Typography**: Geist Sans and Geist Mono fonts
- **Components**: Radix UI primitives with custom styling
- **Animations**: Custom keyframes and transitions
- **Responsive**: Mobile-first responsive design

## 🧪 Testing

Testing setup includes:

- Jest for unit testing
- React Testing Library for component testing
- Coverage reporting
- Watch mode for development

## 📦 Deployment

### Vercel (Recommended)

1. Connect your repository to Vercel
2. Set environment variables in Vercel dashboard:
   - `OPENAI_API_KEY`
   - `DEEPSEEK_API_KEY`
   - `DATABASE_URL`
3. Deploy automatically on push to main branch

### Other Platforms

1. Build the application: `pnpm build`
2. Start the production server: `pnpm start`
3. Ensure environment variables are set
4. Set up database with: `pnpm prisma generate && pnpm prisma db push`

## 🔧 Development Guidelines

### Code Style

- Use TypeScript for all new files
- Follow ESLint and Prettier configurations
- Use meaningful variable and function names
- Add JSDoc comments for complex functions

### Component Structure

- Use functional components with hooks
- Implement proper TypeScript interfaces
- Follow the component composition pattern
- Use Radix UI primitives when possible

### State Management

- Use React hooks for local state
- Consider Context API for global state
- Implement proper error boundaries

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Run checks: `yarn lint && yarn typecheck`
5. Commit your changes: `git commit -m 'Add amazing feature'`
6. Push to the branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [documentation](docs/)
2. Search existing [issues](issues/)
3. Create a new issue with detailed information

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing framework
- [Vercel](https://vercel.com/) for hosting and deployment
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Radix UI](https://www.radix-ui.com/) for accessible UI primitives
- [OpenAI](https://openai.com/) and [Deepseek](https://www.deepseek.com/) for AI capabilities
