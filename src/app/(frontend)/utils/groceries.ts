import { DataFromCollectionSlug, BasePayload } from 'payload'

type DataIngredient = DataFromCollectionSlug<'ingredients'>

export interface Ingredient {
  ingredient: DataIngredient
  amount: number
  id?: string | null
}

export type GroceryHash = { [key: string]: Ingredient }

function maybeAddAmount(g: GroceryHash, n: Ingredient) {
  const newIngredient = {
    ingredient: n.ingredient,
    amount: n.amount,
    id: n.id,
  }
  if (g[n.ingredient.name]) {
    newIngredient.amount += g[n.ingredient.name].amount
  }
  g[n.ingredient.name] = newIngredient
}

export function split(groceries: Ingredient[]) {
  const needGroceries: { [key: string]: Ingredient } = {}
  const checkGroceries: { [key: string]: Ingredient } = {}
  groceries.forEach((item) => {
    const i = item.ingredient as DataIngredient
    if (i.staple) {
      maybeAddAmount(checkGroceries, item)
      return
    }
    maybeAddAmount(needGroceries, item)
  })
  return {
    needGroceries,
    checkGroceries,
  }
}

export async function getByMealId(payload: BasePayload, ids: string[]) {
  const meals = await payload.find({
    collection: 'meals',
    where: {
      or: ids.map((id: string) => ({ id: { equals: id } })),
    },
  })

  const groceries = meals.docs.reduce((n, o) => n.concat(o.groceries! || []), [] as Ingredient[])

  return split(groceries)
}
