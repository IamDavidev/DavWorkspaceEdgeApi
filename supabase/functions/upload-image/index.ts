// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { Application, Router } from '~oak/mod.ts'

const DEFAULT_PATH = '/upload-image'
const app = new Application()
const router = new Router()

// /gretting -> greeting
export function genPath(path: string): string {
  const parsePath = path.replace('/', '')
  return `${DEFAULT_PATH}/${parsePath}`
}

router
  .get(genPath('/'), ctx => {
    ctx.response.body = 'Hello World'
  })
  .post(genPath('/greet'), async ctx => {
    const result = ctx.request.body({
      type: 'json'
    })
    const body = await result.value
    const name = body.name

    ctx.response.body = `Hello ${name}`
  })

app.use(router.routes())
app.use(router.allowedMethods())

app.listen({ port: 8000 })
