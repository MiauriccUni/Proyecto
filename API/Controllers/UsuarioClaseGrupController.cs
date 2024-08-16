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
        public List<UsuarioClaseGrup> GetAllUsuarioClaseGr()
        {
            UsuarioClaseGrupManager manager = new UsuarioClaseGrupManager();
            return manager.GetUsuarioClaseGrupManagers();
        }
    }
}
