using Microsoft.AspNetCore.Mvc;

namespace WEB_UI.Controllers
{
    public class IndexController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
