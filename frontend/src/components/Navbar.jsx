import { Link } from "react-router-dom";
import { FaHeartbeat } from "react-icons/fa";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm fixed-top">
      <div className="container-fluid px-4">
        <Link
          className="navbar-brand d-flex align-items-center fw-bold"
          to="/"
          style={{
            fontSize: "2rem",
            letterSpacing: "-0.5px",
            background: "linear-gradient(90deg, #ff6b6b, #ff8e53)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          <FaHeartbeat
            className="me-3 text-danger"
            style={{
              fontSize: "2.1rem",
              filter: "drop-shadow(0 2px 6px rgba(255, 107, 107, 0.6))",
              animation: "pulse 2s infinite ease-in-out",
            }}
          />
          FitTrack Pro
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
          <div className="d-flex align-items-center justify-content-center gap-5 mx-auto">
            {/* New Home button – placed first for prominence */}
            <Link
              className="btn btn-outline-light border-0 ms-3 px-4 py-2"
              to="/"
              style={{ fontSize: "1.5rem",fontWeight: 600 }}
            >
              Home
            </Link>

            <Link
              className="btn btn-outline-light border-0 ms-3 px-4 py-2 mx-auto"
              to="/measures"
              style={{ fontSize: "1.5rem", fontWeight: 600 }}
            >
              Measures
            </Link>

            {/*<Link
              className="btn btn-outline-light px-4 py-2"
              to="/bmi"
              style={{ fontSize: "1.15rem", fontWeight: 500 }}
            >
              BMI
            </Link>

            <Link
              className="btn btn-outline-light px-4 py-2"
              to="/max-heart-rate"
              style={{ fontSize: "1.15rem", fontWeight: 500 }}
            >
              Heart Rate
            </Link>*/}

            <Link
              className="btn btn-outline-light border-0 ms-3 px-4 py-2 mx-auto"
              to="/predict"
              style={{ fontSize: "1.5rem",fontWeight:600 }}
            >
              Predict
            </Link>

            <Link
              className="btn btn-outline-light border-0 ms-3 px-4 py-2 mx-auto"
              to="/tips"
              style={{ fontSize: "1.5rem", fontWeight: 600 }}
            >
              Tips
            </Link>

            <Link
              className="btn btn-outline-light border-0 ms-3 px-4 py-2 mx-auto "
              to="/aboutus"
              style={{ fontSize: "1.5rem", fontWeight: 600 }}
            >
              About us
            </Link>

            <Link
              className="btn btn-outline-light border-0 ms-3 px-4 py-2 mx-auto"
              to="/contactus"
              style={{ fontSize: "1.5rem", fontWeight: 600 }}
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;