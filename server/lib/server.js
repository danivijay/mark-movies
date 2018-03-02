import http from 'http'
import app from './app'

import db from './api/models'

db.Movie.belongsTo(db.User)

const port = process.env.PORT || 3000

const server = http.createServer(app)

db.sequelize.sync()
  .then(() => {
    server.listen(port, () => console.log(`listening on port ${port}`))
  })

