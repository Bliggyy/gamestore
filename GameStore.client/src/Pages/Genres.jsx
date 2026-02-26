import { useState, useEffect } from "react";

export default function Genres() {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    // TODO: Replace with actual API call
    setGenres([
      { id: 1, name: "Action" },
      { id: 2, name: "Adventure" },
      { id: 3, name: "RPG" },
      { id: 4, name: "Strategy" },
      { id: 5, name: "Sports" },
    ]);
  }, []);

  return (
    <div className="p-4">
      <h1 className="mb-4">Genres</h1>
      <div className="d-flex flex-column gap-3 w-100">
        {genres.map((genre) => (
          <div key={genre.id} className="p-3 border rounded w-100 hover-lift">
            {genre.name}
          </div>
        ))}
      </div>
    </div>
  );
}
