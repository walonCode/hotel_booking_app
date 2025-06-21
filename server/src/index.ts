import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { secureHeaders } from 'hono/secure-headers'

import auth from "../src/routes/auth.js"
import hotel from "../src/routes/hotel.js"
import { poweredBy } from 'hono/powered-by'

const app = new Hono().basePath("api/v1")

//middlwares
app.use(logger())
app.use(poweredBy({serverName:"Hotel Server"}))
app.use(cors({origin:"*",credentials:true, allowMethods:["POST","PATCH","PUT","GET","DELETE"]}))
app.use(secureHeaders())

//health check route
app.get('/', (c) => {
  return c.text('Hello Hono!')
})

//auth route
app.route("/", auth)

//hotel route
app.route("/", hotel)

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
