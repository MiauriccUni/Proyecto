using AppLogic;
using DTO;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [EnableCors("Demo_Policy")]
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        [HttpPost]
        public string CreateUsuario(Usuario usuario)
        {
            UsuarioManager manager = new UsuarioManager();
            return manager.CreateUsuario(usuario);
        }

        [HttpGet]
        public List<Usuario> GetUsuarios()
        {
            UsuarioManager pm = new UsuarioManager();
            return pm.GetAllUsuarios();
        }

        [HttpGet]
        public List<Usuario> GetUserByEmail(string correo)
        {
            UsuarioManager usuarioManager = new UsuarioManager();
            return usuarioManager.GetRetrieveUser(correo);
        }

        [HttpGet]
        public List<Usuario> GetUserByPhone(string phone)
        {
            UsuarioManager usuarioManager = new UsuarioManager();
            return usuarioManager.GetRetrievePhone(phone);
        }

        [HttpPut]
        public void Validacion(string correo, string verificar)
        {
            UsuarioManager updater = new UsuarioManager();
            updater.UpdateValidacion(correo, verificar);
        }
    }
}
