import { getPayload, DataFromCollectionSlug } from 'payload'
import React from 'react'

import config from '@/payload.config'

import { getByMealId } from '../utils/groceries'

type DataIngredient = DataFromCollectionSlug<'ingredients'>
interface Ingredient {
  ingredient: number | DataIngredient
  amount: number
  id?: string | null
}

export default async function GroceriesPage(req: any) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const params = await req.searchParams
  if (!params.id) {
    return <></>
  }
  const ids = Array.isArray(params.id) ? params.id : [params.id]
  const { needGroceries, checkGroceries } = await getByMealId(payload, ids)

  return (
    <>
      <div className="groceries">
        <h3>Groceries</h3>
        <ul>
          {needGroceries.map((m, i) => (
            <li key={i}>{m.name}</li>
          ))}
        </ul>
      </div>
      <div className="check">
        <h3>Check</h3>
        <ul>
          {checkGroceries.map((m, i) => (
            <li key={i}>{m.name}</li>
          ))}
        </ul>
      </div>
    </>
  )
}
