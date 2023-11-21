import { LayoutProps } from 'models/common'
import React from 'react'

const BackgroundAuth = ({children}:LayoutProps) => {
  return (
    <div className="bg-bg-img h-full bg-login bg-cover bg-center bg-no-repeat">{children}</div>
  )
}

export default BackgroundAuth