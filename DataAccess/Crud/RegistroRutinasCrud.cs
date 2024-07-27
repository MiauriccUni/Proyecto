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
    public class RegistroRutinasCrud: CrudFactory
    {
        RegistroRutinaMapper registroRutinaMapper;
        public RegistroRutinasCrud() : base()

        {
            registroRutinaMapper = new RegistroRutinaMapper();
            dao = SqlDao.GetInstance();
        }

        public override void Create(BaseClass dto)
        {
            SqlOperation operation =   registroRutinaMapper.GetCreateStatement(dto);
            dao.ExecuteStoreProcedure(operation);
        }

        public override void Delete(BaseClass dto)
        {
            throw new NotImplementedException();
        }

        public override List<T> RetrieveAll<T>()
        {
            List<T> resultList = new List<T>();
            SqlOperation operation = registroRutinaMapper.GetRetrieveAllStatement();

            List<Dictionary<string, object>> dataResults = dao.ExecuteStoredProcedureWithQuery(operation);
            if (dataResults.Count > 0)
            {
                var dtoList = registroRutinaMapper.BuildObjects(dataResults);
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

        public List<T> RetrieveByRepeticiones<T>(int Repeticiones )
        {
            List<T> resultList = new List<T>();
            SqlOperation operation = registroRutinaMapper.GetRetrieveByRepeticiones(Repeticiones);

            List<Dictionary<string, object>> dataResults = dao.ExecuteStoredProcedureWithQuery(operation);

            if (dataResults.Count > 0)
            {
                var dtoList = registroRutinaMapper.BuildObjects(dataResults);
                foreach (var dto in dtoList)
                {
                    resultList.Add((T)Convert.ChangeType(dto, typeof(T)));
                }
            }
            return resultList;

        }
        public List<T> RetrieveByPeso<T>(int Peso)
        {
            List<T> resultList = new List<T>();
            SqlOperation operation = registroRutinaMapper.GetRetrieveByPeso(Peso);

            List<Dictionary<string, object>> dataResults = dao.ExecuteStoredProcedureWithQuery(operation);

            if (dataResults.Count > 0)
            {
                var dtoList = registroRutinaMapper.BuildObjects(dataResults);
                foreach (var dto in dtoList)
                {
                    resultList.Add((T)Convert.ChangeType(dto, typeof(T)));
                }
            }
            return resultList;

        }
        public List<T> RetrieveBySeries<T>(int Series)
        {
            List<T> resultList = new List<T>();
            SqlOperation operation = registroRutinaMapper.GetRetrieveBySerie(Series);

            List<Dictionary<string, object>> dataResults = dao.ExecuteStoredProcedureWithQuery(operation);

            if (dataResults.Count > 0)
            {
                var dtoList = registroRutinaMapper.BuildObjects(dataResults);
                foreach (var dto in dtoList)
                {
                    resultList.Add((T)Convert.ChangeType(dto, typeof(T)));
                }
            }
            return resultList;

        }
        public List<T> RetrieveByTiempo<T>(DateTime tiempo)
        {
            List<T> resultList = new List<T>();
            SqlOperation operation = registroRutinaMapper.GetRetrieveByTiempo(tiempo);

            List<Dictionary<string, object>> dataResults = dao.ExecuteStoredProcedureWithQuery(operation);

            if (dataResults.Count > 0)
            {
                var dtoList = registroRutinaMapper.BuildObjects(dataResults);
                foreach (var dto in dtoList)
                {
                    resultList.Add((T)Convert.ChangeType(dto, typeof(T)));
                }
            }
            return resultList;

        }

    }
}
