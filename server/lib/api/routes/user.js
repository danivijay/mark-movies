import express from 'express'
const router = express.Router()

import models from '../../models'

router.post('/signup', (req, res, next) => {
  if (!req.body.email && !req.body.password) {
    console.log('email or password missing')
    return false
  }
  const userinfo = {
    email: req.body.email,
    password: req.body.password
  }
  models.User.create(userinfo)
    .then(user => {
      res.status(200).json({
        msg : 'signup success',
        user : user.toJSON()
      })
      res.send()
    })
    .catch(err => {
      console.log(err)
    })
})

router.post('/signin', (req, res, next) => {
  console.log(req.body)
  res.status(200).json({
    msg : 'reached signin'
  })
})

export default router
