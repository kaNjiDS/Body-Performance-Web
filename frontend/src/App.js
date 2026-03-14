import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Predict from "./pages/Predict";
import Dashboard from "./pages/Dashboard";
import BMI from "./pages/BMI";
import MaxHeartRate from "./pages/MaxHeartRate";
import Measures from "./pages/Measures";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import BodyFat from "./pages/BodyFat";
import Deficit from "./pages/Deficit";
import Protien from "./pages/Protien";
import Tips from "./pages/tips";

function App() {
  return (
    <Router>
      <Navbar />

      {/* Added wrapper to prevent navbar overlap on fixed-top */}
      <div className="pt-5 mt-3">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/measures" element={<Measures />} />
          <Route path="/predict" element={<Predict />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/bmi" element={<BMI />} />
          <Route path="/max-heart-rate" element={<MaxHeartRate />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/bodyfat" element={<BodyFat />} />
          <Route path="/deficit" element={<Deficit />} />
          <Route path="/macro" element={<Protien />} />
          <Route path="/tips" element={<Tips />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;