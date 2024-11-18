'use client'

import React from 'react'
import { Title, CheckboxFiltersGroup } from '.'
import { Input, RangeSlider } from '../ui'
import { useQueryFilters, useFilters, useIngredients } from '@/shared/hooks'

type Props = {
    className?: string
}

export const Filters: React.FC<Props> = ({ className }) => {
  const { ingredients, loading } = useIngredients()
  const filters = useFilters();

  useQueryFilters(filters)

  const items = ingredients.map((item) => ({ 
    value: String(item.id), 
    text: item.name 
  }))

  const updatePrices = (prices: number[]) => {
    filters.setPrices('priceFrom', prices[0])
    filters.setPrices('priceTo', prices[1] )
  }

  return (
    <div className={className}>
        <Title text="Filters" size="sm" className="mb-5 font-bold" />
        
        {/* Checkbox filters */}
        <CheckboxFiltersGroup
          title="Type of dough"
          name="pizzaTypes"
          className="mb-5"
          onClickCheckbox={filters.setPizzaTypes}
          selected={filters.pizzaTypes}
          items={[
            { text: 'Thin', value: '1' },
            { text: 'Traditional', value: '2' },
          ]}
        />

        <CheckboxFiltersGroup
          title="Size"
          name="sizes"
          className="mb-5"
          onClickCheckbox={filters.setSizes}
          selected={filters.sizes}
          items={[
            { text: '20 cm', value: '20' },
            { text: '30 cm', value: '30' },
            { text: '40 cm', value: '40' },
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
              value={filters.prices.priceFrom} 
              onChange={(e) => filters.setPrices('priceFrom', Number(e.target.value))}
            />
            <Input 
              type="number" 
              min={100} 
              max={1000} 
              placeholder="5000" 
              value={filters.prices.priceTo} 
              onChange={(e) => filters.setPrices('priceTo', Number(e.target.value))}
            />
          </div>
          <RangeSlider 
            min={0} 
            max={1000} 
            step={10} 
            value={[
              filters.prices.priceFrom || 0, 
              filters.prices.priceTo || 1000 
            ]} 
            onValueChange={updatePrices}
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
          onClickCheckbox={filters.setSelectedIngredients}
          selected={filters.selectedIngredients}
          name="ingredients"
        />
    </div>
  )
}