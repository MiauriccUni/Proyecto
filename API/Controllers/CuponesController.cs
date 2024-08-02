using AppLogic;
using DTO;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [EnableCors("Demo_Policy")]
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class CuponesController : ControllerBase
    {
        [HttpPost]
        public string CrearCupones(Cupones cupones)
        {
            CuponesManager manager = new CuponesManager();
            return manager.CreateCuponesManager(cupones);
        }

        [HttpGet]
        public API_Response GetAllCupones()
        {
            API_Response response = new API_Response();
            try
            {
                CuponesManager manager = new CuponesManager();
                response.Data = manager.GetAllCuponesManager();
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
