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

        [HttpGet]
        public API_Response GetAllMaquinas()
        {
            API_Response response = new API_Response();
            try
            {
                maquinaManager manager = new maquinaManager();
                response.Data = manager.GetAllmaquina();
                response.Result = "OK";
            }
            catch (Exception ex)
            {
                response.Result = "ERROR";
                response.Message = ex.Message;
            }
            return response;
        }
    }
}
