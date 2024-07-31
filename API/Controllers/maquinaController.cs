using AppLogic;
using DTO;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [EnableCors("Demo_Policy")]
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class MaquinaController : ControllerBase
    {
        [HttpPost]
        public string Createmaquina(Maquina maquina)
        {
            maquinaManager manager = new maquinaManager();
            return manager.Createmaquina(maquina);
        }

        [HttpGet]
        public List<Maquina> Getmaquina()
        {
            maquinaManager pm = new maquinaManager();
            return pm.GetAllmaquina();
        }

        [HttpGet]
        public List<Maquina> GetBynombre_maquina(string nombre_maquina)
        {
            maquinaManager maquinaManager = new maquinaManager();
            return maquinaManager.GetRetrieveNombreMaquina(nombre_maquina);
        }

       
    }
}
