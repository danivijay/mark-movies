import express from 'express'
const app = express()

import bodyParser from 'body-parser'
import cors from 'cors'
import morgan from 'morgan'

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

import movieRoutes from './api/routes/movies'

app.use('/movies', movieRoutes)

export default app
