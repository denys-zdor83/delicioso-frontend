'use client'

import React from 'react'
import { FilterCheckbox, Title, CheckboxFiltersGroup } from './'
import { Input, RangeSlider } from '../ui'
import { useFilterIngredients } from '@/hooks/useFilterIngredients'

type Props = {
    className?: string
}

export const Filters: React.FC<Props> = ({ className }) => {
  const { ingredients } = useFilterIngredients()

  const items = ingredients.map((item) => ({ value: String(item.id), text: item.name }))

  return (
    <div className={className}>
        <Title text="Filters" size="sm" className="mb-5 font-bold" />
        
        {/* Checkbox filters */}
        <div className="flex flex-col gap-4">
          <FilterCheckbox text="Can be picked up" value="1" />
          <FilterCheckbox text="New" value="2" />
        </div>

        {/* Price ranger */}
        <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
          <p className="font-bold mb-3">Price:</p>
          <div className="flex gap-3 mb-5">
            <Input type="number" placeholder="0" min={0} max={1000} defaultValue={0} />
            <Input type="number" min={100} max={1000} placeholder="30000" />
          </div>
          <RangeSlider min={0} max={5000} step={10} value={[0, 5000]} />
        </div>

        {/* Checkbox filters */}
        <CheckboxFiltersGroup 
          title="ingredients"
          className="mt-5"
          limit={6}
          defaultItems={items.slice(0, 6)}
          items={items}
        />
    </div>
  )
}