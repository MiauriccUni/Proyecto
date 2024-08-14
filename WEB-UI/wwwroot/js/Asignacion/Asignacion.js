
idEntrenador = null;
infoEntrenador = [];
idCitas = null;
infoCitas = [];

emailG = null;
fechas = null;

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
            url: "https://apirambosgym-emercdd0c8dbe0fq.eastus-01.azurewebsites.net/api/AsignacionCita/GetAsignacionCita",
            method: "GET",
            contentType: "application/json;charset=utf-8",
            dataType: "json"
        }).done(function (result) {
            var datos = result[0];            

            let opcion = "si";

            result.forEach((obj, index) => {
                if (obj.usuarioLis[0].correo === emailG && obj.citasMedicionesList[0].fecha === fechas) {
                    opcion = "no";
                } else if (!result) {
                    opcion = "si";
                }
            });

            switch (opcion) {
                case "si":
                    console.log("si registra");
                    $.ajax({
                        headers: {
                            'Accept': "application/json",
                            'Content-Type': "application/json"
                        },
                        method: "POST",
                        url: "https://apirambosgym-emercdd0c8dbe0fq.eastus-01.azurewebsites.net/api/AsignacionCita/CrearAsignacion",
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
                    break;
                case "no":
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "Debe seleccionar un entrenador disponible en el horario seleccionado"
                    })
                    break;
                default:
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "No se logro identificar el Usuario"
                    })
            }
        }).fail(function (error) {
            console.log(error);
        });                
    }
    
    this.PopulateCitas = function () {
        $.ajax({
            url: "https://apirambosgym-emercdd0c8dbe0fq.eastus-01.azurewebsites.net/api/CitasMedicion/GetUsuarios",
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
                let fecha = data.find(item => item.id === parseInt(id))?.fecha;
                fechas = fecha;
                idCitas = id;
            });
        }).fail(function (error) {
            Swal.fire({
                title: "Error",
                icon: "error",
                text: "Error al cargar las ID citas" + error
            });
        });
    }

    this.PopulateEntrenadores = function () {
        $.ajax({
            url: "https://apirambosgym-emercdd0c8dbe0fq.eastus-01.azurewebsites.net/api/Usuario/GetEntrenadores",
            method: "GET",
            contentType: "application/json;charset=utf-8",
            dataType: "json"
        }).done(function (data) {
            infoEntrenador = data;
            var select = $('#idEntrenador');
            for (var row in data) {
                select.append('<option value=' + data[row].id + '>' + data[row].nombre + ' - ' + data[row].correo)
            }
            select.on('change', function () {
                let id = $(this).val();
                let correo = data.find(item => item.id === parseInt(id))?.correo;
                idEntrenador = id;
                emailG = correo;
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
        columns: ['id', 'Entrenador', 'Correo entrenador', 'Fecha', 'Nombre Cliente', 'Correo Cliente'],
        server: {
            url: 'https://apirambosgym-emercdd0c8dbe0fq.eastus-01.azurewebsites.net/api/AsignacionCita/GetAllAsignaciones',
            then: data => data.data.map(result => {

                const originalDate = new Date(result.citasMedicionesList[0].fecha);

                const formatteDate = 
                    `${(originalDate.getMonth() + 1).toString().padStart(2, '0')}/` +
                    `${originalDate.getDate().toString().padStart(2, '0')}/` +
                    `${originalDate.getFullYear()} ` +
                    `${originalDate.getHours().toString().padStart(2, '0')}:` +
                    `${originalDate.getMinutes().toString().padStart(2, '0')}`;

                return [
                    result.id,
                    result.usuarioLis[0].nombre,
                    result.usuarioLis[0].correo,
                    formatteDate,
                    result.citasMedicionesList[0].usuariosList[0].nombre,
                    result.citasMedicionesList[0].usuariosList[0].correo,

                ]
            }),
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