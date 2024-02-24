import React, { useState, useEffect } from "react";
import Genres from "./common/Genres";
import Pagination from "./common/Pagination";
import MoviesTable from "./MoviesTable";
import { getMovies, deleteMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";
import { paginate } from "../services/paginate";
import { Link } from "react-router-dom";
import _ from "lodash";
import sort from "../services/sort";

const Movies = ({ user }) => {
  const [movieList, setMoviesList] = useState([]);
  const [allGenres, setAllGenres] = useState([]);

  useEffect(() => {
    getMovies().then((res) => {
      setMoviesList(res.data);
    });
  }, [movieList]);

  useEffect(() => {
    getGenres().then((res) => {
      const genres = res.data;
      setAllGenres([{ _id: "", name: "All Genres" }, ...genres]);
    });
  }, []);

  const [currentPage, setcurrentPage] = useState(1);
  const [genres, setGenres] = useState({});
  const [selectedGenre, setSelectedGenre] = useState({});
  const [sortColumn, setsortColumn] = useState({ path: "", order: "asc" });
  const [searchQuery, setsearchQuery] = useState("");

  const pageSize = 4;

  const filteredMovies =
    selectedGenre && selectedGenre._id //If we have both genre and its id
      ? movieList.filter((m) => m.genre._id === selectedGenre._id)
      : movieList.filter((m) =>
          m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
        );

  const sorted = _.orderBy(
    filteredMovies,
    [sortColumn.path], //Here we specify the argument using what to sort e.g. name,rate,genre
    [sortColumn.order] //Here we specify asc or desc
  );

  const movies = paginate(sorted, currentPage, pageSize);
  // console.log(movies[0]._id);
  const totalPages = sorted.length;

  const handlePageChange = (page) => {
    setcurrentPage(page);
  };

  const handleGenreSelection = (genre) => {
    setcurrentPage(1); //When we jump between list group we should always start from the 1st page
    setSelectedGenre(genre);
    setGenres(genre);
    setsearchQuery("");
  };

  const handleDelete = async (movie) => {
    const originalMovies = [...movieList];
    try {
      const updatedMovies = movieList.filter((m) => m._id !== movie._id);
      setMoviesList(updatedMovies);
      await deleteMovie(movie._id);
    } catch (err) {
      setMoviesList(originalMovies);
      console.error("Error deleting movie:", err);
    }
  };

  const handleLike = (movie) => {
    const updateMovies = movieList.map((m) =>
      m._id === movie._id ? { ...movie, liked: !movie.liked } : m
    );
    setMoviesList(updateMovies);
  };

  const handleSort = (path) => {
    setsortColumn(sort(path, sortColumn));
  };

  const handleSearchQuery = (event) => {
    const { value } = event.target;
    setsearchQuery(value);
    setcurrentPage(1);
    setGenres({});
    setSelectedGenre({});
  };

  if (movieList.length === 0) {
    return (
      <>
        <p style={{ margin: 20 }}>{"There are no movies in the data"}</p>
        <Link to="/movies/new">
          <button className="btn btn-primary">Add New Movie</button>
        </Link>
      </>
    );
  }

  return (
    <div className="row">
      <div className="col-2 m-4">
        <Genres
          currentGenre={genres}
          genresList={allGenres}
          selectGenre={handleGenreSelection}
        />
      </div>
      <div className="col" style={{ margin: 30 }}>
        <Link to="/movies/new">
          {user && (
            <button style={{ marginBottom: 50 }} className="btn btn-primary">
              New Movie
            </button>
          )}
        </Link>
        <p>{`Showing ${totalPages} movies in the database`}</p>
        <input
          style={{ marginBottom: 20 }}
          type="text"
          className="form-control"
          placeholder="Search..."
          aria-label="Search..."
          value={searchQuery}
          onChange={handleSearchQuery}
        ></input>
        <MoviesTable
          userData={user}
          movies={movies}
          onLike={handleLike}
          onDelete={handleDelete}
          onSort={handleSort}
          selectSortIcon={sortColumn}
        />
        <Pagination
          pageSize={pageSize}
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Movies;
