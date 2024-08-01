using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class CitasMedicion : BaseClass
    {
        public CitasMedicion() 
        {
            this.usuariosList = new List<Usuario>();
            this.rutinasList = new List<rutinas>();
            
        }
        public DateTime Fecha { set; get; }
        public double Peso { set; get; }
        public double Estatura { set; get; }
        public double PorcentageGrasa { set; get; }
        public string Rutinas { set; get; }
        public int IdRutinas { set; get; }
        public int IdUsuarios { set; get; }

        public List<Usuario> usuariosList { set; get; }
        public List<rutinas> rutinasList { set; get; }
    }
}
