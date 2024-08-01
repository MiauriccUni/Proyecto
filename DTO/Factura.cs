namespace DTO
{
    public class Factura : BaseClass
    {
        public DateTime FechaPago { get; set; }
        public decimal Descuento { get; set; }
        public decimal MontoFinal { get; set; }

    }
}
