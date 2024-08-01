using DataAccess.Crud;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppLogic
{
    public class CitasMedicionManager
    {
        public string CreateCitasMedicionManager(CitasMedicion citasMedicion)
        {
            CitasMedicionCrud crud = new CitasMedicionCrud();
            crud.Create(citasMedicion);
            return "Ok";
        }
        public List<CitasMedicion> GetAllCitasMedicionesManager()
        {
            CitasMedicionCrud crud = new CitasMedicionCrud();
            return crud.RetrieveAll<CitasMedicion>();
        }
    }
}
