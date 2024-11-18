import { cn } from '@/shared/lib/utils'
import React from 'react'
import { Title } from '.';
import { Button } from '../ui';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { Ingredient } from '@prisma/client';

interface Props {
    name: string;
    price: number;
    id: number;
    imageUrl: string;
    ingredients: Ingredient[];
    className?: string;
}

export const ProductCard: React.FC<Props> = ({ name, price, id, imageUrl, ingredients, className }) => {
  return (
    <div className={className}>
        <Link href={`/product/${id}`}>
            <div className={cn('flex justify-center p-6 bg-secondary rounded-lg h-[260px]', className)}>
                <img src={imageUrl} alt={name} className="w-[215px] h-[215px]" />
            </div>

            <Title text={name} size="sm" className="mb-1 mt-3 font-bold" />

            <p className="text-sm text-gray-400">
                {ingredients.map((ingredient) => ingredient.name).join(', ')}
            </p>

            <div className="flex justify-between items-center mt-4">
                <span className="text-[20px]">
                    from <b>{price} $</b>
                </span>

                {/* {count ? (
                    <CountButton value={count} size="lg" />
                ) : ( */}
                    <Button variant="secondary">
                        <Plus size={20} className="mr-1" />
                        Add
                    </Button>
                {/* )} */}
            </div>
        </Link>
    </div>
  )
}