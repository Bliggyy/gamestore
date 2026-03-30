import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchGameById, deleteGame } from "../api/game";
import DeleteModal from "../components/DeleteModal";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;

export default function GameDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [gameDetails, setGameDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, toggleShowDeleteModal] = useState(false);
  const { user } = useAuth();
  const { addToCart } = useCart();

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

  const handleDeleteModal = async () => {
    toggleShowDeleteModal(true);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="game-details">
      <DeleteModal
        id={id}
        name={gameDetails.name}
        show={showDeleteModal}
        onHide={() => toggleShowDeleteModal(false)}
        deleteFunction={deleteGame}
        redirectPath={"/games"}
      />
      <div className="d-flex justify-content-between align-items-center mb-4 w-100">
        <h1 className="mb-0">{gameDetails.name}</h1>

        <div className="d-flex gap-2">
          <button
            onClick={() => {
              addToCart(gameDetails);
            }}
            className="btn btn-success"
          >
            Add to Cart
          </button>
          {user && ["Admin", "Manager"].includes(user.role) && (
            <>
              <button onClick={handleEdit} className="btn btn-primary">
                Edit
              </button>
              <button onClick={handleDeleteModal} className="btn btn-danger">
                Delete
              </button>
            </>
          )}
        </div>
      </div>

      <div className="details-content">
        <img
          src={
            gameDetails.imageUrl
              ? `${API_BASE_URL}${gameDetails.imageUrl}`
              : `https://static.photos/gaming/320x240`
          }
          alt={gameDetails.name}
          className="w-50 h-50 mw-50 mh-50 mb-3"
        />
        <div className="game-info">
          <p>
            <strong>Genre:</strong> {gameDetails.genre.name}
          </p>
          <p>
            <strong>Price:</strong> ${gameDetails.price}
          </p>
          <p>
            <strong>Release Date:</strong> {gameDetails.releaseDate}
          </p>
        </div>
      </div>
    </div>
  );
}
