import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeartbeat } from 'react-icons/fa';
// Correct relative imports (from pages/ folder)
import kanjiImg    from '../assets/kanji.png';     // go up one level with ../
import lihiniImg   from '../assets/lihini.png';
import sandushiImg from '../assets/sandushi.png';

function About() {
  return (
    <div className="container py-5 my-5">
      {/* Hero Section */}
      <div className="text-center mb-5 pb-4">
        <FaHeartbeat 
          className="text-danger mb-3" 
          style={{ fontSize: '4.5rem', animation: 'pulse 2s infinite ease-in-out' }} 
        />
        <h1 className="display-4 fw-bold" 
            style={{
              background: 'linear-gradient(90deg, #ff6b6b, #ff8e53)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
          About FitTrack Pro
        </h1>
        <p className="lead mt-3"
           style={{ color: "#ffffff" }}
        >
          Empowering you to understand, track, and optimize your body performance.
        </p>
      </div>

      {/* Our Mission */}
      <section className="mb-5">
        <h2 className="fw-bold mb-4 text-center">Our Mission</h2>
        <p className="fs-5 text-center mx-auto" style={{color: "#EAEAEA" , maxWidth: '800px' }}>
          At FitTrack Pro, we believe fitness starts with knowledge. Our goal is to provide accurate, easy-to-use tools that help you measure key body metrics, predict performance potential, and make informed decisions toward better health and strength.
        </p>
        <p className="fs-5 text-center mx-auto" style={{color: "#EAEAEA" , maxWidth: '800px' }}>
          Whether you're a beginner tracking basics like BMI and heart rate, or an athlete optimizing predictions. we're here to support your journey with science-backed insights.
        </p>
      </section>

      {/* What We Offer */}
      <section className="mb-5">
        <h2 className="fw-bold mb-4 text-center">What We Offer</h2>
        <div className="row g-4 justify-content-center">
          <div className="col-md-4">
            <div className="card h-100 bg-dark border-0 shadow text-center p-4">
              <h5 className="card-title text-danger">Accurate Calculators</h5>
              <p className="text-secondary">BMI, Max Heart Rate, and more — simple inputs, reliable results.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 bg-dark border-0 shadow text-center p-4">
              <h5 className="card-title text-danger">Smart Predictions</h5>
              <p className="text-secondary">Powered by machine learning to forecast body performance trends.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 bg-dark border-0 shadow text-center p-4">
              <h5 className="card-title text-danger">Personal Growth Tools</h5>
              <p className="text-secondary">Track progress, set goals, and stay motivated every day.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story / Why We Built This */}
      <section className="mb-5">
        <h2 className="fw-bold mb-4 text-center">Why We Built FitTrack Pro</h2>
        <p className="fs-5 text-center mx-auto" style={{color: "#EAEAEA" , maxWidth: '800px' }}>
          We started as fitness enthusiasts frustrated by complicated tools and unreliable information. 
          We wanted something straightforward, beautiful, and actually useful. no fluff, no paywalls for basics, just real value.
        </p>
        <p className="fs-5 text-center mx-auto" style={{color: "#EAEAEA" , maxWidth: '800px' }}>
          Today, FitTrack Pro is our way of giving back: free core features, privacy-focused tracking, and continuous improvements based on real user needs.
        </p>
      </section>

      {/* Our Team Section */}
    <section className="mb-5 pb-4">
    <h2 className="fw-bold mb-5 text-center">Our Team</h2>
    <p className="fs-5 text-center mx-auto" style={{ color:'#EAEAEA',maxWidth: '700px', margin: '0 auto' }}>
        Meet the passionate individuals behind FitTrack Pro — dedicated to helping you achieve your best self through smart tools and reliable insights.
    </p>

    <div className="row g-4 justify-content-center">
        {/* Team Member 1 */}
        <div className="col-md-6 col-lg-4">
        <div className="card h-100 bg-dark border-0 shadow-lg overflow-hidden text-center">
            <img 
                src={kanjiImg}
                className="card-img-top rounded-circle mx-auto mt-4"
                alt="Kavindu Anjana"
                style={{ width: '140px', height: '140px', objectFit: 'cover', border: '4px solid #ff6b6b' }}
            />
            <div className="card-body pt-0">
            <h5 className="card-title mt-3 mb-1 fw-bold">Kavindu</h5>
            <p className="text-danger mb-2" style={{ fontSize: '0.95rem' }}>Kavindu Anjana</p>
            <p className="text-secondary mb-4">
                3rd year undergraduate from University of Colombo, Faculty of Science department of Statistics.Specialized in Data Science.
            </p>
            <div className="d-flex justify-content-center gap-3">
                <a href="#" className="text-light fs-4"><i className="fab fa-linkedin"></i></a>
                <a href="#" className="text-light fs-4"><i className="fab fa-github"></i></a>
                <a href="#" className="text-light fs-4"><i className="fab fa-instagram"></i></a>
            </div>
            </div>
        </div>
        </div>

        {/* Team Member 2 - Duplicate & customize */}
        <div className="col-md-6 col-lg-4">
        <div className="card h-100 bg-dark border-0 shadow-lg overflow-hidden text-center">
            <img 
                src={sandushiImg}
                className="card-img-top rounded-circle mx-auto mt-4"
                alt="Sandushi Devanji"
                style={{ width: '140px', height: '140px', objectFit: 'cover', border: '4px solid #ff8e53' }}
            />
            <div className="card-body pt-0">
            <h5 className="card-title mt-3 mb-1 fw-bold">Alex Perera</h5>
            <p className="text-danger mb-2" style={{ fontSize: '0.95rem' }}>Sandushi Devanji</p>
            <p className="text-secondary mb-4">
                3rd year undergraduate from University of Colombo, Faculty of Science department of Statistics.Specialized in Statistics.
            </p>
            <div className="d-flex justify-content-center gap-3">
                <a href="#" className="text-light fs-4"><i className="fab fa-dribbble"></i></a>
                <a href="#" className="text-light fs-4"><i className="fab fa-behance"></i></a>
                <a href="#" className="text-light fs-4"><i className="fab fa-twitter"></i></a>
            </div>
            </div>
        </div>
        </div>

        {/* Team Member 3 */}
        <div className="col-md-6 col-lg-4">
        <div className="card h-100 bg-dark border-0 shadow-lg overflow-hidden text-center">
            <img 
                src={lihiniImg}
                className="card-img-top rounded-circle mx-auto mt-4"
                alt="Lihini Maleesha"
                style={{ width: '140px', height: '140px', objectFit: 'cover', border: '4px solid #ff6b6b' }}
            />
            <div className="card-body pt-0">
            <h5 className="card-title mt-3 mb-1 fw-bold">Nimali Silva</h5>
            <p className="text-danger mb-2" style={{ fontSize: '0.95rem' }}>Lihini Maleesha</p>
            <p className="text-secondary mb-4">
                3rd year undergraduate from University of Colombo, Faculty of Science department of Statistics.Specialized in Statistics.
            </p>
            <div className="d-flex justify-content-center gap-3">
                <a href="#" className="text-light fs-4"><i className="fab fa-linkedin"></i></a>
                <a href="#" className="text-light fs-4"><i className="fab fa-github"></i></a>
            </div>
            </div>
        </div>
        </div>

        {/* Add more team members by copying the col block above */}
    </div>
    </section>

      {/* Call to Action */}
      <div className="text-center mt-5 pt-4">
        <h3 className="mb-4">Ready to start your journey?</h3>
        <Link to="/predict" className="btn btn-gradient btn-lg px-5 py-3 fw-bold">
          Try Prediction Now
        </Link>
        <Link to="/" className="btn btn-outline-light btn-lg px-5 py-3 ms-3">
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default About;