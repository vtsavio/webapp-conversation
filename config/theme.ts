export type Theme = 'light' | 'dark'

export const ThemeContext = {
    light: {
        background: '#FFFFFF',
        text: '#000000',
        border: '#E5E7EB',
        input: '#F3F4F6',
        hover: '#F9FAFB'
    },
    dark: {
        background: '#222222',
        text: '#FFFFFF',
        border: '#374151',
        input: '#333333',
        hover: '#374151'
    }
}

export const themeConfig = {
    light: {
        background: '#FFFFFF',
        text: '#000000',
        borderColor: '#E5E7EB',
        inputBackground: '#F3F4F6',
        inputText: '#374151',
        hoverBackground: '#F9FAFB',
        primaryText: '#1A56DB',
        secondaryText: '#6B7280',
        accent: '#1C64F2'
    },
    dark: {
        background: '#222222',
        text: '#FFFFFF',
        borderColor: '#374151',
        inputBackground: '#333333',
        inputText: '#FFFFFF',
        hoverBackground: '#374151',
        primaryText: '#60A5FA',
        secondaryText: '#9CA3AF',
        accent: '#3B82F6'
    },
}