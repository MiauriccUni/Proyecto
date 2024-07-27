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
   public class maquinaMapper:IObjectMapper,ICrudStatements
    {
        public BaseClass BuildObject(Dictionary<string, object> row)
        {
            maquina user = new maquina();

            user.Id = int.Parse(row["id_maquina"].ToString());
            user.NombreMaquina = row["nombre_maquina"].ToString();
          

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
            operation.ProcedureName = "SP_INSERT_MAQUINA"; 

            maquina user = (maquina)dto;
            operation.AddIntegerParam("id_maquina", user.Id);
            operation.AddVarCharParam("nombre_maquina", user.NombreMaquina);
           
            return operation;
        }

        public SqlOperation GetDeleteStatement(BaseClass dto)
        {
            throw new NotImplementedException();
        }

        public SqlOperation GetRetrieveAllStatement()
        {
            SqlOperation operation = new SqlOperation();
            operation.ProcedureName = "GET_ALL_MAQUINA";
            return operation;

        }

        public SqlOperation GetRetrieveByIdStatement(int id)
        {
            SqlOperation operation = new SqlOperation();
            operation.ProcedureName = "SP_GET_BY_ID";
            operation.AddIntegerParam("id_maquina", id);
            return operation;

        }
        public SqlOperation GetRetrieveBynombre_maquina(string NombreMaquina)
        {
            SqlOperation operation = new SqlOperation();
            operation.ProcedureName = "GET_USER_BY_MAQUINA"; 
            operation.AddVarCharParam("nombre_maquina", NombreMaquina);
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

