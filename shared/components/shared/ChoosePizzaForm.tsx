import { cn } from '@/shared/lib/utils';
import React from 'react';
import { GroupVariants, PizzaImage, Title } from '.';
import { Button } from '../ui';
import { PizzaSize, pizzaSizes, PizzaType, pizzaTypes } from '@/shared/constants/pizza';

interface Props {
    imageUrl: string;
    name: string;
    className?: string;
    ingredients: any[];
    items?: any[];
    onClickAdd?: VoidFunction;
}

export const ChoosePizzaForm: React.FC<Props> = ({
  className,
  imageUrl,
  name,
  ingredients,
  items,
  onClickAdd,
}) => {
  const [size, setSize] = React.useState<PizzaSize>(20);
  const [type, setType] = React.useState<PizzaType>(1);

  const textDetaills = 'Some text details here'
  const totalPrice = 350

  return (
    <div className={cn(className, 'flex flex-1')}>
        <PizzaImage imageUrl={imageUrl} size={size} />

        <div className="w-[490px] bg-[#f7f6f5] p-7">
          <Title text={name} size="md" className="font-extrabold mb-1" />
          <p className="text-gray-400">{textDetaills}</p>

          <div className="flex flex-col gap-4 mt-5">
            <GroupVariants 
              items={pizzaSizes} 
              value={String(size)} 
              onClick={(value) => setSize(Number(value) as PizzaSize)}  
            />
            <GroupVariants 
              items={pizzaTypes} 
              value={String(type)} 
              onClick={(value) => setType(Number(value) as PizzaType)}  
            />
          </div>

          <Button
              className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
              Добавить в корзину за {totalPrice} ₽
          </Button>
        </div>
    </div>

  )
};