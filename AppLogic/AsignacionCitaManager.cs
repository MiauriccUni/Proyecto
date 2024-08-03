using DataAccess.Crud;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppLogic
{
    public class AsignacionCitaManager
    {
        public List<AsignacionCita> GetAsignacions()
        {
            AsignacionCitaCrud crud = new AsignacionCitaCrud();
            return crud.RetrieveAll<AsignacionCita>();
        }
        public string CreateAsignaciones(AsignacionCita asignacion)
        {
            AsignacionCitaCrud crud = new AsignacionCitaCrud();
            crud.Create(asignacion);
            return "Ok";
        }

    }
}
