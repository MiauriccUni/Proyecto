using AppLogic;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [EnableCors("Demo_Policy")]
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class EmailController : ControllerBase
    {
        [HttpPost]
        public async Task<string> SendEmail(string correo, string cuerpo, string asunto)
        {
            EmailManager emailManager = new EmailManager();
            await emailManager.SendEmail(correo, cuerpo, asunto);
            return "OK";
        }
    }
}
