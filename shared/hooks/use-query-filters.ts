import React from "react"
import { Filters } from "./use-filters"
import { useRouter } from "next/navigation"
import qs from "qs"
import { useDeepCompareEffect } from "react-use"

export const useQueryFilters = (filters: Filters) => {
    const router = useRouter()
    const isMounted = React.useRef(false)

    useDeepCompareEffect(() => {
      if (isMounted.current) {
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
      }

      isMounted.current = true
    }, [ filters ] )
}