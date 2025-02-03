using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AppProduct.Models
{
    public class ProductDetail
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey("Product")]
        public int ProductId { get; set; }
        public Product Product { get; set; } = null!;

        [Required]
        public string Description { get; set; } = string.Empty;

        public int Stock {  get; set; } = 0;

        [Column(TypeName = "decimal(10,2)")]
        public decimal? Weight { get; set; }

        public string? Dimensions { get; set; }
       
    }
}
