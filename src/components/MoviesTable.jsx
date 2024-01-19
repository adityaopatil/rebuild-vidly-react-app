import React from "react";
import { faSortUp } from "@fortawesome/free-solid-svg-icons";
import { faSortDown } from "@fortawesome/free-solid-svg-icons";
import TableBody from "./common/TableBody";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MoviesTable = ({
  movies,
  onLike,
  onDelete,
  onSort,
  selectSortIcon,
  userData,
}) => {
  const setSortIconClass = (header) => {
    if (selectSortIcon.path !== header) return null;
    return selectSortIcon.order === "asc" ? (
      <FontAwesomeIcon icon={faSortUp} />
    ) : (
      <FontAwesomeIcon icon={faSortDown} />
    );
  };
  return (
    <table className="table">
      <thead>
        <tr>
          <th style={{ cursor: "pointer" }} onClick={() => onSort("title")}>
            Title {setSortIconClass("title")}
          </th>
          <th
            style={{ cursor: "pointer" }}
            onClick={() => onSort("genre.name")}
          >
            Genre {setSortIconClass("genre.name")}
          </th>
          <th
            style={{ cursor: "pointer" }}
            onClick={() => onSort("numberInStock")}
          >
            Stock {setSortIconClass("numberInStock")}
          </th>
          <th
            style={{ cursor: "pointer" }}
            onClick={() => onSort("dailyRentalRate")}
            // colSpan={2}
          >
            Rate {setSortIconClass("dailyRentalRate")}
          </th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <TableBody
        userData={userData}
        items={movies}
        onLike={onLike}
        onDelete={onDelete}
      />
    </table>
  );
};

export default MoviesTable;
