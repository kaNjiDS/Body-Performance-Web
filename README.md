# FitTrack Pro

**FitTrack Pro** is a modern, free fitness web application that empowers users to track, measure, and optimize their body performance using smart calculators, machine learning predictions, and expert exercise technique guidance.

All core calculations run client-side for speed and privacy — no personal data is stored on servers.

## Features

- **Calories Burned Predictor**  
  ML-powered (XGBoost) estimation using gender, age, weight, height, duration, heart rate, and body temperature

- **Measures Hub** (Body Composition Calculators)  
  - BMI  
  - Body Fat % (U.S. Navy method)  
  - Max Heart Rate Zones  
  - Calorie Deficit/Surplus Planner  
  - Daily Macro Targets (protein, carbs, fat)

- **Exercise Tips & Technique Tutorials**  
  High-quality embedded YouTube videos showing correct form for squats, deadlifts, bench press, pull-ups, lunges, planks, and more

- **Clean, Responsive Dark Theme**  
  Mobile-friendly UI with smooth navigation

- **Privacy-First**  
  Most features work offline after initial load — no login required

## Tech Stack

**Frontend**  
- React (with React Router)  
- Bootstrap 5  
- Axios (for API calls)  
- React Icons  

**Backend**  
- Flask (Python)  
- XGBoost (machine learning model)  
- Pickle (model serialization)

## Project Structure

The website will automatically open in your browser at:  
**http://localhost:3000**

### Summary – Quick Commands

**Terminal 1 (Backend):**
- Right-click → backend → Open in Integrated Terminal
- `venv\Scripts\activate`
- `python app.py`

**Terminal 2 (Frontend):**
- Right-click → frontend → Open in Integrated Terminal
- `npm start`

Open http://localhost:3000 → ready to use!

