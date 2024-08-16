using DataAccess.Crud;
using DTO;

namespace AppLogic
{
    public class ClasesGrupalesManager
    {
        private ClasesGrupalesCrud crud;

        public ClasesGrupalesManager()
        {
            crud = new ClasesGrupalesCrud();
        }

        public int CreateClasesGrupalesManager(ClasesGrupales clasesGrupales)
        {
            crud.Create(clasesGrupales);
            return clasesGrupales.Id; // return the ID of the newly created object
        }

        public List<ClasesGrupales> GetAllClasesGrupalesManager()
        {
            return crud.RetrieveAll<ClasesGrupales>();
        }

        public void UpdateCuposDisponiblesManager(ClasesGrupales clasesGrupales)
        {
            crud.Update(clasesGrupales);
        }
    }
}