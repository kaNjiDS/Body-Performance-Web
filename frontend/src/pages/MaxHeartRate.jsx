import { useState } from "react";
import { FaHeartbeat, FaRunning, FaFire, FaInfoCircle, FaClock } from "react-icons/fa";

function MaxHeartRate() {
  const [age, setAge] = useState("");
  const [restingHR, setRestingHR] = useState("");
  const [results, setResults] = useState(null);
  const [error, setError] = useState("");

  const calculate = () => {
    setError("");
    if (!age || isNaN(age) || age < 10 || age > 120) {
      setError("Please enter a valid age (10–120 years).");
      return;
    }

    const numericAge = parseInt(age, 10);
    const maxHR = Math.round(208 - 0.7 * numericAge);

    const moderateMin = Math.round(0.5 * maxHR);
    const moderateMax = Math.round(0.7 * maxHR);
    const vigorousMin = Math.round(0.7 * maxHR);
    const vigorousMax = Math.round(0.85 * maxHR);

    let hrrResults = null;
    if (restingHR && !isNaN(restingHR) && restingHR > 30 && restingHR < 120) {
      const rhr = parseInt(restingHR, 10);
      const hrr = maxHR - rhr;
      const hrrModerateMin = Math.round(rhr + 0.4 * hrr);
      const hrrModerateMax = Math.round(rhr + 0.6 * hrr);
      const hrrVigorousMin = Math.round(rhr + 0.7 * hrr);
      const hrrVigorousMax = Math.round(rhr + 0.85 * hrr);
      hrrResults = { hrr, hrrModerateMin, hrrModerateMax, hrrVigorousMin, hrrVigorousMax };
    }

    setResults({ maxHR, moderateMin, moderateMax, vigorousMin, vigorousMax, hrrResults });
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
        {/* Main Title + Subtitle  */}
        <div className="text-center mb-5">
          <h1
            className="display-4 fw-bold mb-3"
            style={{
              background: "linear-gradient(90deg, #ff6b6b, #ff8e53, #ff4757)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            <FaHeartbeat className="me-3 text-danger" style={{ fontSize: "3.8rem" }} />
            Maximum Heart Rate Calculator
          </h1>

          {/* Bigger & bolder subtitle */}
          <p className="lead fs-3 fw-bold text-light mb-5">
            Estimate your max heart rate (MHR) and training zones to exercise safely and effectively.
          </p>
        </div>

        <div className="row g-5">
          {/* Left Column – Info + Video */}
          <div className="col-lg-7">
            {/* Why Zones Matter Block */}
            <div className="bg-dark bg-opacity-50 rounded-4 p-4 shadow mb-4">
              <h3 className="fw-bold mb-4 text-warning d-flex align-items-center gap-3">
                <FaInfoCircle size={28} /> Why Heart Rate Zones Matter
              </h3>
              <p className="fs-5 mb-3">
                Training in the right zone helps you:
              </p>
              <ul className="list-unstyled fs-5">
                <li className="mb-2">
                  <FaFire className="text-danger me-2" /> Burn more fat (moderate intensity)
                </li>
                <li className="mb-2">
                  <FaRunning className="text-success me-2" /> Improve endurance & cardio fitness (vigorous)
                </li>
                <li>
                  <FaHeartbeat className="text-primary me-2" /> Train smarter & avoid overtraining
                </li>
              </ul>
            </div>

            {/* Video Section */}
            <div className="bg-dark bg-opacity-50 rounded-4 p-4 shadow">
              <h4 className="fw-bold mb-3 text-light d-flex align-items-center gap-2">
                <FaInfoCircle /> Understanding Heart Rate Zones
              </h4>
              <div className="ratio ratio-16x9 rounded overflow-hidden shadow mb-3">
                <iframe
                  src="https://www.youtube.com/embed/yMTW4YU9Kfs"
                  title="Heart Rate Zones Explained – Do They Even Matter?"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <small className="text-muted">
                Video: Clear explanation of heart rate zones (trusted fitness education source)
              </small>
            </div>
          </div>

          {/* Right Column – Calculator */}
          <div className="col-lg-5">
            <div className="card card-custom shadow-lg border-0 bg-dark bg-opacity-75 text-white">
              <div className="card-body p-4 p-md-5">
                <h3 className="text-center mb-4 fw-bold text-gradient">
                  Calculate Your Zones
                </h3>

                <div className="mb-4">
                  <label className="form-label fw-bold fs-5">Your Age (years)</label>
                  <input
                    type="number"
                    placeholder="e.g. 30"
                    className="form-control form-control-lg bg-dark text-white border-secondary"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-bold fs-5 d-flex align-items-center gap-2">
                    <FaHeartbeat className="text-danger" /> Resting Heart Rate (bpm) – optional
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 65 (measured in morning)"
                    className="form-control form-control-lg bg-dark text-white border-secondary"
                    value={restingHR}
                    onChange={(e) => setRestingHR(e.target.value)}
                  />
                  <small className="text-muted d-block mt-2">
                    Tip: Measure first thing in the morning, lying down, before getting up.
                  </small>
                </div>

                {error && <div className="alert alert-danger mb-4">{error}</div>}

                <button
                  className="btn btn-gradient btn-lg w-100 fw-bold"
                  onClick={calculate}
                  disabled={!age.trim()}
                >
                  Calculate My Zones
                </button>
              </div>
            </div>

            {/* Results */}
            {results && (
              <div className="mt-5">
                <div className="text-center p-4 bg-dark rounded-4 shadow mb-4">
                  <h3 className="display-5 fw-bold text-gradient mb-3">
                    Max Heart Rate: {results.maxHR} bpm
                  </h3>
                  <p className="text-muted mb-0 fs-5">
                    This is an estimate — actual value may vary ±10–20 bpm
                  </p>
                </div>

                {/* Zones Table – bigger & clearer */}
                <div className="table-responsive mb-5">
                  <table className="table table-dark table-bordered table-hover text-center fs-5">
                    <thead>
                      <tr>
                        <th>Intensity</th>
                        <th>% of MHR</th>
                        <th>Target bpm</th>
                        <th>Purpose</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="bg-success bg-opacity-25 fw-bold">Moderate</td>
                        <td>50–70%</td>
                        <td>{results.moderateMin} – {results.moderateMax}</td>
                        <td>Fat burn, endurance</td>
                      </tr>
                      <tr>
                        <td className="bg-warning bg-opacity-25 fw-bold">Vigorous</td>
                        <td>70–85%</td>
                        <td>{results.vigorousMin} – {results.vigorousMax}</td>
                        <td>Cardio fitness, performance</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {results.hrrResults && (
                  <div className="alert alert-info fs-5">
                    <h5 className="d-flex align-items-center gap-2 mb-3">
                      <FaRunning size={24} /> HRR Method (More Accurate)
                    </h5>
                    <p className="mb-2 fw-bold">Your HRR: {results.hrrResults.hrr} bpm</p>
                    <p className="mb-1">
                      Moderate (40–60%): {results.hrrResults.hrrModerateMin} – {results.hrrResults.hrrModerateMax} bpm
                    </p>
                    <p className="mb-0">
                      Vigorous (70–85%): {results.hrrResults.hrrVigorousMin} – {results.hrrResults.hrrVigorousMax} bpm
                    </p>
                  </div>
                )}

                <div className="alert alert-warning mt-4 fs-5">
                  <strong>Safety First:</strong> These are estimates only. Consult a doctor if you have heart conditions, take medications, or experience pain/dizziness during exercise.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MaxHeartRate;