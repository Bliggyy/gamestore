import { useCart } from "../context/CartContext";
import { deleteGameFromCart } from "../api/cart";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function CartSidebar() {
  const { cartItems, isCartOpen, setIsCartOpen, removeFromCart, totalPrice } =
    useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate("/checkout");
    setIsCartOpen(false);
  };

  const handleCartItemRemove = async (itemId) => {
    const response = await deleteGameFromCart({
      username: user.username,
      gameId: itemId,
    });

    if (!response.ok) {
      console.error("Failed to remove item from cart. Please try again.");
      return;
    }

    removeFromCart(itemId);
  };

  return (
    <>
      <div
        className={`offcanvas-backdrop fade ${isCartOpen ? "show" : ""}`}
        style={{ display: isCartOpen ? "block" : "none" }}
        onClick={() => setIsCartOpen(false)}
      />

      {/* Sidebar */}
      <div
        className="offcanvas offcanvas-end fade show"
        style={{
          width: "400px",
          transform: `translateX(${isCartOpen ? "0" : "100%"})`,
          transition: "transform 0.3s ease-in-out",
        }}
        tabIndex="-1"
        data-bs-scroll="true"
        data-bs-backdrop="false"
      >
        {/* Header */}
        <div className="offcanvas-header border-bottom">
          <h5 className="offcanvas-title fw-bold">
            <i className="bi bi-cart3 me-2" />
            Your Cart
          </h5>
          <button
            className="btn-close"
            onClick={() => setIsCartOpen(false)}
            aria-label="Close"
          />
        </div>

        {/* Body */}
        <div className="offcanvas-body d-flex flex-column p-0">
          {cartItems.length === 0 ? (
            <div className="d-flex flex-column align-items-center justify-content-center flex-grow-1 text-muted">
              <i className="bi bi-cart-x" style={{ fontSize: "3rem" }} />
              <p className="mt-3 fs-6">Your cart is empty</p>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <ul className="list-group list-group-flush flex-grow-1 overflow-auto">
                {cartItems.map((item) => (
                  <li key={item.id} className="list-group-item px-3 py-3">
                    <div className="d-flex gap-3 align-items-center">
                      {/* Game cover thumbnail */}
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.name}
                          style={{
                            width: "56px",
                            height: "56px",
                            objectFit: "cover",
                            borderRadius: "6px",
                            flexShrink: 0,
                          }}
                        />
                      )}

                      <div className="flex-grow-1 min-width-0">
                        <p className="mb-1 fw-semibold text-truncate">
                          {item.name}
                        </p>
                        <p className="mb-2 text-muted small">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>

                      {/* Remove */}
                      <button
                        className="btn btn-link text-danger p-0"
                        onClick={() => handleCartItemRemove(item.id)}
                        aria-label="Remove item"
                      >
                        <i className="bi bi-trash" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Footer */}
              <div className="border-top p-3">
                <div className="d-flex justify-content-between fw-semibold fs-6 mb-3">
                  <span>Total</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <button className="btn btn-dark w-100" onClick={handleCheckout}>
                  Proceed to Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
