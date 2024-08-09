using AppLogic;
using DTO;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [EnableCors("Demo_Policy")]
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class PlanesMensualesController : Controller
    {
        [HttpPost]
        public string CrearPlanesMensuales(PlanesMensuales planesMensuales)
        {
            PlanesMensualesManager planMensual = new PlanesMensualesManager();
            return planMensual.CreatePlanesMensualesManager(planesMensuales);
        }

        [HttpGet]
        public API_Response GetAllPlanesMensuales()
        {
            API_Response response = new API_Response();
            try
            {
                PlanesMensualesManager planMensual = new PlanesMensualesManager();
                response.Data = planMensual.GetAllPlanesMensualesManager();
                response.Result = "OK";
            }
            catch (Exception ex)
            {
                response.Result = "ERROR";
                response.Message = ex.Message;
            }
            return response;
        }

    }
}
