'use client'

import { cn } from '@/lib/utils'
import React from 'react'
import { useIntersection } from 'react-use'
import { ProductCard, Title } from './';

interface Props {
    title: string;
    items: any[];
    categoryId: number;
    className?: string;
    listClassName?: string;
  } 

export const ProductsGroupList: React.FC<Props> = ({ title, items, categoryId, listClassName, className }) => {
    const intersectionRef = React.useRef(null);
    const intersection = useIntersection(intersectionRef, {
        threshold: 0.4
    });

    React.useEffect(() => {
        if (intersection && intersection.intersectionRatio > 0) {
            intersectionRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [intersection]);

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
                />
            ))}
        </div>
    </div>
  )
}