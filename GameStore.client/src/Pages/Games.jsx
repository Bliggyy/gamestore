import { useEffect, useState } from "react";
import ErrorPopup from "../components/ErrorPopup";
import { fetchGames } from "../api/game";
import Loading from "../components/Loading";
import GameCard from "../components/GameCard";

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
      console.log("Fetched games:", fetchedGames);
      setGames(fetchedGames);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

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
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      )}
    </div>
  );
}
