import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function CalorieDeficit() {
  const [gender, setGender] = useState('male');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');       // kg
  const [height, setHeight] = useState('');       // cm
  const [activity, setActivity] = useState('1.2'); // sedentary default
  const [goal, setGoal] = useState('deficit');     // deficit / surplus / maintain
  const [rate, setRate] = useState('0.5');         // kg per week

  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const calculate = (e) => {
    e.preventDefault();
    setError('');
    setResult(null);

    const ageNum = parseFloat(age);
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);
    const activityNum = parseFloat(activity);
    const rateNum = parseFloat(rate);

    if (isNaN(ageNum) || isNaN(weightNum) || isNaN(heightNum) || isNaN(activityNum) || isNaN(rateNum)) {
      setError('Please fill in all fields with valid numbers.');
      return;
    }

    // Mifflin-St Jeor BMR
    let bmr;
    if (gender === 'male') {
      bmr = 10 * weightNum + 6.25 * heightNum - 5 * ageNum + 5;
    } else {
      bmr = 10 * weightNum + 6.25 * heightNum - 5 * ageNum - 161;
    }

    const tdee = bmr * activityNum;

    let dailyCalories = tdee;
    let weeklyChange = 0;
    let monthlyChange = 0;

    if (goal === 'deficit') {
      // 7700 kcal ≈ 1 kg fat
      const deficitPerDay = (7700 * rateNum) / 7;
      dailyCalories = Math.round(tdee - deficitPerDay);
      weeklyChange = -rateNum;
      monthlyChange = weeklyChange * 4.345;
    } else if (goal === 'surplus') {
      const surplusPerDay = (7700 * rateNum) / 7;
      dailyCalories = Math.round(tdee + surplusPerDay);
      weeklyChange = +rateNum;
      monthlyChange = weeklyChange * 4.345;
    } else {
      dailyCalories = Math.round(tdee);
      weeklyChange = 0;
      monthlyChange = 0;
    }

    // Safety guardrails
    const minSafe = gender === 'male' ? 1500 : 1200;
    if (dailyCalories < minSafe) {
      setError(`Calculated calories (${dailyCalories}) below safe minimum (${minSafe}). Consider a slower rate or consult a professional.`);
      return;
    }

    setResult({
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      dailyCalories,
      weeklyChange: weeklyChange.toFixed(2),
      monthlyChange: monthlyChange.toFixed(2),
      goalType: goal
    });
  };

  return (
    <div className="container py-5 my-4">
      <div className="row justify-content-center">
        <div className="col-lg-8 col-xl-6">
          <h1 className="text-center mb-4 fw-bold" style={{ color: '#ff6b6b' }}>
            Calorie Deficit / Surplus Calculator
          </h1>
          <p className="fs-5 text-center mx-auto" style={{color: "#EAEAEA" , maxWidth: '1200px' }}>
            Estimate daily calories for weight loss, gain, or maintenance.
          </p>

          <form onSubmit={calculate} className="p-4 bg-dark rounded-4 shadow">
            {/* Gender */}
            <div className="mb-4">
              <label className="form-label text-light">Gender</label>
              <div className="d-flex gap-4">
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="gender" id="male" value="male" checked={gender === 'male'} onChange={e => setGender(e.target.value)} />
                  <label className="form-check-label text-light" htmlFor="male">Male</label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="gender" id="female" value="female" checked={gender === 'female'} onChange={e => setGender(e.target.value)} />
                  <label className="form-check-label text-light" htmlFor="female">Female</label>
                </div>
              </div>
            </div>

            {/* Age, Weight, Height */}
            <div className="row mb-4">
              <div className="col-md-4">
                <label htmlFor="age" className="form-label text-light">Age</label>
                <input type="number" className="form-control bg-secondary border-0 text-light" id="age" value={age} onChange={e => setAge(e.target.value)} min="18" required />
              </div>
              <div className="col-md-4">
                <label htmlFor="weight" className="form-label text-light">Weight (kg)</label>
                <input type="number" step="0.1" className="form-control bg-secondary border-0 text-light" id="weight" value={weight} onChange={e => setWeight(e.target.value)} required />
              </div>
              <div className="col-md-4">
                <label htmlFor="height" className="form-label text-light">Height (cm)</label>
                <input type="number" className="form-control bg-secondary border-0 text-light" id="height" value={height} onChange={e => setHeight(e.target.value)} required />
              </div>
            </div>

            {/* Activity Level */}
            <div className="mb-4">
              <label className="form-label text-light">Activity Level</label>
              <select className="form-select bg-secondary border-0 text-light" value={activity} onChange={e => setActivity(e.target.value)}>
                <option value="1.2">Sedentary (little or no exercise)</option>
                <option value="1.375">Lightly active (light exercise 1-3 days/week)</option>
                <option value="1.55">Moderately active (moderate exercise 3-5 days/week)</option>
                <option value="1.725">Very active (hard exercise 6-7 days/week)</option>
                <option value="1.9">Super active (very hard exercise & physical job)</option>
              </select>
            </div>

            {/* Goal */}
            <div className="mb-4">
              <label className="form-label text-light">Your Goal</label>
              <div className="d-flex gap-3 flex-wrap">
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="goal" id="deficit" value="deficit" checked={goal === 'deficit'} onChange={e => setGoal(e.target.value)} />
                  <label className="form-check-label text-light" htmlFor="deficit">Lose weight (deficit)</label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="goal" id="surplus" value="surplus" checked={goal === 'surplus'} onChange={e => setGoal(e.target.value)} />
                  <label className="form-check-label text-light" htmlFor="surplus">Gain weight (surplus)</label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="goal" id="maintain" value="maintain" checked={goal === 'maintain'} onChange={e => setGoal(e.target.value)} />
                  <label className="form-check-label text-light" htmlFor="maintain">Maintain weight</label>
                </div>
              </div>
            </div>

            {/* Rate (only show if not maintain) */}
            {goal !== 'maintain' && (
              <div className="mb-4">
                <label className="form-label text-light">Target rate (kg per week)</label>
                <select className="form-select bg-secondary border-0 text-light" value={rate} onChange={e => setRate(e.target.value)}>
                  <option value="0.25">0.25 kg/week (very slow & sustainable)</option>
                  <option value="0.5">0.5 kg/week (moderate, most common)</option>
                  <option value="0.75">0.75 kg/week</option>
                  <option value="1.0">1 kg/week (aggressive – monitor closely)</option>
                </select>
              </div>
            )}

            <button type="submit" className="btn btn-gradient w-100 py-3 fw-bold mt-3">
              Calculate Calories
            </button>
          </form>

          {error && <div className="alert alert-danger mt-4 text-center">{error}</div>}

          {result && (
            <div className="card bg-dark text-white mt-5 shadow border-0 p-4 text-center">
              <h3 className="mb-3">Your Results</h3>
              <div className="row mb-3">
                <div className="col-6">
                  <p className="mb-1 text-secondary">BMR (resting)</p>
                  <h4>{result.bmr} kcal/day</h4>
                </div>
                <div className="col-6">
                  <p className="mb-1 text-secondary">TDEE (maintenance)</p>
                  <h4>{result.tdee} kcal/day</h4>
                </div>
              </div>

              <hr className="bg-secondary" />

              <h4 className="mb-3">
                Recommended Daily Calories
              </h4>
              <h2 className="display-5 fw-bold mb-2" style={{ color: '#ff8e53' }}>
                {result.dailyCalories} kcal
              </h2>

              {result.goalType === 'deficit' && (
                <p className="fs-5">
                  Deficit for <strong>{result.weeklyChange} kg/week</strong> loss<br />
                  ≈ <strong>{Math.abs(result.monthlyChange).toFixed(1)} kg/month</strong>
                </p>
              )}

              {result.goalType === 'surplus' && (
                <p className="fs-5">
                  Surplus for <strong>+{result.weeklyChange} kg/week</strong> gain<br />
                  ≈ <strong>+{Math.abs(result.monthlyChange).toFixed(1)} kg/month</strong>
                </p>
              )}

              {result.goalType === 'maintain' && (
                <p className="fs-5 text-success">Maintenance level – no change expected</p>
              )}

              <p className="text-secondary mt-3 small">
                This is an estimate. Results vary. Consult a doctor or nutritionist for personalized advice.
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

export default CalorieDeficit;