import express from 'express'
const router = express.Router()

router.get('/', (req, res, next) => {
  res.status(200).json({
    msg : 'get movies'
  })
})


router.post('/', (req, res, next) => {
  const movie = {
    movieId: req.body.movieId,
    title: req.body.title,
    imgUrl: req.body.imgUrl,
    releaseDate: req.body.releaseDate
  }
  res.status(200).json({
    msg : 'post movies',
    movie: movie
  })
})

router.delete('/:movieId', (req, res, next) => {
  res.status(200).json({
    msg : 'delete movies'
  })
})

export default router
