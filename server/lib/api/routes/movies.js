import express from 'express'
const router = express.Router()

import checkAuth from '../policies/check-auth'
import db from '../models'

router.get('/', checkAuth, (req, res, next) => {
  const UserId = req.userData.userId
  db.Movie.findAll({
    where: {
      UserId
    }
  }).then(movies => {
    if(!movies) {
      const err = new Error('No movies found')
      err.status = 400
      next(err)
    }
    res.status(200).json({
      movies
    })
  }).catch(err => {
    next(err)
  })
})


router.post('/', checkAuth, (req, res, next) => {
  const movie = {
    movieId: req.body.movieId,
    title: req.body.title,
    imgUrl: req.body.imgUrl,
    releaseDate: req.body.releaseDate,
    UserId: req.userData.userId
  }
  db.Movie.create(movie)
    .then(movie => {
      console.log(movie)
      res.status(200).json({
        msg : 'Movie added',
        movie: movie.dataValues
      })
    }).catch(err => {
      next(err)
    })
})

router.delete('/:movieId', (req, res, next) => {
  res.status(200).json({
    msg : 'delete movies'
  })
})

export default router
