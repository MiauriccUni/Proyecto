using DataAccess.DAO;
using DataAccess.Mappers;
using DTO;


namespace DataAccess.Crud
{
    public class UsuarioCrud : CrudFactory
    {
        UsuarioMapper usuarioMapper;
        public UsuarioCrud() : base()
        {
            usuarioMapper = new UsuarioMapper();
            dao = SqlDao.GetInstance();
        }

        public override void Create(BaseClass dto)
        {
            SqlOperation operation = usuarioMapper.GetCreateStatement(dto);
            dao.ExecuteStoreProcedure(operation);
        }

        public override void Delete(BaseClass dto)
        {
            throw new NotImplementedException();
        }

        public override List<T> RetrieveAll<T>()
        {
            List<T> resultList = new List<T>();
            SqlOperation operation = usuarioMapper.GetRetrieveAllStatement();

            List<Dictionary<string, object>> dataResults = dao.ExecuteStoredProcedureWithQuery(operation);
            if (dataResults.Count > 0)
            {
                var dtoList = usuarioMapper.BuildObjects(dataResults);
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

        public List<T> RetrieveByEmail<T>(string correo)
        {
            List<T> resultList = new List<T>();
            SqlOperation operation = usuarioMapper.GetRetrieveByEmail(correo);

            List<Dictionary<string, object>> dataResults = dao.ExecuteStoredProcedureWithQuery(operation);

            if (dataResults.Count > 0)
            {
                var dtoList = usuarioMapper.BuildObjects(dataResults);
                foreach (var dto in dtoList)
                {
                    resultList.Add((T)Convert.ChangeType(dto, typeof(T)));
                }
            }
            return resultList;

        }
        public List<T> RetrieveByPhone<T>(string phone)
        {
            List<T> resultList = new List<T>();
            SqlOperation operation = usuarioMapper.GetRetrieveByPhone(phone);

            List<Dictionary<string, object>> dataResults = dao.ExecuteStoredProcedureWithQuery(operation);

            if (dataResults.Count > 0)
            {
                var dtoList = usuarioMapper.BuildObjects(dataResults);
                foreach (var dto in dtoList)
                {
                    resultList.Add((T)Convert.ChangeType(dto, typeof(T)));
                }
            }
            return resultList;

        }
    }
}
