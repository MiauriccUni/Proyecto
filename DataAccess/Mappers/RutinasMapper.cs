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
public  class RutinasMapper : IObjectMapper, ICrudStatements
    {
        public BaseClass BuildObject(Dictionary<string, object> row)
        {
            rutinas rutin = new rutinas();

           rutin.Id = int.Parse(row["id_rutina"].ToString());
            rutin.NombreEjercicio = row["nombre_ejercicio"].ToString(); 
            rutin.TipoEjercicio = row["tipos_de_ejercicio"].ToString();
            return rutin;
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
            operation.ProcedureName = "SP_INSERT_RUTINAS";

            rutinas rutin = (rutinas)dto;
            operation.AddIntegerParam("id_rutina", rutin.Id);
            operation.AddVarCharParam("nombre_ejercicio", rutin.NombreEjercicio);
            operation.AddVarCharParam("tipos_de_ejercicio", rutin.TipoEjercicio);
            return operation;
        }

        public SqlOperation GetDeleteStatement(BaseClass dto)
        {
            throw new NotImplementedException();
        }

        public SqlOperation GetRetrieveAllStatement()
        {
            SqlOperation operation = new SqlOperation();
            operation.ProcedureName = "GET_ALL_RUTINAS";
            return operation;

        }

        public SqlOperation GetRetrieveByIdStatement(int id)
        {
            SqlOperation operation = new SqlOperation();
            operation.ProcedureName = "SP_GET_BY_ID";
            operation.AddIntegerParam("id_rutina", id);
            return operation;                                                                                              

        }
        public SqlOperation GetRetrieveBynombre_ejercicio(string NombreEjercicio)
        {
            SqlOperation operation = new SqlOperation();
            operation.ProcedureName = "GET_USER_BY_RUTINANOMBRE";
            operation.AddVarCharParam("nombre_ejercicio", NombreEjercicio);
            return operation;
        }
        public SqlOperation GetRetrieveBytipo_de_ejercicio(string TipoEjercicio)
        {
            SqlOperation operation = new SqlOperation();
            operation.ProcedureName = "GET_USER_BY_RUTINATIPO";
            operation.AddVarCharParam("tipos_de_ejercicio", TipoEjercicio);
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

