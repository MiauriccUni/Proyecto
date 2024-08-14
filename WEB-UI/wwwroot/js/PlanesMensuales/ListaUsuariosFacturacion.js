let idUsuarioID = null;
let infoUsuario = [];
let infoCupon = [];
let selectedUser = null;
let idCupon = 503999;

function UsuariosList() {
    this.InitView = function () {
        this.PopulateUsuarios();
        this.PopulateCupones();

        $('#registrarFactura').click(function () {
            var view = new UsuariosList();
            view.CrearPlan();
        });

        /* Código nuevo para que al seleccionar un usuario aparezca la info */
        $('#idusuario').on('change', function () {
            idUsuarioID = $(this).val();
            selectedUser = infoUsuario.find(user => user.id == idUsuarioID);
            const cupon = infoCupon.find(c => c.idUsuario == idUsuarioID) || { nombreCupon: "Descuento no disponible", descuento: 0 };
            $('#user-info').show();
            $('#nombreCliente').val(selectedUser.nombre + ' ' + selectedUser.apellidos);
            $('#rolCliente').val(selectedUser.rol);
            $('#membresiaCliente').val(getMembresia(selectedUser.rol));
            $('#nombreCupon').val(cupon.nombreCupon);
            $('#descuentoCupon').val(cupon.descuento + '%');
            $('#registrarFactura').data('user', selectedUser);
            $('#registrarFactura').data('cupon', cupon);
        });

    }

    

    this.CrearPlan = function () {
        if (!idUsuarioID || !selectedUser) {
            Swal.fire({
                icon: 'error',
                text: "Por favor seleccione un usuario.",
                title: 'Error'
            });
            return;
        }

        // Usa el valor de idCupon extraído de la selección del usuario
        const selectedCupon = infoCupon.find(cupon => cupon.id === parseInt(idCupon)) || { nombreCupon: "Descuento no disponible", descuento: 0 };

        let plan = {
            id: parseInt(generateUniqueId()),
            usuarioRol: selectedUser?.rol || "Rol desconocido",
            precioPlan: 0,
            idCupon: idCupon,
            estadoPlan: "pendiente",
            idUsuario: parseInt(selectedUser?.id) || null,
            NombrePlan: selectedUser?.rol || "Plan sin nombre"
        };

        switch (plan.usuarioRol) {
            case "ClientePremium":
                plan.precioPlan = 150;
                break;
            case "ClienteStandard":
                plan.precioPlan = 80;
                break;
            case "Cliente1dia":
                plan.precioPlan = 15;
                break;
            default:
                plan.precioPlan = 0; // Si el rol no coincide, se establece un valor por defecto
                break;
        }

        console.log(plan);
        // Validación adicional del plan
        if (!plan.usuarioRol || plan.precioPlan === 0 || !plan.idUsuario) {
            Swal.fire({
                icon: 'error',
                text: "Datos del plan incompletos.",
                title: 'Error'
            });
            return;
        }

        const descuentoCupon = selectedCupon ? selectedCupon.descuento : 0;
        const totalAPagar = plan.precioPlan * (1 - (descuentoCupon / 100));

        const fechaFactura = new Date();
        if (plan.usuarioRol === "Cliente1dia") {
            fechaFactura.setDate(fechaFactura.getDate() + 1);
        } else {
            fechaFactura.setMonth(fechaFactura.getMonth() + 1);
            fechaFactura.setDate(0);
        }

        const factura = `
        <h3>Factura</h3>
        <p><strong>Plan del cliente:</strong> ${plan.usuarioRol}</p>
        <p><strong>Valor del plan:</strong> $${plan.precioPlan}</p>
        <p><strong>Descuento cupón:</strong> ${descuentoCupon}%</p>
        <p><strong>Fecha de la factura:</strong> ${fechaFactura.toLocaleDateString()}</p>
        <p><strong>Total a pagar:</strong> $${totalAPagar.toFixed(2)}</p>`;
        $('#facturaContent').html(factura);
        $('#facturaModal').modal('show');

        Swal.fire({
            title: 'Factura Generada',
            html: factura,
            icon: 'success'
        });

    }
    
    this.PopulateUsuarios = function () {
        $.ajax({
            url: "https://apirambosgym-emercdd0c8dbe0fq.eastus-01.azurewebsites.net/api/Usuario/GetClientes",
            method: "GET",
            contentType: "application/json;charset=utf-8",
            dataType: "json"
        }).done(function (data) {
            infoUsuario = data;
            var select = $('#idusuario');
            select.empty(); // Limpiar opciones previas
            data.forEach(row => {
                select.append(`<option value="${row.id}">${row.nombre} ${row.apellidos} ${row.rol} ${row.correo} (ID: ${row.id})</option>`);
            });
        }).fail(function (error) {
            Swal.fire({
                title: "Error",
                icon: "error",
                text: "Error al cargar los clientes: " + error
            });
        });
    }

    this.PopulateCupones = function () {
        $.ajax({
            url: "https://apirambosgym-emercdd0c8dbe0fq.eastus-01.azurewebsites.net/api/Cupones/GetCupones",
            method: "GET",
            contentType: "application/json;charset=utf-8",
            dataType: "json"
        }).done(function (data) {
            infoCupon = data;
            var select = $('#idcupones');
            select.empty(); // Limpiar opciones previas
            data.forEach(row => {
                select.append(`<option value="${row.id}">${row.NombreCupon} (${row.Descuento}%)</option>`);
            });
        }).fail(function (error) {
            Swal.fire({
                title: "Error",
                icon: "error",
                text: "Error al cargar los cupones: " + error
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
            },
            pagination: {
                previous: 'Anterior',
                next: 'Siguiente',
                showing: 'Mostrando',
                results: () => 'resultados',
                to: 'a',
                of: 'de',
            }
        },
        columns: ['Nombre', 'Apellido', 'Rol', 'Membresía', 'Cupón' , 'Nombre Cupón'],
        server: {
            url: 'https://apirambosgym-emercdd0c8dbe0fq.eastus-01.azurewebsites.net/api/Usuario/GetAllUsuarios',
            then: data => data.data
                .filter(result => ["ClienteStandard", "ClientePremium", "Cliente1dia"].includes(result.rol))
                .map(result => [
                    result.nombre,
                    result.apellidos,
                    formatRole(result.rol),
                    getMembresia(result.rol),
                    idCupon,
                    getCuponDescuento(result.id)
                ])
        },
    }).render(document.getElementById('myGridClientesGuardados'));
}

function Consultar2() {
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
            },
            pagination: {
                previous: 'Anterior',
                next: 'Siguiente',
                showing: 'Mostrando',
                results: () => 'resultados',
                to: 'a',
                of: 'de',
            }
        },
        columns: [
            'Cupón', 'Desc %', 'Plan', 'Precio', 'Estado', 'Usuario', 'Rol',
            {
                name: 'Factura',
                formatter: (cell, row) => {
                    return gridjs.html(`<button type="button" class="btn btn-primary btn-factura" data-plan-id="${row.cells[3].data}" data-bs-toggle="modal" data-bs-target="#facturaModal">Factura</button>`);
                }
            }
        ],
        server: {
            url: 'https://apirambosgym-emercdd0c8dbe0fq.eastus-01.azurewebsites.net/api/PlanesMensuales/GetAllPlanesMensuales',
            then: data => data.data.map(result => [
                result.plan.nombreCupon,
                `${result.descuentoCupon}%`,
                result.plan.nombrePlan,
                `$${result.plan.precioPlan}`,
                result.plan.estadoPlan,
                result.plan.nombreUsuario,
                formatRole(result.plan.usuarioRol) // Asumiendo que esta función existe
            ])
        },
    }).render(document.getElementById('myGrid'));
}
function formatRole(role) {
    if (role === "ClienteStandard") return "Cliente Standard";
    if (role === "ClientePremium") return "Cliente Premium";
    if (role === "Cliente1dia") return "Cliente 1 Día";
    return "Desconocido";
}

function getMembresia(role) {
    if (role === "ClienteStandard") return "$80";
    if (role === "ClientePremium") return "$150";
    if (role === "Cliente1dia") return "$15";
    return "Desconocido";
}

function getCuponDescuento(idUsuario) {
    const cupon = infoCupon.find(c => c.idUsuario == idUsuario);
    if (!cupon) return "Descuento no disponible";
    return `${cupon.NombreCupon} (${cupon.Descuento}%)`;
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
    let view = new UsuariosList();
    view.InitView();
    Consultar();
    Consultar2();
});