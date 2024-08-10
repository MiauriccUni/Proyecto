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
        var selectedUsuario = infoUsuarios.find(usuario => usuario.nombre === idUsuariosID);
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
            url: "https://localhost:7253/api/PlanesMensuales/GetPlanesMensuales",
            method: "GET",
            contentType: "application/json;charset=utf-8",
            dataType: "json"
        }).done(function (data) {
            infoCupon = data;
            var select = $('#idcupones');
            for (var row in data) {
                select.append('<option value="' + data[row].id + '">' + data[row].NombreCupon + ', ' + data[row].Descuento + ', ' + data[row].Validez + '</option>');
            }
            select.on('change', function () {
                let id = $(this).val();
                idCuponID = id;
            });
        }).fail(function (error) {
            Swal.fire({
                title: "Error",
                icon: "error",
                text: "Error al cargar las rutinas" + error
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
        columns: ['Cupón', 'Valor %', 'Cupón Validez', 'Nombre Plan', 'Precio Plan', 'Estado Plan','Usuario', 'Rol'],
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