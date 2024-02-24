import React, { useEffect, useState } from "react";
import Input from "./common/Input";
import DropDownList from "./common/DropDownList";
import { useParams, useNavigate } from "react-router-dom";
import { getMovie, saveMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";
import {
  validateForm,
  validateIndividualProperty,
} from "../services/validateForm";
import Joi from "joi-browser";

const MovieForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState({
    liked: false,
    numberInStock: "",
    title: "",
    dailyRentalRate: "",
    genreId: "",
  });

  const [errors, setErrors] = useState({});
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    if (id !== "new") {
      getMovie(id)
        .then((res) => {
          const movieData = res.data;
          const movieObj = {
            _id: movieData._id,
            genreId: movieData.genre._id,
            liked: movieData.liked,
            numberInStock: movieData.numberInStock,
            title: movieData.title,
            dailyRentalRate: movieData.dailyRentalRate,
          };
          setMovie(movieObj);
        })
        .catch((ex) => {
          console.log("Error", ex);
          navigate("/not-found");
        });
    }
  }, [id, navigate]);

  useEffect(() => {
    getGenres().then((res) => {
      const allGenres = res.data;
      setGenres([...allGenres]);
    });
  }, []);

  const schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    liked: Joi.boolean(),
    numberInStock: Joi.number().required().min(0).label("Number In Stock"),
    dailyRentalRate: Joi.number().max(10).required().label("Rate"),
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const error = validateForm(movie, schema);

    if (error) {
      setErrors(error);
      return;
    }
    const newMovie = { ...movie };
    try {
      const result = await saveMovie(newMovie);
      console.log(result);
      navigate("/", { replace: true });
    } catch (ex) {
      console.error("Failed to save movie", ex);
    }
  };

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setMovie({ ...movie, [name]: value });

    const error = { ...errors };
    const errorMessage = validateIndividualProperty(name, value, schema);

    if (errorMessage) {
      error[name] = errorMessage;
    } else delete error[name];

    setErrors(error);
  };

  return (
    <div style={{ textAlign: "left" }} className="container m-4">
      <h1>Movies Form {id === "new" ? "" : id}</h1>
      <form onSubmit={handleSubmit}>
        <Input
          name="title"
          label="Title"
          value={movie.title}
          onChange={handleOnChange}
          type="text"
          error={errors.title}
        />
        <DropDownList
          label={"Genre"}
          name={"genreId"}
          value={movie.genreId}
          onChange={handleOnChange}
          optValue={genres}
          error={errors.genreId}
        />
        <Input
          name="numberInStock"
          label="Number In Stock"
          value={movie.numberInStock}
          onChange={handleOnChange}
          type="number"
          error={errors.numberInStock}
        />
        <Input
          name="dailyRentalRate"
          label="Rate"
          value={movie.dailyRentalRate}
          onChange={handleOnChange}
          type="number"
          error={errors.dailyRentalRate}
        />
      </form>

      <button
        onClick={handleSubmit}
        disabled={validateForm(movie, schema)}
        type="submit"
        className="btn btn-primary"
      >
        Save
      </button>
    </div>
  );
};

export default MovieForm;
