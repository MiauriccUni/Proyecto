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
            asig.usuarioLis = new List<Usuario>
            {
                new Usuario
                {
                    Nombre = row["nombre"].ToString(),
                    Correo = row["correo"].ToString()
                }
            };
            asig.citasMedicionesList = new List<CitasMedicion>
            {
                new CitasMedicion
                {
                    Fecha = DateTime.Parse(row["fechas"].ToString()),
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
            operation.ProcedureName = "GET_ALL_ASIGNACION_JOIN";
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
    }
}
