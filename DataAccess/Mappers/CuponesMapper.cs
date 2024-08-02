using DataAccess.DAO;
using DataAccess.Mappers.Interfaces;
using DTO;

namespace DataAccess.Mappers
{
    public class CuponesMapper : IObjectMapper
    {
        public BaseClass BuildObject(Dictionary<string, object> row)
        {
            Cupones user = new Cupones();

            user.Id = int.Parse(row["id_cupon"].ToString());
            user.NumeroCupon = row["nombre_cupon"].ToString();
            user.Descuento = int.Parse(row["descuento"].ToString());

            return user;
        }
        public CuponesMapper() { }

        public List<BaseClass> BuildObjects(List<Dictionary<string, object>> rowlist)
        {
            throw new NotImplementedException();
        }
    }
}
