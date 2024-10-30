'use client'

import { cn } from '@/shared/lib/utils'
import React from 'react'
import { useIntersection } from 'react-use'
import { ProductCard, Title } from '.';
import { useCategoryStore } from '@/shared/store/category';
import { ProductWithRelations } from '@/@types/prisma';

interface Props {
    title: string;
    items: ProductWithRelations[];
    categoryId: number;
    className?: string;
    listClassName?: string;
  } 

export const ProductsGroupList: React.FC<Props> = ({ title, items, categoryId, listClassName, className }) => {
    const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);
    const intersectionRef = React.useRef(null);
    const intersection = useIntersection(intersectionRef, {
        threshold: 0.4
    });

    React.useEffect(() => {
        if (intersection?.isIntersecting) {
            setActiveCategoryId(categoryId);
        }
    }, [categoryId, intersection?.isIntersecting, title]);

  return (
    <div className={className} id={title} ref={intersectionRef} >
        <Title text={title} size="lg" className="mb-5 font-extrabold" />        

        <div className={cn("grid grid-cols-3 gap-[50px]", listClassName)}>
            {items.map((product, idx) => (
                <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    imageUrl={product.imageUrl}
                    price={product.items[0].price}
                    ingredients={product.ingredients}
                />
            ))}
        </div>
    </div>
  )
}