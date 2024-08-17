using DataAccess.DAO;
using DataAccess.Mappers;
using DTO;

namespace DataAccess.Crud
{
    public class UsuarioClaseGrupCrud : CrudFactory
    {

        UsuarioClaseGrupMapper usuarioClaseGrupMapper;

        public UsuarioClaseGrupCrud() : base()
        {
            usuarioClaseGrupMapper = new UsuarioClaseGrupMapper();
            dao = SqlDao.GetInstance();
        }

        public override void Create(BaseClass dto)
        {
            SqlOperation operation = usuarioClaseGrupMapper.GetCreateStatement(dto);
            dao.ExecuteStoreProcedure(operation);
        }

        public override void Delete(BaseClass dto)
        {
            throw new NotImplementedException();
        }

        public override List<T> RetrieveAll<T>()
        {
            List<T> resultList = new List<T>();
            SqlOperation operation = usuarioClaseGrupMapper.GetRetrieveClass();

            List<Dictionary<string, object>> dataResults = dao.ExecuteStoredProcedureWithQuery(operation);
            if (dataResults.Count > 0)
            {
                var dtoList = usuarioClaseGrupMapper.BuildObjects(dataResults);
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
