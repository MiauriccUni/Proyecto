using Microsoft.AspNetCore.Mvc;

namespace WEB_UI.Controllers
{
    public class AdministradorController : Controller
    {
        public IActionResult AdminPanelPrincipal()
        {
            return View();
        }
        public IActionResult AdminActualizacionUsuario()
        {
            return View();
        }

        public IActionResult AdminRecuperacionContrasenna()
        {
            return View();
        }

        public IActionResult ActualizarDatosUsuariosAdministrador()
        {
            return View();
        }

        public IActionResult MaquinasAdministrador()
        {
            return View();
        }

        public IActionResult AdminGestionCitas()
        {
            return View();
        }

        public IActionResult RegistroFacturasAdministrador()
        {
            return View();
        }

        public IActionResult CuponesAdministrador()
        {
            return View();
        }

        public IActionResult AdminClasesGrupales()
        {
            return View();
        }

        public IActionResult AdminPlanesMensuales() 
        { 
            return View();
        }

    }
}
