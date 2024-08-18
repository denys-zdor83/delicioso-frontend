'use client'

import React from 'react'
import { FilterCheckbox, Title, CheckboxFiltersGroup } from './'
import { Input, RangeSlider } from '../ui'
import { useFilterIngredients } from '@/hooks/useFilterIngredients'
import { useSet } from 'react-use'

type Props = {
    className?: string
}

interface PriceProps {
  priceFrom: number;
  priceTo: number;
}

export const Filters: React.FC<Props> = ({ className }) => {
  const { 
    ingredients, 
    loading, 
    onAddId, 
    selectedIngredients 
  } = useFilterIngredients()
  const [prices, setPrice] = React.useState<PriceProps>({ priceFrom: 0, priceTo: 1000 })
  const [sizes, { toggle: toggleSizes }] = useSet(new Set<string>([]))
  const [pizzaTypes, { toggle: togglePizzaTypes }] = useSet(new Set<string>([]))

  const items = ingredients.map((item) => ({ value: String(item.id), text: item.name }))

  const updatePrice = (name: keyof PriceProps, value: number) => {
    setPrice({
      ...prices,
      [name]: value
    })
  }

  React.useEffect(() => {
    console.log({prices, sizes, pizzaTypes, selectedIngredients})
  }, [prices, sizes, pizzaTypes, selectedIngredients])

  return (
    <div className={className}>
        <Title text="Filters" size="sm" className="mb-5 font-bold" />
        
        {/* Checkbox filters */}
        <CheckboxFiltersGroup
          title="Тип теста"
          name="pizzaTypes"
          className="mb-5"
          onClickCheckbox={togglePizzaTypes}
          selected={pizzaTypes}
          items={[
            { text: 'Тонкое', value: '1' },
            { text: 'Традиционное', value: '2' },
          ]}
        />

        <CheckboxFiltersGroup
          title="Размеры"
          name="sizes"
          className="mb-5"
          onClickCheckbox={toggleSizes}
          selected={sizes}
          items={[
            { text: '20 см', value: '20' },
            { text: '30 см', value: '30' },
            { text: '40 см', value: '40' },
          ]}
        />

        {/* Price ranger */}
        <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
          <p className="font-bold mb-3">Price:</p>
          <div className="flex gap-3 mb-5">
            <Input 
              type="number" 
              placeholder="0" 
              min={0} 
              max={1000} 
              value={prices.priceFrom} 
              onChange={(e) => updatePrice('priceFrom', Number(e.target.value))}
            />
            <Input 
              type="number" 
              min={100} 
              max={1000} 
              placeholder="5000" 
              value={prices.priceTo} 
              onChange={(e) => updatePrice('priceTo', Number(e.target.value))}
            />
          </div>
          <RangeSlider 
            min={0} 
            max={1000} 
            step={10} 
            value={[
              prices.priceFrom, 
              prices.priceTo
            ]} 
            onValueChange={([priceFrom, priceTo]) => setPrice({ priceFrom, priceTo })}
          />
        </div>

        {/* Checkbox filters */}
        <CheckboxFiltersGroup 
          title="ingredients"
          className="mt-5"
          limit={6}
          defaultItems={items.slice(0, 6)}
          loading={loading}
          items={items}
          onClickCheckbox={onAddId}
          selected={selectedIngredients}
          name="ingredients"
        />
    </div>
  )
}