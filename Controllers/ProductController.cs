using Microsoft.AspNetCore.Mvc;
using AppProduct.Models;
using AppProduct.Services;

namespace AppProduct.Controllers
{
    [ApiController]
    [Route("/api/products")]

    public class ProductController : ControllerBase
    {
        private readonly IProductService _productService;

        public ProductController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllProducts()
        {
            var products = await _productService.GetProducts();
            return Ok(products);
        }

        // Search Products
        [HttpGet("search")]
        public async Task<IActionResult> SearchProduct([FromQuery] string query)
        {
            var products = await _productService.SearchProduct(query);
            return Ok(products);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProductById(int id)
        {
            var product = await _productService.GetProductById(id);
            if (product == null)
            {
                return NotFound($"No product found with ID {id}");
            }
            return Ok(product);
        }

   

        [HttpPost]
        public async Task<IActionResult> CreateProduct([FromBody] Product product)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            await _productService.AddProduct(product);
            return CreatedAtAction(nameof(GetProductById), new { id = product.Id }, product);
        }

        // Edit Product Actions
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProduct(int id, [FromBody] Product product)
        {
            if (!ModelState.IsValid || id != product.Id)
            {
                return BadRequest($"No product found with ID {id}");
            }
            await _productService.UpdateProduct(product);
            return NoContent();
        }


        // Delete Product Actions
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product = await _productService.GetProductById(id);
            if (product == null)
            {
                return NotFound($"No product found with ID {id}");
            }
            await _productService.DeleteProduct(id);
            return NoContent();
        }

    }
}
