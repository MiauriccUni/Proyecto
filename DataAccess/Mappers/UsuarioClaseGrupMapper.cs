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
    public class UsuarioClaseGrupMapper : IObjectMapper
    {
        public BaseClass BuildObject(Dictionary<string, object> row)
        {
            UsuarioClaseGrup us = new UsuarioClaseGrup();

            us.Id = int.Parse(row["id_usuario_clase"].ToString());
            us.IdUsuario = int.Parse(row["id_usuario"].ToString());
            us.IdClase = int.Parse(row["id_clas"].ToString());
            us.clasesGrupalesList = new List<ClasesGrupales>
            {
                new ClasesGrupales
                {
                    NombreClase = row["nombre_clase"].ToString(),
                    Horarios = DateTime.Parse(row["horarios"].ToString()),
                }
            };
            us.usuariosList = new List<Usuario>
            {
                new Usuario
                {
                    Correo = row["correo"].ToString(),
                    Nombre = row["nombre"].ToString(),
                }
            };
            return us;
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

        //[SP_INSERT_USUARIO_CLASE_GRUPAL]

        public SqlOperation GetCreateStatement(BaseClass dto)
        {
            SqlOperation operation = new SqlOperation();
            operation.ProcedureName = "SP_INSERT_USUARIO_CLASE_GRUPAL";

            UsuarioClaseGrup us = (UsuarioClaseGrup)dto;

            operation.AddIntegerParam("id_usuario_clase", us.Id );
            operation.AddIntegerParam("id_usuario", us.IdUsuario);
            operation.AddIntegerParam("id_clas", us.IdClase);

            return operation;
        }

        public SqlOperation GetRetrieveClass()
        {
            SqlOperation operation = new SqlOperation();
            operation.ProcedureName = "GET_ALL_USUARIO_CLASE_GRUPAL";
            return operation;
        }
    }
}
