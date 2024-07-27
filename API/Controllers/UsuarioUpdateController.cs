//using DTO;
//using Microsoft.AspNetCore.Mvc;


//namespace API.Controllers
//{
//    [ApiController]
//    [Route("api/[controller]")]
//    public class UsuarioUpdateController : Controller
//    {
//        private readonly Usuario _userService;

//        public UsuarioUpdateController(Usuario userService)
//        {
//            _userService = userService;
//        }

//        [HttpPut("{Correo}")]
//        public IActionResult UpdateUserProfile(string Correo, [FromBody] UsuarioDTO userProfileUpdate)
//        {
//            if (!ModelState.IsValid)
//            {
//                return BadRequest(ModelState);
//            }
//            var user = _userService.GetUserByEmail(Correo);
//            if (user == null)
//            {
//                return NotFound();
//            }

//            user.Nombre = userProfileUpdate.Nombre;
//            user.Apellidos = userProfileUpdate.Apellidos;
//            user.Nacimiento = userProfileUpdate.Nacimiento;
//            user.Correo = userProfileUpdate.Correo;
//            user.Celular = userProfileUpdate.Celular;
//            user.Contrasenna = userProfileUpdate.Contrasenna;
//            user.Rol = userProfileUpdate.Rol;
//            user.Genero = userProfileUpdate.Genero;

//            _userService.UpdateUser(user); //mensaje de error

//            return Ok("Perfil del usuario actualizado exitosamente!");
//        }
//    }
//}