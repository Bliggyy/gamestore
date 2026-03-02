const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;

export default function GameCard({ game }) {
  return (
    <div key={game.id} className="col-12 col-md-4">
      <div className="card h-100 hover-lift">
        <img
          src={
            game.imageUrl
              ? `${API_BASE_URL}${game.imageUrl}`
              : `https://static.photos/gaming/320x240`
          }
          className="card-img-top width-100"
          alt={`${game.name} cover`}
        />
        <div className="card-body">
          <h5 className="card-title">{game.name}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{game.genre}</h6>
          <p className="card-text">{game.description}</p>
        </div>
        <div className="card-footer bg-transparent">
          <span className="fw-bold">${game.price}</span>
        </div>
      </div>
    </div>
  );
}
