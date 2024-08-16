using AppLogic;
using DTO;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [EnableCors("Demo_Policy")]
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class CitasMedicionController : Controller
    {
        [HttpPost]
        public string CrearCitaMedicion(CitasMedicion citas)
        {
            CitasMedicionManager manager = new CitasMedicionManager();
            return manager.CreateCitasMedicionManager(citas);
        }

        [HttpGet]
        public List<CitasMedicion> GetUsuarios()
        {
            CitasMedicionManager pm = new CitasMedicionManager();
            return pm.GetAllCitasMedicionesManager();
        }

        [HttpGet]
        public API_Response GetAllUsuarios()
        {
            API_Response response = new API_Response();
            try
            {
                CitasMedicionManager manager = new CitasMedicionManager();
                response.Data = manager.GetAllCitasMedicionesManager();
                response.Result = "OK";
            }
            catch (Exception ex)
            {
                response.Result = "ERROR";
                response.Message = ex.Message;
            }
            return response;
        }
        
    }
}
