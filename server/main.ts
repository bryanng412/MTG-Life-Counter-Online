import { listenAndServe } from 'https://deno.land/std/http/server.ts'
import { parse } from 'https://deno.land/std/flags/mod.ts'
import { acceptWebSocket, acceptable } from 'https://deno.land/std/ws/mod.ts'
import { gameHandler } from './gameHandler.ts'

const { port = 8080 } = parse(Deno.args)

listenAndServe({ port }, async req => {
  if (req.method === 'GET' && req.url === '/ws' && acceptable(req)) {
    acceptWebSocket({
      conn: req.conn,
      bufReader: req.r,
      bufWriter: req.w,
      headers: req.headers,
    }).then(gameHandler)
  }
})

console.log(`Server has started on port ${port}.`)
