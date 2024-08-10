idUsuariosID = null;
infoUsuarios = [];
idCuponID = null;
infoCupon = [];

function CrearPlanMensual() {
    this.InitView = function () {
        this.PopulateUsuarios2();
        this.PopulateCupones();
        $('#citaPlanMensual').click(function (event) {
            var view = new CrearPlanMensual();
            view.ActualizarPlan();
        });
    }

    this.ActualizarPlan = function () {
        var plan = {}
        plan.id = generateUniqueId();
        plan.estadoPlan = $('#planSelect').val();

        if (plan.estadoPlan === "") {
            Swal.fire({
                icon: 'error',
                text: "Por favor indique un estado.",
                title: 'Error'
            });
            return;
        }

        // Obtener el rol del usuario seleccionado
        var selectedUsuario = infoUsuarios.find(usuario => usuario.id === idUsuariosID);
        if (!selectedUsuario) {
            Swal.fire({
                icon: 'error',
                text: "Usuario no encontrado.",
                title: 'Error'
            });
            return;
        }

        // Asignar precio según el rol del usuario
        switch (selectedUsuario.rol) {
            case 'ClientePremium':
                plan.precioPlan = 150;
                plan.nombrePlan = 'Premium';
                break;
            case 'ClienteStandard':
                plan.precioPlan = 80;
                plan.nombrePlan = 'Standard';
                break;
            case 'Cliente1dia':
                plan.precioPlan = 15;
                plan.nombrePlan = 'Cliente 1 día';
                break;
            default:
                plan.precioPlan = 0; // En caso de que el rol no coincida
                plan.nombrePlan = 'Desconocido';
                Swal.fire({
                    icon: 'error',
                    text: "Rol del usuario no reconocido.",
                    title: 'Error'
                });
                return;
        }

        // Obtener el descuento del cupón seleccionado
        var selectedCupon = infoCupon.find(cupon => cupon.id === idCuponID);
        var descuentoCupon = selectedCupon ? selectedCupon.Descuento : 0;

        // Calcular el total a pagar
        var totalAPagar = plan.precioPlan * (1 - (descuentoCupon / 100));

        // Generar factura
        var fechaFactura = new Date();
        fechaFactura.setMonth(fechaFactura.getMonth() + 1);
        fechaFactura.setDate(0); // Fin de mes

        var factura = `
        <h3>Factura</h3>
        <p><strong>Plan del cliente:</strong> ${plan.nombrePlan}</p>
        <p><strong>Valor del plan:</strong> $${plan.precioPlan}</p>
        <p><strong>Descuento cupón:</strong> ${descuentoCupon}%</p>
        <p><strong>Fecha de la factura:</strong> ${fechaFactura.toLocaleDateString()}</p>
        <p><strong>Total a pagar:</strong> $${totalAPagar.toFixed(2)}</p>`;
        $('#facturaContent').html(factura);
        $('#facturaModal').modal('show');

        // Mostrar factura al usuario
        Swal.fire({
            title: 'Factura Generada',
            html: factura,
            icon: 'success'
        });

        $.ajax({
            headers: {
                'Accept': "application/json",
                'Content-Type': "application/json"
            },
            method: "POST",
            url: "https://localhost:7253/api/PlanesMensuales/CrearPlanesMensuales",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            data: JSON.stringify(plan),
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
                title: 'Error',
            });
        });
    }

    this.PopulateUsuarios2 = function () {
        $.ajax({
            url: "https://localhost:7253/api/Usuario/GetClientes",
            method: "GET",
            contentType: "application/json;charset=utf-8",
            dataType: "json"
        }).done(function (data) {
            infoUsuarios = data;
            var select = $('#idusuario');
            for (var row in data) {
                select.append('<option value="' + data[row].id + '">' + data[row].nombre + ' (' + data[row].rol + ')</option>');
            }
            select.on('change', function () {
                let id = $(this).val();
                idUsuariosID = id;
            });
        }).fail(function (error) {
            Swal.fire({
                title: "Error",
                icon: "error",
                text: "Error al cargar los usuarios" + error
            });
        });
    }

    this.PopulateCupones = function () {
        $.ajax({
            url: "https://localhost:7253/api/Cupones/GetCupones",
            method: "GET",
            contentType: "application/json;charset=utf-8",
            dataType: "json"
        }).done(function (data) {
            infoCupon = data;
            var select = $('#idcupones');
            for (var row in data) {
                select.append('<option value="' + data[row].id + '">' + data[row].NombreCupon + ', ' + data[row].Descuento + ', ' + data[row].validez + '</option>');
            }
            select.on('change', function () {
                let id = $(this).val();
                idCuponID = id;
            });
        }).fail(function (error) {
            Swal.fire({
                title: "Error",
                icon: "error",
                text: "Error al cargar los cupones" + error
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
        columns: [
            'Cupón', 'Desc %', 'Validez', 'Plan', 'Precio', 'Estado', 'Usuario', 'Rol', 
            {
                name: 'Factura',
                formatter: (cell, row) => {
                    return gridjs.html(`<button type="button" class="btn btn-primary btn-factura" data-plan-id="${row.cells[3].data}" data-bs-toggle="modal" data-bs-target="#facturaModal">Factura</button>`);
                }
            }
        ],
        server: {
            url: 'https://localhost:7253/api/PlanesMensuales/GetAllPlanesMensuales',
            then: data => data.data.map(result => [
                result.cuponesList[0]?.nombreCupon || 'No disponible',
                result.cuponesList[0]?.descuento || 'No disponible',
                result.cuponesList[0]?.validez.split('T')[0] || 'No disponible',
                result.nombrePlan,
                result.precioPlan,
                result.estadoPlan,
                result.usuariosList[0].nombre,
                result.usuariosList[0].rol,
            ])
        },
    }).render(document.getElementById('myGrid'));

    // Manejar el evento click en los botones "Factura"
    $(document).on('click', '.btn-factura', function () {
        const row = $(this).closest('tr');
        const planNombre = row.find('td:nth-child(4)').text(); // Obtener el nombre del plan
        const precioPlan = parseFloat(row.find('td:nth-child(5)').text().replace('$', '')); // Obtener el valor del plan
        const descuentoCupon = parseFloat(row.find('td:nth-child(2)').text()) || 0; // Obtener el descuento del cupón
        const totalAPagar = precioPlan * (1 - (descuentoCupon / 100)); // Calcular el total a pagar

        $('#facturaContent').html(`
        <h3>Factura</h3>
        <p><strong>Plan del cliente:</strong> ${planNombre}</p>
        <p><strong>Valor del plan:</strong> $${precioPlan.toFixed(2)}</p>
        <p><strong>Descuento cupón:</strong> ${descuentoCupon}%</p>
        <p><strong>Fecha de la factura:</strong> ${new Date().toLocaleDateString()}</p>
        <p><strong>Total a pagar:</strong> $${totalAPagar.toFixed(2)}</p>
    `);
    });
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
    var view = new CrearPlanMensual();
    view.InitView();
});