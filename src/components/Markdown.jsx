"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";

/**
 * Custom Markdown component with GitHub-inspired styling
 * Provides clean, readable typography for markdown content
 *
 * Table Features:
 * - Compact tables (auto-width, not full-width)
 * - Horizontal scroll when content exceeds container
 * - Headers always center-aligned
 * - Right-aligned columns (|---:|) get:
 *   - whitespace-nowrap (no line breaks for dates/numbers)
 *   - monospace font (digits align vertically)
 * - Left-aligned columns can wrap normally for longer text
 */

const components = {
  // Headings - GitHub style with bottom borders on h1/h2
  h1: ({ children, ...props }) => (
    <h1
      className="text-2xl font-semibold mt-6 mb-4 pb-2 border-b border-border"
      {...props}
    >
      {children}
    </h1>
  ),
  h2: ({ children, ...props }) => (
    <h2
      className="text-xl font-semibold mt-6 mb-3 pb-2 border-b border-border"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3 className="text-lg font-semibold mt-5 mb-2" {...props}>
      {children}
    </h3>
  ),
  h4: ({ children, ...props }) => (
    <h4 className="text-base font-semibold mt-4 mb-2" {...props}>
      {children}
    </h4>
  ),
  h5: ({ children, ...props }) => (
    <h5 className="text-sm font-semibold mt-4 mb-2" {...props}>
      {children}
    </h5>
  ),
  h6: ({ children, ...props }) => (
    <h6 className="text-sm font-semibold mt-4 mb-2 text-muted-foreground" {...props}>
      {children}
    </h6>
  ),

  // Paragraphs
  p: ({ children, ...props }) => (
    <p className="my-3 leading-7" {...props}>
      {children}
    </p>
  ),

  // Lists - good spacing and indentation
  ul: ({ children, ...props }) => (
    <ul className="my-3 ml-6 list-disc space-y-1" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol className="my-3 ml-6 list-decimal space-y-1" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li className="leading-7" {...props}>
      {children}
    </li>
  ),

  // Links
  a: ({ href, children, ...props }) => (
    <Link
      href={href || "#"}
      className="text-primary hover:underline"
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      {...props}
    >
      {children}
    </Link>
  ),

  // Strong/Bold
  strong: ({ children, ...props }) => (
    <strong className="font-semibold" {...props}>
      {children}
    </strong>
  ),

  // Emphasis/Italic
  em: ({ children, ...props }) => (
    <em className="italic" {...props}>
      {children}
    </em>
  ),

  // Code - inline
  code: ({ inline, children, ...props }) => {
    if (inline) {
      return (
        <code
          className="px-1.5 py-0.5 rounded bg-muted text-sm font-mono"
          {...props}
        >
          {children}
        </code>
      );
    }
    return (
      <code className="font-mono text-sm" {...props}>
        {children}
      </code>
    );
  },

  // Code blocks
  pre: ({ children, ...props }) => (
    <pre
      className="my-4 p-4 rounded-lg bg-muted overflow-x-auto text-sm"
      {...props}
    >
      {children}
    </pre>
  ),

  // Blockquotes - left border accent
  blockquote: ({ children, ...props }) => (
    <blockquote
      className="my-4 pl-4 border-l-4 border-muted-foreground/30 text-muted-foreground italic"
      {...props}
    >
      {children}
    </blockquote>
  ),

  // Horizontal rule
  hr: ({ ...props }) => <hr className="my-6 border-border" {...props} />,

  // Tables - GitHub style with borders
  table: ({ children, ...props }) => (
    <div className="my-4 overflow-x-auto">
      <table
        className="border-collapse border border-border text-sm"
        {...props}
      >
        {children}
      </table>
    </div>
  ),
  thead: ({ children, ...props }) => (
    <thead className="bg-muted/50" {...props}>
      {children}
    </thead>
  ),
  tbody: ({ children, ...props }) => (
    <tbody className="divide-y divide-border" {...props}>
      {children}
    </tbody>
  ),
  tr: ({ children, ...props }) => (
    <tr className="border-b border-border" {...props}>
      {children}
    </tr>
  ),
  th: ({ children, style, ...props }) => (
    <th
      className="px-4 py-2 text-center font-semibold border border-border whitespace-nowrap"
      {...props}
    >
      {children}
    </th>
  ),
  td: ({ children, style, ...props }) => {
    const isRightAligned = style?.textAlign === 'right';
    return (
      <td
        className={`px-4 py-2 border border-border ${isRightAligned ? 'whitespace-nowrap font-mono' : ''}`}
        style={style}
        {...props}
      >
        {children}
      </td>
    );
  },

  // Images
  img: ({ src, alt, ...props }) => (
    <img
      src={src}
      alt={alt}
      className="my-4 max-w-full rounded-lg"
      {...props}
    />
  ),

  // Task lists (checkboxes)
  input: ({ type, checked, ...props }) => {
    if (type === "checkbox") {
      return (
        <input
          type="checkbox"
          checked={checked}
          disabled
          className="mr-2 rounded"
          {...props}
        />
      );
    }
    return <input type={type} {...props} />;
  },
};

export default function Markdown({ children, className = "" }) {
  return (
    <div className={`markdown-content ${className}`}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {children}
      </ReactMarkdown>
    </div>
  );
}
