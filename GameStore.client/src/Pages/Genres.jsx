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
  const [hoveredId, setHoveredId] = useState(null);
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

  const handleGenreClick = (genre) => navigate(`/games/?genre=${genre.name}`);
  const handleEditClick = (genre, id) =>
    navigate(`/genres/edit/${id}`, { state: { currentGenre: genre, id } });

  return (
    <div className="min-vh-100 py-5" style={{ backgroundColor: "#f4f6f9" }}>
      <div className="container" style={{ maxWidth: 1000 }}>
        <div className="d-flex align-items-center justify-content-between mb-4">
          <div>
            <h2 className="fw-bold text-dark mb-0">Genres</h2>
            {!loading && !error && (
              <p className="text-muted small mb-0 mt-1">
                {genres.length} genre{genres.length !== 1 && "s"} available
              </p>
            )}
          </div>
          {!loading && !error && (
            <span className="badge bg-danger bg-opacity-10 text-danger px-3 py-2 rounded-pill fs-6">
              {genres.length} total
            </span>
          )}
        </div>
        {error ? (
          <ErrorPopup message={error} />
        ) : loading ? (
          <Loading />
        ) : genres.length > 0 ? (
          <div className="d-flex flex-column gap-3">
            {genres.map((genre) => (
              <div
                key={genre.id}
                className="card border-0 rounded-4 px-4 py-3 d-flex flex-row justify-content-between align-items-center"
                onClick={() => handleGenreClick(genre)}
                onMouseEnter={() => setHoveredId(genre.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{
                  backgroundColor:
                    hoveredId === genre.id ? "#fdf1f2" : "#eef0f4",
                  cursor: "pointer",
                  transition:
                    "background-color .2s, transform .2s, box-shadow .2s",
                  transform:
                    hoveredId === genre.id
                      ? "translateY(-2px)"
                      : "translateY(0)",
                  boxShadow:
                    hoveredId === genre.id
                      ? "0 6px 20px rgba(220,53,69,.10)"
                      : "none",
                }}
              >
                <div className="d-flex align-items-center gap-3">
                  <span
                    className="rounded-3 d-flex align-items-center justify-content-center"
                    style={{
                      width: 36,
                      height: 36,
                      backgroundColor:
                        hoveredId === genre.id
                          ? "rgba(220,53,69,.12)"
                          : "rgba(0,0,0,.06)",
                      transition: "background-color .2s",
                    }}
                  >
                    <i
                      className="bi bi-controller"
                      style={{
                        color: hoveredId === genre.id ? "#dc3545" : "#6c757d",
                        transition: "color .2s",
                      }}
                    />
                  </span>
                  <span
                    className="fw-semibold"
                    style={{
                      color: hoveredId === genre.id ? "#dc3545" : "#212529",
                      transition: "color .2s",
                    }}
                  >
                    {genre.name}
                  </span>
                </div>

                <div
                  className="d-flex align-items-center gap-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  {user && user.role === "Admin" && (
                    <>
                      <button
                        className="btn btn-sm border-0 rounded-3 fw-semibold"
                        onClick={() => handleEditClick(genre.name, genre.id)}
                        style={{
                          backgroundColor: "rgba(255,193,7,.15)",
                          color: "#b45309",
                          transition: "background-color .2s",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.backgroundColor =
                            "rgba(255,193,7,.30)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.backgroundColor =
                            "rgba(255,193,7,.15)")
                        }
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm border-0 rounded-3 fw-semibold"
                        style={{
                          backgroundColor: "rgba(220,53,69,.12)",
                          color: "#dc3545",
                          transition: "background-color .2s",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.backgroundColor =
                            "rgba(220,53,69,.25)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.backgroundColor =
                            "rgba(220,53,69,.12)")
                        }
                      >
                        Delete
                      </button>
                    </>
                  )}
                  <i
                    className="bi bi-chevron-right"
                    style={{
                      color: hoveredId === genre.id ? "#dc3545" : "#adb5bd",
                      transition: "color .2s",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-5">
            <div className="mb-3 fs-1">🎮</div>
            <h4 className="fw-bold text-dark mb-2">No genres found</h4>
            <p className="text-muted">Check back later for available genres.</p>
          </div>
        )}
      </div>
    </div>
  );
}
