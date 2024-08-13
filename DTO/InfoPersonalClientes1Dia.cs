namespace DTO
{
    public class InfoPersonalClientes1Dia : BaseClass
    {
        public InfoPersonalClientes1Dia()
        {
            this.usuarioLis = new List<Usuario>();
        }
        public List<Usuario> usuarioLis { get; set; }
    }
}
