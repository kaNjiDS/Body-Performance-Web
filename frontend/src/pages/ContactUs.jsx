import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHeartbeat, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In real app: send to backend (Flask endpoint) or email service
    // For now: just simulate success
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="container py-5 my-5">
      {/* Header */}
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
          Contact FitTrack Pro
        </h1>
        <p className="fs-5 text-center mx-auto" style={{color: "#EAEAEA" , maxWidth: '900px' }}>
          Have questions, feedback, or need support? We're here to help you on your fitness journey.
        </p>
      </div>

      <div className="row g-5">
        {/* Contact Info Column */}
        <div className="col-lg-5">
          <h3 className="fw-bold mb-4">Get in Touch</h3>
          <p className="text-secondary mb-4" style={{color: "#EAEAEA",maxWidth:'400px'}}>
            We'd love to hear from you. Reach out using any of the options below or fill out the form.
          </p>

          <ul className="list-unstyled fs-5">
            <li className="mb-3 d-flex align-items-center">
              <FaEnvelope className="text-danger me-3" style={{ fontSize: '1.6rem' }} />
              <a href="mailto:support@fittrackpro.com" className="text-light text-decoration-none">
                support@fittrackpro.com
              </a>
            </li>
            <li className="mb-3 d-flex align-items-center">
              <FaPhoneAlt className="text-danger me-3" style={{ fontSize: '1.6rem' }} />
              <span className="text-light">+94 11 123 4567 (Mon–Fri, 9 AM – 6 PM SL Time)</span>
            </li>
            <li className="mb-3 d-flex align-items-center">
              <FaMapMarkerAlt className="text-danger me-3" style={{ fontSize: '1.6rem' }} />
              <span className="text-light">Colombo, Sri Lanka</span>
            </li>
          </ul>

          {/* Optional social links */}
          <div className="mt-4">
            {/*<h5 className="mb-3">Follow Us</h5>*/}
            <div className="d-flex gap-4">
              <a href="https://instagram.com/fittrackpro" className="text-light fs-3" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://facebook.com/fittrackpro" className="text-light fs-3" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="https://twitter.com/fittrackpro" className="text-light fs-3" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Form Column */}
        <div className="col-lg-7">
          <div className="card bg-dark border-0 shadow-lg p-4 p-md-5">
            {submitted ? (
              <div className="text-center py-5">
                <h4 className="text-success mb-3">Thank You!</h4>
                <p className="text-secondary">Your message has been sent. We'll get back to you soon.</p>
                <button 
                  className="btn btn-outline-light mt-3" 
                  onClick={() => setSubmitted(false)}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="form-label text-light">Your Name</label>
                  <input
                    type="text"
                    className="form-control bg-secondary border-0 text-light"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="email" className="form-label text-light">Email Address</label>
                  <input
                    type="email"
                    className="form-control bg-secondary border-0 text-light"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="message" className="form-label text-light">Your Message</label>
                  <textarea
                    className="form-control bg-secondary border-0 text-light"
                    id="message"
                    name="message"
                    rows="6"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-gradient btn-lg w-100 fw-bold">
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="text-center mt-5 pt-4">
        <Link to="/" className="btn btn-outline-light btn-lg px-5">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}

export default Contact;