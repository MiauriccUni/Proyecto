﻿using DataAccess.Crud;
using DTO;

namespace AppLogic
{
    public class UsuarioManager
    {
        public string CreateUsuario(Usuario usuario)
        {
            UsuarioCrud crud = new UsuarioCrud();
            crud.Create(usuario);
            return "Ok";
        }
        public List<Usuario> GetAllUsuarios()
        {
            UsuarioCrud crud = new UsuarioCrud();
            return crud.RetrieveAll<Usuario>();
        }
        public List<Usuario> GetAllClientes()
        {
            UsuarioCrud crud = new UsuarioCrud();
            return crud.RetrieveAllClientes<Usuario>();
        }
        public List<Usuario> GetAllEntrenadores()
        {
            UsuarioCrud crud = new UsuarioCrud();
            return crud.RetrieveAllEntrenadores<Usuario>();
        }

        public List<Usuario> GetRetrieveUser(string correo)
        {
            UsuarioCrud usuarioCrud = new UsuarioCrud();
            return usuarioCrud.RetrieveByEmail<Usuario>(correo);
        }

        public List<Usuario> GetRetrievePhone(string phone)
        {
            UsuarioCrud usuario = new UsuarioCrud();
            return usuario.RetrieveByPhone<Usuario>(phone);
        }

        public List<Usuario> GetRetrieveByID(int id)
        {
            UsuarioCrud usuario = new UsuarioCrud();
            return usuario.RetrieveByID<Usuario>(id);
        }

        public void UpdateValidacion(string correo, string verificacion)
        {
            UsuarioCrud crud = new UsuarioCrud();
            crud.UpdateVerficar(correo, verificacion);
        }

        public void UpdateRolManager(int id, string rol)
        {
            UsuarioCrud crud = new UsuarioCrud();
            crud.UpdateRolCrud(id, rol);
        }

        public void UpdateOTPManager(string correo, int OTP)
        {
            UsuarioCrud crud = new UsuarioCrud();
            crud.UpdateOTPCrud(correo, OTP);
        }

    }
}
