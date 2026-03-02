export default function GameForm({
  type = "create",
  formData,
  genres,
  loading,
  handleChange,
  handleSubmit,
}) {
  return (
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
        {loading
          ? type === "create"
            ? "Creating..."
            : "Updating..."
          : type === "create"
            ? "Create Game"
            : "Update Game"}
      </button>
    </form>
  );
}
