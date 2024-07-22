using DTO;
namespace DataAccess.Mappers.Interfaces
{
    public interface IObjectMapper
    {
        BaseClass BuildObject(Dictionary<string, object> row);
        List<BaseClass> BuildObjects(List<Dictionary<string, object>> rowlist);
    }
}
