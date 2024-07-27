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
            RegistroRutinasManager Rutin = new RegistroRutinasManager();
            return Rutin.GetRetrieveRepeticiones(repeticiones);
        }
        [HttpGet]
        public List<RegistroRutina> GetByPeso(int peso)
        {
            RegistroRutinasManager Rutin = new RegistroRutinasManager();
            return Rutin.GetRetrievePeso(tipos_de_ejercicio);
        }
        [HttpGet]
        public List<RegistroRutina> GetBySeries( int series)
        {
            RegistroRutinasManager Rutin = new RegistroRutinasManager();
            return Rutin.GetRetrieveSeries(series);
        }
        [HttpGet]
        public List<RegistroRutina> GetByTiempo(DateTime tiempo)
        {
            RegistroRutinasManager Rutin = new RegistroRutinasManager();
            return Rutin.GetRetrieveTiempo(tiempo);
        }

    }
}
