// src/pages/MacroNeeds.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function MacroNeeds() {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [activity, setActivity] = useState('moderate');
  const [goal, setGoal] = useState('maintain');

  // Settings toggle (simple state, no Collapse component needed)
  const [showSettings, setShowSettings] = useState(false);
  const [customProtein, setCustomProtein] = useState('');

  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const calculate = (e) => {
    e.preventDefault();
    setError('');
    setResult(null);

    const w = parseFloat(weight);
    const h = parseFloat(height);
    const a = parseFloat(age);

    if (isNaN(w) || isNaN(h) || isNaN(a) || w <= 0 || h <= 0 || a < 18 || a > 80) {
      setError('Please fill valid values (Age 18–80, positive height & weight).');
      return;
    }

    // Protein g/kg
    let protGkg = customProtein ? parseFloat(customProtein) : 1.6;
    if (goal === 'muscle_gain') protGkg = Math.max(protGkg, 1.8);
    if (goal === 'fat_loss')    protGkg = Math.max(protGkg, 2.0);

    const proteinG = Math.round(w * protGkg);

    // Very approximate TDEE multiplier
    const multipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      very_active: 1.9,
    };

    // Rough BMR
    let bmr = gender === 'male'
      ? 10 * w + 6.25 * h - 5 * a + 5
      : 10 * w + 6.25 * h - 5 * a - 161;

    const tdee = Math.round(bmr * multipliers[activity]);

    // Protein calories
    const protCal = proteinG * 4;

    // Remaining calories split
    let carbRatio = goal === 'muscle_gain' ? 0.55 : goal === 'fat_loss' ? 0.40 : 0.50;
    let fatRatio  = goal === 'muscle_gain' ? 0.25 : goal === 'fat_loss' ? 0.35 : 0.30;

    const remaining = tdee - protCal;
    const carbsG = Math.round((remaining * carbRatio) / 4);
    const fatG   = Math.round((remaining * fatRatio) / 9);

    setResult({
      proteinG,
      carbsG,
      fatG,
      totalCal: Math.round(protCal + carbsG * 4 + fatG * 9),
      proteinPct: Math.round((protCal / tdee) * 100) || 0,
      carbPct: Math.round((carbsG * 4 / tdee) * 100) || 0,
      fatPct: Math.round((fatG * 9 / tdee) * 100) || 0,
      message:
        goal === 'fat_loss'
          ? 'Higher protein helps preserve muscle during a deficit.'
          : goal === 'muscle_gain'
          ? 'Extra carbs support training and recovery.'
          : 'Balanced split for long-term maintenance.'
    });
  };

  const reset = () => {
    setAge('');
    setGender('male');
    setHeight('');
    setWeight('');
    setActivity('moderate');
    setGoal('maintain');
    setCustomProtein('');
    setResult(null);
    setError('');
  };

  return (
    <div className="container py-5 my-4">
      <div className="row justify-content-center">
        <div className="col-lg-7 col-xl-6">
          <h1 className="text-center mb-5 fw-bold" style={{ color: '#ff6b6b' }}>
            Protein & Macro Needs
          </h1>
          <p className="fs-5 text-center" style={{color: "#EAEAEA" , maxWidth: '2000px' }}>
            This calculator can provide a range of suggested values for a person's macronutrient and Calorie needs under normal conditions.
          </p>

          <form onSubmit={calculate} className="p-4 bg-dark rounded shadow">
            {/* Age */}
            <div className="mb-4">
              <label htmlFor="age" className="form-label text-light">
                Age <small className="text-muted">(18–80)</small>
              </label>
              <input
                type="number"
                className="form-control bg-secondary border-0 text-light"
                id="age"
                min="18"
                max="80"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
              />
            </div>

            {/* Gender */}
            <div className="mb-4">
              <label className="form-label text-light">Gender</label>
              <div className="d-flex gap-4">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    id="male"
                    name="gender"
                    value="male"
                    checked={gender === 'male'}
                    onChange={(e) => setGender(e.target.value)}
                  />
                  <label className="form-check-label text-light" htmlFor="male">
                    male
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    id="female"
                    name="gender"
                    value="female"
                    checked={gender === 'female'}
                    onChange={(e) => setGender(e.target.value)}
                  />
                  <label className="form-check-label text-light" htmlFor="female">
                    female
                  </label>
                </div>
              </div>
            </div>

            {/* Height & Weight */}
            <div className="row mb-4">
              <div className="col-md-6">
                <label htmlFor="height" className="form-label text-light">
                  Height <small className="text-muted">cm</small>
                </label>
                <input
                  type="number"
                  className="form-control bg-secondary border-0 text-light"
                  id="height"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="weight" className="form-label text-light">
                  Weight <small className="text-muted">kg</small>
                </label>
                <input
                  type="number"
                  step="0.1"
                  className="form-control bg-secondary border-0 text-light"
                  id="weight"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Activity */}
            <div className="mb-4">
              <label htmlFor="activity" className="form-label text-light">
                Activity
              </label>
              <select
                id="activity"
                className="form-select bg-secondary border-0 text-light"
                value={activity}
                onChange={(e) => setActivity(e.target.value)}
              >
                <option value="sedentary">Sedentary: little or no exercise</option>
                <option value="light">Light: exercise 1–3 days/week</option>
                <option value="moderate">Moderate: exercise 4–5 days/week</option>
                <option value="active">Active: exercise 6–7 days/week</option>
                <option value="very_active">Very Active: hard exercise + physical job</option>
              </select>
            </div>

            {/* Goal */}
            <div className="mb-4">
              <label htmlFor="goal" className="form-label text-light">
                Your Goal
              </label>
              <select
                id="goal"
                className="form-select bg-secondary border-0 text-light"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
              >
                <option value="muscle_gain">Muscle gain</option>
                <option value="fat_loss">Fat loss</option>
                <option value="maintain">Maintain weight</option>
              </select>
            </div>

            {/* + Settings toggle */}
            <div className="mb-4">
              <button
                type="button"
                className="btn btn-link text-light p-0"
                onClick={() => setShowSettings(!showSettings)}
              >
                {showSettings ? '−' : '+'} Settings
              </button>

              {showSettings && (
                <div className="mt-3">
                  <label htmlFor="customProtein" className="form-label text-light">
                    Custom protein (g/kg bodyweight) <small className="text-muted">(optional)</small>
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    className="form-control bg-secondary border-0 text-light"
                    id="customProtein"
                    value={customProtein}
                    onChange={(e) => setCustomProtein(e.target.value)}
                    placeholder="e.g. 1.8 – 2.4"
                  />
                  <small className="text-muted d-block mt-1">
                    Leave empty for automatic recommendation.
                  </small>
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="d-flex gap-3">
              <button type="submit" className="btn btn-success flex-grow-1 py-3 fw-bold">
                Calculate
              </button>
              <button type="button" className="btn btn-outline-light px-5 py-3" onClick={reset}>
                Clear
              </button>
            </div>
          </form>

          {error && <div className="alert alert-danger mt-4 text-center">{error}</div>}

          {result && (
            <div className="card bg-dark text-white mt-5 shadow p-4 text-center">
              <h3 className="mb-4">Your Daily Targets</h3>

              <div className="row g-4 text-center">
                <div className="col-4">
                  <h5 className="mb-1 text-secondary">Protein</h5>
                  <h3 className="fw-bold">{result.proteinG} g</h3>
                </div>
                <div className="col-4">
                  <h5 className="mb-1 text-secondary">Carbs</h5>
                  <h3 className="fw-bold">{result.carbsG} g</h3>
                </div>
                <div className="col-4">
                  <h5 className="mb-1 text-secondary">Fat</h5>
                  <h3 className="fw-bold">{result.fatG} g</h3>
                </div>
              </div>

              <hr className="bg-secondary my-4" />

              <h5>Total Calories</h5>
              <h4 className="fw-bold mb-3">{result.totalCal} kcal / day</h4>

              <p className="small text-secondary mb-1">
                Approx. split: Protein {result.proteinPct}% • Carbs {result.carbPct}% • Fat {result.fatPct}%
              </p>

              <p className="text-secondary">{result.message}</p>

              <p className="text-muted small mt-4">
                General guideline only. Adjust based on real progress and consider professional advice.
              </p>
            </div>
          )}

          <div className="text-center mt-5">
            <Link to="/measures" className="btn btn-outline-light px-5 py-2">
              ← Back to Measures
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MacroNeeds;