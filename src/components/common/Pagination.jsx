import React from "react";

function createRangeArray(pagesCount) {
  let rangeArray = [];
  for (let i = 1; i <= pagesCount; i++) {
    rangeArray.push(i);
  }
  return rangeArray;
}

const Pagination = ({ totalPages, pageSize, currentPage, onPageChange }) => {
  const pagesCount = Math.ceil(totalPages / pageSize);
  let pages = createRangeArray(pagesCount);

  if (totalPages === 0) return null;

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {pages.map((page) => (
          <li
            key={page}
            className={currentPage === page ? "page-item active" : "page-item"}
          >
            <a
              onClick={() => {
                onPageChange(page);
              }}
              className="page-link"
              href="#"
            >
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
