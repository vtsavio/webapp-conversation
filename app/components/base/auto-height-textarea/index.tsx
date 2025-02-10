import { forwardRef, useEffect, useRef, useState } from 'react'
import cn from 'classnames'

type IProps = {
  placeholder?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  className?: string
  minHeight?: number
  maxHeight?: number
  autoFocus?: boolean
  controlFocus?: number
  onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void
  onKeyUp?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void
}

const AutoHeightTextarea = forwardRef(
  (
    { value, onChange, placeholder, className, minHeight = 36, maxHeight = 96, autoFocus, controlFocus, onKeyDown, onKeyUp }: IProps,
    outerRef: any,
  ) => {
    const ref = outerRef || useRef<HTMLTextAreaElement>(null)
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
      setIsMounted(true)
      return () => setIsMounted(false)
    }, [])

    const doFocus = () => {
      if (!isMounted || !ref.current)
        return false

      try {
        ref.current.setSelectionRange(value.length, value.length)
        ref.current.focus()
        return true
      } catch (e) {
        console.error('Error focusing textarea:', e)
        return false
      }
    }

    const focus = () => {
      if (!doFocus()) {
        let hasFocus = false
        const runId = setInterval(() => {
          hasFocus = doFocus()
          if (hasFocus)
            clearInterval(runId)
        }, 100)
      }
    }

    useEffect(() => {
      if (autoFocus && isMounted)
        focus()
    }, [autoFocus, isMounted])

    useEffect(() => {
      if (controlFocus && isMounted)
        focus()
    }, [controlFocus, isMounted])

    if (!isMounted) return null

    return (
      <div className='relative'>
        <div className={cn(className, 'invisible whitespace-pre-wrap break-all overflow-y-auto')} style={{ minHeight, maxHeight }}>
          {!value ? placeholder : value.replace(/\n$/, '\n ')}
        </div>
        <textarea
          ref={ref}
          autoFocus={autoFocus}
          className={cn(className, 'absolute inset-0 resize-none overflow-hidden')}
          placeholder={placeholder}
          onChange={onChange}
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
          value={value}
        />
      </div>
    )
  },
)

AutoHeightTextarea.displayName = 'AutoHeightTextarea'

export default AutoHeightTextarea
