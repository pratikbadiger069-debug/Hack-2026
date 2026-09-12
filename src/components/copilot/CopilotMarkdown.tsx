'use client';

import React, { useState } from 'react';
import { Check, Copy, Terminal, ExternalLink } from 'lucide-react';

interface CopilotMarkdownProps {
  content: string;
}

export function CopilotMarkdown({ content }: CopilotMarkdownProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  // Split content into code blocks and markdown sections
  const parts = content.split(/(```[\s\S]*?```)/g);

  return (
    <div className="space-y-3 text-xs leading-relaxed text-[#1B1B1B]">
      {parts.map((part, index) => {
        if (part.startsWith('```')) {
          const match = part.match(/^```(\w+)?\n([\s\S]*?)```$/);
          const language = match?.[1] || 'bash';
          const code = (match?.[2] || part.slice(3, -3)).trim();
          const isCopied = copiedIndex === index;

          return (
            <div
              key={index}
              className="my-3 rounded-xl overflow-hidden border border-[#1B1B1B]/15 bg-[#1B1B1B] text-white shadow-xs"
            >
              <div className="flex items-center justify-between px-3.5 py-1.5 bg-[#2A2A2A] border-b border-white/10 text-[10px] font-mono text-gray-300">
                <div className="flex items-center gap-1.5">
                  <Terminal className="w-3 h-3 text-[#C76A2A]" />
                  <span className="uppercase font-semibold tracking-wider">{language}</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(code, index)}
                  className="flex items-center gap-1 hover:text-white px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 transition-colors"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400 font-bold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="p-3.5 overflow-x-auto text-[11px] font-mono leading-relaxed text-gray-100 selection:bg-[#C76A2A]/40">
                <code>{code}</code>
              </pre>
            </div>
          );
        }

        // Render normal markdown blocks (headers, lists, tables, bold, inline code)
        const lines = part.split('\n');

        return (
          <div key={index} className="space-y-2">
            {lines.map((line, lineIdx) => {
              const trimmed = line.trim();

              if (!trimmed) {
                return <div key={lineIdx} className="h-1.5" />;
              }

              // Heading 3
              if (trimmed.startsWith('### ')) {
                return (
                  <h3 key={lineIdx} className="text-sm font-bold text-[#1B1B1B] pt-2 pb-0.5 tracking-tight border-b border-[#E8E5DD]">
                    {renderInlineFormatting(trimmed.replace('### ', ''))}
                  </h3>
                );
              }

              // Heading 4
              if (trimmed.startsWith('#### ')) {
                return (
                  <h4 key={lineIdx} className="text-xs font-bold text-[#1B1B1B] pt-1.5 text-[#C76A2A]">
                    {renderInlineFormatting(trimmed.replace('#### ', ''))}
                  </h4>
                );
              }

              // Horizontal rule
              if (trimmed === '---') {
                return <hr key={lineIdx} className="my-2 border-[#E8E5DD]" />;
              }

              // Bullet points
              if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
                return (
                  <div key={lineIdx} className="flex items-start gap-2 pl-2">
                    <span className="text-[#C76A2A] font-bold text-xs mt-0.5">•</span>
                    <span className="flex-1 text-xs text-[#2A2A2A]">
                      {renderInlineFormatting(trimmed.slice(2))}
                    </span>
                  </div>
                );
              }

              // Numbered lists (1. 2. 3.)
              const numMatch = trimmed.match(/^(\d+)\.\s+(.*)$/);
              if (numMatch) {
                return (
                  <div key={lineIdx} className="flex items-start gap-2 pl-2">
                    <span className="font-mono text-[11px] font-bold text-[#C76A2A] min-w-[18px]">
                      {numMatch[1]}.
                    </span>
                    <span className="flex-1 text-xs text-[#2A2A2A]">
                      {renderInlineFormatting(numMatch[2])}
                    </span>
                  </div>
                );
              }

              // Regular paragraph
              return (
                <p key={lineIdx} className="text-xs text-[#2A2A2A] leading-relaxed">
                  {renderInlineFormatting(line)}
                </p>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

/**
 * Parses inline markdown: **bold**, `code`, [links](url), and *italic*
 */
function renderInlineFormatting(text: string): React.ReactNode {
  const tokens = text.split(/(\*\*.*?\*\*|`.*?`|\[.*?\]\(.*?\))/g);

  return tokens.map((token, i) => {
    // Bold: **text**
    if (token.startsWith('**') && token.endsWith('**')) {
      return (
        <strong key={i} className="font-bold text-[#1B1B1B]">
          {token.slice(2, -2)}
        </strong>
      );
    }

    // Inline Code: `code`
    if (token.startsWith('`') && token.endsWith('`')) {
      return (
        <code
          key={i}
          className="px-1.5 py-0.5 bg-[#FAF9F5] border border-[#E8E5DD] rounded text-[11px] font-mono text-[#C76A2A] font-semibold"
        >
          {token.slice(1, -1)}
        </code>
      );
    }

    // Markdown Link: [Title](URL)
    const linkMatch = token.match(/^\[(.*?)\]\((.*?)\)$/);
    if (linkMatch) {
      return (
        <a
          key={i}
          href={linkMatch[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#C76A2A] hover:underline font-semibold inline-flex items-center gap-0.5"
        >
          <span>{linkMatch[1]}</span>
          <ExternalLink className="w-2.5 h-2.5" />
        </a>
      );
    }

    return token;
  });
}
