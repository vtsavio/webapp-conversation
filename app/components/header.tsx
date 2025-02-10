'use client'
import type { FC } from 'react'
import React from 'react'
import { Bars3Icon } from '@heroicons/react/24/outline'
import ThemeSwitcher from '@/app/components/base/theme-switcher'

export type HeaderProps = {
  title?: string
  isMobile?: boolean
  onShowSideBar?: () => void
  onCreateNewChat?: () => void
}

const Header: FC<HeaderProps> = ({
  title,
  isMobile,
  onShowSideBar,
  onCreateNewChat,
}) => {
  return (
    <div className="flex justify-between items-center h-14 px-4 border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-[#222222] transition-colors duration-200">
      <div className="flex items-center gap-2">
        {isMobile && (
          <button
            className="inline-flex items-center justify-center rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
            onClick={onShowSideBar}
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
        )}
        <div className="text-lg font-bold text-gray-900 dark:text-gray-100 transition-colors duration-200">
          {title}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <ThemeSwitcher />
      </div>
    </div>
  )
}

export default Header
