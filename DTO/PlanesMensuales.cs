namespace DTO
{
    public class PlanesMensuales : BaseClass
    {
        public PlanesMensuales() {
            this.usuariosList = new List<Usuario>();
            this.cuponesList = new List<Cupones>();
        }

        public string NombrePlan { get; set; }
        public double PrecioPlan { get; set; }
        public int CuponDescuentoId { get; set; }
        public string EstadoPlan { get; set; }
        public int UsuarioID { get; set; }
        public List<Usuario> usuariosList { set; get; }
        public List<Cupones> cuponesList { set; get; }
    }
}
