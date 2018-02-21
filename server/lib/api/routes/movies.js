import express from 'express'
const router = express.Router()

router.get('/', (req, res, next) => {
  res.status(200).json({
    msg : 'get movies'
  })
})


router.post('/', (req, res, next) => {
  res.status(200).json({
    msg : 'post movies'
  })
})

router.delete('/', (req, res, next) => {
  res.status(200).json({
    msg : 'delete movies'
  })
})

export default router
