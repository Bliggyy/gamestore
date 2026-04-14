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
  const [searchInput, setSearchInput] = useState(
    searchParams.get("search") ?? "",
  );

  useEffect(() => {
    const getData = setTimeout(() => {
      loadGames();
    }, 500);

    return () => clearTimeout(getData);
  }, [searchParams]);

  const loadGames = async () => {
    try {
      setLoading(true);
      const fetchedGames = await fetchGames(searchParams.get("genre"));
      const query = searchParams.get("search")?.toLowerCase() ?? "";
      const filtered = query
        ? fetchedGames.filter((g) => g.name.toLowerCase().includes(query))
        : fetchedGames;
      setGames(filtered);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (value) {
        next.set("search", value);
      } else {
        next.delete("search");
      }
      return next;
    });
  };

  return (
    <div className="min-vh-100 py-5" style={{ backgroundColor: "#f4f6f9" }}>
      <div className="container" style={{ maxWidth: 1100 }}>
        <div className="d-flex align-items-center justify-content-between mb-4">
          <div>
            <h2 className="fw-bold text-danger mb-0 fs-1">
              {searchParams.get("genre") != null
                ? searchParams.get("genre") + " "
                : ""}
              Games
            </h2>
            {!loading && !error && (
              <p className="text-muted small mb-0 mt-1">
                {games.length} title{games.length !== 1 && "s"} available
              </p>
            )}
          </div>

          <div className="position-relative" style={{ width: 260 }}>
            <i
              className="bi bi-search position-absolute top-50 translate-middle-y"
              style={{ left: 12, color: "#adb5bd", fontSize: 14 }}
            />
            <input
              type="text"
              className="form-control rounded-3 border-1"
              placeholder="Search games..."
              value={searchInput}
              onChange={handleSearch}
              style={{ backgroundColor: "#eef0f4", paddingLeft: 36 }}
            />
          </div>
        </div>

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
