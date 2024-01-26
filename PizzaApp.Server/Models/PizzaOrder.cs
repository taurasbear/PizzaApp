namespace PizzaApp.Server.Models
{
    public class PizzaOrder
    {
        public int Id { get; set; }
        public PizzaSize Size { get; set; }
        public double Price { get; set; }
        private List<Topping> Toppings;
        public PizzaOrder()
        {
            Toppings = new List<Topping>();
        }
        public void AddToppings(List<Topping> toppingList)
        {
            foreach(Topping t in toppingList)
            {
                Toppings.Add(t);
            }
        }
    }
}
