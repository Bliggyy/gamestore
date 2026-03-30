import { useState, useEffect } from "react";
import { fetchGenres } from "../api/genre";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import ErrorPopup from "../components/ErrorPopup";
import { useAuth } from "../context/AuthContext";

export default function Genres() {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    loadGenres();
  }, []);

  const loadGenres = async () => {
    try {
      setLoading(true);
      const fetchedGenres = await fetchGenres();
      setGenres(fetchedGenres);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGenreClick = (genre) => {
    navigate(`/games/?genre=${genre.name}`);
  };

  const handleEditClick = (genre, id) => {
    navigate(`/genres/edit/${id}`, { state: { currentGenre: genre, id: id } });
  };

  return (
    <div>
      <h1 className="mb-4">Genres</h1>
      <div className="d-flex flex-column gap-3 w-100">
        {error ? (
          <ErrorPopup message={error} />
        ) : loading ? (
          <Loading />
        ) : genres.length > 0 ? (
          genres.map((genre) => (
            <div
              key={genre.id}
              className="p-3 border rounded w-100 hover-lift d-flex justify-content-between align-items-center"
              onClick={() => handleGenreClick(genre)}
            >
              {genre.name}
              {user && user.role == "Admin" && (
                <div
                  className="d-flex gap-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    className="btn btn-warning"
                    onClick={(e) => handleEditClick(genre.name, genre.id)}
                  >
                    Edit
                  </button>
                  <button className="btn btn-danger">Delete</button>
                </div>
              )}
            </div>
          ))
        ) : (
          <h2>No genres found</h2>
        )}
      </div>
    </div>
  );
}
