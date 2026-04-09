import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import GameMenu from "../components/OwnedGamesMenu";
import { fetchOwnedGames } from "../api/game";

const API_BASE = "https://your-api.com"; // e.g. "https://api.mygamestore.com"
const OWNED_GAMES_ENDPOINT = `${API_BASE}/users/me/games`; // GET  → returns array of games
const REMOVE_GAME_ENDPOINT = (id) => `${API_BASE}/users/me/games/${id}`; // DELETE

export default function MyGamesPage() {
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [removing, setRemoving] = useState(null); // id of game currently being removed

  // ── Helpers ──────────────────────────────────────────────────────────────────
  const authHeaders = () => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  });

  // ── Fetch owned games on mount ────────────────────────────────────────────────
  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetchOwnedGames(user.username);
        setGames(res);
      } catch (err) {
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  // ── Remove a game ─────────────────────────────────────────────────────────────
  const handleRemove = async (id) => {
    setRemoving(id);
    try {
      const res = await fetch(REMOVE_GAME_ENDPOINT(id), {
        method: "DELETE",
        headers: authHeaders(),
      });

      if (!res.ok) {
        throw new Error(`Failed to remove game (${res.status})`);
      }

      setGames((prev) => prev.filter((g) => g.id !== id));
    } catch (err) {
      alert(`Could not remove game: ${err.message}`);
    } finally {
      setRemoving(null);
    }
  };

  const filtered = games.filter(
    (g) =>
      g.title.toLowerCase().includes(search.toLowerCase()) ||
      (g.genre && g.genre.toLowerCase().includes(search.toLowerCase())),
  );

  // ── Loading state ─────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div
        className="min-vh-100 d-flex align-items-center justify-content-center"
        style={{ backgroundColor: "#f4f6f9" }}
      >
        <div className="text-center">
          <div
            className="spinner-border text-danger mb-3"
            style={{ width: "3rem", height: "3rem" }}
            role="status"
          >
            <span className="visually-hidden">Loading…</span>
          </div>
          <p className="text-muted">Loading your games…</p>
        </div>
      </div>
    );
  }

  // ── Error state ───────────────────────────────────────────────────────────────
  if (error) {
    return (
      <div
        className="min-vh-100 d-flex align-items-center justify-content-center"
        style={{ backgroundColor: "#f4f6f9" }}
      >
        <div className="text-center">
          <div className="fs-1 mb-3">⚠️</div>
          <h5 className="fw-bold text-dark mb-2">Failed to load games</h5>
          <p className="text-muted mb-4">{error}</p>
          <button
            className="btn btn-danger px-4"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // ── Empty library ─────────────────────────────────────────────────────────────
  if (games.length === 0) {
    return (
      <div
        className="min-vh-100 d-flex justify-content-center"
        style={{ backgroundColor: "#f4f6f9" }}
      >
        <div className="text-center mt-5">
          <div className="mb-3 fs-1">🎮</div>
          <h4 className="fw-bold text-dark mb-2">No games yet</h4>
          <p className="text-muted mb-4">
            Games you purchase will appear here.
          </p>
          <button className="btn btn-danger px-4" onClick={() => navigate("/")}>
            Browse Games
          </button>
        </div>
      </div>
    );
  }

  // ── Main render ───────────────────────────────────────────────────────────────
  return (
    <div className="min-vh-100 py-5" style={{ backgroundColor: "#f4f6f9" }}>
      <div className="container" style={{ maxWidth: 860 }}>
        {/* Header */}
        <div className="d-flex align-items-center gap-3 mb-4">
          <button
            className="btn btn-outline-dark btn-sm"
            onClick={() => navigate(-1)}
          >
            ← Back
          </button>
          <div>
            <h2 className="fw-bold text-dark mb-0">My Games</h2>
            <p className="text-muted small mb-0">
              {games.length} game{games.length !== 1 && "s"} in your library
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="mb-4">
          <input
            type="text"
            className="form-control rounded-3 border-0 shadow-sm"
            placeholder="🔍  Search by title or genre…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ backgroundColor: "#fff", padding: "0.65rem 1rem" }}
          />
        </div>

        {/* No search results */}
        {filtered.length === 0 ? (
          <div className="text-center py-5 text-muted">
            <div className="fs-3 mb-2">🔍</div>
            <p>No games match your search.</p>
          </div>
        ) : (
          <div
            className="card border-0 rounded-4 shadow-sm overflow-hidden"
            style={{ backgroundColor: "#fff" }}
          >
            <ul className="list-group list-group-flush">
              {filtered.map((game, index) => (
                <li
                  key={game.id}
                  className="list-group-item px-4 py-3 d-flex align-items-center gap-3"
                  style={{
                    cursor: removing === game.id ? "default" : "pointer",
                    backgroundColor: "#fff",
                    borderBottom:
                      index < filtered.length - 1
                        ? "1px solid #f1f3f5"
                        : "none",
                    transition:
                      "background-color 0.15s ease, opacity 0.2s ease",
                    opacity: removing === game.id ? 0.5 : 1,
                  }}
                  onClick={() =>
                    removing !== game.id && navigate(`/games/${game.id}`)
                  }
                  onMouseEnter={(e) => {
                    if (removing !== game.id)
                      e.currentTarget.style.backgroundColor = "#f8f9fa";
                  }}
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "#fff")
                  }
                >
                  {/* Thumbnail */}
                  <img
                    src={
                      game.image ||
                      `https://placehold.co/80x80/dee2e6/495057?text=${game.title.slice(0, 2)}`
                    }
                    alt={game.title}
                    width={56}
                    height={56}
                    className="rounded-3 object-fit-cover flex-shrink-0"
                    style={{ border: "2px solid #e9ecef" }}
                  />

                  {/* Title & genre */}
                  <div className="flex-grow-1 min-w-0">
                    <div className="text-dark fw-semibold text-truncate">
                      {game.title}
                    </div>
                    {game.genre && (
                      <span
                        className="badge rounded-pill mt-1"
                        style={{
                          backgroundColor: "#f1f3f5",
                          color: "#6c757d",
                          fontWeight: 500,
                          fontSize: "0.72rem",
                        }}
                      >
                        {game.genre}
                      </span>
                    )}
                  </div>

                  {/* Price */}
                  <div className="text-danger fw-bold me-3 flex-shrink-0">
                    ${game.price.toFixed(2)}
                  </div>

                  {/* Triple-dot menu or removing spinner */}
                  {removing === game.id ? (
                    <div
                      className="spinner-border spinner-border-sm text-danger"
                      role="status"
                    >
                      <span className="visually-hidden">Removing…</span>
                    </div>
                  ) : (
                    <GameMenu gameId={game.id} onRemove={handleRemove} />
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
