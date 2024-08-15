namespace DTO
{
    public class MedicionesUsuarios : BaseClass
    {
        public MedicionesUsuarios() { 
            this.usuariosList = new List<Usuario>();
            this.citasMedicionesList = new List<CitasMedicion>();
        }
        public int IdMedicion { get; set; }
        public double peso { get; set; }
        public double altura { get; set; }
        public double imc { get; set; }
        public double pesoMeta { get; set; }
        public int IdUsuarios { get; set; }
        public List<Usuario> usuariosList { get; set; }
        public List<CitasMedicion> citasMedicionesList { get; set; }
    }
}
