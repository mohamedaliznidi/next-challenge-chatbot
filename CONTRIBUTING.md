# Contributing to Insurance Chat

Thank you for your interest in contributing to the Insurance Chat project! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17 or later
- pnpm package manager
- Git
- PostgreSQL (for database features)

### Development Setup

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/your-username/next-challenge-chatbot.git
   cd insurance-chat
   ```

3. Install dependencies:
   ```bash
   pnpm install
   ```

4. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```

5. Set up the database:
   ```bash
   pnpm prisma generate
   pnpm prisma db push
   ```

6. Start the development server:
   ```bash
   pnpm dev
   ```

## 📝 Development Guidelines

### Code Style

- Use TypeScript for all new files
- Follow the existing ESLint and Prettier configurations
- Use meaningful variable and function names
- Add JSDoc comments for complex functions
- Follow the established folder structure

### Commit Messages

Use conventional commit format:
- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation changes
- `style:` for formatting changes
- `refactor:` for code refactoring
- `test:` for adding tests
- `chore:` for maintenance tasks

Example: `feat: add new insurance quote calculation tool`

### Pull Request Process

1. Create a feature branch from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes and commit them:
   ```bash
   git add .
   git commit -m "feat: your feature description"
   ```

3. Run the quality checks:
   ```bash
   pnpm lint
   pnpm typecheck
   pnpm test
   ```

4. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```

5. Create a Pull Request with:
   - Clear title and description
   - Reference any related issues
   - Screenshots for UI changes
   - Test instructions

## 🧪 Testing

- Write tests for new features
- Ensure existing tests pass
- Run tests with: `pnpm test`
- Check coverage with: `pnpm test:coverage`

## 📚 Documentation

- Update README.md for significant changes
- Add JSDoc comments for new functions
- Update API documentation for new endpoints
- Include examples in documentation

## 🐛 Bug Reports

When reporting bugs, please include:
- Clear description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Environment details (OS, Node.js version, etc.)
- Screenshots or error logs if applicable

## 💡 Feature Requests

For new features:
- Check existing issues first
- Provide clear use case and rationale
- Consider implementation complexity
- Be open to discussion and feedback

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## 🤝 Code of Conduct

- Be respectful and inclusive
- Focus on constructive feedback
- Help others learn and grow
- Maintain a professional environment

## 📞 Getting Help

- Check the documentation first
- Search existing issues
- Ask questions in discussions
- Contact maintainers if needed

Thank you for contributing! 🎉
