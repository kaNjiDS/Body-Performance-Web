import { useState } from "react";
import { FaWeight, FaRulerVertical, FaInfoCircle, FaHeartbeat } from "react-icons/fa";
import { GiBodyHeight, GiBodyBalance } from "react-icons/gi";

function BMI() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");

  const calculateBMI = () => {
    setError("");
    const w = parseFloat(weight);
    const h = parseFloat(height);

    if (!w || !h || w <= 0 || h <= 0) {
      setError("Please enter valid weight (kg) and height (cm).");
      setBmi(null);
      setCategory("");
      return;
    }

    const heightInMeters = h / 100;
    const value = w / (heightInMeters * heightInMeters);
    const rounded = value.toFixed(1);

    setBmi(rounded);

    let cat = "";
    if (rounded < 18.5) cat = "Underweight";
    else if (rounded < 25) cat = "Normal weight";
    else if (rounded < 30) cat = "Overweight";
    else cat = "Obesity";

    setCategory(cat);
  };

  const getChartStyle = () => {
    if (!bmi) return { width: "0%", background: "#ccc" };

    const num = parseFloat(bmi);
    let color = "#6b7280";
    let widthPercent = Math.min(Math.max((num / 40) * 100, 5), 95);

    if (num < 18.5) color = "#3b82f6";
    else if (num < 25) color = "#10b981";
    else if (num < 30) color = "#f59e0b";
    else color = "#ef4444";

    return { width: `${widthPercent}%`, background: color };
  };

  return (
    <div
      className="min-vh-100 py-5"
      style={{
        background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
        color: "#e0e0e0",
      }}
    >
      <div className="container">
        <div className="text-center mb-5">
          <h1
            className="display-4 fw-bold mb-3"
            style={{
              background: "linear-gradient(90deg, #ff6b6b, #ff8e53)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            <FaWeight className="me-3 text-warning" style={{ fontSize: "3.2rem" }} />
            BMI Calculator
          </h1>

          {/* Fixed + Bold + Larger subtitle */}
          <p className="lead fs-3 fw-bold text-light mb-5">
            Calculate your Body Mass Index (BMI) and understand what it means for your health
          </p>
        </div>

        <div className="row g-5">
          {/* Left - Calculator + Result */}
          <div className="col-lg-6">
            <div className="card card-custom shadow-lg border-0 bg-dark bg-opacity-75 text-white p-4 p-md-5">
              <div className="d-flex align-items-center gap-3 mb-4">
                <GiBodyBalance size={40} className="text-primary" />
                <h3 className="mb-0">Calculate Your BMI</h3>
              </div>

              <div className="mb-4">
                <label className="form-label fw-bold fs-5 d-flex align-items-center gap-2">
                  <FaWeight className="text-warning" /> Weight (kg)
                </label>
                <input
                  type="number"
                  step="0.1"
                  placeholder="e.g. 70"
                  className="form-control form-control-lg bg-dark text-white border-secondary"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label className="form-label fw-bold fs-5 d-flex align-items-center gap-2">
                  <GiBodyHeight className="text-info" /> Height (cm)
                </label>
                <input
                  type="number"
                  step="0.1"
                  placeholder="e.g. 170"
                  className="form-control form-control-lg bg-dark text-white border-secondary"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                />
              </div>

              {error && <div className="alert alert-danger mb-4">{error}</div>}

              <button
                className="btn btn-gradient btn-lg w-100 fw-bold"
                onClick={calculateBMI}
                disabled={!weight.trim() || !height.trim()}
              >
                Calculate BMI
              </button>

              {bmi && (
                <div className="mt-5 text-center">
                  <h4 className="fw-bold mb-3">Your BMI</h4>
                  <div className="display-4 fw-black mb-2" style={{ color: "#ff8e53" }}>
                    {bmi}
                  </div>

                  <div className="fs-4 mb-4" style={{ color: getChartStyle().background }}>
                    {category}
                  </div>

                  {/* Visual Chart */}
                  <div className="mb-4">
                    <div className="d-flex justify-content-between small mb-1 text-light">
                      <span>Underweight</span>
                      <span>Normal</span>
                      <span>Overweight</span>
                      <span>Obesity</span>
                    </div>
                    <div className="progress" style={{ height: "28px", background: "#374151" }}>
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={getChartStyle()}
                        aria-valuenow={bmi}
                        aria-valuemin="0"
                        aria-valuemax="40"
                      ></div>
                    </div>
                    <div className="d-flex justify-content-between small mt-1 text-muted">
                      <span>18.5</span>
                      <span>25</span>
                      <span>30</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right - Info, Video, Resources */}
          <div className="col-lg-6">
            {/* Video - Fixed embed URL */}
            <div className="bg-dark bg-opacity-50 rounded-4 p-4 shadow mb-4">
              <h4 className="fw-bold mb-3 d-flex align-items-center gap-2 text-light">
                <FaInfoCircle /> What is BMI & Why It Matters
              </h4>
              <div className="ratio ratio-16x9 rounded overflow-hidden shadow mb-3">
                <iframe
                  src="https://www.youtube.com/embed/-WdnX5ffW9U"  // ← Correct embed URL
                  title="What is BMI? | Body Mass Index Explained"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <small className="text-muted">
                Short explanation of BMI calculation and categories (source: trusted health channel)
              </small>
            </div>

            {/* Categories */}
            <div className="bg-dark bg-opacity-50 rounded-4 p-4 shadow mb-4">
              <h5 className="fw-bold mb-3 text-warning">BMI Categories (WHO)</h5>
              <ul className="list-group list-group-flush">
                <li className="list-group-item bg-transparent text-white border-secondary">
                  <strong style={{ color: "#3b82f6" }}>Below 18.5</strong> → Underweight
                </li>
                <li className="list-group-item bg-transparent text-white border-secondary">
                  <strong style={{ color: "#10b981" }}>18.5 – 24.9</strong> → Normal weight
                </li>
                <li className="list-group-item bg-transparent text-white border-secondary">
                  <strong style={{ color: "#f59e0b" }}>25.0 – 29.9</strong> → Overweight
                </li>
                <li className="list-group-item bg-transparent text-white border-secondary">
                  <strong style={{ color: "#ef4444" }}>30.0 and above</strong> → Obesity
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div className="bg-dark bg-opacity-50 rounded-4 p-4 shadow">
              <h5 className="fw-bold mb-3 d-flex align-items-center gap-2 text-info">
                <FaHeartbeat /> Important Notes & Resources
              </h5>
              <ul className="list-unstyled fs-6">
                <li className="mb-3">
                  BMI is a screening tool — not a direct measure of body fat.
                </li>
                <li className="mb-3">
                  It may not be accurate for athletes, elderly people, children, or pregnant women.
                </li>
                <li className="mb-3">
                  <strong>Trusted sources:</strong>
                </li>
                <li>
                  <a
                    href="https://www.who.int/data/gho/indicator-metadata-registry/imr-details/2380"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-info text-decoration-none"
                  >
                    WHO – Body Mass Index classification
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.cdc.gov/healthyweight/assessing/bmi/adult_bmi/index.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-info text-decoration-none"
                  >
                    CDC – Adult BMI Calculator & Info
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BMI;