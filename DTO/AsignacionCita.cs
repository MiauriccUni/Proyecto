using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class AsignacionCita : BaseClass
    {
        public AsignacionCita() 
        {
            this.usuarioLis = new List<Usuario>();
            this.citasMedicionesList = new List<CitasMedicion>();
        }
        public int IdCita { get; set; }
        public int IdEntrenador { get; set; }
        public List<Usuario> usuarioLis { get; set; }
        public List<CitasMedicion> citasMedicionesList { get; set; }
    }
}
