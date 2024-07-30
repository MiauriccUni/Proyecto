using AppLogic;
using DataAccess.Mappers;
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

        [HttpPut]
        public void UpdateRol(int id, string rol)
        {
            UsuarioManager updater = new UsuarioManager();
            updater.UpdateRolManager(id, rol);
        }

        [HttpGet]
        public API_Response GetAllUsuarios()
        {
            API_Response response = new API_Response();
            try
            {
                UsuarioManager manager = new UsuarioManager();
                response.Data = manager.GetAllUsuarios();
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
        public void UpdateOTP(string correo, int OTP)
        {
            UsuarioManager updater = new UsuarioManager();
            updater.UpdateOTPManager(correo, OTP);
        }
    }
}
