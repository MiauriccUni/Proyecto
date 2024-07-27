using DataAccess.Crud;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppLogic
{
    public class RegistroRutinasManager
    {
        public string CreateRutina(rutinas rutinas)
        {
            RutinaCrud crud = new RutinaCrud();
            crud.Create(rutinas);
            return "Ok";
        }
        public List<rutinas> GetAllrutinas()
        {
            RutinaCrud crud = new RutinaCrud();
            return crud.RetrieveAll<rutinas>();
        }
        public List<rutinas> GetRetrieveNombreEjercicio(string NombreEjercicio)
        {
            RutinaCrud rutinasCrud = new RutinaCrud();
            return rutinasCrud.RetrieveBynombre_ejercicio <rutinas>(NombreEjercicio);
        }
        public List<rutinas> GetRetrieveTiposEjercicio(string TipoEjercicio)
        {
            RutinaCrud rutinasCrud = new RutinaCrud();
            return rutinasCrud.RetrieveBytipos_de_ejercicio<rutinas>(TipoEjercicio);
        }

    }
}
