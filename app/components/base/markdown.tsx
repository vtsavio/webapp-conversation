import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import type { Components } from 'react-markdown'
import { CodeBlock } from './code-block'

export function Markdown({ content, className, style }: { content: string; className?: string; style?: React.CSSProperties }) {
  const components: Components = {
    pre: ({ children, ...props }) => <pre {...props}>{children}</pre>,
    code: CodeBlock as any,
    p: ({ children }) => <p className='mb-4 last:mb-0 dark:text-gray-300'>{children}</p>,
    ul: ({ children }) => <ul className='mb-4 list-disc list-inside dark:text-gray-300'>{children}</ul>,
    ol: ({ children }) => <ol className='mb-4 list-decimal list-inside dark:text-gray-300'>{children}</ol>,
    li: ({ children }) => <li className='mb-1 dark:text-gray-300'>{children}</li>,
    h1: ({ children }) => <h1 className='mb-4 text-2xl font-bold dark:text-gray-100'>{children}</h1>,
    h2: ({ children }) => <h2 className='mb-4 text-xl font-bold dark:text-gray-100'>{children}</h2>,
    h3: ({ children }) => <h3 className='mb-4 text-lg font-bold dark:text-gray-100'>{children}</h3>,
    h4: ({ children }) => <h4 className='mb-4 text-base font-bold dark:text-gray-100'>{children}</h4>,
    a: ({ children, href }) => <a href={href} className='text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300'>{children}</a>,
  }

  return (
    <div className={`markdown-body ${className || ''}`} style={style}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  )
}
