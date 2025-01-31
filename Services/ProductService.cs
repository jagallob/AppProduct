using AppProduct.Models;
using AppProduct.Repositories;

namespace AppProduct.Services;

public interface IProductService
{
    IEnumerable<Product> GetProducts();
    Product? GetProductById(int id);
    void AddProduct(Product product);
    void UpdateProduct(Product product);
    void DeleteProduct(int id);
    List<Product> SearchProduct(string query);
}

public class ProductService : IProductService
{
    private readonly IProductRepository _productRepository;

    public ProductService(IProductRepository productRepository)
    {
        _productRepository = productRepository;
    }

    public IEnumerable<Product> GetProducts()
    {
        return _productRepository.GetProducts();
    }

    public Product? GetProductById(int id)
    {
        return _productRepository.GetProductById(id);
    }

    public void AddProduct(Product product)
    {
        _productRepository.AddProduct(product);
    }

    public void UpdateProduct(Product product)
    {
        _productRepository.UpdateProduct(product);
    }

    public void DeleteProduct(int id)
    {
        _productRepository.DeleteProduct(id);
    }

    public List<Product> SearchProduct(string query)
    {
        if (string.IsNullOrWhiteSpace(query))
        {
            return new List<Product>();
        }
        return _productRepository.GetProducts().Where(p => p.Name.Contains(query, StringComparison.OrdinalIgnoreCase)).ToList();
    }
}
