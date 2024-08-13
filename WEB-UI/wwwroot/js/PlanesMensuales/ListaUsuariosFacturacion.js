let idUsuarioID = null;
let infoUsuario = [];
let infoCupon = [];
let selectedUser = null;
let idCupon = null;

function UsuariosList() {
    this.InitView = function () {
        this.PopulateUsuarios();
        this.PopulateCupones();

        $('#registrarFactura').click(function () {
            var view = new UsuariosList();
            view.CrearPlan();
        });

        $('#enviarFactura').click(function () {
            var view = new CrearPlanMensual();
            view.EnviarFactura();
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
            id: generateUniqueId(),
            nombrePlan: selectedUser?.rol || "Plan sin nombre",
            precioPlan: 0,
            cuponDescuentoId: 530999,
            estadoPlan: "pendiente",
            usuarioRol: selectedUser?.rol || "Rol desconocido",
            usuarioID: parseInt(selectedUser?.id) || null,
            
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

        const descuentoCupon = selectedCupon ? selectedCupon.descuento : 0;
        const totalAPagar = plan.precioPlan * (1 - (descuentoCupon / 100));

        const fechaFactura = new Date();
        if (plan.usuarioRol === "Cliente1dia") {
            fechaFactura.setDate(fechaFactura.getDate() + 1);
        } else {
            fechaFactura.setMonth(fechaFactura.getMonth() + 1);
            fechaFactura.setDate(0);
        }

        //const factura = `
        //<h3>Factura</h3>
        //<p><strong>Plan del cliente:</strong> ${plan.usuarioRol}</p>
        //<p><strong>Valor del plan:</strong> $${plan.precioPlan}</p>
        //<p><strong>Descuento cupón:</strong> ${descuentoCupon}%</p>
        //<p><strong>Fecha de la factura:</strong> ${fechaFactura.toLocaleDateString()}</p>
        //<p><strong>Total a pagar:</strong> $${totalAPagar.toFixed(2)}</p>`;
        //$('#facturaContent').html(factura);
        //$('#facturaModal').modal('show');

        //Swal.fire({
        //    title: 'Factura Generada',
        //    html: factura,
        //    icon: 'success'
        //});

        $.ajax({
            headers: {
                'Accept': "application/json",
                'Content-Type': "application/json"
            },
            method: "POST",
            url: "https://localhost:7253/api/PlanesMensuales/CrearPlanesMensuales",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            data: JSON.stringify(plan), // Asegúrate de que el objeto 'plan' contiene todas las propiedades necesarias
        }).done(function (result) {
            Swal.fire({
                title: "Éxito",
                icon: "success",
                text: "Se ha completado el registro",
            }).then(() => {
                // Volver a consultar y actualizar la tabla
                Consultar();
                // Recargar la página después de actualizar la tabla
                setTimeout(() => {
                    location.reload();
                }, 1000); // Esperar 1 segundo antes de recargar la página
            });
            /*console.log("Factura registrada:", plan);*/
        }).fail(function (error) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                text: "Error al registrarse",
                title: 'Error',
            });
        });
        /*console.log("Factura registrada:", plan);*/
    }
    
    this.PopulateUsuarios = function () {
        $.ajax({
            url: "https://localhost:7253/api/Usuario/GetClientes",
            method: "GET",
            contentType: "application/json;charset=utf-8",
            dataType: "json"
        }).done(function (data) {
            infoUsuario = data;
            var select = $('#idusuario');
            select.empty(); // Limpiar opciones previas
            select.append('<option value="" disabled selected>Seleccione un usuario</option>'); // Agrega la opción por defecto
            // Filtrar usuarios por el rol "Cliente1dia"
            data.filter(user => user.rol === "Cliente1dia")
                .forEach(row => {
                    select.append(`<option value="${row.id}">${row.nombre} ${row.apellidos} ${row.correo} (ID: ${row.id})</option>`);
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
            url: "https://localhost:7253/api/Cupones/GetCupones",
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

    /* Código para el envío de correo */

    this.EnviarFactura = function () {
        const selectedUsuario = $('#enviarFactura').data('user');
        if (!selectedUsuario) {
            Swal.fire({
                icon: 'error',
                text: "Usuario no encontrado.",
                title: 'Error'
            });
            return;
        }
        const email = selectedUsuario.email;
        const row = $('.btn-factura').closest('tr');
        const planNombre = row.find('td:nth-child(3)').text(); // Obtener el nombre del plan
        const precioPlan = parseFloat(row.find('td:nth-child(4)').text().replace('$', '')); // Obtener el valor del plan
        const descuentoCupon = parseFloat(row.find('td:nth-child(2)').text()) || 0; // Obtener el descuento del cupón
        const totalAPagar = precioPlan * (1 - (descuentoCupon / 100)); // Calcular el total a pagar

        const facturaHtml = `
            <h3>Factura</h3>
            <p><strong>Plan del cliente:</strong> ${planNombre}</p>
            <p><strong>Valor del plan:</strong> $${precioPlan.toFixed(2)}</p>
            <p><strong>Descuento cupón:</strong> ${descuentoCupon}%</p>
            <p><strong>Fecha de la factura:</strong> ${new Date().toLocaleDateString()}</p>
            <p><strong>Total a pagar:</strong> $${totalAPagar.toFixed(2)}</p>`;

        const cuerpo = `
            Hola,<br><br>
            Rambo's Gym te informa que tu factura por $${totalAPagar.toFixed(2)} se encuentra disponible para pago.<br><br>
            ${facturaHtml}<br><br>
            Gracias por elegir nuestro gimnasio.`;

        const apiUrl = `https://localhost:7253/api/Email/SendEmail?correo=${email}&cuerpo=${encodeURIComponent(cuerpo)}&asunto=Factura Generada`;

        $.ajax({
            url: apiUrl,
            method: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            processData: false,
            data: JSON.stringify({}),
            headers: {
                'Content-Type': 'text/html'
            }
        }).done(function () {
            Swal.fire({
                icon: 'success',
                text: "Correo de factura enviado con éxito.",
                title: 'Éxito',
            });
        }).fail(function (xhr) {
            Swal.fire({
                icon: 'error',
                text: xhr.responseText || "Error al enviar el correo.",
                title: 'Error',
            });
        });
    };

    /* Fin para el envío de correo */
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
        columns: ['Nombre', 'Rol', 'Membresía', 'Correo', 'Cupón' , 'Nombre Cupón'],
        server: {
            url: 'https://localhost:7253/api/Usuario/GetAllUsuarios',
            then: data => data.data
                .filter(result => ["Cliente1dia"].includes(result.rol))
                .map(result => {
                    const cupon = infoCupon.find(c => c.idUsuario == result.id);
                    return [
                        result.nombre + ' ' + result.apellidos,
                        formatRole(result.rol),
                        getMembresia(result.rol),
                        result.correo,
                        cupon ? `${cupon.descuento}%` : '0%',
                        cupon ? cupon.nombreCupon : 'No hay cupón'
                    ];
                })
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
            'Cliente', 'Correo','Cupón' ,'Desc %', 'Precio plan', 'Precio a pagar', 'Estado',
            {
                name: 'Factura',
                formatter: (cell, row) => {
                    return gridjs.html(`<button type="button" class="btn btn-primary btn-factura" 
                            data-plan-id="${row.cells[3].data}" 
                            data-user-id="${row.cells[0].data}" 
                            ata-email="${row.cells[1].data}"
                            data-bs-toggle="modal" 
                            data-bs-target="#facturaModal">Factura
                        </button>
                    `);
                }
            }
        ],
        server: {
            url: 'https://localhost:7253/api/PlanesMensuales/GetAllPlanesMensuales',
            then: data => data.data
                .filter(result => result.usuariosList[0].rol === "Cliente1dia")

                .map(result => {
                    const user = result.usuariosList[0];
                    const cupon = result.cuponesList[0];

                    const nombreCompleto = `${user.nombre}`;
                    const nombreCupon = cupon.nombreCupon || 'No hay cupón';
                    const descuentoCupon = cupon.descuento || 0;
                    const precioBase = result.precioPlan || 15;
                    const precioAPagar = precioBase * (1 - (descuentoCupon / 100));

                    const estadoPlan = 'pendiente';

                    return [
                        nombreCompleto,
                        user.email || 'No disponible',
                        nombreCupon,
                        `$${precioBase.toFixed(2)}`,
                        `${descuentoCupon}%`,
                        `$${precioAPagar.toFixed(2)}`,
                        estadoPlan
                    ];
                })
        },
    }).render(document.getElementById('myGrid'));

    // Manejar el evento click en los botones "Generar Factura"
    $(document).on('click', '.btn-factura', function () {
        const email = $(this).data('email');
        const row = $(this).closest('tr');
        const nombre = row.find('td:nth-child(1)').text(); // Obtener el nombre
        const descuento = parseFloat(row.find('td:nth-child(5)').text().replace('%', '')) || 0; // Obtener el descuento
        const nombreCupon = row.find('td:nth-child(6)').text(); // Obtener el nombre del cupón

        const precioBase = 15; // Precio base para Cliente1dia
        const precioAPagar = precioBase * (1 - (descuento / 100)); // Calcular el total a pagar

        $('#facturaContent').html(`
            <h3>Factura</h3>
            <p><strong>Nombre:</strong> ${nombre}</p>
            <p><strong>Correo a notificar:</strong> ${email}</p>
            <p><strong>Membresía:</strong> Cliente 1 día</p>
            <p><strong>Valor del plan:</strong> $ ${precioBase.toFixed(2)}</p>
            <p><strong>Descuento cupón:</strong> ${descuento}%</p>
            <p><strong>Fecha de la factura:</strong> ${new Date().toLocaleDateString()}</p>
            <p><strong>Total a pagar:</strong> $ ${precioAPagar.toFixed(2)}</p>
        `);
        console.log()
    });
}

function getMembresia(rol) {
    switch (rol) {
        case 'ClientePremium':
            return 'Premium';
        case 'ClienteStandard':
            return 'Standard';
        case 'Cliente1dia':
            return 'Diario';
        default:
            return 'Sin membresía';
    }
}

function generateUniqueId() {
    return 'xxxxxxxxyxxxxxx'.replace(/[x]/g, function () {
        return (Math.random() * 16 | 0).toString(16);
    });
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
    if (!cupon) {
        return "Descuento no disponible"; // Si no se encuentra el cupón, devuelve un mensaje por defecto.
    }
    return `${cupon.nombreCupon} (${cupon.descuento}%)`;
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