import type { FC } from 'react'
import React from 'react'

import type { IMainProps } from '@/app/components'
import Main from '@/app/components'

const App: FC<IMainProps> = ({
  params,
}: any) => {
  return (
    <Main params={params} className="bg-light-green" />
  )
}

export default React.memo(App)
