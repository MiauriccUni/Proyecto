using DataAccess.DAO;
using DataAccess.Mappers.Interfaces;
using DTO;

namespace DataAccess.Mappers
{
    public class UsuarioMapper : IObjectMapper, ICrudStatements
    {
        private readonly EncrypMapper _pass = new EncrypMapper("abcdefghijklmnopqrstuvwx12345678");
        public BaseClass BuildObject(Dictionary<string, object> row)
        {
            Usuario user = new Usuario();

            user.Id = int.Parse(row["id_usuarios"].ToString());
            user.Nombre = row["nombre"].ToString();
            user.Apellidos = row["apellidos"].ToString();
            user.Nacimiento = DateTime.Parse(row["nacimiento"].ToString());
            user.Correo = row["correo"].ToString();
            user.Celular = row["celular"].ToString();
            user.Contrasenna = _pass.Decrypt(row["contrasenna"].ToString());
            user.Rol = row["rol"].ToString();
            user.Genero = row["genero"].ToString();
            user.OTP = int.Parse(row["OTP"].ToString());
            user.verificar = row["verificar"].ToString();
            user.timeout = DateTime.Parse(row["timeout"].ToString());

            return user;
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
            operation.ProcedureName = "SP_INSERT_USUARIOS";

            Usuario user = (Usuario)dto;
            operation.AddIntegerParam("id_usuarios", user.Id);
            operation.AddVarCharParam("nombre", user.Nombre);
            operation.AddVarCharParam("apellidos", user.Apellidos);
            operation.AddDatetimeParam("nacimiento", user.Nacimiento);
            operation.AddVarCharParam("correo", user.Correo);
            operation.AddVarCharParam("celular", user.Celular);
            operation.AddVarCharParam("contrasenna", _pass.Encrypt(user.Contrasenna));
            operation.AddVarCharParam("rol", user.Rol);
            operation.AddVarCharParam("genero", user.Genero);
            operation.AddIntegerParam("otp", user.OTP);
            operation.AddVarCharParam("verificar", user.verificar);
            operation.AddDatetimeParam("timeout", user.timeout);

            return operation;
        }

        public SqlOperation GetDeleteStatement(BaseClass dto)
        {
            throw new NotImplementedException();
        }

        public SqlOperation GetRetrieveAllStatement()
        {
            SqlOperation operation = new SqlOperation();
            operation.ProcedureName = "GET_ALL_USERS";
            return operation;

        }

        public SqlOperation GetRetrieveByIdStatement(int id)
        {
            SqlOperation operation = new SqlOperation();
            operation.ProcedureName = "SP_GET_BY_ID";
            operation.AddIntegerParam("id_usuarios", id);
            return operation;

        }

        public SqlOperation GetRetrieveByEmail(string email)
        {
            SqlOperation operation = new SqlOperation();
            operation.ProcedureName = "GET_USER_BY_CORREO";
            operation.AddVarCharParam("correo", email);
            return operation;
        }

        public SqlOperation GetRetrieveByPhone(string phone)
        {
            SqlOperation operation = new SqlOperation();
            operation.ProcedureName = "GET_USER_BY_Phone";
            operation.AddVarCharParam("celular", phone);
            return operation;
        }

        public SqlOperation UpdateVerificacion(string correo, string verificacion)
        {
            SqlOperation operation = new SqlOperation();
            operation.ProcedureName = "SP_UPDATE_USUARIOS";
            operation.AddVarCharParam("correo", correo);
            operation.AddVarCharParam("verificar", verificacion);
            return operation;
        }

        public SqlOperation UpdateOTP(string correo, int OTP)
        {
            SqlOperation operation = new SqlOperation();
            operation.ProcedureName = "SP_UPDATE_OTP";
            operation.AddVarCharParam("correo", correo);
            operation.AddIntegerParam("OTP", OTP);
            return operation;
        }

        public SqlOperation UpdateRol(int id, string rol)
        {
            SqlOperation operation = new SqlOperation();
            operation.ProcedureName = "SP_UPDATE_USUARIO_ROLE";
            operation.AddIntegerParam("id_usuarios", id);
            operation.AddVarCharParam("rol", rol);
            return operation;
        }

        public SqlOperation GetRetrieveByIdStatement(string id)
        {
            throw new NotImplementedException();
        }

        public SqlOperation GetUpdateStatement(BaseClass dto)
        {
            throw new NotImplementedException();
        }

        ///* Intento de update usuario 1 */

        //public SqlOperation GetUpdateUserPassword(string correo, string nuevaClave)
        //{
        //    SqlOperation operation = new SqlOperation();
        //    operation.ProcedureName = "SP_PUT_PASSWORD";
        //    operation.AddVarCharParam("Correo", correo);
        //    operation.AddVarCharParam("nuevaClave", nuevaClave);
        //    return operation;
        //}

        //public SqlOperation GetUpdateUserRol(string correo, string nuevoRol)
        //{
        //    SqlOperation operation = new SqlOperation();
        //    operation.ProcedureName = "SP_UPDATE_ROL";
        //    operation.AddVarCharParam("Correo", correo);
        //    operation.AddVarCharParam("nuevoRol", nuevoRol);
        //    return operation;
        //}

        //public SqlOperation GetUpdateStatement(BaseClass dto)
        //{
        //    throw new NotImplementedException();
        //}
    }
}
