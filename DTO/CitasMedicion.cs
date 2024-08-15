namespace DTO
{
    public class CitasMedicion : BaseClass
    {
        public CitasMedicion() 
        {
            this.usuariosList = new List<Usuario>();
        }
        public DateTime Fecha { set; get; }
        public int IdUsuarios { set; get; }
        public List<Usuario> usuariosList { set; get; }
    }
}
