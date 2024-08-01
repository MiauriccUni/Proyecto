/* Creación de factura pendiente, consultar vista con Ricardo */

//function Consultar() {
//    const grid = new gridjs.Grid({
//        search: true,
//        sort: true,
//        resizable: true,
//        pagination: {
//            limit: 5
//        },
//        language: {
//            search: {
//                placeholder: 'Buscar'
//            }
//        },
//        columns: ['ID', 'Número Factura', 'Fecha', 'Descuento', 'Monto Final'],
//        server: {
//            url: 'https://localhost:7253/api/Factura/GetAllFacturas',
//            then: data => data.data.map(result => [
//                result.id,
//                result.numeroFactura,
//                result.fechaPago,
//                result.descuento,
//                result.montoFinal])
//        },
//    }).render(document.getElementById('myGrid'));

//generatedIds = [];

//gerateUniqueId = () => {
//    let newId;
//    do {
//        const randomNumber = Math.floor(100000 + Math.random() * 900000);
//        newId = parseInt(randomNumber);
//    } while (generatedIds.includes(newId));
//        generatedIds.push(newId);
//    return newId;
//}

//$(document).ready(function () {
//    Consultar();
//    var view = new CrearCitaMedicion();
//    view.InitView();
//});

//}