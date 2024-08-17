using DataAccess.Crud;
using DTO;
using Microsoft.AspNetCore.Http.HttpResults;

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
        public List<ClasesGrupales> GetRetrieveByID(int id)
        {
            ClasesGrupalesCrud crud = new ClasesGrupalesCrud();
            return crud.RetrieveByID<ClasesGrupales>(id);
        }

        public void UpdateCuposManager(int id, int cupos)
        {
            ClasesGrupalesCrud crud= new ClasesGrupalesCrud();
            crud.UpdateCupos(id, cupos);
        }
    }
}