import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get('/hello', (c) => {
  return c.json({message : "helloololo"})
})

app.get('/siwakub', (c) => {
  return c.json({message : "siwakub"})
})

export default app
