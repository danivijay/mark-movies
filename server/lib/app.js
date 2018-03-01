import express from 'express'
const app = express()

import bodyParser from 'body-parser'
import cors from 'cors'
import morgan from 'morgan'

app.use(morgan('combined'))
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

import movieRoutes from './api/routes/movies'
import userRoutes from './api/routes/user'

app.use('/movies', movieRoutes)
app.use('/user', userRoutes)

app.use((req, res, next) => {
  const err = new Error('Not found')
  err.status = 404
  next(err)
})

app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.json({
    err: {
      msg: err.message
    }
  })
})

export default app
