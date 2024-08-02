idUsuarioID = null;
infoUsuario = [];
idRutinaID = null;
infoRutina = [];
function CrearCitaMedicion() {

    this.InitView = function () {
        this.PopulateUsuarios();
        this.PopulateRutinas();
        $('#citaMedicion').click(function (event) {
            var view = new CrearCitaMedicion();
            view.SubmitCitaMedicion();
        });
    }

    this.SubmitCitaMedicion = function () {

        var citas = {}
        citas.id = generateUniqueId();
        citas.fecha = $('#horaMedicion').val();
        citas.peso = $('#peso').val();
        citas.estatura = $('#estatura').val();
        citas.porcentageGrasa = $('#grasa').val();
        citas.rutinas = $('#notas').val();
        citas.idRutinas = idRutinaID;
        citas.idUsuarios = idUsuarioID;

        if (citas.fecha === "") {
            Swal.fire({
                icon: 'error',
                text: "Por favor indique un horario.",
                title: 'Error'
            });
            return;
        }

        if (citas.peso === "") {
            Swal.fire({
                icon: 'error',
                text: "Por favor indique un peso.",
                title: 'Error'
            });
            return;
        }

        if (citas.estatura === "") {
            Swal.fire({
                icon: 'error',
                text: "Por favor una estatura.",
                title: 'Error'
            });
            return;
        }

        if (citas.porcentageGrasa === "") {
            Swal.fire({
                icon: 'error',
                text: "Por favor un porcentage de grasa.",
                title: 'Error'
            });
            return;
        }

        if (citas.rutinas === "") {
            Swal.fire({
                icon: 'error',
                text: "Por favor agregar las notas correspondientes.",
                title: 'Error'
            });
            return;
        }

        if (citas.idRutinas === "") {
            Swal.fire({
                icon: 'error',
                text: "Por favor indicar la rutina.",
                title: 'Error'
            });
            return;
        }

        if (citas.idUsuarios === "") {
            Swal.fire({
                icon: 'error',
                text: "Por favor indicar un usuarios.",
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
            url: "https://localhost:7253/api/CitasMedicion/CrearCitaMedicion",
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
                title: 'Error',
            });
        });
    }
    this.PopulateUsuarios = function () {
        $.ajax({            
            url: "https://localhost:7253/api/Usuario/GetUsuarios",
            method: "GET",
            contentType: "application/json;charset=utf-8",
            dataType: "json"
        }).done(function (data) {            
            infoUsuario = data;
            var select = $('#idusuario');
            for (var row in data) {
                select.append('<option value=' + data[row].id + '>' + data[row].nombre + ', ' + data[row].correo)
            }
            select.on('change', function () {
                let id = $(this).val();
                idUsuarioID = id;
            });
        }).fail(function (error) {
            Swal.fire({
                title: "Error",
                icon: "error",
                text: "Error al cargar los usuarios" + error
            });
        });
        console.log(idRutinaID);
    }

    this.PopulateRutinas = function () {
        $.ajax({
            url: "https://localhost:7253/api/Rutina/Getrutina",
            method: "GET",
            contentType: "application/json;charset=utf-8",
            dataType: "json"
        }).done(function (data) {
            infoRutina = data;
            var select = $('#idrutinas');
            for (var row in data) {
                select.append('<option value=' + data[row].id + '>' + data[row].nombreEjercicio + ', ' + data[row].tipoEjercicio)
            }
            select.on('change', function () {
                let id = $(this).val();
                idRutinaID = id;
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

        columns: ['Nombre', 'Correo', 'Fecha', 'Peso en KG', 'Estatura en Metros', 'Porcentage en Grasa', 'Nombre de ejercicio', 'Tipo de ejercicio'],
        server: {
            url: 'https://localhost:7253/api/CitasMedicion/GetAllUsuarios',
            then: data => data.data.map(result => [
                result.usuariosList[0].nombre,
                result.usuariosList[0].correo,
                result.fecha,
                result.peso,
                result.estatura,
                result.porcentageGrasa,
                result.rutinasList[0].nombreEjercicio,
                result.rutinasList[0].tipoEjercicio
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
    var view = new CrearCitaMedicion();
    view.InitView();
});