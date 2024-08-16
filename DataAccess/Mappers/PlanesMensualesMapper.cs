using DataAccess.DAO;
using DataAccess.Mappers.Interfaces;
using DTO;

namespace DataAccess.Mappers
{
    public class PlanesMensualesMapper : IObjectMapper
    {
        public BaseClass BuildObject(Dictionary<string, object> row)
        {
            PlanesMensuales plan = new PlanesMensuales();

            plan.Id = int.Parse(row["id_plan"].ToString());
            plan.NombrePlan = row["nombre_plan"].ToString();
            plan.PrecioPlan = double.Parse(row["precio"].ToString());
            plan.EstadoPlan = row["estado"].ToString();

            //plan.CuponDescuentoId = int.Parse(row[""].ToString());
            //plan.UsuarioID = int.Parse(row["id"].ToString());

            plan.usuariosList = new List<Usuario>
            {
                new Usuario
                {
                    Nombre = row["nombre"].ToString(),
                    Rol = row["rol"].ToString(),
                    Correo = row["correo"].ToString()

                }

            };
            plan.cuponesList = new List<Cupones>
            {
                new Cupones
                {
                    NombreCupon = row["nombre_cupon"].ToString(),
                    Descuento = int.Parse(row["descuento"].ToString())
                }
            };

            return plan;
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

            PlanesMensuales plan = (PlanesMensuales)dto;
            operation.AddIntegerParam("id_plan", plan.Id);
            operation.AddVarCharParam("nombre_plan", plan.NombrePlan);
            operation.AddDoubleParam("precio", plan.PrecioPlan);
            operation.AddIntegerParam("cupones_descuentos_id_cupones", plan.CuponDescuentoId);
            operation.AddVarCharParam("estado", plan.EstadoPlan);
            operation.AddIntegerParam("usuarios_id_usuarios", plan.UsuarioID);
            return operation;
        }

        public SqlOperation UpdateCupon(int CuponDescuentoId, int UsuarioID)
        {
            SqlOperation operation = new SqlOperation();
            operation.ProcedureName = "SP_UPDATE_USUARIO_CUPON";
            operation.AddIntegerParam("cupones_descuentos_id_cupones", CuponDescuentoId);
            operation.AddIntegerParam("id_usuarios", UsuarioID);
            return operation;
        }

        // Ver info de factura en cliente
        public SqlOperation GetRetriveByCorreo(string Correo) {
            SqlOperation operation = new SqlOperation();
            operation.ProcedureName = "GET_PLAN_MENSUAL_BY_CORREO";
            operation.AddVarCharParam("correo", Correo);
            return operation;
        }

        public SqlOperation GetRetrieveAllStatement()
        {
            SqlOperation operation = new SqlOperation();
            operation.ProcedureName = "GET_ALL_PLANES_MENSUALES_JOIN";
            return operation;
        }

    }
}
