'use client'
import React, { useEffect } from 'react'
import './styles/globals.css'
import './styles/markdown.scss'
import { Inter } from 'next/font/google'
import { themeConfig, Theme } from '../config/theme'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme || 'light'
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark')
      document.documentElement.setAttribute('data-theme', 'dark')
    }

    // Adiciona listener para mudanças de tema
    const handleThemeChange = (e: CustomEvent<Theme>) => {
      const theme = e.detail
      document.documentElement.style.setProperty('--theme-bg', themeConfig[theme].background)
      document.documentElement.style.setProperty('--theme-text', themeConfig[theme].text)
      document.documentElement.style.setProperty('--theme-border', themeConfig[theme].borderColor)
    }

    window.addEventListener('themeChange', handleThemeChange as EventListener)
    return () => window.removeEventListener('themeChange', handleThemeChange as EventListener)
  }, [])

  return (
    <html className="h-full">
      <body className={`${inter.className} antialiased h-full bg-white dark:bg-[#222222] text-gray-900 dark:text-gray-100`}>
        <div className="min-h-screen bg-white dark:bg-[#222222] transition-all duration-200">
          <div className="relative transition-colors duration-200">
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}
