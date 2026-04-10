import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchGameById, deleteGame } from "../api/game";
import { saveCartDetails } from "../api/cart";
import DeleteModal from "../components/DeleteModal";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useNotification } from "../context/NotificationContext";
import Loading from "../components/Loading";

const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;

export default function GameDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [gameDetails, setGameDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, toggleShowDeleteModal] = useState(false);
  const { user } = useAuth();
  const { addToCart, cartItems } = useCart();
  const { addNotification } = useNotification();

  useEffect(() => {
    const loadGame = async () => {
      try {
        setLoading(true);
        const gameData = await fetchGameById(id);
        setGameDetails(gameData);
      } catch (error) {
        console.error("Error fetching game details:", error);
      } finally {
        setLoading(false);
      }
    };
    loadGame();
  }, [id]);

  const handleEdit = () => {
    navigate(`/games/edit/${id}`, { state: { game: gameDetails } });
  };
  const handleDeleteModal = () => {
    toggleShowDeleteModal(true);
  };

  const handleAddToCart = async () => {
    if (cartItems.some((item) => item.id === gameDetails.id)) {
      addNotification(`${gameDetails.name} is already in the cart.`, "warning");
      return;
    }

    const response = await saveCartDetails(
      JSON.stringify({ gameId: gameDetails.id, username: user.username }),
    );

    if (!response.ok) {
      addNotification("Failed to add to cart. Please try again.", "danger");
      return;
    }

    addToCart(gameDetails);
    addNotification(`${gameDetails.name} added to the cart.`, "success");
  };

  const alreadyInCart =
    gameDetails && cartItems.some((item) => item.id === gameDetails.id);

  if (loading) {
    return (
      <div
        className="min-vh-100 d-flex align-items-center justify-content-center"
        style={{ backgroundColor: "#f4f6f9" }}
      >
        <Loading />
      </div>
    );
  }

  return (
    <div className="min-vh-100 py-5" style={{ backgroundColor: "#f4f6f9" }}>
      <DeleteModal
        id={id}
        name={gameDetails.name}
        show={showDeleteModal}
        onHide={() => toggleShowDeleteModal(false)}
        deleteFunction={deleteGame}
        redirectPath="/games"
      />

      <div className="container" style={{ maxWidth: 860 }}>
        <div className="mb-4">
          <button
            className="btn btn-outline-dark btn-sm mb-3"
            onClick={() => navigate(-1)}
          >
            ← Back
          </button>
          <div className="d-flex align-items-center gap-3">
            <div>
              <h2 className="fw-bold text-dark mb-0 fs-1">
                {gameDetails.name}
              </h2>
            </div>
          </div>
        </div>
        <div className="rounded-4 overflow-hidden mb-4" style={{ height: 380 }}>
          <img
            src={
              gameDetails.imageUrl
                ? `${API_BASE_URL}${gameDetails.imageUrl}`
                : `https://static.photos/gaming/320x240`
            }
            alt={gameDetails.name}
            className="w-100 h-100"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="row g-4">
          <div className="col-lg-7">
            <div
              className="card border-0 rounded-4 p-4 h-100"
              style={{ backgroundColor: "#eef0f4" }}
            >
              <h6
                className="text-muted text-uppercase fw-bold small mb-3"
                style={{ letterSpacing: ".08em" }}
              >
                About this game
              </h6>
              <p className="text-dark mb-4" style={{ lineHeight: 1.7 }}>
                {gameDetails.description ||
                  "No description available for this title."}
              </p>

              <div className="d-flex flex-column gap-2 mt-auto">
                {[
                  { label: "Genre", value: gameDetails.genre.name },
                  { label: "Release Date", value: gameDetails.releaseDate },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className="d-flex bg-secondary bg-opacity-10 justify-content-between align-items-center px-3 py-2 rounded-3"
                  >
                    <span className="text-muted small fw-semibold">
                      {label}
                    </span>
                    <span className="text-dark fw-semibold small">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-lg-5">
            <div
              className="card border-0 rounded-4 p-4 sticky-top"
              style={{ backgroundColor: "#eef0f4", top: 24 }}
            >
              <h6
                className="text-muted text-uppercase fw-bold small mb-3"
                style={{ letterSpacing: ".08em" }}
              >
                Pricing
              </h6>

              <div className="mb-1">
                <span
                  className="text-danger fw-bold"
                  style={{ fontSize: "2.4rem", lineHeight: 1 }}
                >
                  ${Number(gameDetails.price).toFixed(2)}
                </span>
              </div>
              <p className="text-muted small mb-4">
                One-time purchase. No subscription required.
              </p>

              <hr className="border-secondary mb-4" />

              {user ? (
                <button
                  className="btn w-100 py-3 fw-bold fs-5 rounded-3 mb-2"
                  onClick={handleAddToCart}
                  disabled={alreadyInCart}
                  style={{
                    backgroundColor: alreadyInCart
                      ? "rgba(0,0,0,.07)"
                      : "#dc3545",
                    color: alreadyInCart ? "#6c757d" : "#fff",
                    border: "none",
                    letterSpacing: ".3px",
                    transition: "opacity .2s",
                  }}
                >
                  <i
                    className={`bi ${alreadyInCart ? "bi-cart-check" : "bi-cart-plus"} me-2`}
                  />
                  {alreadyInCart ? "Already in Cart" : "Add to Cart"}
                </button>
              ) : (
                <button
                  className="btn w-100 py-3 fw-bold fs-5 rounded-3 mb-2"
                  onClick={() => navigate("/login")}
                  style={{
                    backgroundColor: "#dc3545",
                    color: "#fff",
                    border: "none",
                  }}
                >
                  Login to Purchase
                </button>
              )}

              {user && ["Admin", "Manager"].includes(user.role) && (
                <>
                  <hr className="border-secondary my-3" />
                  <p
                    className="text-muted small fw-semibold text-uppercase mb-2"
                    style={{ letterSpacing: ".08em" }}
                  >
                    Admin Actions
                  </p>
                  <div className="d-flex gap-2">
                    <button
                      className="btn flex-grow-1 border-0 rounded-3 fw-semibold"
                      onClick={handleEdit}
                      style={{
                        backgroundColor: "rgba(255,193,7,.15)",
                        color: "#b45309",
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
                      <i className="bi bi-pencil me-1" /> Edit
                    </button>
                    <button
                      className="btn flex-grow-1 border-0 rounded-3 fw-semibold"
                      onClick={handleDeleteModal}
                      style={{
                        backgroundColor: "rgba(220,53,69,.12)",
                        color: "#dc3545",
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
                      <i className="bi bi-trash me-1" /> Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
