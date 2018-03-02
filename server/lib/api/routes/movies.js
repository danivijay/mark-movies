import express from 'express'
const router = express.Router()

import checkAuth from '../policies/check-auth'

router.get('/', (req, res, next) => {
  res.status(200).json({
    msg : 'get movies'
  })
})


router.post('/', checkAuth, (req, res, next) => {
  console.log(req.userData)
  const movie = {
    movieId: req.body.movieId,
    title: req.body.title,
    imgUrl: req.body.imgUrl,
    releaseDate: req.body.releaseDate,
    UserId: req.userData.userId
  }
  res.status(200).json({
    msg : 'success',
    movie: movie
  })
})

router.delete('/:movieId', (req, res, next) => {
  res.status(200).json({
    msg : 'delete movies'
  })
})

export default router
