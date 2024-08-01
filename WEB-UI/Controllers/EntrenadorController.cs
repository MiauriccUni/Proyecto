using Microsoft.AspNetCore.Mvc;

namespace WEB_UI.Controllers
{
    public class EntrenadorController : Controller

    {
        public IActionResult PanelEntrenador()
        {
            return View();
        }

        public IActionResult Entrenador()
        {
            return View();
        }

        public IActionResult MaquinasEntrenador()
        {
            return View();
        }

        public IActionResult Rutinas()
        {
            return View();
        }
    }
}
