export default function CheckoutModal({ showModal, loading }) {
  return (
    <>
      {showModal && (
        <>
          {/* Backdrop */}
          <div
            className="position-fixed top-0 start-0 w-100 h-100"
            style={{ backgroundColor: "rgba(0,0,0,.75)", zIndex: 1040 }}
          />

          {/* Modal dialog */}
          <div
            className="position-fixed top-50 start-50 translate-middle text-center p-5 rounded-4 shadow-lg"
            style={{
              zIndex: 1050,
              backgroundColor: "#ffffff",
              border: "1px solid #e9ecef",
              minWidth: 300,
            }}
          >
            {loading ? (
              <>
                <div
                  className="spinner-border text-danger mb-4"
                  role="status"
                  style={{ width: "3rem", height: "3rem" }}
                >
                  <span className="visually-hidden">Processing…</span>
                </div>
                <h5 className="text-dark fw-bold mb-1">
                  Processing your order…
                </h5>
                <p className="text-muted small mb-0">
                  Please don't close this window.
                </p>
              </>
            ) : (
              <>
                <div className="mb-3 fs-1">✅</div>
                <h5 className="text-dark fw-bold mb-1">Order Confirmed!</h5>
                <p className="text-muted small mb-0">
                  Redirecting you to the home page…
                </p>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
}
