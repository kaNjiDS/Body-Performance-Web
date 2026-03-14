import { Link, useNavigate } from "react-router-dom";
import { FaHeartbeat, FaPlayCircle } from "react-icons/fa"; 
import ruler   from '../assets/measuring-tape.png';
import tips from '../assets/lightbulb.png';
function Home() {
  const navigate = useNavigate();

  return (
    <div>
      {/* HERO SECTION – remains dark */}
      <section className="hero-section bg-dark text-white text-center py-5 py-md-5">
        <div className="container">
          <FaHeartbeat
            className="text-danger mb-4"
            style={{
              fontSize: "6rem",
              filter: "drop-shadow(0 8px 20px rgba(220, 53, 69, 0.6))",
              animation: "pulse 2.5s infinite ease-in-out",
            }}
          />
          <h1
            className="hero-title fw-bold mb-3"
            style={{
              fontSize: "4.5rem",
              background: "linear-gradient(90deg, #ff6b6b, #ff8e53, #ff4757)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            FitTrack Pro
          </h1>
          <p className="hero-subtitle lead fs-4 mb-5 opacity-90">
            Smart Fitness Calculator Powered by ML – Track Calories, BMI & Heart Rate
          </p>

          <Link
            to="/predict"
            className="btn btn-gradient btn-lg px-5 py-3 fw-semibold"
            style={{ fontSize: "1.4rem" }}
          >
            Start Calculating Now
          </Link>
        </div>
      </section>

      {/* FEATURES SECTION – now with LIGHT cards */}
      <section className="container mt-5 pt-4">
        <h2 className="text-center mb-5" style={{ fontSize: "3rem", color: "#ff8c66" }}>
          Powerful Tools for Your Fitness Journey
        </h2>

        <div className="row text-center">
          {/* Burned Calories */}
          <div className="col-md-4 mb-5" color="blue">
            <div
              className="feature-card shadow h-100 cursor-pointer bg-white bg-opacity-90"
              onClick={() => navigate("/predict")}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && navigate("/predict")}
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/2964/2964514.png"
                alt="Calories"
                className="feature-icon mx-auto"
              />
              <h4 className="feature-title mt-3 text-dark">Burned Calories</h4>
              <p className="fs-5 text-secondary">
                Accurate ML-powered prediction based on your real stats
              </p>
            </div>
          </div>

          {/* Measures Section */}
          <div className="col-md-4 mb-5">
            <div
              className="feature-card shadow h-100 cursor-pointer bg-white bg-opacity-90"
              onClick={() => navigate("/measures")}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && navigate("/measures")}
            >
              <img
                src={ruler}
                alt="BMI"
                className="feature-icon mx-auto"
              />
              <h4 className="feature-title mt-3 text-dark">Calculators</h4>
              <p className="fs-5 text-secondary">
                Use our smart calculators to understand your body and fuel it better.
              </p>
            </div>
          </div>

          {/* Max Heart Rate */}
          <div className="col-md-4 mb-5">
            <div
              className="feature-card shadow h-100 cursor-pointer bg-white bg-opacity-90"
              onClick={() => navigate("/tips")}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && navigate("/tips")}
            >
              <img
                src={tips}
                alt="Tips"
                className="feature-icon mx-auto"
              />
              <h4 className="feature-title mt-3 text-dark">Tips</h4>
              <p className="fs-5 text-secondary">
                Discover practical exercise tips to train smarter, stay consistent, and avoid injury.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* FAQ Section */}
      {/* FAQ Section */}
      <section className="py-5 bg-dark text-light">
        <div className="container py-4">
          {/* Header */}
          <div className="text-center mb-5">
            <h2 
              className="display-5 fw-bold mb-3"
              style={{
                background: 'linear-gradient(90deg, #ff6b6b, #ff8e53)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Frequently Asked Questions
            </h2>
            <p className="lead text-light opacity-75" style={{ maxWidth: '700px', margin: '0 auto' }}>
              Quick answers to the most common questions about FitTrack Pro.
            </p>
          </div>

          {/* Custom FAQ list */}
          <div className="faq-list">
            {/* Question 1 */}
            <div className="mb-4 bg-dark border border-secondary-subtle rounded-3 overflow-hidden">
              <div 
                className="p-4 fw-medium text-white d-flex justify-content-between align-items-center"
                data-bs-toggle="collapse"
                data-bs-target="#faq1"
                aria-expanded="false"
                aria-controls="faq1"
                style={{ cursor: 'pointer' }}
              >
                <span>What is FitTrack Pro and who is it for?</span>
                <i className="fas fa-chevron-down small ms-2 transition-transform" 
                  style={{ fontSize: '0.9rem' }}></i>
              </div>
              <div id="faq1" className="collapse px-4 pb-4 text-secondary">
                FitTrack Pro is a free web tool that helps you track and understand your body performance through calculators (BMI, body fat, heart rate, macros, etc.) and smart predictions. It's designed for beginners who want to start tracking, as well as intermediate users who want better insights into their progress — no subscription required.
              </div>
            </div>

            {/* Question 2 */}
            <div className="mb-4 bg-dark border border-secondary-subtle rounded-3 overflow-hidden">
              <div 
                className="p-4 fw-medium text-white d-flex justify-content-between align-items-center"
                data-bs-toggle="collapse"
                data-bs-target="#faq2"
                aria-expanded="false"
                aria-controls="faq2"
                style={{ cursor: 'pointer' }}
              >
                <span>Are the calculations accurate?</span>
                <i className="fas fa-chevron-down small ms-2 transition-transform" 
                  style={{ fontSize: '0.9rem' }}></i>
              </div>
              <div id="faq2" className="collapse px-4 pb-4 text-secondary">
                All calculators use widely accepted formulas (Mifflin-St Jeor for BMR/TDEE, U.S. Navy for body fat, etc.). They are reliable estimates for most people, but individual results can vary due to genetics, hormones, measurement technique, etc. They should be used as helpful guides — not medical diagnoses.
              </div>
            </div>

            {/* Repeat the same pattern for other questions */}
            {/* Question 3 */}
            <div className="mb-4 bg-dark border border-secondary-subtle rounded-3 overflow-hidden">
              <div 
                className="p-4 fw-medium text-white d-flex justify-content-between align-items-center"
                data-bs-toggle="collapse"
                data-bs-target="#faq3"
                aria-expanded="false"
                aria-controls="faq3"
                style={{ cursor: 'pointer' }}
              >
                <span>Is my data private and secure?</span>
                <i className="fas fa-chevron-down small ms-2 transition-transform" 
                  style={{ fontSize: '0.9rem' }}></i>
              </div>
              <div id="faq3" className="collapse px-4 pb-4 text-secondary">
                Yes — we do not store any personal data on our servers. All calculations happen directly in your browser. No account is required to use the tools, and we don't collect or sell any user information.
              </div>
            </div>

            {/* Question 4 */}
            <div className="mb-4 bg-dark border border-secondary-subtle rounded-3 overflow-hidden">
              <div 
                className="p-4 fw-medium text-white d-flex justify-content-between align-items-center"
                data-bs-toggle="collapse"
                data-bs-target="#faq4"
                aria-expanded="false"
                aria-controls="faq4"
                style={{ cursor: 'pointer' }}
              >
                <span>Can I use the predictions for serious training or dieting?</span>
                <i className="fas fa-chevron-down small ms-2 transition-transform" 
                  style={{ fontSize: '0.9rem' }}></i>
              </div>
              <div id="faq4" className="collapse px-4 pb-4 text-secondary">
                The prediction tools give useful estimates based on the data you provide, but they are not a substitute for professional coaching or medical/nutrition advice. Always consult a qualified trainer or dietitian for personalized plans, especially if you have health conditions.
              </div>
            </div>

            {/* Question 5 */}
            <div className="mb-4 bg-dark border border-secondary-subtle rounded-3 overflow-hidden">
              <div 
                className="p-4 fw-medium text-white d-flex justify-content-between align-items-center"
                data-bs-toggle="collapse"
                data-bs-target="#faq5"
                aria-expanded="false"
                aria-controls="faq5"
                style={{ cursor: 'pointer' }}
              >
                <span>How can I suggest new features or calculators?</span>
                <i className="fas fa-chevron-down small ms-2 transition-transform" 
                  style={{ fontSize: '0.9rem' }}></i>
              </div>
              <div id="faq5" className="collapse px-4 pb-4 text-secondary">
                We love hearing from users! Go to the <Link to="/contact" className="text-danger text-decoration-none fw-medium">Contact</Link> page and send us your ideas — whether it's a new calculator, UI improvement, or anything else.
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-5 pt-4">
            <p className="text-muted mb-4">Still have questions?</p>
            <Link to="/contact" className="btn btn-gradient px-5 py-3 fw-bold shadow">
              Contact Us →
            </Link>
          </div>
        </div>
      </section>



      {/* FOOTER – remains dark */}
      <footer className="bg-dark text-white text-center p-4">
        © {new Date().getFullYear()} FitTrack Pro | Powered by React + Flask ML Model
      </footer>
    </div>
  );
}

export default Home;