using DataAccess.Crud;
using DTO;

namespace AppLogic
{
    public class RegistroRutinaManager
    {
        public string CreateRegistroRutina(RegistroRutina registroRutina)
        {
            RegistroRutinasCrud crud = new RegistroRutinasCrud();
            crud.Create(registroRutina);
            return "Ok";
        }
        public List<RegistroRutina> GetAllRegistroRutina()
        {
            RegistroRutinasCrud crud = new RegistroRutinasCrud();
            return crud.RetrieveAll<RegistroRutina>();
        }
        public List<RegistroRutina> GetRetrieveRepeticiones(int repeticiones)
        {
            RegistroRutinasCrud Crud = new RegistroRutinasCrud();
            return Crud.RetrieveByRepeticiones<RegistroRutina>(repeticiones);
        }
        public List<RegistroRutina> GetRetrievePeso(int Peso)
        {
            RegistroRutinasCrud Crud = new RegistroRutinasCrud();
            return Crud.RetrieveByPeso<RegistroRutina>(Peso);
        }

        public List<RegistroRutina> GetRetrieveSeries(int serie)
        {
            RegistroRutinasCrud Crud = new RegistroRutinasCrud();
            return Crud.RetrieveBySeries<RegistroRutina>(serie);
        }
        public List<RegistroRutina> GetRetrieveTiempo(DateTime tiempo)
        {
            RegistroRutinasCrud Crud = new RegistroRutinasCrud();
            return Crud.RetrieveByTiempo<RegistroRutina>(tiempo);
        }

    }
}
