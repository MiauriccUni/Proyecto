using DataAccess.DAO;
using DTO;

namespace DataAccess.Crud
{
    public abstract class CrudFactory
    {
        protected SqlDao dao;

        public abstract void Create(BaseClass dto);

        public abstract void Update(BaseClass dto);

        public abstract void Delete(BaseClass dto);

        public abstract List<T> RetrieveAll<T>();

        public abstract T RetrieveById<T>(int id);
    }
}
