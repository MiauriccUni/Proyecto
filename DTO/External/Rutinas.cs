using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml;

namespace DTO.External
{
   public class Rutinas
    {
        public Rutinas()
        {
            UniqueId = 0;
        }
        public int UniqueId { get; set; }
        public string NombreEjercicio { get; set; }
        public string TipoEjercicio { get; set; }
        public int Repeticiones { get; set; }
        public int Series { get; set; }
        public int IdMaquina { get; set; }
        public int IdUsuario { get; set; }
    }
}
