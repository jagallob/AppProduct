import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../api";

function AddProduct() {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: 0,
    categoryId: 1,
    productDetail: {
      description: "",
      stock: 0,
      weight: null,
      dimensions: "",
    },
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    apiClient
      .post("/products", product)
      .then(() => {
        alert("Product added successfully!");
        navigate("/");
      })
      .catch((error) => console.error("Error adding product:", error));
  };

  return (
    <div>
      <h1>Add Product</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Name:</label>
          <input
            type="text"
            value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label>Description:</label>
          <textarea
            value={product.description}
            onChange={(e) =>
              setProduct({ ...product, description: e.target.value })
            }
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label>Price:</label>
          <input
            type="number"
            step="0.01"
            value={product.price}
            onChange={(e) =>
              setProduct({ ...product, price: parseFloat(e.target.value) })
            }
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label>Category:</label>
          <input
            type="number"
            value={product.categoryId}
            onChange={(e) =>
              setProduct({ ...product, categoryId: parseInt(e.target.value) })
            }
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label>Product detail:</label>
          <textarea
            value={product.productDetail.description}
            onChange={(e) =>
              setProduct({
                ...product,
                productDetail: {
                  ...product.productDetail,
                  description: e.target.value,
                },
              })
            }
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label>Stock:</label>
          <input
            type="number"
            value={product.productDetail.stock}
            onChange={(e) =>
              setProduct({
                ...product,
                productDetail: {
                  ...product.productDetail,
                  stock: parseInt(e.target.value),
                },
              })
            }
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Product
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
