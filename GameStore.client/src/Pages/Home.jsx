export default function Index() {
  return (
    <div className="min-vh-100 py-5" style={{ backgroundColor: "#f4f6f9" }}>
      <div className="container" style={{ maxWidth: 1100 }}>
        <div className="card border-0 rounded-4 p-4 mb-4">
          <span
            className="badge bg-danger mb-3"
            style={{
              width: "fit-content",
              letterSpacing: ".5px",
              fontSize: 11,
            }}
          >
            Portfolio Project
          </span>
          <h1 className="fw-bold text-dark mb-2" style={{ fontSize: 28 }}>
            Welcome to GameStore
          </h1>
          <p
            className="text-muted mb-3"
            style={{ fontSize: 15, lineHeight: 1.7 }}
          >
            A full-stack web application demonstrating modern development
            practices with <strong className="text-dark">ASP.NET Core</strong>{" "}
            on the backend and <strong className="text-dark">React</strong> on
            the frontend — featuring authentication, role-based access control,
            and a complete cart-to-checkout flow.
          </p>
          <div>
            {[
              "ASP.NET Core",
              "React",
              "JWT Auth",
              "Role-Based Access",
              "REST API",
            ].map((competency) => (
              <span
                key={competency}
                className="badge me-2 mb-1"
                style={{
                  background: "#fff3cd",
                  color: "#856404",
                  border: "1px solid #ffc107",
                  fontWeight: 600,
                  fontSize: 12,
                  borderRadius: 20,
                  padding: "4px 12px",
                }}
              >
                {competency}
              </span>
            ))}
          </div>
        </div>
        <div className="card border-0 rounded-4 p-4 mb-4">
          <p
            className="text-muted fw-bold text-uppercase large mb-3"
            style={{
              letterSpacing: 1,
              borderBottom: "1px solid #e9ecef",
              paddingBottom: "0.6rem",
            }}
          >
            Core Features
          </p>
          {[
            "Browse games by genre or search by title",
            "Add games to a persistent cart",
            "Checkout and build your owned games library",
            "Full CRUD management for games & genres",
            "Admin seed data and site reset controls",
          ].map((feature) => (
            <div
              key={feature}
              className="d-flex align-items-start gap-2 py-2"
              style={{
                borderBottom: "1px solid #f0f0f0",
                fontSize: 16,
                color: "#444",
              }}
            >
              <span
                className="bg-danger rounded-circle flex-shrink-0"
                style={{ width: 7, height: 7, marginTop: 6 }}
              />
              {feature}
            </div>
          ))}
        </div>
        <div className="card border-0 rounded-4 p-4 mb-4">
          <p
            className="text-muted fw-bold text-uppercase large mb-3"
            style={{
              letterSpacing: 1,
              borderBottom: "1px solid #e9ecef",
              paddingBottom: "0.6rem",
            }}
          >
            Authentication
          </p>
          <p
            className="text-muted mb-3"
            style={{ fontSize: 16, lineHeight: 1.6 }}
          >
            Auth uses <strong className="text-dark">JWT tokens</strong> stored
            in localStorage, valid for 8 hours. Your role is embedded in the
            token and controls what you can see and do.
          </p>
          <div className="row g-3">
            {[
              {
                role: "User",
                perms: "Cart management · Checkout · Owned games library",
                danger: false,
              },
              {
                role: "Manager",
                perms:
                  "All user features · Create / edit / delete games & genres",
                danger: false,
              },
              {
                role: "Administrator",
                perms: "All manager features · Wipe site data · Run seed data",
                danger: true,
              },
            ].map(({ role, perms, danger }) => (
              <div key={role} className="col-md-4">
                <div
                  className="rounded-3 p-3 h-100"
                  style={{
                    background: danger ? "#fff5f5" : "#f8f9fa",
                    border: `1px solid ${danger ? "#f5c6cb" : "#e9ecef"}`,
                  }}
                >
                  <div
                    className="fw-bold mb-1"
                    style={{
                      fontSize: 16,
                      color: danger ? "#dc3545" : "#212529",
                    }}
                  >
                    {role}
                  </div>
                  <div
                    className="text-muted"
                    style={{ fontSize: 16, lineHeight: 1.5 }}
                  >
                    {perms}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="card border-0 rounded-4 p-4 mb-4">
          <p
            className="text-muted fw-bold text-uppercase large mb-3"
            style={{
              letterSpacing: 1,
              borderBottom: "1px solid #e9ecef",
              paddingBottom: "0.6rem",
            }}
          >
            Demo Credentials
          </p>
          <p className="text-muted mb-3" style={{ fontSize: 16 }}>
            Users are hard-coded on the backend for demonstration purposes. Use
            any of the accounts below to explore different permission levels.
          </p>
          <div className="row g-2 mb-2">
            {[
              { label: "User 1", user: "user1", pass: "user1Password" },
              { label: "User 2", user: "user2", pass: "user2Password" },
              { label: "User 3", user: "user3", pass: "user3Password" },
              { label: "Manager", user: "manager1", pass: "manager1Password" },
            ].map(({ label, user, pass }) => (
              <div key={label} className="col-6 col-md-3">
                <div
                  className="rounded-3 p-3 h-100"
                  style={{ background: "#f8f9fa", border: "1px solid #e9ecef" }}
                >
                  <div
                    className="text-muted fw-bold text-uppercase mb-1"
                    style={{ fontSize: 16, letterSpacing: 0.5 }}
                  >
                    {label}
                  </div>
                  <div
                    className="text-dark"
                    style={{ fontSize: 14, fontFamily: "monospace" }}
                  >
                    Username: {user}
                  </div>
                  <div
                    className="text-muted"
                    style={{ fontSize: 14, fontFamily: "monospace" }}
                  >
                    Password: {pass}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div
            className="rounded-3 p-3"
            style={{ background: "#fff5f5", border: "1px solid #f5c6cb" }}
          >
            <div
              className="fw-bold text-uppercase mb-1"
              style={{ fontSize: 16, letterSpacing: 0.5, color: "#dc3545" }}
            >
              Administrator
            </div>
            <span
              className="text-dark me-4"
              style={{ fontSize: 14, fontFamily: "monospace" }}
            >
              Username: admin1
            </span>
            <span
              className="text-muted"
              style={{ fontSize: 14, fontFamily: "monospace" }}
            >
              Password: admin1Password
            </span>
          </div>

          <div
            className="mt-3 rounded-end-3 ps-3 py-2"
            style={{
              borderLeft: "3px solid #ffc107",
              background: "#fff8e1",
              fontSize: 16,
              color: "#6d5d00",
            }}
          >
            Higher-level roles inherit all features from lower-level roles.
          </div>
        </div>
      </div>
    </div>
  );
}
