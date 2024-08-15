using DataAccess.DAO;
using DataAccess.Mappers;
using DTO;

namespace DataAccess.Crud
{
    public class MedicionesUsuariosCrud : CrudFactory
    {
        MedicionesUsuariosMapper medicionesUsuariosMapper;
        public MedicionesUsuariosCrud() : base()
        {
            medicionesUsuariosMapper = new MedicionesUsuariosMapper();
            dao = SqlDao.GetInstance();
        }
        public override void Create(BaseClass dto)
        {
            SqlOperation operation = medicionesUsuariosMapper.GetCreateStatement(dto);
            dao.ExecuteStoreProcedure(operation);
        }

        public override void Delete(BaseClass dto)
        {
            throw new NotImplementedException();
        }

        public override List<T> RetrieveAll<T>()
        {
            List<T> resultList = new List<T>();
            SqlOperation operation = medicionesUsuariosMapper.GetRetrieveAllStatement();

            List<Dictionary<string, object>> dataResults = dao.ExecuteStoredProcedureWithQuery(operation);
            if (dataResults.Count > 0)
            {
                var dtoList = medicionesUsuariosMapper.BuildObjects(dataResults);
                foreach (var dto in dtoList)
                {
                    resultList.Add((T)Convert.ChangeType(dto, typeof(T)));
                }
            }
            return resultList;
        }

        public override T RetrieveById<T>(int id)
        {
            throw new NotImplementedException();
        }

        public override void Update(BaseClass dto)
        {
            throw new NotImplementedException();
        }

    }
}
