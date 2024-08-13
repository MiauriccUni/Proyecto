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
        [HttpGet]
        public API_Response GetAllMediciones()
        {
            API_Response response = new API_Response();
            try
            {
                MedicionesManager manager = new MedicionesManager();
                response.Data = manager.GetMediciones();
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
