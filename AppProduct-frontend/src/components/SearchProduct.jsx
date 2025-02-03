import { useState } from "react";
import apiClient from "../api";

function SearchProduct() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    apiClient
      .get(`/products/search?query=${query}`)
      .then((response) => setResults(response.data))
      .catch((error) => console.error("Error searching products:", error));
  };

  return (
    <div>
      <h1>Search Product</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter product name"
          className="form-control mb-3"
        />
        <button type="submit" className="btn btn-primary">
          Search
        </button>
      </form>
      {results.length > 0 ? (
        <table className="table mt-3">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {results.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.price}</td>
                <td>{product.category?.name || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
}

export default SearchProduct;
