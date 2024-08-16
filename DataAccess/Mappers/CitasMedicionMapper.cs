using DataAccess.DAO;
using DataAccess.Mappers.Interfaces;
using DTO;

namespace DataAccess.Mappers
{
    public class CitasMedicionMapper: IObjectMapper
    {
        public BaseClass BuildObject(Dictionary<string, object> row)
        {
            CitasMedicion cita = new CitasMedicion();

            cita.Id = int.Parse(row["id_citas_medicion"].ToString());
            cita.usuariosList = new List<Usuario>
            {
                new Usuario
                {
                Nombre = row["nombre"].ToString(),
                Correo = row["correo"].ToString()
                }
            };
            cita.Fecha = DateTime.Parse(row["fechas"].ToString());
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
            operation.ProcedureName = "SP_INSERT_REGISTRO_CITA";

            CitasMedicion cita = (CitasMedicion)dto;
            operation.AddIntegerParam("id_citas_medicion", cita.Id);
            operation.AddIntegerParam("usuarios_id_usuarios", cita.IdUsuarios);
            operation.AddDatetimeParam("fechas", cita.Fecha);
            return operation;
        }

        public SqlOperation GetRetrieveAllStatement()
        {
            SqlOperation operation = new SqlOperation();
            operation.ProcedureName = "GET_ALL_CITAS_JOIN";
            return operation;
        }

        //public SqlOperation GetByCorreoStatement(string correo)
        //{
        //    SqlOperation operation = new SqlOperation();
        //    operation.ProcedureName = "GET_CITA_BY_CORREO";
        //    operation.AddVarCharParam("correo", correo);
        //    return operation;
        //}
    }
}
