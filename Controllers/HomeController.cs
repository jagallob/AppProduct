using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using AppProduct.Models;
using AppProduct.Services;
using System.Reflection.Metadata.Ecma335;

namespace AppProduct.Controllers;

public class HomeController : Controller
{
    private readonly ILogger<HomeController> _logger;
    private readonly IProductService _productService;

    public HomeController(ILogger<HomeController> logger, IProductService productService)
    {
        _logger = logger;
        _productService = productService;
    }

    public IActionResult Index()
    {
        return View();
    }

    public IActionResult Privacy()
    {
        return View();
    }

    public IActionResult Products()
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
            return RedirectToAction("Products");
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
            return RedirectToAction("Products");
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
        return RedirectToAction("Products");
    }


    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}
