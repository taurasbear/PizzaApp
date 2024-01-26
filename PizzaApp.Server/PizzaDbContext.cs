using Microsoft.EntityFrameworkCore;
using PizzaApp.Server.Models;

namespace PizzaApp.Server
{
    public class PizzaDbContext : DbContext
    {
        public DbSet<Topping> Toppings { get; set; }
        public DbSet<PizzaSize> PizzaSizes { get; set; }
        public DbSet<PizzaOrder> PizzaOrders { get; set; }
        public PizzaDbContext(DbContextOptions<PizzaDbContext> options) : base(options)
        {
        }
    }
}
