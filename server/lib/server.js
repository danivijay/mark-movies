import http from 'http'
import app from './app'

import db from './models'

const port = process.env.PORT || 3000

const server = http.createServer(app)

db.sequelize.sync()
  .then(() => {
    server.listen(port, () => console.log(`listening on port ${port}`))
  })

