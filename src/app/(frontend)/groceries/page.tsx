import { getPayload, DataFromCollectionSlug } from 'payload'
import React from 'react'

import config from '@/payload.config'

type DataIngredient = DataFromCollectionSlug<'ingredients'>
interface Ingredient {
  ingredient: number | DataIngredient
  amount: number
  id?: string | null
}

export default async function GroceriesPage(req: any) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  console.log('SEARCH', await req.searchParams)
  const params = await req.searchParams
  if (!params.id) {
    return <></>
  }
  const ids = Array.isArray(params.id) ? params.id : [params.id]
  const meals = await payload.find({
    collection: 'meals',
    where: {
      or: ids.map((id: string) => ({ id: { equals: id } })),
    },
  })

  const ingredients = meals.docs.reduce(
    (n, o) => n.concat(o.ingredients! || []),
    [] as Ingredient[],
  )

  const needIngredients: DataIngredient[] = []
  const checkIngredients: DataIngredient[] = []
  ingredients.forEach((item) => {
    const i = item.ingredient as DataIngredient
    if (i.staple) {
      checkIngredients.push(i)
      return
    }
    needIngredients.push(i)
  })

  console.log('MEALS', ingredients)

  return (
    <>
      <div className="groceries">
        <h3>Groceries</h3>
        <ul>
          {needIngredients.map((m, i) => (
            <li key={i}>{m.name}</li>
          ))}
        </ul>
      </div>
      <div className="check">
        <h3>Check</h3>
        <ul>
          {checkIngredients.map((m, i) => (
            <li key={i}>{m.name}</li>
          ))}
        </ul>
      </div>
    </>
  )
}
