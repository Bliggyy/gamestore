import { useEffect, useState } from "react";
import ErrorPopup from "../components/ErrorPopup";
import { fetchGames } from "../api/game";
import { useSearchParams } from "react-router-dom";
import Loading from "../components/Loading";
import GameCard from "../components/GameCard";

export default function Games() {
  const [games, setGames] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadGames();
  }, []);

  const loadGames = async () => {
    try {
      setLoading(true);
      const fetchedGames = await fetchGames(searchParams.get("genre"));
      setGames(fetchedGames);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 py-5" style={{ backgroundColor: "#f4f6f9" }}>
      <div className="container" style={{ maxWidth: 1100 }}>
        {/* Header */}
        <div className="d-flex align-items-center justify-content-between mb-4">
          {searchParams.get("genre") && (
            <span className="badge bg-opacity-10 text-danger px-3 py-2 fs-1">
              {searchParams.get("genre")} Games
            </span>
          )}
          <h2 className="badge bg-opacity-10 text-danger px-3 py-2 fs-1">
            Games
          </h2>
        </div>

        {/* Content */}
        {error ? (
          <ErrorPopup message={error} />
        ) : loading ? (
          <Loading />
        ) : games.length > 0 ? (
          <div className="row g-4">
            {games.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        ) : (
          <div className="text-center py-5">
            <div className="mb-3 fs-1">🎮</div>
            <h4 className="fw-bold text-dark mb-2">No games found</h4>
            <p className="text-muted">
              Try a different genre or check back later.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
