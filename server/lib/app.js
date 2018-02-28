import express from 'express'
const app = express()

const Sequelize = require('sequelize')
const sequelize = new Sequelize('mark-movies', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  operatorsAliases: false,
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

import bodyParser from 'body-parser'
import cors from 'cors'
import morgan from 'morgan'

app.use(morgan('combined'))
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

import movieRoutes from './api/routes/movies'

app.use('/movies', movieRoutes)

app.use((req, res, next) => {
  const err = new Error('not found')
  err.status(404)
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
