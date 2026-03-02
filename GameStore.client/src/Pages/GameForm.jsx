import { useState, useEffect } from "react";
import ErrorPopup from "../components/ErrorPopup";
import { fetchGenres } from "../api/genre";
import { useNavigate } from "react-router-dom";
import { createGame } from "../api/game";

export default function CreateGame() {
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

    console.log(formData);

    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        if (formData[key]) {
          formDataToSend.append(key, formData[key]);
        }
      });

      console.log(formDataToSend);

      const response = await createGame(formDataToSend);
      console.log(response);

      if (!response.ok) {
        throw new Error("Failed to create game" + response);
      }

      setFormData({
        title: "",
        description: "",
        price: "",
        genre: "",
        releaseDate: "",
      });
      alert("Game created successfully!");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      useNavigate("/games");
    }
  };

  return (
    <div className="form-group">
      <h2>Add New Game</h2>
      {error && <ErrorPopup message={error} />}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control mb-3"
          name="name"
          placeholder="Game Title"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <select
          name="genreId"
          className="form-control mb-3"
          value={formData.genreId}
          onChange={handleChange}
          required
        >
          <option value="" disabled>
            Select Genre
          </option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
        <input
          type="number"
          className="form-control mb-3"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          className="form-control mb-3"
          name="releaseDate"
          value={formData.releaseDate}
          onChange={handleChange}
          required
        />
        <input
          type="file"
          className="form-control mb-3"
          name="image"
          onChange={handleChange}
        />
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Creating..." : "Create Game"}
        </button>
      </form>
    </div>
  );
}
