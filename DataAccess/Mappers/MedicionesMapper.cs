using DataAccess.DAO;
using DataAccess.Mappers.Interfaces;
using DTO;

namespace DataAccess.Mappers
{
    public class MedicionesMapper : IObjectMapper
    {
        public BaseClass BuildObject(Dictionary<string, object> row)
        {
            Mediciones mediciones = new Mediciones();

            mediciones.Id = int.Parse(row["id_cita_asignacion"].ToString());
            mediciones.Peso = double.Parse(row["peso"].ToString());
            mediciones.Estatura = double.Parse(row["estatura"].ToString());
            mediciones.PorcentageG = double.Parse(row["porcentage_grasa"].ToString());
            mediciones.Notas = row["notas"].ToString();
            mediciones.MedicionEs = double.Parse(row["medicion_espalda"].ToString());
            mediciones.MedicionCin = double.Parse(row["medicion_cintura"].ToString());
            mediciones.MedicionPier = double.Parse(row["medicion_pierna"].ToString());
            mediciones.IdCitaAsignacion = int.Parse(row["id_cita_entrenador"].ToString());
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

        public SqlOperation GetRetrieveAllStatement()
        {
            SqlOperation operation = new SqlOperation();
            operation.ProcedureName = "GET_ALL_MEDICIONES";
            return operation;
        }

        public SqlOperation GetCreateStatement(BaseClass dto)
        {
            SqlOperation operation = new SqlOperation();
            operation.ProcedureName = "SP_INSERT_CITAS_ENTRENADOR";

            Mediciones mediciones = (Mediciones)dto;
            operation.AddIntegerParam("id_entrenador_cita", mediciones.Id);
            operation.AddDoubleParam("peso", mediciones.Peso);
            operation.AddDoubleParam("estatura", mediciones.Estatura);
            operation.AddDoubleParam("porcentage_grasa", mediciones.PorcentageG);
            operation.AddVarCharParam("notas", mediciones.Notas);
            operation.AddDoubleParam("medicion_espalda", mediciones.MedicionEs);
            operation.AddDoubleParam("medicion_cintura", mediciones.MedicionCin);
            operation.AddDoubleParam("medicion_pierna", mediciones.MedicionPier);
            operation.AddIntegerParam("id_cita_asignacion", mediciones.IdCitaAsignacion);

            return operation;
        }


    }
}
