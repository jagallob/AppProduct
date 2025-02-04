import apiClient from "../api";

const deleteProduct = (id, products, setProducts) => {
  apiClient
    .delete(`/products/${id}`)
    .then(() => {
      setProducts(products.filter((p) => p.id !== id));
      alert("Product deleted successfully!");
    })
    .catch((error) => console.error("Error deleting product:", error));
};

export default deleteProduct;
