using DataAccess.DAO;
using DataAccess.Mappers.Interfaces;
using DTO;

namespace DataAccess.Mappers
{
    public class CuponesMapper : IObjectMapper
    {
        public BaseClass BuildObject(Dictionary<string, object> row)
        {
            Cupones user = new Cupones();

            user.Id = int.Parse(row["id_cupones"].ToString());
            user.NombreCupon = row["nombre_cupon"].ToString();
            user.Descuento = int.Parse(row["descuento"].ToString());
            user.Validez = DateTime.Parse(row["fecha_validez"].ToString());

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
            operation.ProcedureName = "SP_INSERT_CUPON";

            Cupones user = (Cupones)dto;
            operation.AddIntegerParam("id_cupones", user.Id);
            operation.AddVarCharParam("nombre_cupon", user.NombreCupon);
            operation.AddIntegerParam("descuento", user.Descuento);
            operation.AddDatetimeParam("fecha_validez", user.Validez);

            return operation;
        }

        public SqlOperation GetRetrieveAllStatement()
        {
            SqlOperation operation = new SqlOperation();
            operation.ProcedureName = "GET_ALL_CUPONES";
            return operation;

        }
    }
}
