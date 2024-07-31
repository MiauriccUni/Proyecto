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

            /* Controller Administrador */
            

            /* Controllers Recepcionista */
            


            /* Controllers Entrenador */

            public IActionResult Rutinas()
            {
                return View();
            }

            public IActionResult MaquinasEntrenador()
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

