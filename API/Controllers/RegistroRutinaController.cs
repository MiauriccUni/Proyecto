using AppLogic;
using DTO;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [EnableCors("Demo_Policy")]
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class RegistroRutinaController : ControllerBase
    {
        [HttpPost]
        public string CreateRegistroRutina(RegistroRutina registroRutinas)
        {
            RegistroRutinaManager Regis = new RegistroRutinaManager();
            return Regis.CreateRegistroRutina(registroRutinas);
        }
        [HttpGet]
        public List<RegistroRutina> GetRegistroRutina()
        {
            RegistroRutinaManager pm = new RegistroRutinaManager();
            return pm.GetAllRegistroRutina();
}
            
        [HttpGet]
        public List<RegistroRutina> GetByRepeticiones(int repeticiones)
        {
           RegistroRutinaManager Rutin = new RegistroRutinaManager();
            return Rutin.GetRetrieveRepeticiones(repeticiones);
        }
        [HttpGet]
        public List<RegistroRutina> GetByPeso(int peso)
        {
            RegistroRutinaManager Rutin = new RegistroRutinaManager();
            return Rutin.GetRetrievePeso(peso);
        }
        [HttpGet]
        public List<RegistroRutina> GetBySeries( int series)
      {
            RegistroRutinaManager Rutin = new RegistroRutinaManager();
           return Rutin.GetRetrieveSeries(series);
        }
        [HttpGet]
        public List<RegistroRutina> GetByTiempo(DateTime tiempo)
        {
            RegistroRutinaManager Rutin = new RegistroRutinaManager();
            return Rutin.GetRetrieveTiempo(tiempo);
        }

    }
}
