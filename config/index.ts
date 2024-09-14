import type { AppInfo } from '@/types/app'
export const APP_ID = `${process.env.NEXT_PUBLIC_APP_ID}`
export const API_KEY = `${process.env.NEXT_PUBLIC_APP_KEY}`
export const API_URL = `${process.env.NEXT_PUBLIC_API_URL}`
export const APP_INFO: AppInfo = {
  title: 'Chatbot para assitência de Planos de Saúde',
  description: '',
  copyright: '',
  privacy_policy: '',
  default_language: 'en',
}

export const isShowPrompt = true
export const promptTemplate = 'Ben-vindo, em que posso ser útil.'

export const API_PREFIX = '/api'

export const LOCALE_COOKIE_NAME = 'locale'

export const DEFAULT_VALUE_MAX_LEN = 48
