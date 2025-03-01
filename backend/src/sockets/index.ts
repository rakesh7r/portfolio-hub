// create a web server
import { WebSocketServer } from 'ws'

export const socketEventHandler = (wss: WebSocketServer) => {
  wss.on('connection', ws => {
    ws.on('message', message => {
      console.log(`Received message => ${message}`)
      ws.send('Hello, you sent => ' + message)
    })
    ws.on('close', () => {
      console.log('a user disconnected')
    })
  })
}
