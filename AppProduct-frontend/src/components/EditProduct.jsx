import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiClient from "../api";

function EditProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    apiClient
      .get(`/products/${id}`)
      .then((response) => setProduct(response.data))
      .catch((error) => console.error("Error fetching product:", error));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!product.name || !product.price || !product.categoryId) {
      alert("All fields are required.");
      return;
    }

    const updatedProduct = {
      id: parseInt(id),
      name: product.name,
      price: parseFloat(parseFloat(product.price).toFixed(2)),
      categoryId: parseInt(product.categoryId),
      description: product.description || "",
    };

    console.log("Sending product data:", updatedProduct);

    apiClient
      .put(`/products/${id}`, updatedProduct)
      .then(() => {
        alert("Product update successfully");
        navigate("/");
      })
      .catch((error) => {
        console.error("Error updating product:", error);
        if (error.response && error.response.data.errors) {
          const errorMessages = Object.values(error.response.data.errors)
            .flat()
            .join("\n");
          alert(`Validation errors:\n${errorMessages}`);
        } else {
          alert("An unexpected error occurred. Please try again later.");
        }
      });
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div>
      <h1>Edit Product</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Name:</label>
          <input
            type="text"
            value={product.name || ""}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label>Price:</label>
          <input
            type="number"
            step="0.01"
            value={product.price || ""}
            onChange={(e) =>
              setProduct({ ...product, price: parseFloat(e.target.value) || 0 })
            }
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label>Category ID:</label>
          <input
            type="number"
            value={product.categoryId || ""}
            onChange={(e) =>
              setProduct({
                ...product,
                categoryId: parseInt(e.target.value) || 0,
              })
            }
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label>Description (optional):</label>
          <textarea
            value={product.description || ""}
            onChange={(e) =>
              setProduct({ ...product, description: e.target.value })
            }
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditProduct;
