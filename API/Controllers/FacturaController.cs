using AppLogic;
using DTO;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [EnableCors("Demo_Policy")]
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class FacturaController : ControllerBase
    {
        [HttpPost]
        public string CrearFactura(Factura factura)
        {
            FacturaManager manager = new FacturaManager();
            return manager.CreateFacturaManager(factura);
        }

        [HttpGet]
        public API_Response GetAllFacturas()
        {
            API_Response response = new API_Response();
            try
            {
                FacturaManager manager = new FacturaManager();
                response.Data = manager.GetAllFacturasManager();
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
