import { useNavigate } from "react-router-dom";
const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;

export default function GameCard({ game }) {
  const navigate = useNavigate();

  return (
    <div className="col-12 col-md-4">
      <div
        className="card h-100 border-1 hover-lift rounded-4 overflow-hidden"
        onClick={() => navigate(`/games/${game.id}`)}
        style={{
          backgroundColor: "#eef0f4",
          cursor: "pointer",
          transition: "transform .2s, box-shadow .2s",
        }}
      >
        <div style={{ height: 200, overflow: "hidden" }}>
          <img
            src={
              game.imageUrl
                ? `${API_BASE_URL}${game.imageUrl}`
                : `https://static.photos/gaming/320x240`
            }
            className="w-100 h-100"
            alt={`${game.name} cover`}
            style={{ objectFit: "cover" }}
          />
        </div>

        <div className="card-body px-4 pt-3 pb-2">
          <h5 className="fw-bold text-dark mb-1 text-truncate">{game.name}</h5>
          <span className="badge bg-danger bg-opacity-10 text-danger small fw-semibold mb-2">
            {game.genre}
          </span>
          <p
            className="text-muted small mb-0"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {game.description}
          </p>
        </div>

        <div className="card-footer bg-transparent border-top border-secondary border-opacity-25 px-4 py-3 d-flex justify-content-between align-items-center">
          <span className="fw-bold text-danger fs-5">
            ${Number(game.price).toFixed(2)}
          </span>
          <span className="text-muted small">View Details →</span>
        </div>
      </div>
    </div>
  );
}
