'use client'

import Form from 'next/form'
import React, { FormEvent, useState, Link } from 'react'
import { DataFromCollectionSlug } from 'payload'

import Autocomplete, { Suggestion } from './AutoComplete'

const MealFinder = ({ meals }: { meals: DataFromCollectionSlug<'meals'>[] }) => {
  const [mealList, setMealList] = useState<DataFromCollectionSlug<'meals'>[]>([])
  const [suggestion, setSuggestion] = useState<Suggestion>()

  const onChange = (suggestion: Suggestion) => {
    setSuggestion(suggestion)
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    console.log(e)
    e.preventDefault()
    e.stopPropagation()
    if (!suggestion) return
    const meal = meals.find((m) => m.id === Number(suggestion.key))
    if (!meal) return
    setMealList((mealList) => [...mealList, meal])
  }

  const groceryLink = mealList.reduce((o, m) => {
    return o + `${o ? '&' : '/groceries?'}id=${m.id}`
  }, '')

  return (
    <>
      <Form action="/add" onSubmit={onSubmit}>
        <Autocomplete
          onChange={onChange}
          suggestions={meals.map((meal) => ({ key: meal.id, value: meal.name }))}
        />
        <button type="submit">Add</button>
      </Form>
      <ul>
        {mealList.map((meal, i) => (
          <li data-key={meal.id} key={i}>
            {meal.name}
          </li>
        ))}
      </ul>
      {<a href={groceryLink}>Grocery List</a>}
    </>
  )
}

export default MealFinder
