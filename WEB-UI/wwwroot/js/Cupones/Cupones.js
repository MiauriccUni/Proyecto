function CuponesList() {

    this.InitView = function () {
        $('#registroCupon').click(function () {
            var view = new CuponesList();
            view.RegistroCupon();
        });
    }

    this.RegistroCupon = function () {
        var cupon = {}
        cupon.id = generateUniqueId();
        cupon.nombreCupon = $('#nombre').val();
        cupon.numeroDescuento = $('#Descuentoselect').find(":selected").val();

        if (cupon.nombreCupon == "") {
            Swal.fire({
                icon: 'error',
                text: "Por favor indique el nombre del cupón.",
                title: 'Error'
            });
            return;
        }

        $.ajax({
            headers: {
                'Accept': "application/json",
                'Content-Type': "application/json"
            },
            method: "POST",
            url: api + "/api/Cupones/CrearCupones",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            data: JSON.stringify(cupon),
            hasContent: true
        }).done(function (result) {
            Swal.fire({
                title: "Éxito",
                icon: "success",
                text: "Se ha completado el registro",
            })
        }).fail(function (error) {
            Swal.fire({
                icon: 'error',
                text: "Error al registrar el cupón",
                title: 'Error',
            });
        })

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
        columns: ['Nombre', 'Valor Descuento %'],
        server: {
            url: 'https://localhost:7253/api/Cupones/GetAllCupones',
            then: data => data.data.map(result => [result.nombreCupon])
        },
    }).render(document.getElementById('myGrid'));
}

generatedIds = [];

generateUniqueId = () => {
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
    var view = new CuponesList();
    view.InitView();
});
