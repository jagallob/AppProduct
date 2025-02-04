import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiClient from "../api";
import deleteProduct from "./DeleteProduct";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 7;
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    apiClient
      .get("/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const confirmDelete = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleDelete = () => {
    if (selectedProduct) {
      deleteProduct(selectedProduct.id, products, setProducts);
      setShowModal(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
          {currentProducts.map((product) => (
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

      <nav>
        <ul className="pagination">
          {Array.from(
            { length: Math.ceil(products.length / productsPerPage) },
            (_, i) => (
              <li
                key={i}
                className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
              >
                <button onClick={() => paginate(i + 1)} className="page-link">
                  {i + 1}
                </button>
              </li>
            )
          )}
        </ul>
      </nav>

      {showModal && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal.title">Confirm Deletion</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal}
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  Are you sure you want to delete{" "}
                  <strong>{selectedProduct?.name}</strong>
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secundary"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleDelete}
                >
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductList;
