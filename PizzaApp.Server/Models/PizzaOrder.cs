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
        public void AddTopping(Topping topping)
        {
            Toppings.Add(topping);
        }
        public int GetCount()
        {
            int count = 0;

            foreach (Topping topping in Toppings)
            {
                count += topping.Count;
            }

            return count;
        }
    }
}
