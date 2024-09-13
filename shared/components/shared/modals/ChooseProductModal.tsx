'use client';

import { Dialog, DialogContent } from "@/shared/components/ui/dialog"
import { cn } from "@/shared/lib/utils";
import { useRouter } from "next/navigation";
import { ChooseProductForm, ChoosePizzaForm } from "..";
import { ProductWithRelations } from "@/@types/prisma";
import { useCartStore } from "@/shared/store";
import toast from "react-hot-toast";
import React from "react";

 interface ModalProps {
    product: ProductWithRelations;
    className?: string;
}

export const ChooseProductModal: React.FC<ModalProps> = ({ product, className }) => {
    const router = useRouter();
    const firstItem = product.items[0]
    const isPizzaForm = Boolean(firstItem.pizzaType)
    const [addCartItem, loading] = useCartStore((state) => [state.addCartItem, state.loading]);
    
    const onSubmit = async (productItemId?: number, ingredients?: number[]) => {

        const itemId = productItemId ?? firstItem.id;

        try {
            await addCartItem({
                productItemId: itemId,
                ingredients,
            })


            toast.success(`${product.name} added to cart`)
            router.back()
        } catch (error) {
            toast.error(`Failed to add product to cart`)
            console.error(error);
        }
    }

    return (
        <Dialog 
            open={Boolean(product)}
            onOpenChange={() => router.back()}
        >
            <DialogContent
                className={cn(
                    'p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden', 
                    className
                )}
            >
                {
                    isPizzaForm ? (
                        <ChoosePizzaForm 
                            imageUrl={product.imageUrl}
                            name={product.name} 
                            ingredients={product.ingredients}
                            items={product.items}
                            onSubmit={onSubmit}
                            loading={loading}
                        />
                    ) : (
                        <ChooseProductForm 
                            imageUrl={product.imageUrl}
                            name={product.name}
                            onSubmit={onSubmit}
                            price={firstItem.price}
                            loading={loading}
                        />
                    )
                }
            </DialogContent>
        </Dialog>
    )
}