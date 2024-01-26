using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PizzaApp.Server.Models;
using System;
using System.IO;

namespace PizzaApp.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PizzaController : ControllerBase
    {
        private readonly PizzaDbContext _dbContext;
        private readonly PizzaService _service;

        public PizzaController(PizzaDbContext dbContext, PizzaService service)
        {
            _dbContext = dbContext;
            _service = service;
        }
        [HttpGet("sizes")]
        public IActionResult GetPizzaSizes()
        {
            var result = _dbContext.PizzaSizes.ToArray();
            return Ok(result);
        }

        [HttpGet("toppings")]
        public IActionResult GetToppings()
        {
            var result = _dbContext.Toppings.ToArray();
            return Ok(result);
        }
        [HttpGet("orders")]
        public IActionResult GetOrders()
        {
            var result = _dbContext.PizzaOrders.ToArray();
            return Ok(result);
        }

        [HttpPost("saveOrder")]
        public IActionResult SaveOrder([FromBody] PizzaOrderRequest orderRequest)
        {
            PizzaSize existingSize = _dbContext.PizzaSizes
                .SingleOrDefault(s => s.Id == orderRequest.Size.Id);

            if (existingSize == null)
            {
                return BadRequest("Invalid PizzaSize.");
            }
            PizzaOrder pizzaOrder = new PizzaOrder()
            {
                Size = existingSize.Name,
                Price = _service.CalculatePrice(orderRequest),
            };

            foreach (Topping t in orderRequest.Toppings)
            {
                if (t.Count > 0)
                {
                    pizzaOrder.AddTopping(t);
                }
            }

            _dbContext.PizzaOrders.Add(pizzaOrder);
            _dbContext.SaveChanges();

            return Ok(pizzaOrder.Id);
        }
        [HttpGet("toppings/{orderId:int}")]
        public IActionResult GetToppingsById(int orderId)
        {
            var result = _dbContext.PizzaOrders.ToArray().FirstOrDefault(p => p.Id == orderId).GetToppingsCopy();
            Console.WriteLine($"----->Result:{result.ToString()}");
            Console.WriteLine($"----->Result count:{result.Count()}");
            return Ok(result);
        }
        [HttpGet("price")]
        public IActionResult GetPrice(PizzaOrderRequest orderRequest)
        {
            return Ok(_service.CalculatePrice(orderRequest));
        }
    }
}
