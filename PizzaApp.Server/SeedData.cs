using PizzaApp.Server.Models;

namespace PizzaApp.Server
{
    public class SeedData
    {
        public static void Initialize(PizzaDbContext context)
        {
            if (!context.PizzaSizes.Any())
            {
                context.PizzaSizes.AddRange(
                    new PizzaSize { Id = 1, Name = "Small", Price = 8 },
                    new PizzaSize { Id = 2, Name = "Medium", Price = 10 },
                    new PizzaSize { Id = 3, Name = "Large", Price = 12 }
                    );

                context.SaveChanges();
            }
            if (!context.Toppings.Any())
            {
                context.Toppings.AddRange(
                    new Topping { Id = 1, Name = "Pineapple" },
                    new Topping { Id = 2, Name = "Pepperoni" },
                    new Topping { Id = 3, Name = "Mushrooms" },
                    new Topping { Id = 4, Name = "Paprika" },
                    new Topping { Id = 5, Name = "Onions" },
                    new Topping { Id = 6, Name = "Fish" }
                    );

                context.SaveChanges();
            }
        }
    }
}
