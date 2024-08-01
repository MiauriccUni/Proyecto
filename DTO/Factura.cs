namespace DTO
{
    public class Factura : BaseClass
    {
        public int NumeroFactura { get; set; }
        public DateTime FechaPago { get; set; }
        public int Descuento { get; set; }
        public double MontoFinal { get; set; }
    }
}
