﻿namespace DTO
{
    public class Mediciones : BaseClass
    {
        public Mediciones()
        {
            this.asignacionCitas = new List<AsignacionCita>();
        }
        public double Peso { set; get; }
        public double Estatura { set; get; }
        public double PorcentageG {  set; get; }
        public string Notas { set; get; }
        public double MedicionEs { set; get; }
        public double MedicionCin { set; get; }
        public double MedicionPier { set; get; }
        public int IdCitaAsignacion { set; get; }
        public List<AsignacionCita> asignacionCitas { set; get; }
    }
}
