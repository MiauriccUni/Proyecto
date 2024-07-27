using DataAccess.Crud;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppLogic
{
    public class maquinaManager
    {
        public string Createmaquina(maquina maquinas)
        {
           maquinaCrud crud = new maquinaCrud();
            crud.Create(maquinas);
            return "Ok";
        }
        public List<maquina> GetAllmaquina()
        {
            maquinaCrud crud = new maquinaCrud();
            return crud.RetrieveAll<maquina>();
        }
        public List<maquina> GetRetrieveNombreMaquina(string NombreMaquina)
        {
            maquinaCrud maquinasCrud = new maquinaCrud();
            return maquinasCrud.RetrieveBynombre_maquina<maquina>(NombreMaquina);
        }

      
    }
}
