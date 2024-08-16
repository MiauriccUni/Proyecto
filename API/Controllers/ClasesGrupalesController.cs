using AppLogic;
using DTO;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [EnableCors("Demo_Policy")]
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ClasesGrupalesController : ControllerBase
    {
        [HttpPost]
        public string CreateClasesGrupales(ClasesGrupales clases)
        {
            ClasesGrupalesManager cru = new ClasesGrupalesManager();
            cru.CreateClasesGrupalesManager(clases);
            return "Ok";
        }
        [HttpGet]
        public API_Response GetClasesGrupales() 
        {
            API_Response response = new API_Response();
            try
            {
                ClasesGrupalesManager manager = new ClasesGrupalesManager();
                response.Data = manager.GetClasesGrupalesManager();
                response.Result = "OK";
            }catch(Exception ex)
            {
                response.Result = "ERROR";
                response.Message = ex.Message;
            }
            return response;
        } 



    }
}