import { useEffect, useState } from "react";
import "./App.css";

const ProgressBar = ({
  initial = 0,
  showText = false,
  step = 10,
  barColor = "blue",
  bgColor = "gray",
}) => {
  const [progress, setProgress] = useState(initial);
  useEffect(() => {
    if (progress >= 100) return; // Stop when progress reaches 100

    const interval = setInterval(() => {
      setProgress((prev) => Math.min(prev + step, 100)); // Ensure it doesn't exceed 100
    }, 100);

    return () => clearInterval(interval);
  }, [progress, step]);
  return (
    <div className="progress-bar" style={{ backgroundColor: bgColor }}>
      <div
        className="progress"
        style={{
          transform: `translateX(${progress - 100}%)`,
          backgroundColor: barColor,
        }}
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin="0"
        aria-valuemax="100"
      >
        {showText && <span>{progress}%</span>}
      </div>
    </div>
  );
};

function App() {
  return (
    <main>
      <h1 style={{ textAlign: "center" }}>Progress Bar</h1>
      <ProgressBar showText={true} step={5} barColor="green" bgColor="white" />
    </main>
  );
}

export default App;
