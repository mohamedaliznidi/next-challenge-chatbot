'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { MessageSquarePlusIcon } from 'lucide-react';
import type { HTMLAttributes } from 'react';

export type PromptInputToolsProps = HTMLAttributes<HTMLDivElement>;

export const PromptInputTools = ({
  className,
  children,
  ...props
}: PromptInputToolsProps) => (
  <div
    className={cn('flex items-center gap-2 px-3 py-2', className)}
    {...props}
  >
    {children}
  </div>
);

// New Chat Button Component
export type NewChatButtonProps = {
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
};

export const NewChatButton = ({
  onClick,
  disabled = false,
  className,
}: NewChatButtonProps) => (
  <Button
    type="button"
    variant="ghost"
    size="sm"
    onClick={onClick}
    disabled={disabled}
    className={cn(
      'flex items-center gap-2 text-sm font-medium',
      'hover:bg-accent hover:text-accent-foreground',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      className
    )}
    title="Start a new conversation"
  >
    <MessageSquarePlusIcon className="h-4 w-4" />
    <span>Nouvelle discussion</span>
  </Button>
);
