'use client';

import { Product } from "@prisma/client";
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Title } from "../Title";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";


 interface ModalProps {
    product: Product;
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
                    'p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden', 
                    className
                )}
            >
                <Title text={product?.name}></Title>
            </DialogContent>
        </Dialog>
    )
}