'use client';

import {
  WelcomeMessage
} from '@/components/ai-elements/chat-suggestions';
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from '@/components/ai-elements/conversation';
import {
  ClaimStatusDisplay,
  InsurancePolicyDisplay,
  PaymentStatusDisplay,
  Tool,
} from '@/components/ai-elements/custom-tools';
import { Loader } from '@/components/ai-elements/loader';
import { Message, MessageContent } from '@/components/ai-elements/message';
import {
  PromptInput,
  PromptInputButton,
  PromptInputModelSelect,
  PromptInputModelSelectContent,
  PromptInputModelSelectItem,
  PromptInputModelSelectTrigger,
  PromptInputModelSelectValue,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputToolbar,
  PromptInputTools,
} from '@/components/ai-elements/prompt-input';
import { NewChatButton } from '@/components/ai-elements/prompt-input-tools';
import {
  Reasoning,
  ReasoningContent,
  ReasoningTrigger,
} from '@/components/ai-elements/reasoning';
import { Response } from '@/components/ai-elements/response';
import {
  Source,
  Sources,
  SourcesContent,
  SourcesTrigger,
} from '@/components/ai-elements/source';
import { useChat } from '@ai-sdk/react';
import { GlobeIcon } from 'lucide-react';
import { useState } from 'react';

const models = [
  {
    name: 'GPT OSS',
    value: 'openai/gpt-oss-120b',
  },
  {
    name: 'Command R',
    value: 'cohere/command-r'
  },
  {
    name: 'Gemini 2.5 flash',
    value: 'google/gemini-2.5-flash'
  },
  {
    name: 'Deepseek R1',
    value: 'deepseek/deepseek-r1',
  },
];

