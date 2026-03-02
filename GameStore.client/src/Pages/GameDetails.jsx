import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchGameById } from "../api/game";

const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;

export default function GameDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadGame = async () => {
      try {
        setLoading(true);
        const gameData = await fetchGameById(id);
        setGame(gameData);
      } catch (error) {
        console.error("Error fetching game details:", error);
      } finally {
        setLoading(false);
      }
    };
    loadGame();
  }, [id]);

  const handleEdit = () => {
    // TODO: Implement edit functionality
  };

  const handleDelete = async () => {
    // TODO: Implement delete functionality here
  };

  if (loading) return <div>Loading...</div>;
  if (!game) return <div>Game not found</div>;

  return (
    <div className="game-details">
      <div className="details-header">
        <h1>{game.name}</h1>
        <div className="action-buttons">
          <button onClick={handleEdit} className="btn btn-primary">
            Edit
          </button>
          <button onClick={handleDelete} className="btn btn-danger">
            Delete
          </button>
        </div>
      </div>

      <div className="details-content">
        <img
          src={
            game.imageUrl
              ? `${API_BASE_URL}${game.imageUrl}`
              : `https://static.photos/gaming/320x240`
          }
          alt={game.name}
          className="game-image"
        />
        <div className="game-info">
          <p>
            <strong>Genre:</strong> {game.genre}
          </p>
          <p>
            <strong>Price:</strong> ${game.price}
          </p>
          <p>
            <strong>Release Date:</strong> {game.releaseDate}
          </p>
        </div>
      </div>
    </div>
  );
}
