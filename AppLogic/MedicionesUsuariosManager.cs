using DataAccess.Crud;
using DTO;

namespace AppLogic
{
    public class MedicionesUsuariosManager
    {
        public string CreateMedicionesUsuariosManager(MedicionesUsuarios medicionesUsuarios)
        { 
            MedicionesUsuariosCrud crud = new MedicionesUsuariosCrud();
            crud.Create(medicionesUsuarios);
            return "OK";
        }

        public List<MedicionesUsuarios> GetMedicionesUsuariosManager()
        {
            MedicionesUsuariosCrud crud = new MedicionesUsuariosCrud();
            return crud.RetrieveAll<MedicionesUsuarios>();
        }

    }
}
