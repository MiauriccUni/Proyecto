﻿using Microsoft.AspNetCore.Mvc;

namespace WEB_UI.Controllers
{
    public class AdministradorController : Controller
    {
        public IActionResult AdminPanelPrincipal()
        {
            return View();
        }
        public IActionResult AdminActualizacionUsuario()
        {
            return View();
        }

        public IActionResult AdminRecuperacionContrasenna()
        {
            return View();
        }

        public IActionResult ActualizarDatosUsuariosAdministrador()
        {
            return View();
        }

        public IActionResult MaquinasAdministrador()
        {
            return View();
        }
    }
}