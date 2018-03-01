import express from 'express'
const router = express.Router()

router.post('/signup', (req, res, next) => {
  res.status(200).json({
    msg : 'reached signup'
  })
})

router.post('/signin', (req, res, next) => {
  res.status(200).json({
    msg : 'reached signin'
  })
})

export default router
