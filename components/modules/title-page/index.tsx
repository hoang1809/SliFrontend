import { LayoutProps } from 'models/common'
import React from 'react'

const TitlePage = (props: LayoutProps) => {
  return (
    <div className='font-semibold text-[36px]'>{props.children}</div>
  )
}

export default TitlePage