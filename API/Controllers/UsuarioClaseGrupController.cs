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
    public class UsuarioClaseGrupController : ControllerBase
    {
        [HttpPost]
        public string CreateUsuarioClaseGrup(UsuarioClaseGrup us)
        {
            UsuarioClaseGrupManager manager = new UsuarioClaseGrupManager();
            return manager.CreateUsuarioClaseGrupManager(us);
        }

        [HttpGet]
        public List<UsuarioClaseGrup> GetUsuarioClaseGr()
        {
            UsuarioClaseGrupManager manager = new UsuarioClaseGrupManager();
            return manager.GetUsuarioClaseGrupManagers();
        }

        [HttpGet]
        public API_Response GetAllUsuarioClaseGr()
        {
            API_Response response = new API_Response();
            try
            {
                UsuarioClaseGrupManager manager = new UsuarioClaseGrupManager();
                response.Data = manager.GetUsuarioClaseGrupManagers();
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
