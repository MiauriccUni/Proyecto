//using DataAccess.DAO;
//using DataAccess.Mappers.Interfaces;
//using DTO;


//namespace DataAccess.Mappers
//{
//    public class FacturaMapper : IObjectMapper, ICrudStatements
//    {
//        public BaseClass BuildObject(Dictionary<string, object> row)
//        {
//            FacturaMapper user = new FacturaMapper();

//            user.Id = int.Parse(row["id_maquina"].ToString());
//            user.NombreMaquina = row["nombre_maquina"].ToString();


//            return user;
//        }

//        public List<BaseClass> BuildObjects(List<Dictionary<string, object>> rowlist)
//        {
//            List<BaseClass> results = new List<BaseClass>();

//            foreach (var row in rowlist)
//            {
//                var espec = BuildObject(row);
//                results.Add(espec);
//            }
//            return results;
//        }

//        public SqlOperation GetCreateStatement(BaseClass dto)
//        {
//            SqlOperation operation = new SqlOperation();
//            operation.ProcedureName = "SP_INSERT_MAQUINA";

//            maquina user = (maquina)dto;
//            operation.AddIntegerParam("id_maquina", user.Id);
//            operation.AddVarCharParam("nombre_maquina", user.NombreMaquina);

//            return operation;
//        }

//    }
//}
