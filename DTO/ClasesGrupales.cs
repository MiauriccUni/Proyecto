using System.Data.SqlClient;
using System.Data;

namespace DTO
{
    public class ClasesGrupales : BaseClass
    {
        public string NombreClase { get; set; }
        public DateTime Horarios { get; set; }
        public int CuposDisponibles { get; set; }

        public void ActualizarCuposDisponibles(int nuevosCupos)
        {
            using (var connection = new SqlConnection("SP_UPDATE_CLASES_GRUPALES"))
            {
                connection.Open();
                using (var command = new SqlCommand("ActualizarCuposDisponibles", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@id_clases", this.Id); 
                    command.Parameters.AddWithValue("@clases_disponibles", nuevosCupos);
                    command.ExecuteNonQuery();
                }
            }
        }
    }
}



