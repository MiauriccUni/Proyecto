let idUsuarioID = null;
let idUsuarioID2 = null;
let infoUsuario = [];
let infoUsuario2 = [];
let infoCupon = [];
let infoCupon2 = [];
let selectedUser = null;
let selectedUser2 = null;
let idCupon = null;
let correo = null;

function UsuariosList() {
    this.InitView = function () {
        this.PopulateUsuarios();
        this.PopulateCupones();

        $('#registrarFactura').click(function () {
            var view = new UsuariosList();
            view.CrearPlan();
        });

        $('#enviarFactura').click(function () {
            var view = new UsuariosList();
            view.EnviarFactura();
        });

        $('#registrarCupon').click(function () {
            var view = new UsuariosList();
            view.RegistrarCupon();
        })

        /* Código nuevo para que al seleccionar un usuario aparezca la info */
        $('#idusuario').on('change', function () {
            idUsuarioID = $(this).val();
            selectedUser = infoUsuario.find(user => user.id == idUsuarioID);
            const cupon = infoCupon.find(c => c.idUsuario == idUsuarioID) || { nombreCupon: "Descuento no disponible", descuento: 0 };
            $('#user-info').show();
            $('#nombreCliente').val(selectedUser.nombre + ' ' + selectedUser.apellidos);
            $('#correoCliente').val(selectedUser.correo);
            $('#rolCliente').val(selectedUser.rol);
            $('#membresiaCliente').val(getMembresia(selectedUser.rol));
            $('#nombreCupon').val(cupon.nombreCupon);
            $('#descuentoCupon').val(cupon.descuento + '%');
            $('#registrarFactura').data('user', selectedUser);
            $('#registrarFactura').data('cupon', cupon);
        });

        /* Código nuevo para que al seleccionar un usuario aparezca la info para agregar cupón*/
        $('#idusuario2').on('change', function () {
            idUsuarioID2 = $(this).val();
            selectedUser2 = infoUsuario2.find(user => user.id == idUsuarioID2);
            if (!selectedUser2) {
                Swal.fire({
                    icon: 'error',
                    text: "Usuario no encontrado.",
                    title: 'Error'
                });
                return;
            }

            const cupon = infoCupon2.find(c => c.idUsuario == idUsuarioID2) || { nombreCupon: "Descuento no disponible", descuento: 0 };
            $('#user-info2').show();
            $('#nombreCliente2').val(selectedUser2.nombre + ' ' + selectedUser2.apellidos);
            $('#correoCliente2').val(selectedUser2.correo);
            $('#registrarFactura').data('user', selectedUser2);
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
            id: parseInt(selectedUser?.id),  // Asegúrate de que el id se convierta a un número entero
            planesMensuales: "valor correspondiente",  // Debes asegurarte de que este campo exista y tenga un valor
            nombrePlan: selectedUser?.rol || "Plan sin nombre",
            precioPlan: 15,
            cuponDescuentoId: 530999,
            estadoPlan: "pendiente",
            usuarioRol: selectedUser?.rol || "Rol desconocido",
            usuarioID: parseInt(selectedUser?.id) || null,
        };

        const descuentoCupon = selectedCupon ? selectedCupon.descuento : 0;
        const totalAPagar = plan.precioPlan * (1 - (descuentoCupon / 100));

        const fechaFactura = new Date();
        if (plan.usuarioRol === "Cliente1dia") {
            fechaFactura.setDate(fechaFactura.getDate() + 1);
        } else {
            fechaFactura.setMonth(fechaFactura.getMonth() + 1);
            fechaFactura.setDate(0);
        }

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
    }
    
    this.PopulateUsuarios = function () {
        $.ajax({
            url: "https://localhost:7253/api/Usuario/GetClientes",
            method: "GET",
            contentType: "application/json;charset=utf-8",
            dataType: "json"
        }).done(function (data) {
            infoUsuario = data;
            infoUsuario2 = data;
            var select = $('#idusuario');
            var select2 = $('#idusuario2');
            select.empty(); // Limpiar opciones previas
            select.append('<option value="" disabled selected>Seleccione un usuario</option>'); // Agrega la opción por defecto
            select2.empty();
            select2.append('<option value="" disabled selected>Seleccione un usuario</option>');
            // Filtrar usuarios por el rol "Cliente1dia"
            data.filter(user => user.rol === "Cliente1dia")
                .forEach(row => {
                    select.append(`<option value="${row.id}">${row.nombre} ${row.apellidos} ${row.correo} (ID: ${row.id})</option>`);
                    select2.append(`<option value="${row.id}">${row.nombre} ${row.apellidos} ${row.correo} (ID: ${row.id})</option>`);
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
            infoCupon2 = data;
            var selectCupon = $('#nombreCupon');
            selectCupon.empty(); // Limpiar opciones previas
            data.forEach(row => {
                selectCupon.append(`<option value="${row.id}">${row.NombreCupon} (${row.Descuento}%)</option>`);
            });

            // Validation function for coupon existence
            $('#validateCupon').on('click', function () {
                var enteredCuponName = $('#nombreCupon').val().trim();
                var cuponExists = data.some(cupon => cupon.NombreCupon === enteredCuponName);

                if (!cuponExists) {
                    Swal.fire({
                        title: "Lo sentimos",
                        icon: "warning",
                        text: "Ese cupón no existe."
                    });
                } else {
                    Swal.fire({
                        title: "Cupón válido",
                        icon: "success",
                        text: "El cupón existe y puede ser utilizado."
                    });
                }
            });
        }).fail(function (error) {
            Swal.fire({
                title: "Error",
                icon: "error",
                text: "Error al cargar los cupones: " + error
            });
        });
    }

    /* Código para el registro de cupón */

    this.RegistrarCupon = function () {
        const idUsuarioCupon = idUsuarioID2; // Funciona

        const nombreUsuarioCupon = selectedUser2.nombre; // Funciona
        console.log("Id Usuario" + idUsuarioCupon + "nombre" + nombreUsuarioCupon); // Funciona

        const nombreCuponRegistrar = $('#nombreCuponRegistrar').val().trim().toLowerCase(); // Funciona
        console.log("Valor ingresado en el cupón:", nombreCuponRegistrar); // Funciona
        console.log("Lista de cupones guardados:", infoCupon) // Funciona

        if (!nombreCuponRegistrar) {
            
            Swal.fire({
                icon: 'error',
                text: "Por favor complete todos los campos.",
                title: 'Error'
            });
            return;
        }

        let cuponEncontrado = false;

        for (let i = 0; i < infoCupon.length; i++) {
            let cupon = infoCupon[i]

            // Verificar si el nombre del cupón coincide (insensible a mayúsculas)
            if (cupon.NombreCupon && cupon.NombreCupon.toLowerCase() === nombreCuponRegistrar) {
                cuponEncontrado = true;
                Swal.fire({
                    title: "Cupón encontrado con éxito",
                    icon: "success",
                    text: `El cupón "${cupon.NombreCupon}" ha sido encontrado con éxito.`,
                });
                break; // Salir del bucle una vez que se encuentra el cupón
            }
        }

        if (!cuponEncontrado) {
            Swal.fire({
                title: "Lo sentimos",
                icon: "warning",
                text: "Ese cupón no existe.",
            });
        }

        const cuponDescuentoId = cuponEncontrado.id;
        const descuento = cuponEncontrado.Descuento;

        // Suponiendo que el ID del usuario se encuentra disponible
        const idUsuario = $('#nombreCupon').data('user-id'); // Ajusta para obtener el ID correcto

        class SqlOperation {
            constructor() {
                this.params = {};
            }

            ProcedureName = "";

            AddIntegerParam(name, value) {
                this.params[name] = value;
            }

            // Agregar otros métodos si es necesario
        }
        // Proceder con la actualización del cupón en la tabla planes_mensuales
        const operation = new SqlOperation();
        operation.ProcedureName = "SP_UPDATE_USUARIO_CUPON";
        operation.AddIntegerParam("cupones_descuentos_id_cupones", cuponDescuentoId);
        operation.AddIntegerParam("id_usuarios", idUsuario);

        $.ajax({
            headers: {
                'Accept': "application/json",
                'Content-Type': "application/json"
            },
            method: "PUT",
            url: "https://localhost:7253/api/PlanesMensuales/UpdateCupon", // Ajusta la URL según tu API
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            data: JSON.stringify(operation),
        }).done(function (result) {
            Swal.fire({
                title: "Éxito",
                icon: "success",
                text: "Cupón actualizado exitosamente.",
            }).then(() => {
                view.PopulateCupones(); // Volver a cargar los cupones
            });
        }).fail(function (error) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                text: "Error al actualizar el cupón.",
                title: 'Error',
            });
        });
    };

    /* Código para el envío de correo */

    this.EnviarFactura = function () {
        const selectedUsuario = $('#enviarFactura').data('user');
       /* console.log('Usuario seleccionado:', selectedUsuario); // Depuración*/

        if (!selectedUsuario) {
            Swal.fire({
                icon: 'error',
                text: "Usuario no encontrado LPM.",
                title: 'Error'
            });
            return;
        }
        const email = selectedUsuario.email;
        const row = $('.btn-factura').closest('tr');
        console.log(row.html());
        const planNombre = "Cliente 1 día";
        const precioPlan = 15; // Obtener el valor del plan
        const descuentoCupon = parseFloat(row.find('td:nth-child(2)').text().replace('%', '')) || 0; // Obtener el descuento del cupón
        const totalAPagar = precioPlan * (1 - (descuentoCupon / 100)); // Calcular el total a pagar
        console.log(email, row, planNombre, precioPlan, descuentoCupon, totalAPagar);
        
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
            Estos son nuestros métodos de pago:<br><br>
            <table border="1" cellpadding="5" cellspacing="0">
                <tr>
                    <th>Método de Pago</th>
                    <th>Detalle</th>
                    <th>Nombre</th>
                </tr>
                <tr>
                    <td>Sinpe Móvil</td>
                    <td>8888-8888</td>
                    <td>Mario Perez</td>
                </tr>
                <tr>
                    <td>Transferencia Bancaria</td>
                    <td>CR 1234567890</td>
                    <td>Rambo's Gym</td>
                </tr>
                <tr>
                    <td>PayPal</td>
                    <td>info@example.com</td>
                    <td>Rambo's Gym</td>
                </tr>
            </table>
            <br><br>
            Gracias por tu preferencia.
            `;

        const apiUrl = `https://localhost:7253/api/Email/SendEmail?correo=${email}&cuerpo=${encodeURIComponent(cuerpo)}&asunto=Factura Generada`;

        $.ajax({
            url: apiUrl,
            method: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "text",
            processData: false,
            data: JSON.stringify({}),
            headers: {
                'Content-Type': 'text/html'
            }
        }).done(function (response) {
            console.log('Respuesta del servidor:', response); // Depuración
            Swal.fire({
                icon: 'success',
                text: "Correo de factura enviado con éxito.",
                title: 'Éxito',
            });
        }).fail(function (xhr) {
            console.error('Error en la solicitud:', xhr); // Depuración
            Swal.fire({
                icon: 'error',
                text: xhr.responseText || "Error al enviar el correo.",
                title: 'Error',
            });
        });
    }

    function generateUniqueId() {
        return '_' + Math.random().toString(36).substr(2, 9);
    }

    function getMembresia(rol) {
        switch (rol) {
            case "ClientePremium":
                return "$150";
            case "ClienteStandard":
                return "$80";
            case "Cliente1dia":
                return "$15";
            default:
                return "$0";
        }
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
                    return gridjs.html(`
                        <button type="button" class="btn btn-primary btn-factura" 
                                data-plan-id="${row.cells[3].data}" 
                                data-user-id="${row.cells[0].data}" 
                                data-email="${row.cells[1].data}"
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
                    const correoUsuario = user.correo || 'No disponible'; 
                    const nombreCompleto = `${user.nombre}`;
                    const nombreCupon = cupon.nombreCupon || 'No hay cupón';
                    const precioBase = result.precioPlan || 15;
                    const descuentoCupon = cupon.descuento || 0;
                    const precioAPagar = precioBase * (1 - (descuentoCupon / 100));

                    const estadoPlan = 'pendiente';

                    return [
                        nombreCompleto,
                        correoUsuario,
                        nombreCupon,
                        `${descuentoCupon}%`,
                        `$${precioBase.toFixed(2)}`,
                        `$${precioAPagar.toFixed(2)}`,
                        estadoPlan
                    ];
                })
        },
    }).render(document.getElementById('myGrid'));

    $(document).on('click', '.btn-factura', function () {
        const userId = $(this).data('user-id');
        const email = $(this).data('email');
        const nombreCupon = $(this).data('plan-id'); // Asegúrate de que este dato es correcto
        const descuento = parseFloat($(this).closest('tr').find('td:nth-child(5)').text().replace('%', '')) || 0; // Obtener el descuento
        const precioBase = 15; // Precio base para Cliente1dia
        const precioAPagar = precioBase * (1 - (descuento / 100)); // Calcular el total a pagar

        // Verificar si el usuario ID está disponible
        if (!userId) {
            Swal.fire('Error', 'Usuario no encontrado LPM 2', 'error');
            return;
        }

        // Actualizar el contenido del modal
        $('#facturaContent').html(`
            <p><strong>Nombre:</strong> ${$(this).closest('tr').find('td:nth-child(1)').text()}</p>
            <p><strong>Correo a notificar:</strong> ${email}</p>
            <p><strong>Membresía:</strong> Cliente 1 día</p>
            <p><strong>Valor del plan:</strong> $${precioBase.toFixed(2)}</p>
            <p><strong>Descuento cupón:</strong> ${descuento}%</p>
            <p><strong>Fecha de la factura:</strong> ${new Date().toLocaleDateString()}</p>
            <p><strong>Total a pagar:</strong> $${precioAPagar.toFixed(2)}</p>
        `);

        // Configurar el usuario seleccionado para el envío de la factura
        $('#enviarFactura').data('user', { email: email });

        // Mostrar el modal
        $('#facturaModal').modal('show');
    });
    // Manejador para enviar la factura
    $('#enviarFacturaBtn').on('click', function () {
        this.EnviarFactura();
    }.bind(this));
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