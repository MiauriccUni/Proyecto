namespace DTO
{
    public class Usuario : BaseClass
    {
        public string Nombre { get; set; }
        public string Apellidos { get; set; }
        public DateTime Nacimiento { get; set; }
        public string Correo { get; set; }
        public string Celular { get; set; }
        public string Contrasenna { get; set; }
        public string Rol { get; set; }
        public string Genero { get; set; }
        public int OTP { get; set; }
        public string verificar { get; set; }
        public DateTime timeout { get; set; }
    }
}
