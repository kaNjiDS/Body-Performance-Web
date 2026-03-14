import { useState } from "react";
import axios from "axios";
import { FaFire, FaRunning, FaAppleAlt, FaDumbbell, FaInfoCircle } from "react-icons/fa";

function Predict() {
  const [formData, setFormData] = useState({
    sex: "",
    age: "",
    weight: "",
    height: "",
    duration: "",
    heart_rate: "",
    body_temp: ""
  });

  const [errors, setErrors] = useState({});
  const [result, setResult] = useState(null);
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.sex) newErrors.sex = "Gender is required";

    const ageNum = parseFloat(formData.age);
    if (!formData.age) newErrors.age = "Age is required";
    else if (isNaN(ageNum) || ageNum <= 0) newErrors.age = "Must be positive";
    else if (ageNum < 18) newErrors.age = "Age ≥ 18";
    else if (ageNum > 100) newErrors.age = "Age ≤ 100";

    const weightNum = parseFloat(formData.weight);
    if (!formData.weight) newErrors.weight = "Weight is required";
    else if (isNaN(weightNum) || weightNum <= 0) newErrors.weight = "Must be positive";
    else if (weightNum > 300) newErrors.weight = "Too high";

    const heightNum = parseFloat(formData.height);
    if (!formData.height) newErrors.height = "Height is required";
    else if (isNaN(heightNum) || heightNum <= 0) newErrors.height = "Must be positive";
    else if (heightNum < 100 || heightNum > 250) newErrors.height = "100–250 cm";

    const durationNum = parseFloat(formData.duration);
    if (!formData.duration) newErrors.duration = "Duration is required";
    else if (isNaN(durationNum) || durationNum <= 0) newErrors.duration = "Must be positive";
    else if (durationNum > 300) newErrors.duration = "Max 300 min";

    const hrNum = parseFloat(formData.heart_rate);
    if (!formData.heart_rate) newErrors.heart_rate = "Heart rate is required";
    else if (isNaN(hrNum) || hrNum <= 0) newErrors.heart_rate = "Must be positive";
    else if (hrNum > 220) newErrors.heart_rate = "≤ 220 bpm";
    else if (hrNum < 40) newErrors.heart_rate = "Too low";

    const tempNum = parseFloat(formData.body_temp);
    if (!formData.body_temp) newErrors.body_temp = "Temperature is required";
    else if (isNaN(tempNum) || tempNum <= 0) newErrors.body_temp = "Must be positive";
    else if (tempNum < 35 || tempNum > 42) newErrors.body_temp = "35–42 °C";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");

    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await axios.post("http://127.0.0.1:5000/predict", formData);
      setResult(response.data.calories_burned);
      localStorage.setItem("lastCalories", response.data.calories_burned);
    } catch (err) {
      console.error(err);
      setServerError("Error connecting to the prediction model. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setFormData({
      sex: "",
      age: "",
      weight: "",
      height: "",
      duration: "",
      heart_rate: "",
      body_temp: ""
    });
    setErrors({});
    setResult(null);
    setServerError("");
  };

  // Slideshow images
  const slideshowImages = [
    {
      url: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200",
      caption: "Running – High calorie burn cardio"
    },
    {
      url: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1200",
      caption: "Weight training – Build muscle & boost metabolism"
    },
    {
      url: "https://images.unsplash.com/photo-1571019613531-fbeaeb790845?q=80&w=1168&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      caption: "HIIT workout – Maximum calorie burn in short time"
    },
    {
      url: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=1200",
      caption: "Cycling – Steady-state endurance exercise"
    }
  ];

  return (
    <div
      className="min-vh-100 py-5"
      style={{
        background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
        color: "#e0e0e0",
      }}
    >
      <div className="container">
        {/* Header */}
        <div className="text-center mb-5">
          <h1
            className="display-4 fw-bold mb-3"
            style={{
              background: "linear-gradient(90deg, #ff6b6b, #ff8e53)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            <FaFire className="me-3 text-warning" style={{ fontSize: "3.5rem" }} />
            Calories Burned Predictor
          </h1>
          <p className="lead fs-4 fw-medium text-light">
            Enter your workout details and get an accurate ML-based estimate of calories burned
          </p>
        </div>

        <div className="row g-5">
          {/* Left Column – Form + Result */}
          <div className="col-lg-6">
            <div className="card card-custom shadow-lg border-0 bg-dark bg-opacity-75 text-white p-4 p-md-5">
              <h3 className="text-center mb-4 fw-bold text-gradient">
                <FaDumbbell className="me-2" /> Workout Details
              </h3>

              <form onSubmit={handleSubmit}>
                {/* Gender */}
                <div className="mb-3">
                  <label className="form-label fw-bold mb-1">Gender</label>
                  <select
                    name="sex"
                    className={`form-select form-select-lg bg-dark text-white border-secondary ${errors.sex ? 'is-invalid' : ''}`}
                    value={formData.sex}
                    onChange={handleChange}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                  {errors.sex && <div className="invalid-feedback d-block">{errors.sex}</div>}
                </div>

                {/* Age & Weight */}
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label fw-bold mb-1">Age</label>
                    <div style={{ minHeight: '25px' }}>
                      {errors.age && <div className="text-danger small">{errors.age}</div>}
                    </div>
                    <input
                      type="number"
                      name="age"
                      placeholder="e.g. 30"
                      className={`form-control form-control-lg bg-dark text-white border-secondary ${errors.age ? 'is-invalid' : ''}`}
                      value={formData.age}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-bold mb-1">Weight (kg)</label>
                    <div style={{ minHeight: '25px' }}>
                      {errors.weight && <div className="text-danger small">{errors.weight}</div>}
                    </div>
                    <input
                      type="number"
                      step="0.1"
                      name="weight"
                      placeholder="e.g. 70"
                      className={`form-control form-control-lg bg-dark text-white border-secondary ${errors.weight ? 'is-invalid' : ''}`}
                      value={formData.weight}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Height & Duration */}
                <div className="row g-3 mt-2">
                  <div className="col-md-6">
                    <label className="form-label fw-bold mb-1">Height (cm)</label>
                    <div style={{ minHeight: '25px' }}>
                      {errors.height && <div className="text-danger small">{errors.height}</div>}
                    </div>
                    <input
                      type="number"
                      step="0.1"
                      name="height"
                      placeholder="e.g. 170"
                      className={`form-control form-control-lg bg-dark text-white border-secondary ${errors.height ? 'is-invalid' : ''}`}
                      value={formData.height}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-bold mb-1">Duration (min)</label>
                    <div style={{ minHeight: '25px' }}>
                      {errors.duration && <div className="text-danger small">{errors.duration}</div>}
                    </div>
                    <input
                      type="number"
                      name="duration"
                      placeholder="e.g. 45"
                      className={`form-control form-control-lg bg-dark text-white border-secondary ${errors.duration ? 'is-invalid' : ''}`}
                      value={formData.duration}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Heart Rate & Body Temp */}
                <div className="row g-3 mt-2">
                  <div className="col-md-6">
                    <label className="form-label fw-bold mb-1">Avg Heart Rate (bpm)</label>
                    <div style={{ minHeight: '25px' }}>
                      {errors.heart_rate && <div className="text-danger small">{errors.heart_rate}</div>}
                    </div>
                    <input
                      type="number"
                      name="heart_rate"
                      placeholder="e.g. 140"
                      className={`form-control form-control-lg bg-dark text-white border-secondary ${errors.heart_rate ? 'is-invalid' : ''}`}
                      value={formData.heart_rate}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-bold mb-1">Body Temp (°C)</label>
                    <div style={{ minHeight: '25px' }}>
                      {errors.body_temp && <div className="text-danger small">{errors.body_temp}</div>}
                    </div>
                    <input
                      type="number"
                      step="0.1"
                      name="body_temp"
                      placeholder="e.g. 37.2"
                      className={`form-control form-control-lg bg-dark text-white border-secondary ${errors.body_temp ? 'is-invalid' : ''}`}
                      value={formData.body_temp}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {serverError && <div className="alert alert-danger mt-4">{serverError}</div>}

                {/* Buttons */}
                <div className="d-flex gap-3 mt-4">
                  <button
                    type="submit"
                    className="btn btn-gradient btn-lg flex-grow-1 fw-bold"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Predicting...
                      </>
                    ) : (
                      "Predict Calories Burned"
                    )}
                  </button>

                  <button
                    type="button"
                    className="btn btn-outline-light btn-lg fw-bold px-5"
                    onClick={handleClear}
                  >
                    Clear
                  </button>
                </div>
              </form>

              {result !== null && (
                <div className="mt-5 text-center">
                  <h4 className="fw-bold mb-3 text-warning">Estimated Calories Burned</h4>
                  <div className="display-4 fw-black mb-3" style={{ color: "#ff8e53" }}>
                    {result.toFixed(0)} kcal
                  </div>
                  <p className="fs-5 text-muted">
                    This is roughly equivalent to:
                  </p>
                  <ul className="list-unstyled fs-5">
                    <li><FaRunning className="text-success me-2" /> ~{Math.round(result / 5)} min brisk walking</li>
                    <li><FaFire className="text-danger me-2" /> ~{Math.round(result / 10)} min running</li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Right Column – Slideshow + Tips (unchanged) */}
          <div className="col-lg-6">
            {/* Slideshow Carousel */}
            <div className="bg-dark bg-opacity-50 rounded-4 p-4 shadow mb-4">
              <h4 className="fw-bold mb-4 text-light d-flex align-items-center gap-2">
                <FaFire /> Workout Inspiration
              </h4>

              <div id="workoutCarousel" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                  {slideshowImages.map((image, index) => (
                    <div
                      key={index}
                      className={`carousel-item ${index === 0 ? "active" : ""}`}
                      data-bs-interval="4000"
                    >
                      <img
                        src={image.url}
                        className="d-block w-100 rounded shadow"
                        alt={image.caption}
                        style={{ height: "340px", objectFit: "cover" }}
                      />
                      <div className="carousel-caption d-none d-md-block">
                        <p className="bg-dark bg-opacity-70 px-3 py-2 rounded fs-6 mb-0">
                          {image.caption}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#workoutCarousel"
                  data-bs-slide="prev"
                >
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#workoutCarousel"
                  data-bs-slide="next"
                >
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Next</span>
                </button>

                <div className="carousel-indicators">
                  {slideshowImages.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      data-bs-target="#workoutCarousel"
                      data-bs-slide-to={index}
                      className={index === 0 ? "active" : ""}
                      aria-current={index === 0}
                      aria-label={`Slide ${index + 1}`}
                    ></button>
                  ))}
                </div>
              </div>
            </div>

            {/* Workout Tips */}
            <div className="bg-dark bg-opacity-50 rounded-4 p-4 shadow mb-4">
              <h5 className="fw-bold mb-3 text-warning d-flex align-items-center gap-2">
                <FaDumbbell /> Quick Workout Tips
              </h5>
              <ul className="list-unstyled fs-6">
                <li className="mb-2">• HIIT burns 28–30% more calories than steady cardio</li>
                <li className="mb-2">• Strength training boosts metabolism long after workout</li>
                <li className="mb-2">• Combine cardio + weights for best results</li>
                <li>
                  <a href="https://www.mayoclinic.org/healthy-lifestyle/fitness/in-depth/exercise/art-20048389" target="_blank" rel="noopener noreferrer" className="text-info">
                    Mayo Clinic – Exercise for weight loss
                  </a>
                </li>
              </ul>
            </div>

            {/* Diet Tips */}
            <div className="bg-dark bg-opacity-50 rounded-4 p-4 shadow">
              <h5 className="fw-bold mb-3 text-info d-flex align-items-center gap-2">
                <FaAppleAlt /> Diet Tips to Support Calorie Goals
              </h5>
              <ul className="list-unstyled fs-6">
                <li className="mb-2">• High-protein meals preserve muscle & increase calorie burn</li>
                <li className="mb-2">• Fiber-rich foods (veggies, oats) keep you full longer</li>
                <li className="mb-2">• Drink water — even mild dehydration slows metabolism</li>
                <li>
                  <a href="https://www.hsph.harvard.edu/nutritionsource/healthy-weight/diet-reviews/calories/" target="_blank" rel="noopener noreferrer" className="text-info">
                    Harvard – Understanding calories & weight management
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

export default Predict;