import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // for clickable cards
import { FaFire, FaChartLine, FaTrophy, FaRunning } from "react-icons/fa";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const dailyGoal = 500;

  useEffect(() => {
    const stored = localStorage.getItem("fittrack_history");
    if (stored) {
      const parsed = JSON.parse(stored);
      setHistory(parsed);
    }
  }, []);

  const todayCalories = history.length > 0 ? history[history.length - 1].calories : 0;
  const last7Days = history.slice(-7);
  const labels = last7Days.map((entry) => entry.date || "Day");
  const caloriesData = last7Days.map((entry) => entry.calories || 0);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Calories Burned",
        data: caloriesData,
        borderColor: "#ff512f",
        backgroundColor: "rgba(255, 81, 47, 0.2)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top", labels: { color: "#e0e0e0" } },
      title: { display: true, text: "Last 7 Days", color: "#e0e0e0" },
    },
    scales: {
      y: { beginAtZero: true, ticks: { color: "#e0e0e0" }, grid: { color: "rgba(255,255,255,0.1)" } },
      x: { ticks: { color: "#e0e0e0" }, grid: { display: false } },
    },
  };

  const totalWeekly = caloriesData.reduce((sum, val) => sum + val, 0);
  const avgDaily = history.length > 0 ? (totalWeekly / history.length).toFixed(0) : 0;
  const goalProgress = todayCalories > 0 ? Math.min(Math.round((todayCalories / dailyGoal) * 100), 100) : 0;

  return (
    <div
      className="min-vh-100 py-5"
      style={{
        background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
        color: "#e0e0e0",
      }}
    >
      <div className="container">
        <h2 className="text-center mb-5 fw-bold" style={{ fontSize: "3rem", color: "#ff8c66" }}>
          Your Fitness Dashboard
        </h2>

        <div className="row text-center g-4">
          {/* Today's Calories – clickable to Predict page */}
          <div className="col-md-4 mb-4">
            <div
              className="feature-card shadow h-100 cursor-pointer"
              onClick={() => navigate("/predict")}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && navigate("/predict")}
            >
              <FaFire size={60} className="text-warning mx-auto mb-3" />
              <h4 className="feature-title mt-3">Today's Calories</h4>
              <h3 className="display-6 fw-bold" style={{ color: "#ff8e53" }}>
                {todayCalories} kcal
              </h3>
              <p className="fs-5 mt-2">
                {goalProgress}% of goal ({dailyGoal} kcal)
              </p>
              <div className="progress mt-3" style={{ height: "12px", background: "rgba(255,255,255,0.1)" }}>
                <div
                  className="progress-bar bg-gradient"
                  style={{ width: `${goalProgress}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Weekly Total */}
          <div className="col-md-4 mb-4">
            <div className="feature-card shadow h-100">
              <FaChartLine size={60} className="text-info mx-auto mb-3" />
              <h4 className="feature-title mt-3">This Week</h4>
              <h3 className="display-6 fw-bold text-info">{totalWeekly} kcal</h3>
              <p className="fs-5 mt-2">
                Avg: {avgDaily} kcal/day
              </p>
            </div>
          </div>

          {/* Motivation */}
          <div className="col-md-4 mb-4">
            <div className="feature-card shadow h-100">
              <FaTrophy size={60} className="text-warning mx-auto mb-3" />
              <h4 className="feature-title mt-3">Keep It Up!</h4>
              <h3 className="display-6 fw-bold text-warning">
                {history.length} workouts
              </h3>
              <p className="fs-5 mt-2">
                {todayCalories > 300 ? "Great job today! 🔥" : "Let's get moving!"}
              </p>
            </div>
          </div>
        </div>

        {/* Weekly Trend Chart – full width */}
        <div className="card card-custom shadow-lg border-0 mt-5 p-4">
          <h4 className="text-center mb-4 fw-bold text-light">
            Weekly Calories Burned Trend
          </h4>
          {history.length > 0 ? (
            <Line data={chartData} options={chartOptions} />
          ) : (
            <div className="text-center py-5 text-muted">
              <FaRunning size={80} className="mb-4 opacity-50" />
              <p className="fs-4">No workouts yet — start predicting to see your progress!</p>
            </div>
          )}
        </div>

        <div className="text-center mt-5 text-muted">
          <small>
            Last updated: {new Date().toLocaleDateString()} • Goal: {dailyGoal} kcal/day
          </small>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;