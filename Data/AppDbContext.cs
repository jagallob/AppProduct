using Microsoft.EntityFrameworkCore;
using AppProduct.Models;
using System.Net.Http.Headers;
using AspNetCoreGeneratedDocument;

namespace AppProduct.Data
{

    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Category> Categories { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<ProductDetail> ProductDetails { get; set; }

    }
}




