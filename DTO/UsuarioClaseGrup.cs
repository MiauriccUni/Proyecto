using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class UsuarioClaseGrup : BaseClass
    {
        public UsuarioClaseGrup()
        {
            this.usuariosList = new List<Usuario>();
            this.clasesGrupalesList = new List<ClasesGrupales>();
        }
        public int IdUsuario {  get; set; }
        public int IdClase { get; set; }
        public List<Usuario> usuariosList { get; set; }
        public List<ClasesGrupales> clasesGrupalesList { get; set; }

    }
}
