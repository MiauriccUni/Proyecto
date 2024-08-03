﻿using DataAccess.Crud;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppLogic
{
    public class PlanesMensualesManager
    {
        public string CreatePlanesMensualesManager(PlanesMensuales planesMensuales)
        {
            PlanesMensualesCrud crud = new PlanesMensualesCrud();
            crud.Create(planesMensuales);
            return "Ok";
        }

        public List<CitasMedicion> GetAllCitasMedicionesManager()
        {
            CitasMedicionCrud crud = new CitasMedicionCrud();
            return crud.RetrieveAll<CitasMedicion>();
        }

    }
}