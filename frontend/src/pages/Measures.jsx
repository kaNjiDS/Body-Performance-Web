import React from 'react';
import { Link } from 'react-router-dom';

function Measures() {
  return (
    <div className="container py-5 my-4">
      {/* Page Header */}
      <div className="text-center mb-5">
        <h1 className="display-5 fw-bold text-white">Fitness Measures & Calculators</h1>
        <p className="fs-5 text-center mx-auto" style={{color: "#EAEAEA" , maxWidth: '800px' }}>
          Select a tool below to calculate important body and fitness metrics.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="row g-4 justify-content-center">
        {/* BMI Card */}
        <div className="col-md-6 col-lg-4">
          <div className="card h-100 shadow-lg border-0 bg-dark text-white overflow-hidden">
            <div className="card-body d-flex flex-column text-center p-4">
              <div className="mb-3">
                <i className="fas fa-weight-scale fa-3x text-danger mb-3"></i>
              </div>
              <h4 className="card-title mb-3">BMI Calculator</h4>
              <p className="card-text text-secondary mb-4">
                Calculate your Body Mass Index using height and weight to see if you're in a healthy range.
              </p>
              <Link to="/bmi" className="btn btn-outline-danger mt-auto fw-semibold">
                Open BMI Calculator →
              </Link>
            </div>
          </div>
        </div>

        {/* Max Heart Rate Card */}
        <div className="col-md-6 col-lg-4">
          <div className="card h-100 shadow-lg border-0 bg-dark text-white overflow-hidden">
            <div className="card-body d-flex flex-column text-center p-4">
              <div className="mb-3">
                <i className="fas fa-heartbeat fa-3x text-danger mb-3"></i>
              </div>
              <h4 className="card-title mb-3">Maximum Heart Rate</h4>
              <p className="card-text text-secondary mb-4">
                Estimate your maximum heart rate to set proper training zones for cardio workouts.
              </p>
              <Link to="/max-heart-rate" className="btn btn-outline-danger mt-auto fw-semibold">
                Open Heart Rate Calculator →
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-4">
          <div className="card h-100 shadow-lg border-0 bg-dark text-white overflow-hidden">
            <div className="card-body d-flex flex-column text-center p-4">
              <div className="mb-3">
                <i className="fas fa-heartbeat fa-3x text-danger mb-3"></i>
              </div>
              <h4 className="card-title mb-3">Body Fat Precentage</h4>
              <p className="card-text text-secondary mb-4">
                Estimate your body fat precentage to set proper training zones for cardio workouts.
              </p>
              <Link to="/bodyfat" className="btn btn-outline-danger mt-auto fw-semibold">
                Open Body Fat Calculator →
              </Link>

            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-4">
          <div className="card h-100 shadow-lg border-0 bg-dark text-white overflow-hidden">
            <div className="card-body d-flex flex-column text-center p-4">
              <div className="mb-3">
                <i className="fas fa-heartbeat fa-3x text-danger mb-3"></i>
              </div>
              <h4 className="card-title mb-3">Calorie Deficit Calculator</h4>
              <p className="card-text text-secondary mb-4">
                Calculate how many calories you need to cut to reach your weight loss goals
              </p>
              <Link to="/deficit" className="btn btn-outline-danger mt-auto fw-semibold">
                Open Calorie Deficit Calculator →
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-4">
          <div className="card h-100 shadow-lg border-0 bg-dark text-white overflow-hidden">
            <div className="card-body d-flex flex-column text-center p-4">
              <div className="mb-3">
                <i className="fas fa-heartbeat fa-3x text-danger mb-3"></i>
              </div>
              <h4 className="card-title mb-3">Macro Needs Calculator</h4>
              <p className="card-text text-secondary mb-4">
                This calculator can provide a range of suggested values for a person's macronutrient and Calorie needs under normal conditions.
              </p>
              <Link to="/macro" className="btn btn-outline-danger mt-auto fw-semibold">
                Open Macro Calculator →
              </Link>
            </div>
          </div>
        </div>





        {/* You can keep adding more placeholder cards like this */}
      </div>

      {/* Optional: Back / Home button at bottom */}
      <div className="text-center mt-5">
        <Link to="/" className="btn btn-outline-light btn-lg px-5">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}

export default Measures;