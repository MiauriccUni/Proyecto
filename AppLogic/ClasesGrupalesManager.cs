using DataAccess.Crud;
using DTO;

namespace AppLogic
{
    public class ClasesGrupalesManager
    {
        public string CreateClasesGrupalesManager(ClasesGrupales clasesGrupales)
        {
            ClasesGrupalesCrud crud = new ClasesGrupalesCrud();
            crud.Create(clasesGrupales);
            return "Ok";
        }
        public List<ClasesGrupales> GetClasesGrupalesManager()
        {
            ClasesGrupalesCrud crud = new ClasesGrupalesCrud();
            return crud.RetrieveAll<ClasesGrupales>();
        }
    }
}