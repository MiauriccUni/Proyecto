using DataAccess.Crud;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppLogic
{
    public class CuponesManager
    {
        public string CreateCuponesManager(Cupones cupones)
        {
            CuponesCrud crud = new CuponesCrud();
            crud.Create(cupones);
            return "OK";
        }

        public List<Cupones> GetAllCuponesManager()
        {
            CuponesCrud crud = new CuponesCrud();
            return crud.RetrieveAll<Cupones>();
        }
    }
}
