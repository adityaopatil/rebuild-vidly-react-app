import httpService from "./httpService";
import config from "./config.json";

const movieAPI = config.vidlyAPI + "/movies";

export function getMovies() {
  return httpService.get(movieAPI);
}

export function getMovie(id) {
  return httpService.get(movieAPI + "/" + id);
}

export function deleteMovie(id) {
  return httpService.delete(`${config.vidlyAPI}/movies/${id}`);
}

function movieSchema(movie) {
  const m = {
    title: movie.title,
    numberInStock: movie.numberInStock,
    dailyRentalRate: movie.dailyRentalRate,
    liked: movie.liked,
    genreId: movie.genreId,
  };
  return m;
}

export function saveMovie(movie) {
  let movieInDb = {};
  if (!movie._id) {
    movieInDb = movieSchema(movie);
    return httpService
      .post(`${config.vidlyAPI}/movies`, movieInDb)
      .then((res) => {
        return res.data;
      })
      .catch((ex) => console.log("Saving to DB failed", ex));
  } else {
    movieInDb = movieSchema(movie);
    return httpService
      .put(`${config.vidlyAPI}/movies/${movie._id}`, movieInDb)
      .then((res) => {
        return res.data;
      })
      .catch("Movie Update Failed");
  }
}
