using AppLogic;
using DTO;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [EnableCors("Demo_Policy")]
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class MedicionesUsuariosController : Controller
    {
        [HttpPost]
        public string CrearCitaMedicion(MedicionesUsuarios mediciones)
        {
            MedicionesUsuariosManager manager = new MedicionesUsuariosManager();
            return manager.CreateMedicionesUsuariosManager(mediciones);
        }

        [HttpGet]
        public API_Response GetAllMedicionesUsuarios()
        {
            API_Response response = new API_Response();
            try
            {
                MedicionesUsuariosManager manager = new MedicionesUsuariosManager();
                response.Data = manager.GetMedicionesUsuariosManager();
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
        public List<MedicionesUsuarios> GetMedicionesUsuarios()
        {
            MedicionesUsuariosManager pm = new MedicionesUsuariosManager();
            return pm.GetMedicionesUsuariosManager();
        }

        
    }
}
