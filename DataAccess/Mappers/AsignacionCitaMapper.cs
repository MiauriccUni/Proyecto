using DataAccess.DAO;
using DTO;


namespace DataAccess.Mappers
{
    public class AsignacionCitaMapper
    {
        public BaseClass BuildObject(Dictionary<string, object> row)
        {
            AsignacionCita asig = new AsignacionCita();

            asig.Id = int.Parse(row["id_asignacion_cita"].ToString());
            asig.IdEntrenador = int.Parse(row["id_entrenador"].ToString());            
            asig.citasMedicionesList = new List<CitasMedicion>
            {
                new CitasMedicion
                {
                    Fecha = DateTime.Parse(row["fechas"].ToString()),
                    usuariosList = new List<Usuario>
                    {
                       new Usuario
                       {
                           Nombre = row["nombre_cliente"].ToString(),
                           Correo = row["correo_cliente"].ToString(),
                           Rol = row["usuario_rol"].ToString(),
                       }
                    }
                }
            };
            asig.usuarioLis = new List<Usuario>
            {
                new Usuario
                {
                    Nombre = row["nombre_entrenador"].ToString(),
                    Correo = row["correo_entrenador"].ToString(),
                    Rol = row["entrenador_rol"].ToString(),
                }
            };
            return asig;
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

        public SqlOperation GetRetrieveAllStatement()
        {
            SqlOperation operation = new SqlOperation();
            operation.ProcedureName = "GET_ALL_ASIGNACION_JOIN_MODIFY";
            return operation;
        }
        public SqlOperation GetCreateStatement(BaseClass dto)
        {
            SqlOperation operation = new SqlOperation();
            operation.ProcedureName = "SP_INSERT_ASIGNACIONES";

            AsignacionCita asig = (AsignacionCita)dto;
            operation.AddIntegerParam("id_asignacion_cita", asig.Id);
            operation.AddIntegerParam("id_cita", asig.IdCita);
            operation.AddIntegerParam("id_entrenador", asig.IdEntrenador);
            return operation;
        }
        public SqlOperation GetByCorreoStatement(string correo)
        {
            SqlOperation operation = new SqlOperation();
            operation.ProcedureName = "GET_CITA_BY_CORREO";
            operation.AddVarCharParam("correo", correo);
            return operation;
        }

    }
}
