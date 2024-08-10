namespace DTO
{
    public class rutinas : BaseClass
    {
        public rutinas()
        {
            this.usuariosList = new List<Usuario>();
            this.maquinaList = new List<Maquina>();
        }
        public string NombreEjercicio { get; set; }
        public string TipoEjercicio { get; set; }
        public int Repeticiones { get; set; } 
        public int Series { get; set; }
        public int IdMaquina { get; set; }
        public int IdUsuario { get; set; }
        public List<Maquina> maquinaList { set; get; }
        public List<Usuario> usuariosList { set; get; }

    }
}
