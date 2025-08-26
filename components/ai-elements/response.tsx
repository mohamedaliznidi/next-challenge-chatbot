'use client'

import { marked } from 'marked';
import { memo, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';

function parseMarkdownIntoBlocks(markdown: string): string[] {
  if (!markdown) return [];

  const tokens = marked.lexer(markdown);
  return tokens.map(token => token.raw);
}

const ResponseBlock = memo(
  ({ content }: { content: string }) => {
    return <ReactMarkdown>{content}</ReactMarkdown>;
  },
  (prevProps, nextProps) => {
    if (prevProps.content !== nextProps.content) return false;
    return true;
  },
);

ResponseBlock.displayName = 'ResponseBlock';

export const Response = memo(
  ({ content, id }: { content: string; id: string }) => {
    const blocks = useMemo(() => parseMarkdownIntoBlocks(content), [content]);

    return blocks.map((block, index) => (
      <ResponseBlock content={block} key={`${id}-block_${index}`} />
    ));
  },
);

Response.displayName = 'Response';
