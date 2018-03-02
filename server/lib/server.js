import http from 'http'
import app from './app'

import db from './models'

db.User.belongsTo(db.Movie)

const port = process.env.PORT || 3000

const server = http.createServer(app)

db.sequelize.sync({force: true})
  .then(() => {
    server.listen(port, () => console.log(`listening on port ${port}`))
  })

