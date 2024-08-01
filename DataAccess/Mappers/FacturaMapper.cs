using DataAccess.DAO;
using DataAccess.Mappers.Interfaces;
using DTO;


namespace DataAccess.Mappers
{
    public class FacturaMapper : IObjectMapper
    {
        public BaseClass BuildObject(Dictionary<string, object> row)
        {
            Factura user = new Factura();

            user.Id = int.Parse(row["id_factura"].ToString());
            user.FechaPago = DateTime.Parse(row["fecha_factura"].ToString());
            user.Descuento = int.Parse(row["descuento"].ToString());
            user.MontoFinal = double.Parse(row["monto_final"].ToString());


            return user;
        }

        public List<BaseClass> BuildObjects(List<Dictionary<string, object>> rowlist)
        {
            List<BaseClass> results = new List<BaseClass>();

            foreach (var row in rowlist)
            {
                var espec = BuildObject(row);
                results.Add(espec);
            }
            return results;
        }

        public SqlOperation GetCreateStatement(BaseClass dto)
        {
            SqlOperation operation = new SqlOperation();
            operation.ProcedureName = "SP_INSERT_FACTURA";

            Factura user = (Factura)dto;
            operation.AddIntegerParam("id_factura", user.Id);
            operation.AddDatetimeParam("fecha_factura", user.FechaPago);
            operation.AddIntegerParam("descuento", user.Descuento);
            operation.AddDoubleParam("monto_final", user.MontoFinal);

            return operation;
        }

        public SqlOperation GetRetrieveAllStatement()
        {
            SqlOperation operation = new SqlOperation();
            operation.ProcedureName = "GET_ALL_FACTURAS";
            return operation;

        }

    }
}
