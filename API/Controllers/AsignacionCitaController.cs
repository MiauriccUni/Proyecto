using AppLogic;
using DTO;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [EnableCors("Demo_Policy")]
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AsignacionCitaController : ControllerBase
    {
        [HttpPost]
        public string CrearAsignacion(AsignacionCita asig)
        {
            AsignacionCitaManager manager = new AsignacionCitaManager();
            return manager.CreateAsignaciones(asig);
        }

        [HttpGet]
        public API_Response GetAllAsignaciones()
        {
            API_Response response = new API_Response();
            try
            {
                AsignacionCitaManager manager = new AsignacionCitaManager();
                response.Data = manager.GetAsignacions();
                response.Result = "OK";
            }
            catch (Exception ex)
            {
                response.Result = "ERROR";
                response.Message = ex.Message;
            }
            return response;
        }
        [HttpGet]
        public List<AsignacionCita> GetAsignacionCita()
        {
            AsignacionCitaManager manager = new AsignacionCitaManager();
            return manager.GetAsignacions();
        }
    }
}
