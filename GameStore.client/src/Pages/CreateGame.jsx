import { useState } from "react";

export default function CreateGame() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    genre: "",
    releaseDate: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/games", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to create game");
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
    }
  };

  return (
    <div className="create-game-container">
      <h2>Add New Game</h2>
      {error && <ErrorPopup message={error} />}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Game Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="genre"
          placeholder="Genre"
          value={formData.genre}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="releaseDate"
          value={formData.releaseDate}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Game"}
        </button>
      </form>
    </div>
  );
}
