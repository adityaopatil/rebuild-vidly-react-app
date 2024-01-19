import React from "react";
import { Link } from "react-router-dom";
import CartButton from "./CartButton";
import Like from "./Like";

const TableBody = ({ items, onLike, onDelete, userData }) => {
  const isAdmin = userData && userData.isAdmin;

  return (
    <tbody>
      {items.map((item) => (
        <tr key={item._id}>
          <td>
            <Link style={{ textDecoration: "none" }} to={`/movies/${item._id}`}>
              {item.title}
            </Link>
          </td>
          <td>{item.genre.name}</td>
          <td>{item.numberInStock}</td>
          <td>{item.dailyRentalRate}</td>
          <td>
            <button className="btn" onClick={() => onLike(item)}>
              <Like isLiked={item.liked} />
            </button>
          </td>
          <td>
            <button type="button" className="btn btn-success">
              <CartButton /> Add to Cart
            </button>
          </td>
          <td>
            {isAdmin && (
              <button
                onClick={() => {
                  onDelete(item);
                }}
                className="btn btn-danger"
              >
                Delete
              </button>
            )}
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
