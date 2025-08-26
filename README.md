# Insurance Chat Application

A modern AI-powered insurance chat application built with Next.js 15, React 19, and TypeScript. This application provides intelligent assistance for insurance-related queries, policy management, and claims processing.

## 🚀 Features

- **AI-Powered Chat**: Intelligent responses using OpenAI GPT-4o and Deepseek R1 models
- **Web Search Integration**: Enhanced responses with real-time web search capabilities
- **Modern UI**: Built with Tailwind CSS 4 and Radix UI components
- **Type Safety**: Full TypeScript support with strict type checking
- **Performance Optimized**: Next.js 15 with App Router and React 19 features
- **Code Quality**: ESLint, Prettier, and comprehensive linting rules
- **Responsive Design**: Mobile-first approach with modern CSS features

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Runtime**: React 19
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI
- **AI Integration**: AI SDK with OpenAI and Deepseek
- **Code Quality**: ESLint 9, Prettier
- **Package Manager**: Yarn

## 📋 Prerequisites

- Node.js 18.17 or later
- Yarn package manager
- Git

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
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
   ```

4. **Run the development server**
   ```bash
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Available Scripts

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn start` - Start production server
- `yarn lint` - Run ESLint with auto-fix
- `yarn lint:check` - Check linting without fixing
- `yarn typecheck` - Run TypeScript type checking
- `yarn typecheck:watch` - Run TypeScript type checking in watch mode
- `yarn format` - Format code with Prettier
- `yarn format:check` - Check code formatting
- `yarn test` - Run tests
- `yarn test:watch` - Run tests in watch mode
- `yarn test:coverage` - Run tests with coverage
- `yarn analyze` - Analyze bundle size
- `yarn clean` - Clean build artifacts
- `yarn check-all` - Run all checks (type, lint, format)

## 🏗️ Project Structure

```
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ai-elements/       # AI-specific components
│   └── ui/                # Reusable UI components
├── lib/                   # Utility functions
├── hooks/                 # Custom React hooks
├── types/                 # TypeScript type definitions
├── .vscode/               # VS Code configuration
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
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms

1. Build the application: `yarn build`
2. Start the production server: `yarn start`
3. Ensure environment variables are set

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
4. Run checks: `yarn check-all`
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
