import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import { Games, GameForm, Genres, Home } from "./pages";

function App() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            GameStore
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/games" className="nav-link">
                  Games
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/genres" className="nav-link">
                  Genres
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* centered content area */}
      <div className="content p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/games" element={<Games />} />
          <Route path="/games/create" element={<GameForm />} />
          <Route path="/genres" element={<Genres />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
