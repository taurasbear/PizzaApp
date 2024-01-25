namespace PizzaApp.Server.Models
{
    public class Topping
    {
        const double ToppingPrice = 1;
        public int Id { get; set; }
        public string Name { get; set; }
        public int Count { get; set; } = 0;
        public double Price { get; set; } = ToppingPrice;
    }
}
