using AppLogic;
using DTO;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [EnableCors("Demo_Policy")]
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ClasesGrupalesController : ControllerBase
    {
        private ClasesGrupalesManager manager;

        public ClasesGrupalesController()
        {
            manager = new ClasesGrupalesManager();
        }

        [HttpPost]
        public IActionResult CrearClasesGrupales(ClasesGrupales clasesGrupales)
        {
            int id = manager.CreateClasesGrupalesManager(clasesGrupales);
            return CreatedAtAction(nameof(GetAllClasesGrupales), new { id = id }, clasesGrupales);
        }

        [HttpGet]
        public IActionResult GetAllClasesGrupales()
        {
            try
            {
                List<ClasesGrupales> clasesGrupales = manager.GetAllClasesGrupalesManager();
                return Ok(clasesGrupales);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPut]
        public IActionResult UpdateCuposDisponibles(ClasesGrupales clasesGrupales)
        {
            try
            {
                manager.UpdateCuposDisponiblesManager(clasesGrupales);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

    }
}