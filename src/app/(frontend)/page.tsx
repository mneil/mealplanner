import { headers as getHeaders } from 'next/headers.js'
// import Image from 'next/image'
import { getPayload } from 'payload'
import React from 'react'
// import { fileURLToPath } from 'url'
import Form from 'next/form'
import Autocomplete from './components/AutoComplete'


import config from '@/payload.config'
import './styles.css'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  // const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`

  const meals = await payload.find({
    collection: 'meals',
  });
  const mealList = meals.docs.map((meal) => {
    return(<li key={meal.id}>{meal.name}</li>)
  })

  return (
    <div className="home">
      <header>
        {!user && <p>Welcome to your new project.</p>}
        {user && <p>Welcome back, {user.email}</p>}
      </header>
      <div className="content">
        <Form action="/search">
          {/* On submission, the input value will be appended to
              the URL, e.g. /search?query=abc */}
          <Autocomplete suggestions={meals.docs.map((meal) => meal.name)} />
          <button type="submit">Submit</button>
        </Form>
        <ul>
          {mealList}
        </ul>
        {/* <picture>
          <source srcSet="https://raw.githubusercontent.com/payloadcms/payload/main/packages/ui/src/assets/payload-favicon.svg" />
          <Image
            alt="Payload Logo"
            height={65}
            src="https://raw.githubusercontent.com/payloadcms/payload/main/packages/ui/src/assets/payload-favicon.svg"
            width={65}
          />
        </picture>

        <div className="links">
          <a
            className="docs"
            href="https://payloadcms.com/docs"
            rel="noopener noreferrer"
            target="_blank"
          >
            Documentation
          </a>
        </div> */}
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
