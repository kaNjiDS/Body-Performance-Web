import React from 'react';
import { Link } from 'react-router-dom';

function Tips() {
  // You can expand this array later with more videos
  const exerciseTips = [
    {
      title: "30-Minute HIIT Cardio Workout with Warm Up",
      videoId: "ml6cT4AZdqI", // Jeff Nippard - highly respected for technique
      description: "high intensity cardio bodyweight workout,  at home! No equipment needed!",
      channel: "SELF"
    },
    {
      title: "Deadlift Technique Tutorial – Avoid Common Mistakes",
      videoId: "ytGaGIn3SjE",
      description: "Step-by-step deadlift form guide with common errors explained.",
      channel: "Jeff Nippard"
    },
    {
      title: "How to Bench Press Correctly (Full Tutorial)",
      videoId: "vcBig73ojpE",
      description: "Complete bench press technique – safe and effective for all levels.",
      channel: "Jeff Nippard"
    },
    {
      title: "Overhead Press – Perfect Form & Common Mistakes",
      videoId: "F3QY5vMz_6I",
      description: "Learn the strict overhead press with correct shoulder positioning.",
      channel: "Jeff Nippard"
    },
    {
      title: "How to Do Pull-Ups with Perfect Technique",
      videoId: "eGo4IYlbE5g",
      description: "Progression and technique guide for full-range strict pull-ups.",
      channel: "Calisthenicmovement"
    },
    {
      title: "Lunges – Correct Form to Protect Knees",
      videoId: "QOVaHwm-Q6U",
      description: "Forward, reverse, and walking lunges – technique and variations.",
      channel: "ATHLEAN-X"
    },

  ];

  return (
    <div className="container py-5 my-4">
      <div className="text-center mb-5">
        <h1 className="display-5 fw-bold" style={{ color: '#ff6b6b' }}>
          Exercise Tips & Correct Technique Tutorials
        </h1>
        <p className="fs-5 text-center mx-auto" style={{color: "#EAEAEA" , maxWidth: '800px' }}>
          Watch expert demonstrations to perform exercises safely and effectively.
        </p>
      </div>

      <div className="row g-4">
        {exerciseTips.map((tip, index) => (
          <div className="col-md-6 col-lg-4" key={index}>
            <div className="card h-100 bg-dark border-0 shadow overflow-hidden">
              <div className="ratio ratio-16x9">
                <iframe
                  src={`https://www.youtube.com/embed/${tip.videoId}`}
                  title={tip.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
              <div className="card-body d-flex flex-column">
                <h5 className="card-title text-light mb-3">{tip.title}</h5>
                <p className="card-text text-secondary mb-4 flex-grow-1">
                  {tip.description}
                </p>
                <small className="text-muted">By {tip.channel}</small>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* More tips note + back button */}
      <div className="text-center mt-5 pt-4">
        <p className="fs-5 text-center mx-auto" style={{color: "#EAEAEA" , maxWidth: '800px' }}>
          More tutorials coming soon. Want to suggest an exercise?
        </p>
        <Link to="/contactus" className="btn btn-outline-light px-5 py-2 me-3">
          Contact Us
        </Link>
        <Link to="/measures" className="btn btn-outline-light px-5 py-2">
          ← Back to Measures
        </Link>
      </div>
    </div>
  );
}

export default Tips;