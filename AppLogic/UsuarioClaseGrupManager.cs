using DataAccess.Crud;
using DTO;

namespace AppLogic
{
    public class UsuarioClaseGrupManager
    {
        public string CreateUsuarioClaseGrupManager(UsuarioClaseGrup us)
        {
            UsuarioClaseGrupCrud crud = new UsuarioClaseGrupCrud();
            crud.Create(us);
            return "Ok";
        }

        public List<UsuarioClaseGrup> GetUsuarioClaseGrupManagers() 
        {
            UsuarioClaseGrupCrud crud = new UsuarioClaseGrupCrud();
            return crud.RetrieveAll<UsuarioClaseGrup>();
        }
    }
}
