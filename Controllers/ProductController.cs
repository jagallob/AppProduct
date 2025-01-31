using Microsoft.AspNetCore.Mvc;
using AppProduct.Models;
using AppProduct.Services;

namespace AppProduct.Controllers;

public class ProductController : Controller
{
    private readonly IProductService _productService;

    public ProductController(IProductService productService)
    {
        _productService = productService;
    }

    public IActionResult Index()
    {
        var products = _productService.GetProducts();
        return View(products);
    }

    [HttpGet]
    public IActionResult AddProduct()
    {
        return View();
    }

    [HttpPost]
    public IActionResult AddProduct(Product product)
    {
        if (ModelState.IsValid)
        {
            _productService.AddProduct(product);
            return RedirectToAction("Index");
        }
        return View(product);
    }

    // Edit Product Actions
    [HttpGet]
    public IActionResult EditProduct(int id)
    {
        var product = _productService.GetProductById(id);
        if (product == null)
        {
            return NotFound($"No product found with ID {id}");
        }
        return View(product);
    }

    [HttpPost]
    public IActionResult EditProduct(Product product)
    {
        if (ModelState.IsValid)
        {
            _productService.UpdateProduct(product);
            return RedirectToAction("Index");
        }
        return View(product);
    }

    // Delete Product Actions
    [HttpGet]
    public IActionResult DeleteProduct(int id)
    {
        var product = _productService.GetProductById(id);
        if (product == null)
        {
            return NotFound($"No product found with ID {id}");
        }
        return View(product);
    }

    [HttpPost, ActionName("DeleteProduct")]
    public IActionResult DeleteConfirmed(int id)
    {
        var product = _productService.GetProductById(id);
        if (product != null)
        {
            _productService.DeleteProduct(id);
        }
        return RedirectToAction("Index");
    }

    // Search Products
    [HttpGet]
    public IActionResult SearchProduct(string query)
    {
        var products = _productService.SearchProduct(query);
        return View(products);
    }

}
