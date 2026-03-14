import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function BodyFat() {
  const [gender, setGender] = useState('male');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');       // in kg
  const [height, setHeight] = useState('');       // in cm
  const [waist, setWaist] = useState('');         // in cm
  const [neck, setNeck] = useState('');           // in cm
  const [hip, setHip] = useState('');             // in cm (only for females)

  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const calculateBodyFat = (e) => {
    e.preventDefault();
    setError('');
    setResult(null);

    // Basic validation
    if (!age || !weight || !height || !waist || !neck) {
      setError('Please fill in all required fields.');
      return;
    }

    const ageNum = parseFloat(age);
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);
    const waistNum = parseFloat(waist);
    const neckNum = parseFloat(neck);
    const hipNum = gender === 'female' ? parseFloat(hip) : 0;

    if (
      isNaN(ageNum) || isNaN(weightNum) || isNaN(heightNum) ||
      isNaN(waistNum) || isNaN(neckNum) ||
      (gender === 'female' && isNaN(hipNum))
    ) {
      setError('Please enter valid numbers.');
      return;
    }

    let bodyFat = 0;

    // U.S. Navy Method formulas
    if (gender === 'male') {
      bodyFat = 86.010 * Math.log10(waistNum - neckNum) - 70.041 * Math.log10(heightNum) + 36.76;
    } else {
      bodyFat = 163.205 * Math.log10(waistNum + hipNum - neckNum) - 97.684 * Math.log10(heightNum) - 78.387;
    }

    // Round to 1 decimal place
    bodyFat = Math.round(bodyFat * 10) / 10;

    setResult({
      percentage: bodyFat,
      category: getCategory(bodyFat, gender)
    });
  };

  const getCategory = (bf, gender) => {
    if (gender === 'male') {
      if (bf < 6) return 'Essential fat';
      if (bf < 14) return 'Athletic';
      if (bf < 18) return 'Fitness';
      if (bf < 25) return 'Average';
      return 'Obese';
    } else {
      if (bf < 14) return 'Essential fat';
      if (bf < 21) return 'Athletic';
      if (bf < 25) return 'Fitness';
      if (bf < 32) return 'Average';
      return 'Obese';
    }
  };

  return (
    <div className="container py-5 my-4">
      <div className="row justify-content-center">
        <div className="col-lg-8 col-xl-6">
          <h1 className="text-center mb-4 fw-bold" style={{ color: '#ff6b6b' }}>
            Body Fat Percentage Calculator
          </h1>
          <p className="fs-5 text-center mx-auto" style={{color: "#EAEAEA" , maxWidth: '1000px' }}>
            Uses the U.S. Navy circumference method.
          </p>

          <form onSubmit={calculateBodyFat} className="p-4 bg-dark rounded-4 shadow">
            {/* Gender */}
            <div className="mb-4">
              <label className="form-label text-light">Gender</label>
              <div className="d-flex gap-4">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="gender"
                    id="male"
                    value="male"
                    checked={gender === 'male'}
                    onChange={(e) => setGender(e.target.value)}
                  />
                  <label className="form-check-label text-light" htmlFor="male">
                    Male
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="gender"
                    id="female"
                    value="female"
                    checked={gender === 'female'}
                    onChange={(e) => setGender(e.target.value)}
                  />
                  <label className="form-check-label text-light" htmlFor="female">
                    Female
                  </label>
                </div>
              </div>
            </div>

            {/* Age */}
            <div className="mb-4">
              <label htmlFor="age" className="form-label text-light">Age (years)</label>
              <input
                type="number"
                className="form-control bg-secondary border-0 text-light"
                id="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                min="18"
                required
              />
            </div>

            {/* Weight & Height */}
            <div className="row mb-4">
              <div className="col-md-6">
                <label htmlFor="weight" className="form-label text-light">Weight (kg)</label>
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
              <div className="col-md-6">
                <label htmlFor="height" className="form-label text-light">Height (cm)</label>
                <input
                  type="number"
                  className="form-control bg-secondary border-0 text-light"
                  id="height"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Measurements */}
            <div className="row mb-4">
              <div className="col-md-6">
                <label htmlFor="waist" className="form-label text-light">Waist circumference (cm)</label>
                <input
                  type="number"
                  step="0.1"
                  className="form-control bg-secondary border-0 text-light"
                  id="waist"
                  value={waist}
                  onChange={(e) => setWaist(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="neck" className="form-label text-light">Neck circumference (cm)</label>
                <input
                  type="number"
                  step="0.1"
                  className="form-control bg-secondary border-0 text-light"
                  id="neck"
                  value={neck}
                  onChange={(e) => setNeck(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Hip – only for female */}
            {gender === 'female' && (
              <div className="mb-4">
                <label htmlFor="hip" className="form-label text-light">Hip circumference (cm)</label>
                <input
                  type="number"
                  step="0.1"
                  className="form-control bg-secondary border-0 text-light"
                  id="hip"
                  value={hip}
                  onChange={(e) => setHip(e.target.value)}
                  required
                />
              </div>
            )}

            <button type="submit" className="btn btn-gradient w-100 py-3 fw-bold mt-3">
              Calculate Body Fat %
            </button>
          </form>

          {error && (
            <div className="alert alert-danger mt-4 text-center">{error}</div>
          )}

          {result && (
            <div className="card bg-dark text-white mt-5 shadow border-0 p-4 text-center">
              <h3 className="mb-3">Your Estimated Body Fat</h3>
              <h2 className="display-5 fw-bold mb-3" style={{ color: '#ff6b6b' }}>
                {result.percentage}%
              </h2>
              <h5 className="text-secondary mb-0">Category:</h5>
              <p className="fs-4 fw-medium">{result.category}</p>
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

export default BodyFat;