import http from 'http'
import app from './app'

const {sequelize} = require('./models')

const port = process.env.PORT || 3000

const server = http.createServer(app)

sequelize.sync()
  .then(() => {
    server.listen(port, () => console.log(`listening on port ${port}`))
  })

