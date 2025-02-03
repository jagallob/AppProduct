import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiClient from "../api";

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    apiClient
      .get("/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const deleteProduct = (id) => {
    apiClient
      .delete(`/products/${id}`)
      .then(() => {
        setProducts(products.filter((p) => p.id !== id));
        alert("Product deleted successfully!");
      })
      .catch((error) => console.error("Error deleting product:", error));
  };

  return (
    <div>
      <h1>Product List</h1>
      <Link to="/add" className="btn btn-success mb-3">
        Add Product
      </Link>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>{product.category?.name || "N/A"}</td>
              <td>
                <Link
                  to={`/edit/${product.id}`}
                  className="btn btn-warning btn-sm"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteProduct(product.id)}
                  className="btn btn-danger btn-sm ms-2"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductList;
