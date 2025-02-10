import { DataFromCollectionSlug, BasePayload } from 'payload'

type DataIngredient = DataFromCollectionSlug<'groceries'>

export interface Ingredient {
  ingredient: number | DataIngredient
  amount: number
  id?: string | null
}

export function split(groceries: DataIngredient) {
  const needGroceries: DataIngredient[] = []
  const checkGroceries: DataIngredient[] = []
  groceries.forEach((item) => {
    const i = item.ingredient as DataIngredient
    if (i.staple) {
      checkGroceries.push(i)
      return
    }
    needGroceries.push(i)
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
