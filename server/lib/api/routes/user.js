import express from 'express'
const router = express.Router()

import bcrypt from 'bcrypt'
const saltRounds = 10;

import models from '../../models'

router.post('/signup', (req, res, next) => {
  if (!req.body.email) {
    console.log('email missing')
    return false
  }
  if (!req.body.password) {
    console.log('password missing')
    return false
  } else {
      bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        if (err) {
          console.log('hashing failed')
          return false
        }
        const userinfo = {
          email: req.body.email,
          password: hash
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
  }
})

router.post('/signin', (req, res, next) => {
  console.log(req.body)
  res.status(200).json({
    msg : 'reached signin'
  })
})

export default router
