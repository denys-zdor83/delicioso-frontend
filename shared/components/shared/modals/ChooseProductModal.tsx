'use client';

import { Dialog, DialogContent } from "@/shared/components/ui/dialog"
import { cn } from "@/shared/lib/utils";
import { useRouter } from "next/navigation";
import { ChooseProductForm, ChoosePizzaForm } from "..";
import { ProductWithRelations } from "@/@types/prisma";

 interface ModalProps {
    product: ProductWithRelations;
    className?: string;
}

export const ChooseProductModal: React.FC<ModalProps> = ({ product, className }) => {
    const router = useRouter();
    const isPizzaForm = Boolean(product.items[0].pizzaType)

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
                        />
                    ) : (
                        <ChooseProductForm 
                            imageUrl={product.imageUrl}
                            name={product.name} 
                        />
                    )
                }
            </DialogContent>
        </Dialog>
    )
}