import express, { Request, Response } from 'express'

const app = express()
const dotenv = require('dotenv')

dotenv.config()

// configure middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// configure routes
