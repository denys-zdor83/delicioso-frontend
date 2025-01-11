'use client';

import { cn } from '@/shared/lib/utils';
import React from 'react';
import { GroupVariants, IngredientItem, PizzaImage, Title } from '.';
import { Button } from '../ui';
import { PizzaSize, PizzaType, pizzaTypes } from '@/shared/constants/pizza';
import { Ingredient, ProductItem } from '@prisma/client';
import { getPizzaDetails } from '@/shared/lib';
import { usePizzaOptions } from '@/shared/hooks';

interface Props {
  imageUrl: string;
  name: string;
  className?: string;
  ingredients: Ingredient[];
  items: ProductItem[];
  loading?: boolean;
  onSubmit: (itemId: number, ingredients: number[]) => void;
}

// Choose product form
export const ChoosePizzaForm: React.FC<Props> = ({
  className,
  imageUrl,
  name,
  ingredients,
  items,
  loading,
  onSubmit,
}) => {

  const {
    size,
    type,
    currentItemId,
    selectedIngredients,
    availableSizes,
    addIngredient,
    setType,
    setSize,
  } = usePizzaOptions(items);

  const { totalPrice, textDetaills } = getPizzaDetails(
    type,
    size,
    items,
    ingredients,
    selectedIngredients,
  );

  const handleClickAdd = () => {
    if (currentItemId) {
      onSubmit(currentItemId, Array.from(selectedIngredients))
    }
  }

  return (
    <div className={cn(className, 'flex flex-1 flex-col lg:flex-row')}>
      <PizzaImage imageUrl={imageUrl} size={size} />

      <div className="lg:w-[490px] bg-[#f7f6f5] p-2 lg:p-7">
        {/* <div className="flex flex-row items-center lg:flex-col lg:items-unset "> */}
          <Title text={name} size="md" className="font-extrabold mb-1" />
          <p className="text-gray-400 ml-2 lg:ml-0">{textDetaills}</p>
        {/* </div> */}

        <div className="flex flex-col gap-4 mt-0 lg:mt-5">
          <GroupVariants 
            items={availableSizes} 
            value={String(size)} 
            onClick={(value) => setSize(Number(value) as PizzaSize)}  
          />
          <GroupVariants 
            items={pizzaTypes} 
            value={String(type)} 
            onClick={(value) => setType(Number(value) as PizzaType)}  
          />
        </div>

        <div className="bg-gray-50 p-2 lg:p-5 rounded-md lg:h-[420px] overflow-auto scrollbar mt-0 lg:mt-5">
          <div className="grid grid-cols-2 min-[440px]:grid-cols-3 md:grid-cols-5 lg:grid-cols-3 gap-3 h-[110px] lg:h-auto">
            {ingredients.map((ingredient) => (
              <IngredientItem
                key={ingredient.id}
                name={ingredient.name}
                price={ingredient.price}
                imageUrl={ingredient.imageUrl}
                onClick={() => addIngredient(ingredient.id)}
                active={selectedIngredients.has(ingredient.id)}
              />
            ))}
          </div>
        </div>

        <Button
          loading={loading}
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-4 lg:mt-10"
          onClick={handleClickAdd}
        >
            Add to cart for {totalPrice} $
        </Button>
      </div>
    </div>
  )
};
