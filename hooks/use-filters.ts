import { useSearchParams } from "next/navigation";
import { useSet } from "react-use";
import React from "react";

interface PriceProps {
    priceFrom?: number;
    priceTo?: number;
}

interface QueryFilters extends PriceProps {
    sizes: string;
    pizzaTypes: string;
    ingredients: string;
}

export interface Filters {
    selectedIngredients: Set<string>;
    sizes: Set<string>;
    pizzaTypes: Set<string>;
    prices: PriceProps;
}

interface ReturnProps extends Filters {
    setPrices: (name: keyof PriceProps, value: number) => void;
    setPizzaTypes: (value: string) => void;
    setSizes: (value: string) => void;
    setSelectedIngredients: (value: string) => void;
}

export const useFilters = (): ReturnProps => {
    const searchParams = useSearchParams() as unknown as Map<keyof QueryFilters, string>

    // Ingredients filter
    const [selectedIngredients, { toggle: toggleIngredients }] = useSet(new Set<string>(
        searchParams.get('ingredients')?.split(',')
    ))

    // Sizes filter
    const [sizes, { toggle: toggleSizes }] = useSet(
        new Set<string>( searchParams.get('sizes') ? searchParams.get('sizes')?.split(',') : [] )
    )

    // Pizza types filter
    const [pizzaTypes, { toggle: togglePizzaTypes }] = useSet(new Set<string>(
        new Set<string>( searchParams.get('pizzaTypes') ? searchParams.get('pizzaTypes')?.split(',') : [] )
      ))

    // Price filter
    const [prices, setPrices] = React.useState<PriceProps>({
        priceFrom: Number(searchParams.get('priceFrom')) || undefined,
        priceTo: Number(searchParams.get('priceTo')) || undefined,
    })

    const updatePrice = (name: keyof PriceProps, value: number) => {
        setPrices({
          ...prices,
          [name]: value
        })
    }
    

    return {
        selectedIngredients,
        sizes,
        pizzaTypes,
        prices,
        setSelectedIngredients: toggleIngredients,
        setSizes: toggleSizes,
        setPizzaTypes: togglePizzaTypes,
        setPrices: updatePrice,
    }
}