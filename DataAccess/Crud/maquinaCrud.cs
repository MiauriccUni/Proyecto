using DataAccess.DAO;
using DataAccess.Mappers;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Crud
{
    public class maquinaCrud : CrudFactory
    {
        maquinaMapper maquinaMappers;
        public maquinaCrud () : base ()
        
        {
            maquinaMappers = new maquinaMapper();
            dao = SqlDao.GetInstance();
        }

        public override void Create(BaseClass dto)
        {
            SqlOperation operation = maquinaMappers.GetCreateStatement(dto);
            dao.ExecuteStoreProcedure(operation);
        }

        public override void Delete(BaseClass dto)
        {
            throw new NotImplementedException();
        }

        public override List<T> RetrieveAll<T>()
        {
            List<T> resultList = new List<T>();
            SqlOperation operation = maquinaMappers.GetRetrieveAllStatement();

            List<Dictionary<string, object>> dataResults = dao.ExecuteStoredProcedureWithQuery(operation);
            if (dataResults.Count > 0)
            {
                var dtoList = maquinaMappers.BuildObjects(dataResults);
                foreach (var dto in dtoList)
                {
                    resultList.Add((T)Convert.ChangeType(dto, typeof(T)));
                }
            }
            return resultList;
        }

        public override T RetrieveById<T>(int id)
        {
            //List<T> result = new List<T>();
            //SqlOperation operation = usuarioMapper.GetRetrieveByIdStatement(id);

            //List<Dictionary<string, object>> dataResults = dao.ExecuteStoredProcedureWithQuery(operation);

            //if(dataResults.Count > 0)
            //{
            //    var dtoList = usuarioMapper.BuildObjects(dataResults);
            //    foreach(var dto in dtoList)
            //    {
            //        result
            //    }
            //}
            throw new NotImplementedException();
        }
        public override void Update(BaseClass dto)
        {
            throw new NotImplementedException();
        }

        public List<T> RetrieveBynombre_maquina<T>(string nombre_maquina)
        {
            List<T> resultList = new List<T>();
            SqlOperation operation = maquinaMappers.GetRetrieveBynombre_maquina(nombre_maquina);

            List<Dictionary<string, object>> dataResults = dao.ExecuteStoredProcedureWithQuery(operation);

            if (dataResults.Count > 0)
            {
                var dtoList = maquinaMappers.BuildObjects(dataResults);
                foreach (var dto in dtoList)
                {
                    resultList.Add((T)Convert.ChangeType(dto, typeof(T)));
                }
            }
            return resultList;

        }
      
    }
}
