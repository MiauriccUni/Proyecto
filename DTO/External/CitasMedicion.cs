using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml;

namespace DTO.External
{
    public class CitasMedicion
    {
        public CitasMedicion() 
        {
            UniqueId = 0;
        }
        public int UniqueId { get; set; }
        public DateTime Fecha { set; get; }
        public double Peso { set; get; }
        public double Estatura { set; get; }
        public double PorcentageGrasa { set; get; }
        public string Rutinas { set; get; }
        public int IdRutinas { set; get; }
        public int IdUsuarios { set; get; }
    }
}
