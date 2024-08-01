using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO.External
{
    public class MaquinaInfo
    {
        public MaquinaInfo() 
        {
            UniqueId = 0;
        }
        public int UniqueId { get; set; }
        public string NombreMaquina { get; set; }
    }
}
