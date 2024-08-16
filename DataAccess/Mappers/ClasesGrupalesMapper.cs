using DataAccess.DAO;
using DataAccess.Mappers.Interfaces;
using DTO;

namespace DataAccess.Mappers
{
    public class ClasesGrupalesMapper : IObjectMapper
    {
        public BaseClass BuildObject(Dictionary<string, object> row)
        {
            ClasesGrupales user = new ClasesGrupales();

            user.Id = int.Parse(row["id_clase"].ToString());
            user.NombreClase = row["nombre_clase"].ToString();
            user.Horarios = DateTime.Parse(row["horarios"].ToString());
            user.CuposDisponibles = int.Parse(row["cupos_disponibles"].ToString());

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
            operation.ProcedureName = "SP_INSERT_CLASES_GRUPALES";

            ClasesGrupales user = (ClasesGrupales)dto;
            operation.AddIntegerParam("id_clase", user.Id);
            operation.AddVarCharParam("nombre_clase", user.NombreClase);
            operation.AddDatetimeParam("horarios", user.Horarios);
            operation.AddIntegerParam("cupos_disponibles", user.CuposDisponibles);

            return operation;
        }

        public SqlOperation RetrieveAllStatement()
        {
            
            SqlOperation operation = new SqlOperation();
            operation.ProcedureName = "GET_ALL_CLASES_GRUPALES";
            return operation;
            
        }

        public SqlOperation GetUpdateCuposDisponiblesStatement(BaseClass dto)
        {
            SqlOperation operation = new SqlOperation();
            operation.ProcedureName = "SP_UPDATE_CLASES_GRUPALES";

            ClasesGrupales user = (ClasesGrupales)dto;
            operation.AddIntegerParam("id_clase", user.Id);
            operation.AddIntegerParam("cupos_disponibles", user.CuposDisponibles);

            return operation;
        }
        public SqlOperation GetRetrieveByID(int id)
        {
            SqlOperation operation = new SqlOperation();
            operation.ProcedureName = "GET_CLASES_GRUPALES_BY_ID";
            operation.AddIntegerParam("id_clase", id);
            return operation;
        }
        public SqlOperation UpdateCupos(int id, int cupos)
        {
            SqlOperation operation = new SqlOperation();
            operation.ProcedureName = "SP_UPDATE_CUPOS_CLASES";
            operation.AddIntegerParam("id_clase", id);
            operation.AddIntegerParam("cupos_disponibles", cupos);
            return operation;
        }
    }
}