const ChatBotDemo = () => {
  const [input, setInput] = useState('');
  const [model, setModel] = useState<string>('openai/gpt-oss-120b');
  const [webSearch, setWebSearch] = useState(false);
  const { messages, sendMessage, addToolResult, status } = useChat();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage(
        { text: input },
        {
          body: {
            model: model,
            webSearch: webSearch,
          },
        },
      );
      setInput('');
    }
  };

  const handleSuggestionClick = (prompt: string) => {
    setInput(prompt);
    // Auto-submit the suggestion
    sendMessage(
      { text: prompt },
      {
        body: {
          model: model,
          webSearch: webSearch,
        },
      },
    );
  };

  const handleNewChat = () => {
    // Clear messages and reset input
    window.location.reload();
  };

  return (
    <div className="max-w-4xl mx-auto p-6 relative size-full h-screen">
      <div className="flex flex-col h-full">
        <Conversation className="h-full">
          <ConversationContent>
            {messages.length === 0 ? (
              <WelcomeMessage onSuggestionClick={handleSuggestionClick} />
            ) : (
              messages.map((message) => (
                <div key={message.id}>
                  {message.role === 'assistant' && (
                    message.parts.filter(
                      (part) => part.type === 'source-url',
                    ).length !== 0 && (
                      <Sources>
                        <SourcesTrigger
                          count={
                            message.parts.filter(
                              (part) => part.type === 'source-url',
                            ).length
                          }
                        />
                        {message.parts.filter((part) => part.type === 'source-url').map((part, i) => (
                          <SourcesContent key={`${message.id}-${i}`}>
                            <Source
                              key={`${message.id}-${i}`}
                              href={part.url}
                              title={part.url}
                            />
                          </SourcesContent>
                        ))}
                      </Sources>
                    )

                  )}
                  <Message from={message.role} key={message.id}>
                    <MessageContent>
                      {message.parts.map((part, i) => {
                        switch (part.type) {
                          case 'text':
                            return (
                              <Response
                                key={`${message.id}-${i}`}
                                id={`${message.id}-${i}`}
                                content={part.text}
                              />
                            );
                          case 'reasoning':
                            return (
                              <Reasoning
                                key={`${message.id}-${i}`}
                                className="w-full"
                                isStreaming={status === 'streaming'}
                              >
                                <ReasoningTrigger />
                                <ReasoningContent key={`${message.id}-${i}`}
                                  id={`${message.id}-${i}`}>{part.text}</ReasoningContent>
                              </Reasoning>
                            );

                          // Insurance tool cases
                          case 'tool-getInsuranceProductInfo':
                            return (
                              <Tool
                                key={`${message.id}-${i}`}
                                toolName="getInsuranceProductInfo"
                                state={part.state}
                                input={part.input}
                                output={part.output}
                                errorText={part.errorText}
                                toolCallId={part.toolCallId}
                              />
                            );

                          case 'tool-getClientPolicyInfo': {
                            const policyOutput = part.output as any;
                            return (
                              <div key={`${message.id}-${i}`} className="space-y-4">
                                <Tool
                                  toolName="getClientPolicyInfo"
                                  state={part.state}
                                  input={part.input}
                                  output={part.output}
                                  errorText={part.errorText}
                                  toolCallId={part.toolCallId}
                                />
                                {part.state === 'output-available' && policyOutput?.policies && (
                                  <div className="space-y-2">
                                    {policyOutput.policies.map((policy: any, idx: number) => (
                                      <InsurancePolicyDisplay key={idx} policy={policy} />
                                    ))}
                                  </div>
                                )}
                              </div>
                            );
                          }

                          case 'tool-checkClaimCoverage':
                            return (
                              <Tool
                                key={`${message.id}-${i}`}
                                toolName="checkClaimCoverage"
                                state={part.state}
                                input={part.input}
                                output={part.output}
                                errorText={part.errorText}
                                toolCallId={part.toolCallId}
                              />
                            );

                          case 'tool-getPaymentStatus': {
                            const paymentOutput = part.output as any;
                            return (
                              <div key={`${message.id}-${i}`} className="space-y-4">
                                <Tool
                                  toolName="getPaymentStatus"
                                  state={part.state}
                                  input={part.input}
                                  output={part.output}
                                  errorText={part.errorText}
                                  toolCallId={part.toolCallId}
                                />
                                {part.state === 'output-available' && paymentOutput ? (
                                  <PaymentStatusDisplay payment={paymentOutput} />
                                ) : null}
                              </div>
                            );
                          }

                          case 'tool-getClaimStatus': {
                            const claimOutput = part.output as any;
                            return (
                              <div key={`${message.id}-${i}`} className="space-y-4">
                                <Tool
                                  toolName="getClaimStatus"
                                  state={part.state}
                                  input={part.input}
                                  output={part.output}
                                  errorText={part.errorText}
                                  toolCallId={part.toolCallId}
                                />
                                {part.state === 'output-available' && claimOutput ? (
                                  <ClaimStatusDisplay claim={claimOutput} />
                                ) : null}
                              </div>
                            );
                          }

                          case 'tool-generateQuote':
                            return (
                              <Tool
                                key={`${message.id}-${i}`}
                                toolName="generateQuote"
                                state={part.state}
                                input={part.input}
                                output={part.output}
                                errorText={part.errorText}
                                toolCallId={part.toolCallId}
                              />
                            );

                          default:
                            return null;
                        }
                      })}
                    </MessageContent>
                  </Message>
                </div>
              ))
            )}
            {status === 'submitted' && <Loader />}
          </ConversationContent>
          <ConversationScrollButton />
        </Conversation>

        <PromptInput onSubmit={handleSubmit} className="mt-4">
          <PromptInputTextarea
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />
          <PromptInputToolbar>
            <PromptInputTools>
              {/* New Chat Button */}
              <NewChatButton onClick={handleNewChat} />

              {/* Existing buttons */}
              <PromptInputButton
                variant={webSearch ? 'default' : 'ghost'}
                onClick={() => setWebSearch(!webSearch)}
              >
                <GlobeIcon size={16} />
                <span>Search</span>
              </PromptInputButton>
              <PromptInputModelSelect
                onValueChange={(value) => {
                  setModel(value);
                }}
                value={model}
              >
                <PromptInputModelSelectTrigger>
                  <PromptInputModelSelectValue />
                </PromptInputModelSelectTrigger>
                <PromptInputModelSelectContent>
                  {models.map((model) => (
                    <PromptInputModelSelectItem key={model.value} value={model.value}>
                      {model.name}
                    </PromptInputModelSelectItem>
                  ))}
                </PromptInputModelSelectContent>
              </PromptInputModelSelect>
            </PromptInputTools>
            <PromptInputSubmit disabled={!input} status={status} />
          </PromptInputToolbar>
        </PromptInput>
      </div>
    </div>
  );
};

export default ChatBotDemo;
