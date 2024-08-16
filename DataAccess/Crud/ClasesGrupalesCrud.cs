using DataAccess.DAO;
using DataAccess.Mappers;
using DTO;

namespace DataAccess.Crud
{
    public class ClasesGrupalesCrud : CrudFactory
    {
        ClasesGrupalesMapper clasesGrupalesMapper;

        public ClasesGrupalesCrud() : base()
        {
            clasesGrupalesMapper = new ClasesGrupalesMapper();
            dao = SqlDao.GetInstance();
        }
        public override void Create(BaseClass dto)
        {
            SqlOperation operation = clasesGrupalesMapper.GetCreateStatement(dto);
            dao.ExecuteStoreProcedure(operation);
        }

        public override void Delete(BaseClass dto)
        {
            throw new NotImplementedException();
        }

        public override List<T> RetrieveAll<T>()
        {
            List<T> resultList = new List<T>();
            SqlOperation operation = clasesGrupalesMapper.RetrieveAllStatement();

            List<Dictionary<string, object>> dataResults = dao.ExecuteStoredProcedureWithQuery(operation);
            if (dataResults.Count > 0)
            {
                var dtoList = clasesGrupalesMapper.BuildObjects(dataResults);
                foreach (var dto in dtoList)
                {
                    resultList.Add((T)Convert.ChangeType(dto, typeof(T)));
                }
            }
            return resultList;
        }

        public List<T> RetrieveByID<T>(int id)
        {
            List<T> resultList = new List<T>();
            SqlOperation operation = clasesGrupalesMapper.GetRetrieveByID(id);
            List<Dictionary<string, object>> dataResults = dao.ExecuteStoredProcedureWithQuery(operation);
            if (dataResults.Count > 0)
            {
                var dtoList = clasesGrupalesMapper.BuildObjects(dataResults);
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

        public void UpdateCupos(int id, int cupos)
        {
            SqlOperation operation = clasesGrupalesMapper.UpdateCupos(id, cupos);
            dao.ExecuteStoreProcedure(operation);
        }
    }
}
