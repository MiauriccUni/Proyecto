function CrearFactura() {

    this.InitView = function () {
        $('#registroFactura').click(function (event) {
            var view = new CrearFactura();
            view.SubmitFactura();
        });
    }

    this.SubmitFactura = function () {

        var facturas = {}
        facturas.id = generateUniqueId();
        facturas.numeroFactura = $('#numeroFactura').val();
        facturas.fechaPago = $('#fechaFactura').val();
        facturas.descuento = $('#descuento').val();
        facturas.montoFinal = $('#montoPagado').val();

        if (citas.numeroFactura === "") {
            Swal.fire({
                icon: 'error',
                text: "Por favor el número de la factura.",
                title: ''
            });
            return;
        }

        if (facturas.fecha === "") {
            Swal.fire({
                icon: 'error',
                text: "Por favor indique el día de la factura.",
                title: ''
            });
            return;
        }

        if (citas.descuento === "") {
            Swal.fire({
                icon: 'error',
                text: "Por favor indique si tiene descuento.",
                title: ''
            });
            return;
        }

        if (citas.montoFinal === "") {
            Swal.fire({
                icon: 'error',
                text: "Por favor ingresar el monto final.",
                title: ''
            });
            return;
        }

        $.ajax({
            headers: {
                'Accept': "application/json",
                'Content-Type': "application/json"
            },
            method: "POST",
            url: "https://apirambosgym-emercdd0c8dbe0fq.eastus-01.azurewebsites.net/api/Factura/CrearFactura",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            data: JSON.stringify(citas),
            hasContent: true
        }).done(function (result) {
            Swal.fire({
                title: "Éxito",
                icon: "success",
                text: "Se ha completado el registro",
            });
        }).fail(function (error) {
            Swal.fire({
                icon: 'error',
                text: "Error al registrarse",
                title: '',
            });
        });
    }

}

function Consultar() {
    const grid = new gridjs.Grid({
        search: true,
        sort: true,
        resizable: true,
        pagination: {
            limit: 5
        },
        language: {
            search: {
                placeholder: 'Buscar'
            }
        },
        columns: ['ID', 'Número Factura', 'Fecha', 'Descuento', 'Monto Final'],
        server: {
            url: 'https://apirambosgym-emercdd0c8dbe0fq.eastus-01.azurewebsites.net/api/Factura/GetAllFacturas',
            then: data => data.data.map(result => [
                result.id,
                result.numeroFactura,
                result.fechaPago,
                result.descuento,
                result.montoFinal])
        },
    }).render(document.getElementById('myGrid'));

generatedIds = [];

gerateUniqueId = () => {
    let newId;
    do {
        const randomNumber = Math.floor(100000 + Math.random() * 900000);
        newId = parseInt(randomNumber);
    } while (generatedIds.includes(newId));
        generatedIds.push(newId);
    return newId;
}

$(document).ready(function () {
    Consultar();
    var view = new CrearFactura();
    view.InitView();
});

}