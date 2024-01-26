namespace PizzaApp.Server.Models
{
    public class PizzaOrder
    {
        public int Id { get; set; }
        public string Size { get; set; }
        public double Price { get; set; }
        /// <summary>
        /// A list containing in order each topping's count of a pizza order
        /// </summary>
        public List<int> ToppingsCount { get; set; }
        public PizzaOrder()
        {
            ToppingsCount = new List<int>();
        }
    }
}
