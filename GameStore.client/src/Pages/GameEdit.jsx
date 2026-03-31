import { useState, useEffect } from "react";
import ErrorPopup from "../components/ErrorPopup";
import GameForm from "../components/GameForm";
import { fetchGenres } from "../api/genre";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { updateGame } from "../api/game";
import { useNotification } from "../context/NotificationContext";

export default function GameEdit() {
  const location = useLocation();
  const { id } = useParams();
  const game = location.state?.game || {};

  const [formData, setFormData] = useState({
    name: game.name || "",
    genreId: game.genre.id || "",
    price: game.price || "",
    releaseDate: game.releaseDate || "",
    image: game.image || "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [genres, setGenres] = useState([]);
  const navigate = useNavigate();
  const { addNotification } = useNotification();

  useEffect(() => {
    const loadGenres = async () => {
      try {
        const genres = await fetchGenres();
        setGenres(genres);
      } catch (err) {
        setError("Failed to load genres");
      }
    };
    loadGenres();
  }, []);

  const handleChange = (e) => {
    const { name, type, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        if (formData[key]) {
          formDataToSend.append(key, formData[key]);
        }
      });

      await updateGame(id, formDataToSend);
      addNotification("Game updated successfully!");
      navigate("/games");
    } catch (err) {
      setError(err.message);
      addNotification(err.message, "danger");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="form-group">
        <h2>Edit Game</h2>
        {error && <ErrorPopup message={error} />}
        <GameForm
          type="update"
          formData={formData}
          genres={genres}
          loading={loading}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
