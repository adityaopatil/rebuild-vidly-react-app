import React from "react";

const Genres = ({ currentGenre, genresList, selectGenre }) => {
  return (
    <>
      <ul className="list-group ">
        {genresList.map((genre) => (
          <li
            onClick={() => selectGenre(genre)}
            key={genre._id}
            className={
              currentGenre.name === genre.name
                ? "list-group-item text-left active"
                : "list-group-item text-left"
            }
            style={{ cursor: "pointer" }}
          >
            {genre.name}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Genres;
