using AppProduct.Models;
using AppProduct.Repositories;

namespace AppProduct.Services
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _productRepository;

        public ProductService(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        public async Task<IEnumerable<Product>> GetProducts() => await _productRepository.GetProducts();

        public async Task<Product?> GetProductById(int id) => await _productRepository.GetProductById(id);
       
        public async Task  AddProduct(Product product) => await _productRepository.AddProduct(product);
        
        public async Task UpdateProduct(Product product) => await _productRepository.UpdateProduct(product);
       
        public async Task  DeleteProduct(int id) => await _productRepository.DeleteProduct(id);

        public async Task<IEnumerable<Product>> SearchProduct(string query)
        {
            if (string.IsNullOrWhiteSpace(query))
            {
                return Enumerable.Empty<Product>();
            }

            var products = await _productRepository.GetProducts();
            return products.Where(p => p.Name.Contains(query, StringComparison.OrdinalIgnoreCase)).ToList();
        }
    }
}

