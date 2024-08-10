idUsuariosID = null;
infoUsuarios = [];
idCuponesID = null;
infoCupones = [];
function CuponesList() {
    this.InitView = function () {
        $('#registroCupon').click(() => {
            var view = new CuponesList();
            this.RegistroCupon();
        });
    }

    this.RegistroCupon = function () {
        var cupon = {};
        cupon.id = generateUniqueId();
        cupon.nombreCupon = $('#nombreCupon').val();
        cupon.descuento = $('#Descuentoselect').val();
        cupon.validez = $('#validez').val();

        if (cupon.nombreCupon === "") {
            Swal.fire({
                icon: 'error',
                text: "Por favor indique el nombre del cupón.",
                title: ''
            });
            return;
        }

        if (cupon.descuento === "") {
            Swal.fire({
                icon: 'error',
                text: "Por favor indique el valor del cupón.",
                title: ''
            });
            return;
        }

        if (cupon.validez === "") {
            Swal.fire({
                icon: 'error',
                text: "Por favor indique la fecha de validez del cupón.",
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
            url: api + "/api/Cupones/CrearCupones",
            dataType: "json",
            data: JSON.stringify(cupon)
        }).done(function () {
            Swal.fire({
                title: "Éxito",
                icon: "success",
                text: "Se ha completado el registro"
            }).then(() => {
                // Volver a consultar y actualizar la tabla
                Consultar();
                // Recargar la página después de actualizar la tabla
                setTimeout(() => {
                    location.reload();
                }, 1000); // Esperar 1 segundo antes de recargar la página
            });
        }).fail(function () {
            Swal.fire({
                icon: 'error',
                text: "Error al registrar el cupón",
                title: ''
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
        columns: ['Nombre', 'Valor Descuento %', 'Fecha de Validez'],
        server: {
            url: 'https://localhost:7253/api/Cupones/GetAllCupones',
            then: data => data.data.map(result => [
                result.nombreCupon,
                result.descuento,
                new Date(result.validez).toLocaleDateString(),
            ])
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
    // Obtener la fecha actual en formato YYYY-MM-DD
    var today = new Date().toISOString().split('T')[0];

    // Establecer la fecha mínima en el campo de entrada
    $('#validez').attr('min', today);

    Consultar();
    var view = new CuponesList();
    view.InitView();
});

