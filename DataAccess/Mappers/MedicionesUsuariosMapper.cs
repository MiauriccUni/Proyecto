using DataAccess.DAO;
using DataAccess.Mappers.Interfaces;
using DTO;

namespace DataAccess.Mappers
{
    public class MedicionesUsuariosMapper: IObjectMapper
    {
        public BaseClass BuildObject(Dictionary<string, object> row)
        {
            MedicionesUsuarios mediciones = new MedicionesUsuarios();

            mediciones.Peso = double.Parse(row["peso"].ToString());
            mediciones.altura = double.Parse(row["altura"].ToString());
            mediciones.imc = double.Parse(row["imc"].ToString());
            mediciones.PesoIdeal = double.Parse(row["peso_ideal"].ToString());

            mediciones.usuariosList = new List<Usuario>()
            {
                new Usuario
                {
                    Nombre = row["nombre"].ToString(),
                    Rol = row["rol"].ToString()
                }
            };
            mediciones.citasMedicionesList = new List<CitasMedicion>()
            {
                new CitasMedicion
                {
                    Fecha = DateTime.Parse(row["fecha"].ToString()),
                }
            };

            return mediciones;
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
            operation.ProcedureName = "SP_INSERT_MEDICIONS_USUARIOS";

            MedicionesUsuarios mediciones = (MedicionesUsuarios)dto;
            operation.AddDoubleParam("peso", mediciones.Peso);
            operation.AddDoubleParam("altura", mediciones.altura);
            operation.AddDoubleParam("imc", mediciones.imc);
            operation.AddDoubleParam("peso_ideal", mediciones.PesoIdeal);
            return operation;
        }

        public SqlOperation GetRetrieveAllStatement()
        {
            SqlOperation operation = new SqlOperation();
            operation.ProcedureName = "GET_ALL_MEDICIONES_JOIN";
            return operation;
        }

    }
}
