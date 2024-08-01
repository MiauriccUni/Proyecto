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
            cita.Fecha = DateTime.Parse(row["fecha"].ToString());
            cita.Peso = double.Parse(row["peso"].ToString());
            cita.Estatura = double.Parse(row["estatura"].ToString());
            cita.PorcentageGrasa = double.Parse(row["porcentage_grasa"].ToString());
            cita.Rutinas = row["rutinas"].ToString();
            cita.IdRutinas = int.Parse(row["rutinas_id_rutina"].ToString());
            cita.IdUsuarios = int.Parse(row["usuarios_id_usuarios"].ToString());
            cita.usuariosList = new List<Usuario>
            {
                new Usuario
                {
                Nombre = row["nombre"].ToString(),
                Correo = row["correo"].ToString()

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
            operation.ProcedureName = "SP_INSERT_REGISTRO_CITA";

            CitasMedicion cita = (CitasMedicion)dto;
            operation.AddIntegerParam("id_citas_medicion", cita.Id);
            operation.AddDatetimeParam("fecha", cita.Fecha);
            operation.AddDoubleParam("peso", cita.Peso);
            operation.AddDoubleParam("estatura", cita.Estatura);
            operation.AddDoubleParam("porcentage_grasa", cita.PorcentageGrasa);
            operation.AddVarCharParam("rutinas", cita.Rutinas);
            operation.AddIntegerParam("rutinas_id_rutina", cita.IdRutinas);
            operation.AddIntegerParam("usuarios_id_usuarios", cita.IdUsuarios);
            return operation;
        }

        public SqlOperation GetRetrieveAllStatement()
        {
            SqlOperation operation = new SqlOperation();
            operation.ProcedureName = "GET_ALL_CITAS_JOIN";
            return operation;
        }


    }
}
