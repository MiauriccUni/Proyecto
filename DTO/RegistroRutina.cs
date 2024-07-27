using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class RegistroRutina : BaseClass
    {
        public int Repeticiones { get; set; }
        public int Peso { get; set; }
        public int Series { get; set; }
        public DateTime tiempo { get; set; }

    }
}
