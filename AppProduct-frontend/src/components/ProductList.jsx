import { useEffect, useState } from "react";
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
    <div className="container">
      <h1>Product List</h1>
      <div className="d-flex gap-2 mb-3">
        <Link to="/add" className="btn btn-success mb-3">
          Add Product
        </Link>
        <Link to="/search" className="btn btn-primary mb-3">
          Search Product
        </Link>
      </div>
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
          {products.map((product) => (
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
                    onClick={() => deleteProduct(product.id)}
                    className="btn btn-danger btn-sm ms-2"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductList;
