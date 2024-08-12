using AppLogic;
using DTO;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [EnableCors("Demo_Policy")]
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class MedicionesController : ControllerBase
    {
        [HttpPost]
        public string CreateMediciones(Mediciones mediciones)
        {
            MedicionesManager manager = new MedicionesManager();
            return manager.CreateMedicionManager(mediciones);
        }
        [HttpGet]
        public List<Mediciones> GetMediciones()
        {
            MedicionesManager manager = new MedicionesManager();
            return manager.GetMediciones();
        }
    }
}
