export default function GenreForm({
  genre,
  handleChange,
  loading,
  handleSubmit,
  type = "create",
}) {
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="form-control mb-3"
        name="name"
        placeholder="Genre Name"
        value={genre}
        onChange={handleChange}
        required
      />
      <button
        type="submit"
        className="btn btn-primary"
        disabled={loading}
        data-target="#exampleModal"
      >
        {loading
          ? type === "create"
            ? "Creating..."
            : "Updating..."
          : type === "create"
            ? "Create Genre"
            : "Update Genre"}
      </button>
    </form>
  );
}
