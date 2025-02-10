import React from 'react'
import Editor from '@monaco-editor/react'

interface Props {
    children?: React.ReactNode
    className?: string
    inline?: boolean
}

export const CodeBlock: React.FC<Props> = ({
    children,
    className = '',
}) => {
    // Get the language from className (format: "language-{lang}")
    const language = className.replace('language-', '')

    // If there's no children, return null
    if (!children) return null

    // Get the code content from children
    const content = React.Children.toArray(children).join('')

    return (
        <div className="relative rounded-md overflow-hidden">
            <Editor
                value={content}
                language={language || 'plaintext'}
                height="100%"
                options={{
                    readOnly: true,
                    minimap: { enabled: false },
                    lineNumbers: 'off',
                    folding: false,
                    domReadOnly: true,
                    contextmenu: false,
                    scrollbar: {
                        vertical: 'hidden',
                        horizontal: 'hidden',
                    },
                    wordWrap: 'on',
                    theme: 'vs-light',
                    padding: { top: 8, bottom: 8 },
                }}
            />
        </div>
    )
}