import { useEffect, useState } from "react";
import ErrorPopup from "../components/ErrorPopup";
import { fetchGames } from "../api/game";
import Loading from "../components/Loading";

const gamesList = [
  {
    id: 1,
    title: "The Legend of Zelda: Breath of the Wild",
    genre: "Adventure",
    description: "An open-world adventure game set in the kingdom of Hyrule.",
    price: 59.99,
  },
  {
    id: 2,
    title: "God of War",
    genre: "Action",
    description:
      "A mythological action game following Kratos and his son Atreus.",
    price: 49.99,
  },
  {
    id: 3,
    title: "Red Dead Redemption 2",
    genre: "Action-Adventure",
    description: "An epic tale of life in America’s unforgiving heartland.",
    price: 39.99,
  },
  {
    id: 4,
    title: "Minecraft",
    genre: "Sandbox",
    description: "A game about placing blocks and going on adventures.",
    price: 26.95,
  },
  {
    id: 5,
    title: "Among Us",
    genre: "Party",
    description: "A multiplayer game of teamwork and betrayal.",
    price: 4.99,
  },
];

export default function Games() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadGames();
  }, []);

  const loadGames = async () => {
    try {
      setLoading(true);
      const fetchedGames = await fetchGames();
      setGames(fetchedGames);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="games-container">
      <h1 className="mb-4">Games</h1>
      {error ? (
        <ErrorPopup message={error} />
      ) : loading ? (
        <Loading />
      ) : (
        <div className="row g-3">
          {games.map((game) => (
            <div key={game.id} className="col-12 col-md-4">
              <div className="card h-100 hover-lift">
                <img
                  src={game.image || `https://static.photos/gaming/320x240`}
                  className="card-img-top width-100"
                  alt={`${game.name} cover`}
                />
                <div className="card-body">
                  <h5 className="card-title">{game.name}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    {game.genre}
                  </h6>
                  <p className="card-text">{game.description}</p>
                </div>
                <div className="card-footer bg-transparent">
                  <span className="fw-bold">${game.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
