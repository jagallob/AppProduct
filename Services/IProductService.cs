using AppProduct.Models;
using AppProduct.Repositories;

namespace AppProduct.Services
{


    public interface IProductService
    {
        Task <IEnumerable<Product>> GetProducts();
        Task <Product?> GetProductById(int id);
        Task AddProduct(Product product);
        Task UpdateProduct(Product product);
        Task DeleteProduct(int id);
        Task <List<Product>> SearchProduct(string query);
    }
}
