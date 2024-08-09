using AppLogic;
using DTO;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{  [EnableCors("Demo_Policy")]
        [Route("api/[controller]/[action]")]
        [ApiController]
    public class RutinaController : ControllerBase
    {
            [HttpPost]
            public string CreateRutina(rutinas rutinas)
            {
                RegistroRutinasManager rutina = new RegistroRutinasManager();
                return rutina.CreateRutina(rutinas);
            }

            [HttpGet]
            public List<rutinas> Getrutina()
            {
                RegistroRutinasManager pm = new RegistroRutinasManager();
                return pm.GetAllrutinas();
            }

            [HttpGet]
            public List<rutinas> GetBynombre_ejercicio(string nombre_ejercicio)
            {
                RegistroRutinasManager RutinaManager = new RegistroRutinasManager();
                return RutinaManager.GetRetrieveNombreEjercicio(nombre_ejercicio);
            }
        [HttpGet]
        public List<rutinas> GetBytipos_de_ejercicio(string tipos_de_ejercicio)
        {
            RegistroRutinasManager RutinaManager = new RegistroRutinasManager();
            return RutinaManager.GetRetrieveTiposEjercicio(tipos_de_ejercicio);
        }    [HttpGet]
        public List<rutinas> GetByRepeticiones(int Repeticiones)
        {
            RegistroRutinasManager RutinaManager = new RegistroRutinasManager();
            return RutinaManager.GetRetrieveRepeticiones(Repeticiones);
        }    [HttpGet]
        public List<rutinas> GetBySeries(int Series)
        {
            RegistroRutinasManager RutinaManager = new RegistroRutinasManager();
            return RutinaManager.GetRetrieveSeries(Series);
        }



    }
}
