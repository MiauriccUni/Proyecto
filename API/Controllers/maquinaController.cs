using AppLogic;
using DTO;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [EnableCors("Demo_Policy")]
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class maquinaController : ControllerBase
    {
        [HttpPost]
        public string Createmaquina(maquina maquina)
        {
            maquinaManager manager = new maquinaManager();
            return manager.Createmaquina(maquina);
        }

        [HttpGet]
        public List<maquina> Getmaquina()
        {
            maquinaManager pm = new maquinaManager();
            return pm.GetAllmaquina();
        }

        [HttpGet]
        public List<maquina> GetBynombre_maquina(string nombre_maquina)
        {
            maquinaManager maquinaManager = new maquinaManager();
            return maquinaManager.GetRetrieveNombreMaquina(nombre_maquina);
        }

       
    }
}
