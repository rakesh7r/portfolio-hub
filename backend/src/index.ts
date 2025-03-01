import express from 'express'
import dotenv from 'dotenv'
import WebSocket from 'ws'
import http from 'http'
import { socketEventHandler } from './sockets'

const app = express()
const server = http.createServer(app)
dotenv.config()

// configure middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// create a websocket server
const wss = new WebSocket.Server({ noServer: true })
socketEventHandler(wss)

const PORT = process.env.BACKEND_PORT || 8080

const serverInstance = server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

serverInstance.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, ws => {
    wss.emit('connection', ws, request)
  })
})
