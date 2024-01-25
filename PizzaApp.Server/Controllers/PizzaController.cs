using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace PizzaApp.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PizzaController : ControllerBase
    {
        private readonly PizzaDbContext _dbContext;

        public PizzaController(PizzaDbContext dbContext)
        {
            _dbContext = dbContext;
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
    }
}
