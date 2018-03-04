import express from 'express'
const router = express.Router()

import bcrypt from 'bcrypt'
const saltRounds = 10;

import jwt from 'jsonwebtoken'

import db from '../models'
import config from '../config'

router.post('/signin', (req, res, next) => {
  if (!req.body.email) {
    const err = new Error('Email required')
    err.status = 400
    next(err)
  }
  const email = req.body.email
  if (!req.body.password) {
    const err = new Error('Password required')
    err.status = 400
    next(err)
  }
  db.User.findOne({
    where: {
      email
    }
  }).then(user => {
    if(!user) {
      const err = new Error('Authentication failed')
      err.status = 400
      next(err)
    } 
    const isAuthenticated = bcrypt.compare(req.body.password, user.dataValues.password)
    const userId = user.dataValues.id
    console.log('1', user.dataValues.id)
    return {
      isAuthenticated, 
      userId
    }
  }).then(verified => {
    console.log('2', verified.userId)
    if (verified.isAuthenticated) {
      return jwt.sign({
          email,
          userId : verified.userId
        }, config.authentication.jwtSecret, { expiresIn: '24h' })
    } else {
      const err = new Error('Authentication failed')
      err.status = 400
      next(err)
    }
  }).then(token => {
    res.status(200).json({
      msg : 'signin success',
      token
    })
  }).catch(err => {
    next(err)
  })
})

router.post('/signup', (req, res, next) => {
  console.log(req.body)  
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
        db.User.create(userinfo)
          .then(user => {
            res.status(200).json({
              msg : 'Signup success'
            })
            console.log('New User: ', user.dataValues)
          })
          .catch(err => {
            next(err)
          })
      })
  }
})

export default router
