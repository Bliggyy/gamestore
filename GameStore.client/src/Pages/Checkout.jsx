import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import CheckoutModal from "../components/CheckoutModal";

export default function CheckoutPage() {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const vat = 0.12;
  const tax = subtotal * vat;
  const total = subtotal + tax;

  const handleCheckout = () => {
    if (!termsAccepted) {
      return;
    }

    setShowModal(true);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      clearCart();

      setTimeout(() => {
        setShowModal(false);
        navigate("/");
      }, 1200);
    }, 2500);
  };

  // ── Empty-cart state ──────────────────────────────────────────────────────
  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="container py-5 text-center">
        <div className="mb-4 fs-1">🛒</div>
        <h3 className="fw-bold mb-3">Your cart is empty</h3>
        <p className="text-muted mb-4">Add some games before checking out.</p>
        <button
          className="btn btn-danger px-4"
          onClick={() => navigate("/games")}
        >
          Browse Games
        </button>
      </div>
    );
  }

  // ── Main render ───────────────────────────────────────────────────────────
  return (
    <>
      <div className="min-vh-100 py-5" style={{ backgroundColor: "#f4f6f9" }}>
        <div className="container" style={{ maxWidth: 860 }}>
          <div className="d-flex align-items-center gap-3 mb-4">
            <button
              className="btn btn-outline-dark btn-sm"
              onClick={() => navigate(-1)}
            >
              ← Back
            </button>
            <h2 className="fw-bold text-dark mb-0">Checkout</h2>
          </div>

          <div className="row g-4">
            {/* ── Left column: cart items ── */}
            <div className="col-lg-7">
              <div className="card bg-secondary bg-opacity-10 border-0 rounded-4 overflow-hidden">
                <div className="card-header bg-transparent border-bottom border-secondary px-4 py-3">
                  <span className="text-dark fw-semibold">
                    Order Summary&nbsp;
                    <span className="badge bg-danger ms-1">
                      {cartItems.length} item{cartItems.length !== 1 && "s"}
                    </span>
                  </span>
                </div>

                <ul className="list-group list-group-flush">
                  {cartItems.map((item) => (
                    <li
                      key={item.id}
                      className="list-group-item bg-transparent border-secondary px-4 py-3 d-flex align-items-center gap-3"
                    >
                      {/* Game cover / thumbnail */}
                      <img
                        src={
                          item.image ||
                          `https://placehold.co/64x64/1a1a2e/e94560?text=${item.title.slice(0, 2)}`
                        }
                        alt={item.name}
                        width={64}
                        height={64}
                        className="rounded-3 object-fit-cover flex-shrink-0"
                        style={{ border: "2px solid rgba(255,255,255,.08)" }}
                      />

                      {/* Title */}
                      <div className="flex-grow-1 min-w-0">
                        <div className="text-dark fw-semibold text-truncate">
                          {item.name}
                        </div>
                      </div>

                      {/* Price */}
                      <div className="text-danger fw-bold fs-6 flex-shrink-0">
                        ${item.price.toFixed(2)}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* ── Right column: price breakdown + actions ── */}
            <div className="col-lg-5">
              <div
                className="card bg-secondary bg-opacity-10 border-0 rounded-4 p-4 sticky-top"
                style={{ top: 24 }}
              >
                {/* Price breakdown */}
                <h6 className="text-muted text-uppercase fw-bold mb-3 small letter-spacing-1">
                  Payment Details
                </h6>

                <div className="d-flex justify-content-between text-dark mb-2">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between text-muted mb-2 small">
                  <span>VAT (12%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <hr className="border-secondary" />
                <div className="d-flex justify-content-between text-dark fw-bold fs-5 mb-4">
                  <span>Total</span>
                  <span className="text-danger">${total.toFixed(2)}</span>
                </div>

                {/* Terms & Conditions checkbox */}
                <div className="form-check mb-4">
                  <input
                    className="form-check-input border-secondary"
                    type="checkbox"
                    id="termsCheckbox"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    style={{ cursor: "pointer" }}
                  />
                  <label
                    className="form-check-label text-muted small"
                    htmlFor="termsCheckbox"
                    style={{ cursor: "pointer" }}
                  >
                    I agree to the{" "}
                    <button
                      className="btn btn-link btn-sm p-0 text-danger text-decoration-none"
                      onClick={() =>
                        alert("Terms & Conditions content goes here.")
                      }
                    >
                      Terms &amp; Conditions
                    </button>{" "}
                    and confirm my order.
                  </label>
                </div>

                {/* Confirm button */}
                <button
                  className="btn btn-danger w-100 py-3 fw-bold fs-5 rounded-3"
                  disabled={!termsAccepted}
                  onClick={handleCheckout}
                  style={{ letterSpacing: ".5px", transition: "opacity .2s" }}
                >
                  Confirm &amp; Pay
                </button>

                {!termsAccepted && (
                  <p className="text-muted text-center small mt-2 mb-0">
                    Please accept the terms to continue.
                  </p>
                )}
              </div>
            </div>
          </div>
          {/* /row */}
        </div>
        {/* /container */}
        <CheckoutModal showModal={showModal} loading={loading} />
      </div>
    </>
  );
}
