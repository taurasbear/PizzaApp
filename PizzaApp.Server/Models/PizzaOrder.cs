namespace PizzaApp.Server.Models
{
    public class PizzaOrder
    {
        public int Id { get; set; }
        public string Size { get; set; }
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
        public List<Topping> GetToppingsCopy()
        {
            List<Topping> copyList = new List<Topping>();
            foreach (Topping topping in Toppings)
            {
                copyList.Add(topping);
                Console.WriteLine($"--> Element name: {topping.Name}");
            }
            return copyList;
        }
        public int GetCount()
        {
            return Toppings.Count();
        }
    }
}
