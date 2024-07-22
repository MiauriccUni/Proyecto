using DataAccess.DAO;
using DTO;

namespace DataAccess.Mappers.Interfaces
{
    public interface ICrudStatements
    {
        SqlOperation GetCreateStatement(BaseClass dto);
        SqlOperation GetUpdateStatement(BaseClass dto);
        SqlOperation GetDeleteStatement(BaseClass dto);
        SqlOperation GetRetrieveAllStatement();
        SqlOperation GetRetrieveByIdStatement(string id);


    }
}
