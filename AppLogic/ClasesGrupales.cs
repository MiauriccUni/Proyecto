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
            return "OK";
        }

        public List<ClasesGrupales> GetAllClasesGrupalesManager()
        {
            ClasesGrupalesCrud crud = new ClasesGrupalesCrud();
            return crud.RetrieveAll<ClasesGrupales>();
        }
    }
}