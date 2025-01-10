'use client';

import React from 'react'
import { cn } from '@/shared/lib/utils'
import { useWindowSize } from 'react-use';

type Props = {
    closeOpenFilters: () => void
}

export const CloseMobFilters: React.FC<Props> = ({ closeOpenFilters }) => {
  const [isOpen, setIsOpen] = React.useState(true)
  const { width } = useWindowSize();

  const handleClick = () => {
    closeOpenFilters()
    setIsOpen(!isOpen)
  }

  React.useEffect(() => {
    if (width > 640) {
      setIsOpen(true)
    }
  }, [width])

  return (
    <div className='block sm:hidden mb-5 w-8 h-8 relative cursor-pointer' onClick={handleClick}>
      <div className={cn('bg-black w-full h-0.5 relative top-1/2 -translate-y-1/2 duration-300', !isOpen && 'rotate-45')}></div>
      <div className={cn('bg-black w-full h-0.5 relative top-1/2 -translate-y-1/2 mt-[-2px] ml-[-1px] duration-300', !isOpen && '-rotate-45')}></div>
    </div>
  )
}