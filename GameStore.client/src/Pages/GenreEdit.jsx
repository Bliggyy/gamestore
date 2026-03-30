import { useState } from "react";
import ErrorPopup from "../components/ErrorPopup";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../context/NotificationContext";
import { useLocation, useParams } from "react-router-dom";
import GenreForm from "../components/GenreForm";
import { editGenre } from "../api/genre";

export default function GenreEdit() {
  const location = useLocation();
  const { id } = useParams();
  const currentGenre = location.state?.currentGenre || "";
  const [genre, setGenre] = useState(currentGenre);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { addNotification } = useNotification();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await editGenre(id, genre);
      setGenre("");
      addNotification("Genre edited successfully!");
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
      <h2>Edit Genre</h2>
      {error && <ErrorPopup message={error} />}
      <GenreForm
        genre={genre}
        handleChange={handleChange}
        loading={loading}
        handleSubmit={handleSubmit}
        type="edit"
      />
    </div>
  );
}
