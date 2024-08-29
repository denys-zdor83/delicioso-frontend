import { Ingredient, ProductItem } from "@prisma/client";
import { PizzaSize, PizzaType } from "../constants/pizza";

// TODO: Example of commenting code
/**
 * Function for calculating total pizza price
 * @param type - type of chosen pizza
 * @param size - size of chosen pizza
 * @param items - array of pizza items
 * @param ingredients - array of pizza ingredients
 * @param selectedIngredients - array of selected ingredients
 * 
 * @returns - total pizza price
 */
export const calcTotalPizzaPrice = (
    type: PizzaType,
    size: PizzaSize,
    items: ProductItem[],
    ingredients: Ingredient[],
    selectedIngredients: Set<number>,
) => {
    const pizzaPrice = items.find((item) => item.pizzaType === type && item.size === size)?.price || 0;
    const totalIngredientsPrice = ingredients
      .filter((ingredient) => selectedIngredients.has(ingredient.id))
      .reduce((acc, ingredient) => acc + ingredient.price, 0)

   return pizzaPrice + totalIngredientsPrice;  
}