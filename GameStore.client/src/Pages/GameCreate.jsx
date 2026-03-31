import { useState, useEffect } from "react";
import ErrorPopup from "../components/ErrorPopup";
import GameForm from "../components/GameForm";
import { fetchGenres } from "../api/genre";
import { useNavigate } from "react-router-dom";
import { createGame } from "../api/game";
import { useNotification } from "../context/NotificationContext";

export default function GameCreate() {
  const [formData, setFormData] = useState({
    name: "",
    genreId: "",
    price: "",
    releaseDate: "",
    image: "",
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

      await createGame(formDataToSend);
      setFormData({
        name: "",
        genreId: "",
        price: "",
        releaseDate: "",
        image: "",
      });
      addNotification("Game created successfully!");
      navigate("/games");
    } catch (err) {
      setError(err.message);
      addNotification(err.message, "danger");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-group">
      <h2>Add New Game</h2>
      {error && <ErrorPopup message={error} />}
      <GameForm
        formData={formData}
        genres={genres}
        loading={loading}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
