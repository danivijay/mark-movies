import express from 'express'
const router = express.Router()

import bcrypt from 'bcrypt'
const saltRounds = 10;

import models from '../../models'

router.post('/signup', (req, res, next) => {
  if (!req.body.email) {
    const err = new Error('Email required')
    err.status = 400
    next(err)
  }
  if (!req.body.password) {
    const err = new Error('Password required')
    err.status = 400
    next(err)
  } else {
      bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        if (err) {
          const err = new Error('Processing failed')
          next(err)
        }
        const userinfo = {
          email: req.body.email,
          password: hash
        }
        models.User.create(userinfo)
          .then(user => {
            res.status(200).json({
              msg : 'signup success'
            })
            console.log('New User: ', user.dataValues)
          })
          .catch(err => {
            next(err)
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
