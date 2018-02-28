export default (sequelize, DataTypes) => {
  const Movie = sequelize.define('Movie', {
    movieId: DataTypes.STRING,
    title: DataTypes.STRING,
    imgUrl: DataTypes.STRING,
    releaseDate: DataTypes.STRING
  })

  return Movie
}
