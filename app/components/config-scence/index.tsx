import type { FC } from 'react'
import React from 'react'
import type { IWelcomeProps } from '../welcome'
import Welcome from '../welcome'

const ConfigSence: FC<IWelcomeProps> = (props) => {
  return (
    <div className='flex-1 overflow-hidden bg-white dark:bg-[#222222] transition-colors duration-200'>
      <Welcome {...props} />
    </div>
  )
}
export default React.memo(ConfigSence)
