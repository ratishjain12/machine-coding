/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [resultsResults, setResults] = useState([]);
  const [input, setInput] = useState<string>("");
  const [showList, setShowList] = useState<boolean>(false);
  const [cache, setCache] = useState<Record<string, any>>({});
  async function fetchData() {
    const response = await fetch(
      "https://dummyjson.com/recipes/search?q=" + input
    );
    const data = await response.json();
    setResults(data.recipes);
    setCache((prev) => ({ ...prev, [input]: data.recipes }));
  }

  useEffect(() => {
    if (cache[input]) {
      console.log("cache!!");

      setResults(cache[input]);
      return;
    }
    const timer = setTimeout(fetchData, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [input]);

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Autocomplete Search Bar</h1>
      <input
        type="text"
        style={{
          display: "block",
          margin: "0 auto",
          width: "600px",
          padding: "10px",
        }}
        onFocus={() => setShowList(true)}
        placeholder="Search here..."
        value={input}
        onBlur={() => setTimeout(() => setShowList(false), 200)}
        onChange={(e) => setInput(e.target.value)}
      />
      {showList && (
        <div className="search-list">
          {resultsResults.map((item: any) => (
            <span
              className="search-item"
              key={item.id}
              onClick={() => setInput(item.name)}
            >
              {item.name}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
