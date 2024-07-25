namespace DTO
{
    public class UsuarioDTO : BaseClass
    {
        public string Correo { get; set; }
        public string Nombre { get; set; }
        public string Apellidos { get; set; }
        public DateTime Nacimiento { get; set; }
        public string Celular { get; set; }
        public string Contrasenna { get; set; }
        public string Rol { get; set; }
        public string Genero { get; set; }
    }
}

// prueba