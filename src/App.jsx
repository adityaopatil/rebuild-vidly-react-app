import { getCurrentUser } from "./services/authService";
import { useState } from "react";
import { useEffect } from "react";
import NavBar from "./components/NavBar";
import { Navigate, Route, Routes } from "react-router-dom";
import RegisterUser from "./components/RegisterUser";
import FormLogin from "./components/FormLogin";
import Logout from "./components/Logout";
import MovieForm from "./components/MovieForm";
import Customers from "./components/Customers";
import Rentals from "./components/Rentals";
import Movies from "./components/Movies";
import NotFound from "./components/NotFound";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userToken = getCurrentUser();
    setUser(userToken);
  }, []);

  const isAuthenticated = getCurrentUser();
  return (
    <main className="app-container">
      <NavBar user={user} />
      <Routes>
        <Route path="/register" Component={RegisterUser} />
        <Route path="/login" Component={FormLogin} />
        <Route path="/logout" Component={Logout} />
        <Route path="/customers" Component={Customers} />
        <Route path="/rentals" Component={Rentals} />
        <Route path="/not-found" Component={NotFound} />
        <Route path="*" Component={() => <Navigate to="/not-found" />} />
        <Route path="/" element={<Movies user={user} />} />
        <Route
          path="/:id"
          element={isAuthenticated ? <MovieForm /> : <Navigate to="/login" />}
        />
        {/* <Route path="/" element={<Navigate to="/movies" />} /> */}
      </Routes>
    </main>
  );
}

export default App;
