import { Routes, Route, Link } from "react-router-dom";
import "./App.css";

function Genres() {
  return <h1>Genres List</h1>;
}

function Games() {
  return <h1>Games List</h1>;
}

function GameDetails() {
  return <h1>Game Details</h1>;
}

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
      <div className="content">
        <Routes>
          <Route path="/" element={<h1>Welcome to GameStore!</h1>} />
          <Route path="/games" element={<Games />} />
          <Route path="/genres" element={<Genres />} />
          <Route path="/games/:id" element={<GameDetails />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
