using DataAccess.DAO;
using DataAccess.Mappers.Interfaces;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Mappers
{
    public class RegistroRutinaMapper : IObjectMapper, ICrudStatements
    {
        public BaseClass BuildObject(Dictionary<string, object> row)
        {
            RegistroRutina Regis = new RegistroRutina();

            Regis.Id = int.Parse(row["id_entrenamiento"].ToString());
            Regis.Repeticiones = int.Parse(row["repeticiones"].ToString());
            Regis.Peso = int.Parse(row["peso"].ToString());
            Regis.tiempo = DateTime.Parse(row["tiempo"].ToString());
            Regis.Series = int.Parse(row["series"].ToString());
            return Regis;
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
            operation.ProcedureName = "SP_INSERT_REGISTRORUTINA";
            RegistroRutina user = (RegistroRutina)dto;
            operation.AddIntegerParam("id_maquina", user.Id);
            operation.AddIntegerParam("repeticiones", user.Repeticiones);
            operation.AddIntegerParam("peso", user.Peso);
            operation.AddDatetimeParam("tiempo", user.tiempo);
            operation.AddIntegerParam("series", user.Series);
            return operation;
        }

        public SqlOperation GetDeleteStatement(BaseClass dto)
        {
            throw new NotImplementedException();
        }

        public SqlOperation GetRetrieveAllStatement()
        {
            SqlOperation operation = new SqlOperation();
            operation.ProcedureName = "GET_ALL_REGISTRORUTINA";
            return operation;

        }

        public SqlOperation GetRetrieveByIdStatement(int id)
        {
            SqlOperation operation = new SqlOperation();
            operation.ProcedureName = "SP_GET_BY_ID";
            operation.AddIntegerParam("id_entrenaminetos", id);
            return operation;

        }
        public SqlOperation GetRetrieveByRepeticiones(int Repeticiones)
        {
            SqlOperation operation = new SqlOperation();
            operation.ProcedureName = "GET_USER_BY_REPETICIONES";
            operation.AddIntegerParam("repetiociones", Repeticiones);
            return operation;
        }
        public SqlOperation GetRetrieveByPeso(int Peso)
        {
            SqlOperation operation = new SqlOperation();
            operation.ProcedureName = "GET_USER_BY_PESO";
            operation.AddIntegerParam("peso", Peso);
            return operation;
        }
        public SqlOperation GetRetrieveBySerie(int Series)
        {
            SqlOperation operation = new SqlOperation();
            operation.ProcedureName = "GET_USER_BY_SERIES";
            operation.AddIntegerParam("series", Series);
            return operation;
        }
        public SqlOperation GetRetrieveByTiempo(DateTime Tiempo)
        {
            SqlOperation operation = new SqlOperation();
            operation.ProcedureName = "c";
            operation.AddDatetimeParam("tiempo", Tiempo);
            return operation;
        }


        public SqlOperation GetRetrieveByIdStatement(string id)
        {
            throw new NotImplementedException();
        }

        public SqlOperation GetUpdateStatement(BaseClass dto)
        {
            throw new NotImplementedException();
        }
    }
}

