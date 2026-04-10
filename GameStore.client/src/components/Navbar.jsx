import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNotification } from "../context/NotificationContext";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { addNotification } = useNotification();
  const { totalItems, setIsCartOpen, clearCart } = useCart();
  const [hoveredLink, setHoveredLink] = useState(null);

  const handleLogout = () => {
    logout();
    addNotification("Logged out successfully!", "success");
    clearCart();
    navigate("/");
  };

  const NavLink = ({ to, children }) => {
    const isActive = location.pathname === to;
    const isHovered = hoveredLink === to;

    return (
      <li className="nav-item">
        <Link
          to={to}
          className="nav-link"
          style={{
            color: isActive || isHovered ? "#dc3545" : undefined,
            fontWeight: isActive ? "600" : undefined,
            transition: "color .15s",
          }}
          onMouseEnter={() => setHoveredLink(to)}
          onMouseLeave={() => setHoveredLink(null)}
        >
          {children}
        </Link>
      </li>
    );
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link
          to="/"
          className="navbar-brand fw-bold"
          style={{ color: "#dc3545" }}
        >
          GameStore
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <NavLink to="/games">Games</NavLink>
            <NavLink to="/genres">Genres</NavLink>
            {user && <NavLink to="/my-games">My Games</NavLink>}
            {user && ["Admin", "Manager"].includes(user.role) && (
              <NavLink to="/create">Create</NavLink>
            )}
          </ul>

          <ul className="navbar-nav">
            {user ? (
              <>
                <li className="nav-item">
                  <span className="nav-link text-muted">
                    Hello,{" "}
                    <span className="fw-semibold text-dark">
                      {user.username}
                    </span>
                  </span>
                </li>
                <li className="nav-item me-2">
                  <button
                    className="btn btn-link nav-link position-relative px-2"
                    onClick={() => setIsCartOpen(true)}
                    aria-label="Open cart"
                    style={{ color: "#6c757d", transition: "color .15s" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "#dc3545")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "#6c757d")
                    }
                  >
                    <i className="bi bi-cart3 fs-5" />
                    {totalItems > 0 && (
                      <span
                        className="position-absolute mt-2 top-0 start-100 translate-middle badge rounded-pill bg-danger"
                        style={{ fontSize: "0.65rem" }}
                      >
                        {totalItems > 99 ? "99+" : totalItems}
                      </span>
                    )}
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-link nav-link"
                    onClick={handleLogout}
                    style={{ color: "#6c757d", transition: "color .15s" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "#dc3545")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "#6c757d")
                    }
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <NavLink to="/login">Login</NavLink>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
