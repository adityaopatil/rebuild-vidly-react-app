import { Link, NavLink } from "react-router-dom";

const NavBar = ({ user }) => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand" href="#">
          Vidly
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                to="/movies"
                className="nav-link "
                aria-current="page"
                href="#"
              >
                Movies
              </NavLink>
            </li>
            <li className="nav-item">
              {user && (
                <NavLink to="/customers" className="nav-link" href="#">
                  Customers
                </NavLink>
              )}
            </li>
            <li className="nav-item">
              {user && (
                <NavLink to="/rentals" className="nav-link" href="#">
                  Rentals
                </NavLink>
              )}
            </li>
            <li className="nav-item">
              {!user && (
                <NavLink to="/login" className="nav-link" href="#">
                  Login
                </NavLink>
              )}
            </li>
            <li className="nav-item">
              {!user && (
                <NavLink to="/register" className="nav-link" href="#">
                  Register
                </NavLink>
              )}
            </li>
            <li className="nav-item">
              {user && (
                <NavLink to="/profile" className="nav-link" href="#">
                  {user.name}
                </NavLink>
              )}
            </li>
            <li className="nav-item">
              {user && (
                <NavLink to="/logout" className="nav-link" href="#">
                  Logout
                </NavLink>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
