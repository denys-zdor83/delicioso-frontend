'use client';

import { Dialog, DialogContent } from "@/shared/components/ui/dialog"
import { cn } from "@/shared/lib/utils";
import { useRouter } from "next/navigation";
import { ProductForm } from "..";
import { ProductWithRelations } from "@/@types/prisma";
import React from "react";

 interface ModalProps {
    product: ProductWithRelations;
    className?: string;
}

export const ChooseProductModal: React.FC<ModalProps> = ({ product, className }) => {
    const router = useRouter();

    return (
        <Dialog 
            open={Boolean(product)}
            onOpenChange={() => router.back()}
        >
            <DialogContent
                className={cn(
                    'p-0 sm:w-[500px] md:w-[740px] lg:w-[1024px] max-w-[1024px] min-h-[500px] bg-white overflow-hidden', 
                    className
                )}
            >
                <ProductForm product={product} onSubmit={() => router.back()} />
            </DialogContent>
        </Dialog>
    )
}