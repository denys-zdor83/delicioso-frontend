'use client';

import { Dialog, DialogContent } from "@/shared/components/ui/dialog"
import { cn } from "@/shared/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { ProductForm } from "..";
import { ProductWithRelations } from "@/@types/prisma";
import React from "react";

 interface ModalProps {
    product: ProductWithRelations;
    className?: string;
}

export const ChooseProductModal: React.FC<ModalProps> = ({ product, className }) => {
    const router = useRouter();
    const pathname = usePathname(); 
    const [isOpen, setIsOpen] = React.useState(Boolean(product));

    React.useEffect(() => {
        if (pathname === '/') {
            setIsOpen(false);
        }
    }, [pathname]);

    return (
        <Dialog
            open={isOpen}
            onOpenChange={(open) => {
                if (!open) {
                    router.replace('/');
                }
            }}
        >
            <DialogContent
                className={cn(
                    'p-0 sm:w-[500px] md:w-[740px] lg:w-[1024px] max-w-[1024px] min-h-[500px] bg-white overflow-hidden', 
                    className
                )}
            >
                <ProductForm product={product} onSubmit={() => router.replace('/')} />
            </DialogContent>
        </Dialog>
    )
}