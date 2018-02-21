import express from 'express'
const app = express()

import movieRoutes from './api/routes/movies'

app.use('/movies', movieRoutes)

export default app
