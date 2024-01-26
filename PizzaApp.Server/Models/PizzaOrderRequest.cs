namespace PizzaApp.Server.Models
{
    public class PizzaOrderRequest
    {
        public PizzaSize Size { get; set; }
        public List<Topping> Toppings { get; set; }
    }
}
