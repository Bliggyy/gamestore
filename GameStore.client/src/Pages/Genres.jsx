import { useState, useEffect } from "react";
import { fetchGenres } from "../api/genre";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import ErrorPopup from "../components/ErrorPopup";

export default function Genres() {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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

  return (
    <div>
      <h1 className="mb-4">Genres</h1>
      <div className="d-flex flex-column gap-3 w-100">
        {error ? (
          <ErrorPopup message={error} />
        ) : loading ? (
          <Loading />
        ) : (
          genres.map((genre) => (
            <div
              key={genre.id}
              className="p-3 border rounded w-100 hover-lift"
              onClick={() => handleGenreClick(genre)}
            >
              {genre.name}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
