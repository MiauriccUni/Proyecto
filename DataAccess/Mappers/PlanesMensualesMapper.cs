using DataAccess.DAO;
using DataAccess.Mappers.Interfaces;
using DTO;
using DataAccess.DAO;
using DataAccess.Mappers.Interfaces;
using DTO;

namespace DataAccess.Mappers
{
    public class PlanesMensualesMapper : IObjectMapper
    {
        public BaseClass BuildObject(Dictionary<string, object> row)
        {
            PlanesMensuales cita = new PlanesMensuales();

            cita.Id = int.Parse(row["id_plan"].ToString());
            cita.NombrePlan = row["nombre_plan"].ToString();
            cita.PrecioPlan = double.Parse(row["precio"].ToString());
            cita.CuponDescuentoId = int.Parse(row["cupones_descuentos_id_cupones"].ToString());
            cita.EstadoPlan = row["estado"].ToString();
            cita.usuariosList = new List<Usuario>
            {
                new Usuario
                {
                Nombre = row["nombre"].ToString(),
                }

            };
            cita.cuponesList = new List<Cupones>
            {
                new Cupones
                {
                    Id = int.Parse(row["id_cupon"].ToString()),
                    NombreCupon = row["nombre"].ToString(),
                }
            };

            return cita;
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
            operation.ProcedureName = "SP_INSERT_PLAN_MENSUAL";

            PlanesMensuales cita = (PlanesMensuales)dto;
            operation.AddIntegerParam("id_plan", cita.Id);
            operation.AddVarCharParam("nombre_plan", cita.NombrePlan);
            operation.AddDoubleParam("precio", cita.PrecioPlan);
            operation.AddIntegerParam("cupones_descuentos_id_cupones", cita.CuponDescuentoId);
            operation.AddVarCharParam("estado", cita.EstadoPlan);
            return operation;
        }

        //public SqlOperation GetRetrieveAllStatement()
        //{
        //    SqlOperation operation = new SqlOperation();
        //    operation.ProcedureName = "GET_ALL_CITAS_JOIN";
        //    return operation;
        //}
    }
}
