import React from "react"
import { Filters } from "./use-filters"
import { useRouter } from "next/navigation"
import qs from "qs"

export const useQueryFilters = (filters: Filters) => {
    const router = useRouter()

    React.useEffect(() => {
        const params = {
          ...filters.prices, 
          sizes: Array.from(filters.sizes),
          pizzaTypes: Array.from(filters.pizzaTypes), 
          ingredients: Array.from(filters.selectedIngredients),
        }
    
        const query = qs.stringify(params, {
          arrayFormat: 'comma',
        })
    
        router.push(`?${query}`, {
          scroll: false
        })
    }, [ filters, router ] )
}