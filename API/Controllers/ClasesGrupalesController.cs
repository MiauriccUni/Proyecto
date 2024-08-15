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
        [HttpPost]
        public string CrearClasesGrupales(ClasesGrupales clasesGrupales)
        {
            ClasesGrupalesManager manager = new ClasesGrupalesManager();
            return manager.CreateClasesGrupalesManager(clasesGrupales);
        }

        [HttpGet]
        public API_Response GetAllClasesGrupales()
        {
            API_Response response = new API_Response();
            try
            {
                ClasesGrupalesManager manager = new ClasesGrupalesManager();
                response.Data = manager.GetAllClasesGrupalesManager();
                response.Result = "OK";
            }
            catch (Exception ex)
            {
                response.Result = "ERROR";
                response.Message = ex.Message;
            }
            return response;
        }

        [HttpPut]
        public string UpdateClasesGrupales(ClasesGrupales clasesGrupales)
        {
            ClasesGrupalesManager manager = new ClasesGrupalesManager();
            return manager.UpdateClasesGrupalesManager(clasesGrupales);
        }
    }
}