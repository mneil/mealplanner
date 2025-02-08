import { headers as getHeaders } from 'next/headers.js'
import { getPayload, DataFromCollectionSlug } from 'payload'
import React from 'react'
import MealFinder from './components/MealFinder'

import config from '@/payload.config'
import './styles.css'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

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

  return (
    <div className="home">
      <header>
        {!user && <p>Welcome to your new project.</p>}
        {user && <p>Welcome back, {user.email}</p>}
      </header>
      <div className="content">
        <MealFinder meals={meals} />
      </div>
      <div className="footer">
        <a
          className="admin"
          href={payloadConfig.routes.admin}
          rel="noopener noreferrer"
          target="_blank"
        >
          Go to admin panel
        </a>
      </div>
    </div>
  )
}
