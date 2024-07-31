﻿using AppLogic;
using DTO;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [EnableCors("Demo_Policy")]
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class maquinaController : ControllerBase
    {
        [HttpPost]
        public string Createmaquina(maquina maquina)
        {
            maquinaManager manager = new maquinaManager();
            return manager.Createmaquina(maquina);
        }

        [HttpGet]
        public List<maquina> Getmaquina()
        {
            maquinaManager pm = new maquinaManager();
            return pm.GetAllmaquina();
        }

        [HttpGet]
        public List<maquina> GetBynombre_maquina(string nombre_maquina)
        {
            maquinaManager maquinaManager = new maquinaManager();
            return maquinaManager.GetRetrieveNombreMaquina(nombre_maquina);
        }


        ///* Intento de traer la info de las máquinas */
        //[HttpGet]
        //public API_Response GetAllMaquinas()
        //{
        //    API_Response response = new API_Response();
        //    try
        //    {
        //        maquinaManager manager = new maquinaManager();
        //        response.Data = manager.GetAllmaquina();
        //        response.Result = "OK";
        //    }
        //    catch (Exception ex)
        //    {
        //        response.Result = "ERROR";
        //        response.Message = ex.Message;
        //    }
        //    return response;
        //}
    }
}
