using PizzaApp.Server.Models;

namespace PizzaApp.Server
{
    public class PizzaService
    {
        const int ToppingCountDiscount = 4;
        const double Discount = 0.1;
        public double CalculatePrice(PizzaOrderRequest orderRequest)
        {
            double price = orderRequest.Size.Price;
            foreach (Topping t in orderRequest.Toppings)
            {
                price += t.Price * t.Count;
            }
            if (GetToppingCount(orderRequest.Toppings) >= ToppingCountDiscount)
            {
                price *= (1 - Discount);
            }
            return price;
        }
        public int GetToppingCount(List<Topping> toppings)
        {
            int count = 0;

            foreach (Topping t in toppings)
            {
                count += t.Count;
            }

            return count;
        }
    }
}
