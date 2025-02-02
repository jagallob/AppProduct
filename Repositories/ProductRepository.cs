using AppProduct.Data;
using AppProduct.Models;
using Microsoft.EntityFrameworkCore;

namespace AppProduct.Repositories
{

    public class ProductRepository : IProductRepository
    {
        private readonly AppDbContext _context;

        public ProductRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Product>> GetProducts() => await _context.Products.Include(p => p.Category).Include(p => p.ProductDetail).ToListAsync();
        
        public async Task<Product?> GetProductById(int id) => await _context.Products.Include(p => p.Category).Include(p => p.ProductDetail).FirstOrDefaultAsync(p => p.Id == id);
     

        public async Task AddProduct(Product product)
        {
            _context.Products.Add(product);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateProduct(Product product)
        {
            var existingProduct = _context.Products.Find(product.Id);
            if (existingProduct != null)
            {
                _context.Entry(existingProduct).CurrentValues.SetValues(product);
                await _context.SaveChangesAsync();
            }
        }

        public async Task DeleteProduct(int id)
        {
            var product = _context.Products.Find(id);
            if (product != null)
            {
                _context.Products.Remove(product);
                await _context.SaveChangesAsync();
            }
        }
    }
}