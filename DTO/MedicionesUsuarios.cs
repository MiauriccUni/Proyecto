using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class MedicionesUsuarios : BaseClass
    {
        public MedicionesUsuarios() { 
            this.usuariosList = new List<Usuario>();
            this.citasMedicionesList = new List<CitasMedicion>();
        }
        public double Peso { get; set; }
        public double altura { get; set; }
        public double imc { get; set; }
        public double PesoIdeal { get; set; }
        public int IdUsuarios { get; set; }
        public List<Usuario> usuariosList { get; set; }
        public List<CitasMedicion> citasMedicionesList { get; set; }
    }
}
