using DataAccess.Crud;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppLogic
{
    public class MedicionesManager
    {
        public string CreateMedicionManager(Mediciones mediciones)
        {
            MedicionesCrud crud = new MedicionesCrud();
            crud.Create(mediciones);
            return "Ok";
        }

        public List<Mediciones> GetMediciones()
        {
            MedicionesCrud crud= new MedicionesCrud();
            return crud.RetrieveAll<Mediciones>();
        }
        
    }
}
