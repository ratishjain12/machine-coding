import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  console.log(data);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const PAGE_SIZE = 5;
  const totalPages = Math.ceil(data.length / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const currentPageData = data.slice(startIndex, endIndex);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Pagination</h1>
      <div style={{ display: "flex", justifyContent: "center", gap: "4px" }}>
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            style={{
              width: "30px",
              height: "30px",
              backgroundColor: currentPage === index + 1 ? "red" : "white",
            }}
          >
            {index + 1}
          </button>
        ))}
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
          maxWidth: "1000px",
          margin: "0 auto",
          marginTop: "60px",
        }}
      >
        {currentPageData.map((item) => (
          <div
            key={item.id}
            style={{ border: "1px solid #ccc", padding: "6px" }}
          >
            <img src={item.image} alt={item.title} style={{ width: "200px" }} />
            <h3>{item.title}</h3>
            <p style={{ fontSize: "14px" }}>{item.description}</p>
            <p>{item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
