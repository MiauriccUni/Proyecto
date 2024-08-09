
idEntrenador = null;
infoEntrenador = [];
idCitas = null;
infoCitas = [];

function AsignacionCita(){

    this.InitView = function () {
        this.PopulateEntrenadores();
        this.PopulateCitas();
        $('#AsigCita').click(function (event) {
            var view = new AsignacionCita();
            view.SubmitAsignacion();
        });
    }

    this.SubmitAsignacion = function () {
        var asignaciones = {}
        asignaciones.id = generateUniqueId();
        asignaciones.idCita = idCitas;
        asignaciones.idEntrenador = idEntrenador;

        if (asignaciones.idCita === "") {
            Swal.fire({
                icon: 'error',
                text: "Por favor elija una cita.",
                title: 'Error'
            });
            return;
        }

        if (asignaciones.idEntrenador === "") {
            Swal.fire({
                icon: 'error',
                text: "Por favor elija un entrenador.",
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
            url: "https://localhost:7253/api/AsignacionCita/CrearAsignacion",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            data: JSON.stringify(asignaciones),
            hasContent: true
        }).done(function (result) {
            Swal.fire({
                title: "Éxito",
                icon: "success",
                text: "Se ha completado el registro",
            }).then(function () {
                var view = new AsignacionCita();
                view.Listar();
                setTimeout(() => {
                    location.reload();
                }, 1000);
            });
        }).fail(function (error) {
            Swal.fire({
                icon: 'error',
                text: "Error al registrarse",
                title: 'Error',
            });
        });
    }
    
    this.PopulateCitas = function () {
        $.ajax({
            url: "https://localhost:7253/api/CitasMedicion/GetUsuarios",
            method: "GET",
            contentType: "application/json;charset=utf-8",
            dataType: "json"
        }).done(function (data) {
            infoCitas = data;
            var select = $('#idcita');
            for (var i = 0; i < data.length; i++) {
                var usuario = data[i].usuariosList[0];
                select.append('<option value=' + data[i].id + '>' + data[i].id + ' - ' + usuario.nombre + ' (' + usuario.correo + ')</option>');
            }
            select.on('change', function () {
                let id = $(this).val();
                idCitas = id;
            });
        }).fail(function (error) {
            Swal.fire({
                title: "Error",
                icon: "error",
                text: "Error al cargar las ID citas" + error
            });
            console.log(error);
        });
    }

    this.PopulateEntrenadores = function () {
        $.ajax({
            url: "https://localhost:7253/api/Usuario/GetEntrenadores",
            method: "GET",
            contentType: "application/json;charset=utf-8",
            dataType: "json"
        }).done(function (data) {
            infoEntrenador = data;
            var select = $('#idEntrenador');
            for (var row in data) {
                select.append('<option value=' + data[row].id + '>' + data[row].nombre + ', ' + data[row].correo)
            }
            select.on('change', function () {
                let id = $(this).val();
                idEntrenador = id;
            });
        }).fail(function (error) {
            Swal.fire({
                title: "Error",
                icon: "error",
                text: "Error al cargar los Entrenadores" + error
            });
        });
    }

    this.Listar = function () {
        ConsultarAsignacion();
    }
}

function ConsultarAsignacion() {
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
        columns: ['id', 'Entrenador', 'Correo entrenador', 'Fecha'],
        server: {
            url: 'https://localhost:7253/api/AsignacionCita/GetAllAsignaciones',
            then: data => data.data.map(result => [
                result.id,
                result.usuarioLis[0].nombre,
                result.usuarioLis[0].correo,
                result.citasMedicionesList[0].fecha,
            ])
        },
    }).render(document.getElementById('myGrid2'));
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
    ConsultarAsignacion();
    var view = new AsignacionCita();
    view.InitView();
});