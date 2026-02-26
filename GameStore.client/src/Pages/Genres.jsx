import { useState, useEffect } from "react";
import { fetchGenres } from "../api/genre";

export default function Genres() {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
            <div key={genre.id} className="p-3 border rounded w-100 hover-lift">
              {genre.name}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
