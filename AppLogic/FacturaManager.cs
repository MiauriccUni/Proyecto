using DataAccess.Crud;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppLogic
{
    public class FacturaManager
    {
        public string CreateFacturaManager(Factura factura)
        {
            FacturaCrud crud = new FacturaCrud();
            crud.Create(factura);
            return "OK";
        }
        public List<Factura> GetAllFacturasManager()
        {
            FacturaCrud crud = new FacturaCrud();
            return crud.RetrieveAll<Factura>();
        }
    }
}
