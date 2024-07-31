using Microsoft.AspNetCore.Mvc;

namespace WEB_UI.Controllers
{
    public class ClientesController : Controller
    {
        public IActionResult Pagos()
        {
            return View();
        }

        public IActionResult ClientePremium()
        {
            return View();
        }

        public IActionResult ClienteStandard()
        {
            return View();
        }

        public IActionResult ClienteDia()
        {
            return View();
        }
    }
}
