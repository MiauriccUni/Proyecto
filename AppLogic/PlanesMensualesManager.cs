using DataAccess.Crud;
using DTO;

namespace AppLogic
{
    public class PlanesMensualesManager
    {
        public string CreatePlanesMensualesManager(PlanesMensuales planesMensuales)
        {
            PlanesMensualesCrud crud = new PlanesMensualesCrud();
            crud.Create(planesMensuales);
            return "Ok";
        }

        public List<PlanesMensuales> GetAllPlanesMensualesManager()
        {
            PlanesMensualesCrud crud = new PlanesMensualesCrud();
            return crud.RetrieveAll<PlanesMensuales>();
        }

        public List<PlanesMensuales> GetAllClientes()
        {
            PlanesMensualesCrud crud = new PlanesMensualesCrud();
            return crud.RetrieveAll<PlanesMensuales>();
        }

        public void UpdateCuponManager(int planId, int CuponDescuentoId, int usuarios_id_usuarios)
        {
            PlanesMensualesCrud crud = new PlanesMensualesCrud();
            crud.UpdateCuponCrud(planId,CuponDescuentoId, usuarios_id_usuarios);
        }

    }
}
