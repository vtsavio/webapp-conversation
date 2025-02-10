'use client'
import type { FC } from 'react'
import React, { useEffect, useRef, useState } from 'react'
import cn from 'classnames'
import { useTranslation } from 'react-i18next'
import Textarea from 'rc-textarea'
import s from './style.module.css'
import Answer from './answer'
import Question from './question'
import type { FeedbackFunc } from './type'
import type { ChatItem, VisionFile, VisionSettings } from '@/types/app'
import { TransferMethod } from '@/types/app'
import Tooltip from '@/app/components/base/tooltip'
import Toast from '@/app/components/base/toast'
import ChatImageUploader from '@/app/components/base/image-uploader/chat-image-uploader'
import ImageList from '@/app/components/base/image-uploader/image-list'
import { useImageFiles } from '@/app/components/base/image-uploader/hooks'

export type IChatProps = {
  chatList: ChatItem[]
  feedbackDisabled?: boolean
  isHideSendInput?: boolean
  onFeedback?: FeedbackFunc
  checkCanSend?: () => boolean
  onSend?: (message: string, files: VisionFile[]) => void
  useCurrentUserAvatar?: boolean
  isResponding?: boolean
  controlClearQuery?: number
  visionConfig?: VisionSettings
}

const Chat: FC<IChatProps> = ({
  chatList,
  feedbackDisabled = false,
  isHideSendInput = false,
  onFeedback,
  checkCanSend,
  onSend = () => { },
  useCurrentUserAvatar,
  isResponding,
  controlClearQuery,
  visionConfig,
}) => {
  const { t } = useTranslation()
  const { notify } = Toast
  const isUseInputMethod = useRef(false)
  const [query, setQuery] = useState('')
  const {
    files,
    onUpload,
    onRemove,
    onReUpload,
    onImageLinkLoadError,
    onImageLinkLoadSuccess,
    onClear,
  } = useImageFiles()

  useEffect(() => {
    if (controlClearQuery)
      setQuery('')
  }, [controlClearQuery])

  const handleContentChange = (e: any) => {
    const value = e.target.value
    setQuery(value)
  }

  const logError = (message: string) => {
    notify({ type: 'error', message, duration: 3000 })
  }

  const valid = () => {
    if (!query || query.trim() === '') {
      logError('Message cannot be empty')
      return false
    }
    return true
  }

  const handleSend = () => {
    if (!valid() || (checkCanSend && !checkCanSend()))
      return
    onSend(query, files.filter(file => file.progress !== -1).map(fileItem => ({
      type: 'image',
      transfer_method: fileItem.type,
      url: fileItem.url,
      upload_file_id: fileItem.fileId,
    })))
    onClear()
    setQuery('')
  }

  const handleKeyDown = (e: any) => {
    isUseInputMethod.current = e.nativeEvent.isComposing
    if (e.code === 'Enter' && !e.shiftKey) {
      setQuery(query.replace(/\n$/, ''))
      e.preventDefault()
    }
  }

  const handleKeyUp = (e: any) => {
    if (e.code === 'Enter') {
      e.preventDefault()
      if (!e.shiftKey && !isUseInputMethod.current)
        handleSend()
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 min-h-0">
        <div className="h-full overflow-y-auto">
          <div className="space-y-4 py-4">
            {chatList.map((item) => {
              if (item.isAnswer) {
                const isLast = item.id === chatList[chatList.length - 1].id
                return (
                  <Answer
                    key={item.id}
                    item={item}
                    feedbackDisabled={feedbackDisabled}
                    onFeedback={onFeedback}
                    isResponding={isResponding && isLast}
                  />
                )
              }
              return (
                <Question
                  key={item.id}
                  id={item.id}
                  content={item.content}
                  useCurrentUserAvatar={useCurrentUserAvatar}
                  imgSrcs={(item.message_files && item.message_files?.length > 0) ? item.message_files.map(item => item.url) : []}
                />
              )
            })}
          </div>
        </div>
      </div>

      {!isHideSendInput && (
        <div className="sticky bottom-0 left-0 right-0 z-10 bg-white dark:bg-[#222222] border-t border-gray-200 dark:border-gray-800 transition-colors duration-200">
          <div className="mx-auto max-w-3xl px-4 py-3">
            <div className="relative">
              {visionConfig?.enabled && (
                <div className="absolute left-2 bottom-2 flex items-center">
                  <ChatImageUploader
                    settings={visionConfig}
                    onUpload={onUpload}
                    disabled={files.length >= visionConfig.number_limits}
                  />
                  {files.length > 0 && (
                    <>
                      <div className="mx-1 w-[1px] h-4 bg-gray-200 dark:bg-gray-700" />
                      <ImageList
                        list={files}
                        onRemove={onRemove}
                        onReUpload={onReUpload}
                        onImageLinkLoadSuccess={onImageLinkLoadSuccess}
                        onImageLinkLoadError={onImageLinkLoadError}
                      />
                    </>
                  )}
                </div>
              )}

              <Textarea
                className="block w-full px-3 py-2 bg-white dark:bg-[#222222] border-2 border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-primary-500 dark:focus:border-primary-500 transition-colors duration-200"
                placeholder={(t('common.chat.inputPlaceholder') || '') as string}
                value={query}
                onChange={handleContentChange}
                onKeyDown={handleKeyDown}
                onKeyUp={handleKeyUp}
                autoSize={{ minRows: 1, maxRows: 5 }}
              />

              <div className="absolute right-2 bottom-2">
                <Tooltip
                  selector="send-tip"
                  htmlContent={
                    <div className="text-xs">
                      {t('common.operation.send')} Enter<br />
                      {t('common.operation.lineBreak')} Shift + Enter
                    </div>
                  }
                >
                  <button
                    className={cn(
                      'inline-flex items-center justify-center w-8 h-8 rounded-lg transition-colors duration-200',
                      query.trim()
                        ? 'text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900'
                        : 'text-gray-400 cursor-not-allowed'
                    )}
                    onClick={handleSend}
                    disabled={!query.trim()}
                  >
                    <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                    </svg>
                  </button>
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default React.memo(Chat)
