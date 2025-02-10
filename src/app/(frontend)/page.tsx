import { getPayload, DataFromCollectionSlug } from 'payload'
import React from 'react'
import MealFinder from './components/MealFinder'

import config from '@/payload.config'

export default async function HomePage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  async function getAllMeals(page?: number): Promise<DataFromCollectionSlug<'meals'>[]> {
    const res = await payload.find({
      collection: 'meals',
      limit: 1000,
      page,
    })
    let meals = res.docs
    if (res.hasNextPage && res.nextPage) {
      meals = meals.concat(await getAllMeals(res.nextPage))
    }
    return meals
  }
  const meals = await getAllMeals()

  return <MealFinder props={{}} meals={meals} />
}
