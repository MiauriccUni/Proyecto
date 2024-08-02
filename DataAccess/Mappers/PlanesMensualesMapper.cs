using DataAccess.DAO;
using DataAccess.Mappers.Interfaces;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Mappers
{
    public class PlanesMensualesMapper : IObjectMapper
    {
        public BaseClass BuildObject(Dictionary<string, object> row)
        {
            PlanesMensuales cita = new PlanesMensuales();

            cita.Id = int.Parse(row["id_plan_mnsual"].ToString());
            cita.NombrePlan = row["nombre_plan"].ToString();
            cita.PrecioPlan = double.Parse(row["precio_plan"].ToString());
            cita.CuponDescuentoId = int.Parse(row["cupon_descuento_id"].ToString());
            cita.EstadoPlan = row["porcentage_grasa"].ToString();
            cita.usuariosList = new List<Usuario>
            {
                new Usuario
                {
                Id = int.Parse(row["id_usuarios"].ToString())
                }

            };
            cita.cuponesList = new List<Cupones>
            {
                new Cupones
                {
                    Id = int.Parse(row["id_cupon"].ToString()),
                }
            };

            return cita;
        }

        public List<BaseClass> BuildObjects(List<Dictionary<string, object>> rowlist)
        {
            List<BaseClass> results = new List<BaseClass>();

            foreach (var row in rowlist)
            {
                var espec = BuildObject(row);
                results.Add(espec);
            }
            return results;
        }

        public SqlOperation GetCreateStatement(BaseClass dto)
        {
            SqlOperation operation = new SqlOperation();
            operation.ProcedureName = "SP_INSERT_PLAN_MENSUAL";

            CitasMedicion cita = (CitasMedicion)dto;
            operation.AddIntegerParam("id_citas_medicion", cita.Id);
            operation.AddDatetimeParam("fecha", cita.Fecha);
            operation.AddDoubleParam("peso", cita.Peso);
            operation.AddDoubleParam("estatura", cita.Estatura);
            operation.AddDoubleParam("porcentage_grasa", cita.PorcentageGrasa);
            operation.AddVarCharParam("rutinas", cita.Rutinas);
            operation.AddIntegerParam("rutinas_id_rutina", cita.IdRutinas);
            operation.AddIntegerParam("usuarios_id_usuarios", cita.IdUsuarios);
            return operation;
        }

        public SqlOperation GetRetrieveAllStatement()
        {
            SqlOperation operation = new SqlOperation();
            operation.ProcedureName = "GET_ALL_CITAS_JOIN";
            return operation;
        }
    }
}
