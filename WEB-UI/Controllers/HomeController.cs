using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using WEB_UI.Models;

namespace WEB_UI.Controllers
{
    namespace WEB_UI.Controllers
    {
        public class HomeController : Controller
        {
            private readonly ILogger<HomeController> _logger;

            public HomeController(ILogger<HomeController> logger)
            {
                _logger = logger;
            }

            public IActionResult Index()
            {
                return View();
            }

            public IActionResult AdminActualizacionUsuario()
            {
                return View();
            }

            public IActionResult AdminPanelPrincipal()
            {
                return View();
            }

            public IActionResult AdminRecuperacionContrasenna()
            {
                return View();
            }

            public IActionResult Recepcion()
            {
                return View();
            }

            public IActionResult Registrar()
            {
                return View();
            }

            public IActionResult Entrenador()
            {
                return View();
            }

            public IActionResult OTP()
            {
                return View();
            }

            public IActionResult Rutinas()
            {
                return View();
            }

            public IActionResult ActualizarDatosUsuarios()
            {
                return View();
            }



            [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
            public IActionResult Error()
            {
                return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
            }
        }
    }

}

