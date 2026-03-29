import { useState } from "react";
import ErrorPopup from "../components/ErrorPopup";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../context/NotificationContext";
import GenreForm from "../components/GenreForm";
import { createGenre } from "../api/genre";

export default function GenreCreate() {
  const [genre, setGenre] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { addNotification } = useNotification();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await createGenre(genre);
      setGenre("");
      addNotification("Genre created successfully!");
      navigate("/genres");
    } catch (err) {
      setError(err.message);
      addNotification(err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setGenre(e.target.value);
  };

  return (
    <div className="form-group">
      <h2>Add New Genre</h2>
      {error && <ErrorPopup message={error} />}
      <GenreForm
        genre={genre}
        handleChange={handleChange}
        loading={loading}
        handleSubmit={handleSubmit}
        type="create"
      />
    </div>
  );
}
