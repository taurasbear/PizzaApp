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
        [HttpGet("total")]
        public IActionResult GetTotalCost()
        {
            var result = _dbContext.PizzaOrders.ToArray().Sum(p => p.Price);
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
                pizzaOrder.ToppingsCount.Add(t.Count);
            }

            _dbContext.PizzaOrders.Add(pizzaOrder);
            _dbContext.SaveChanges();

            return Ok(pizzaOrder.Id);
        }
        [HttpPost("clearDatabase")]
        public IActionResult ClearDatabase()
        {
            _dbContext.Database.EnsureDeleted();
            _dbContext.Database.EnsureCreated();
            SeedData.Initialize(_dbContext);
            return Ok();
        }
        [HttpGet("toppings/{orderId:int}")]
        public IActionResult GetToppingsById(int orderId)
        {
            var toppings = _dbContext.Toppings.ToArray();
            var toppingsCount = _dbContext.PizzaOrders.ToArray().FirstOrDefault(p => p.Id == orderId).ToppingsCount;
            List<Topping> toppingsById = new List<Topping>();
            for (int i = 0; i < toppings.Count(); i++)
            {
                if (toppingsCount[i] > 0)
                {
                    toppingsById.Add(new Topping()
                    {
                        Name = toppings[i].Name,
                        Count = toppingsCount[i],
                        Price = toppings[i].Price,
                    });
                }
            }
            return Ok(toppingsById);
        }
        [HttpGet("price")]
        public IActionResult GetPrice(PizzaOrderRequest orderRequest)
        {
            return Ok(_service.CalculatePrice(orderRequest));
        }
    }
}
