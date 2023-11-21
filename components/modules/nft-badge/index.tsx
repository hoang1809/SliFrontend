/* eslint-disable @next/next/no-img-element */
import React from 'react'

const NftBadge = () => {
  return (
    <div className='inline-block border border-solid border-[rgba(0, 0, 0, 0.52)] p-1'>
      <div className='flex gap-1'>
      <div>NFT badge name</div>
      <div className='flex items-center'><img src='/assets/icons/close.svg' alt='close' /></div>
      </div>
    </div>
  )
}

export default NftBadge