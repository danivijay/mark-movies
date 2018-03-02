import jwt from 'jsonwebtoken'
import config from '../config'

import db from '../models'

export default (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]
    const decoded = jwt.verify(token, config.authentication.jwtSecret)
    req.userData = decoded
    next()
  } catch (err) {
    return res.status(401).json({
      msg: 'Auth failed'
    })
  }
}
