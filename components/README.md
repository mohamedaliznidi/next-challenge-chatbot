# Components Directory

This directory contains all React components used throughout the Insurance Chat application. Components are organized by functionality and reusability.

## 📁 Directory Structure

```
components/
├── ui/                    # Reusable UI primitives (shadcn/ui)
│   ├── button/           # Button component variants
│   ├── input/            # Form input components
│   ├── card/             # Card layout components
│   ├── dialog/           # Modal and dialog components
│   ├── dropdown/         # Dropdown menu components
│   ├── tooltip/          # Tooltip components
│   └── ...               # Other UI primitives
├── ai-elements/          # AI-specific components
│   ├── chat-interface/   # Main chat UI components
│   ├── message-display/  # Message rendering components
│   ├── tool-responses/   # Tool result display components
│   ├── typing-indicator/ # Typing animation components
│   └── ...               # Other AI-related components
├── forms/                # Form components
│   ├── quote-form/       # Insurance quote forms
│   ├── claim-form/       # Claim submission forms
│   ├── contact-form/     # Contact and feedback forms
│   └── ...               # Other form components
├── layout/               # Layout and navigation components
│   ├── header/           # Application header
│   ├── sidebar/          # Navigation sidebar
│   ├── footer/           # Application footer
│   ├── navigation/       # Navigation components
│   └── ...               # Other layout components
├── insurance/            # Insurance-specific components
│   ├── policy-card/      # Policy information display
│   ├── claim-status/     # Claim status components
│   ├── quote-display/    # Quote result display
│   ├── coverage-info/    # Coverage information
│   └── ...               # Other insurance components
├── common/               # Common reusable components
│   ├── loading/          # Loading states and spinners
│   ├── error-boundary/   # Error handling components
│   ├── empty-state/      # Empty state displays
│   ├── confirmation/     # Confirmation dialogs
│   └── ...               # Other common components
└── README.md             # This documentation file
```

## 🎨 Component Categories

### UI Components (`ui/`)

Base UI primitives built with Radix UI and styled with Tailwind CSS. These components follow the shadcn/ui design system and are highly reusable across the application.

**Examples:**
- `Button` - Various button styles and states
- `Input` - Form input fields with validation
- `Card` - Content containers and layouts
- `Dialog` - Modal dialogs and overlays

### AI Elements (`ai-elements/`)

Components specifically designed for AI chat functionality and tool interactions.

**Examples:**
- `ChatInterface` - Main chat container and layout
- `MessageBubble` - Individual message display
- `ToolResponse` - Formatted tool result displays
- `TypingIndicator` - AI thinking animation

### Forms (`forms/`)

Complex form components for insurance-related data collection and submission.

**Examples:**
- `QuoteForm` - Insurance quote request form
- `ClaimForm` - Claim submission form
- `ContactForm` - Customer contact form

### Layout (`layout/`)

Application structure and navigation components.

**Examples:**
- `Header` - Top navigation and branding
- `Sidebar` - Side navigation menu
- `Footer` - Footer links and information

### Insurance (`insurance/`)

Domain-specific components for insurance business logic and data display.

**Examples:**
- `PolicyCard` - Policy information summary
- `ClaimStatus` - Claim progress tracking
- `QuoteDisplay` - Quote results presentation

### Common (`common/`)

Shared utility components used across different parts of the application.

**Examples:**
- `LoadingSpinner` - Loading state indicators
- `ErrorBoundary` - Error handling wrapper
- `EmptyState` - No data state display

## 🛠️ Component Guidelines

### Naming Conventions

- Use PascalCase for component names
- Use descriptive, specific names
- Include the component type in the name when helpful
- Example: `InsuranceQuoteForm`, `ClaimStatusCard`

### File Structure

Each component should have its own directory with:

```
component-name/
├── index.ts              # Export file
├── component-name.tsx    # Main component
├── component-name.types.ts # TypeScript types
├── component-name.stories.tsx # Storybook stories (optional)
└── component-name.test.tsx # Unit tests (optional)
```

### Component Template

```typescript
import React from 'react';
import { cn } from '@/lib/utils';

interface ComponentNameProps {
  className?: string;
  children?: React.ReactNode;
  // Add other props here
}

export const ComponentName = React.forwardRef<
  HTMLDivElement,
  ComponentNameProps
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('default-classes', className)}
      {...props}
    >
      {children}
    </div>
  );
});

ComponentName.displayName = 'ComponentName';
```

### TypeScript Types

- Define props interfaces in separate `.types.ts` files for complex components
- Use generic types when appropriate
- Export types for reuse in other components
- Use strict typing with proper null checks

### Styling Guidelines

- Use Tailwind CSS classes for styling
- Implement responsive design with Tailwind breakpoints
- Use CSS variables for theme colors
- Follow the design system color palette
- Ensure accessibility with proper contrast ratios

### Accessibility

- Include proper ARIA labels and roles
- Ensure keyboard navigation support
- Use semantic HTML elements
- Test with screen readers
- Follow WCAG 2.1 guidelines

### Performance

- Use React.memo for expensive components
- Implement proper key props for lists
- Lazy load heavy components when possible
- Optimize re-renders with useCallback and useMemo

## 🧪 Testing

### Unit Tests

- Write tests for component logic
- Test user interactions
- Mock external dependencies
- Use React Testing Library
- Aim for high test coverage

### Storybook

- Create stories for UI components
- Document component variants
- Include interactive controls
- Show different states and props

## 📚 Documentation

### Component Documentation

Each component should include:

- Purpose and use cases
- Props documentation with types
- Usage examples
- Accessibility notes
- Performance considerations

### JSDoc Comments

```typescript
/**
 * A reusable button component with multiple variants and sizes.
 * 
 * @param variant - The visual style variant
 * @param size - The size of the button
 * @param disabled - Whether the button is disabled
 * @param onClick - Click event handler
 * @param children - Button content
 */
```

## 🔄 Component Lifecycle

### Development Process

1. **Design** - Create component design and specifications
2. **Implementation** - Build the component with TypeScript
3. **Testing** - Write unit tests and manual testing
4. **Documentation** - Add JSDoc and usage examples
5. **Review** - Code review and feedback
6. **Integration** - Integrate into the application

### Maintenance

- Regular updates for security and performance
- Refactoring for better reusability
- Adding new features and variants
- Updating documentation and examples

## 🚀 Best Practices

1. **Single Responsibility** - Each component should have one clear purpose
2. **Composition over Inheritance** - Use composition patterns
3. **Props Interface** - Define clear, typed props interfaces
4. **Error Boundaries** - Wrap components that might fail
5. **Loading States** - Handle loading and error states gracefully
6. **Responsive Design** - Ensure components work on all screen sizes
7. **Accessibility** - Make components accessible to all users
8. **Performance** - Optimize for rendering performance
9. **Testing** - Write comprehensive tests
10. **Documentation** - Document usage and examples
