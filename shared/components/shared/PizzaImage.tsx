import { cn } from '@/shared/lib/utils';
import React from 'react'

interface Props {
    className?: string;
    imageUrl: string;
    size: 20 | 30 | 40;
}

export const PizzaImage: React.FC<Props> = ({ imageUrl, size, className }) => {

    return (
        <div className={cn('flex min-h-[210px] my-6 lg:my-0 lg:min-h-fit items-center justify-center flex-1 relative w-full', className)}>
            <img
            src={imageUrl}
            alt="Logo"
            className={cn('relative left-1 top-1 transition-all z-10 duration-300', {
                'w-[100px] h-[100px] lg:w-[300px] lg:h-[300px]': size === 20,
                'w-[140px] h-[140px] lg:w-[400px] lg:h-[400px]': size === 30,
                'w-[210px] h-[210px] lg:w-[500px] lg:h-[500px]': size === 40,
            })}
            />
    
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dashed border-2 rounded-full border-gray-200 w-[200px] h-[200px] lg:w-[450px] lg:h-[450px]" />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dotted border-2 rounded-full border-gray-100 w-[140px] h-[140px] lg:w-[370px] lg:h-[370px]" />
        </div>
    )
} 