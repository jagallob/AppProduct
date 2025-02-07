import { useState } from "react";
import { Link } from "react-router-dom";
import ConfirmationModal from "./ConfirmationModal";
import apiClient from "../api";

function SearchProduct() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    apiClient
      .get(`/products/search?query=${query}`)
      .then((response) => setResults(response.data))
      .catch((error) => console.error("Error searching products:", error));
  };

  const confirmDelete = (product) => {
    selectedProduct(product);
    setShowModal(true);
  };

  const handleDelete = () => {
    if (selectedProduct) {
      setShowModal(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  return (
    <div className="container">
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
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {results.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.price}</td>
                <td>{product.category?.name || "N/A"}</td>
                <td>
                  <div className="d-flex gap-2">
                    <Link
                      to={`/edit/${product.id}`}
                      className="btn btn-warning btn-sm"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => confirmDelete(product)}
                      className="btn btn-sm btn-danger"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No products found.</p>
      )}

      <ConfirmationModal
        show={showModal}
        onClose={closeModal}
        onConfirm={handleDelete}
        title="Confirm Deletion"
        message={`Are you sure you want to delete "${selectedProduct?.name}`}
      />
    </div>
  );
}

export default SearchProduct;
