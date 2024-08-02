idUsuarioID = null;
infoUsuario = [];
idRutinaID = null;
infoRutina = [];
function CrearCitaMedicion() {

    this.InitView = function () {
        this.PopulateUsuarios();
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
        citas.idUsuarios = idUsuarioID;

        var fechaSeleccionadaString = $('#horaMedicion').val();
        var fechaSeleccionada = new Date(fechaSeleccionadaString);

        var fechaActualString = new Date().toISOString().slice(0, 16);
        var fechaActual = new Date(fechaActualString);

        var diferencia = fechaActual.getFullYear() - fechaSeleccionada.getFullYear();

        if (diferencia < 0) {
            Swal.fire({
                icon: 'error',
                text: "Por favor indique una fecha no menor a la actual.",
                title: 'Error'
            });
            return;
        }

        if (citas.porcentageGrasa < 2) {
            Swal.fire({
                icon: 'error',
                text: "Por favor indique un porcentage en grasa no menor a 2",
                title: 'Error'
            });
            return;
        }

        if (citas.porcentageGrasa > 100) {
            Swal.fire({
                icon: 'error',
                text: "Por favor indique un porcentage en grasa no mayor a 100",
                title: 'Error'
            });
            return;
        }

        if (citas.estatura < 1.10) {
            Swal.fire({
                icon: 'error',
                text: "Por favor indique una estatura no menor a 1.10 metros",
                title: 'Error'
            });
            return;
        }

        if (citas.estatura > 2.30) {
            Swal.fire({
                icon: 'error',
                text: "Por favor indique una estatura no mayor a 2.30 metros",
                title: 'Error'
            });
            return;
        }

        if (citas.peso < 25) {
            Swal.fire({
                icon: 'error',
                text: "Por favor indique un peso no menor a 25 Kilogramos.",
                title: 'Error'
            });
            return;
        }

        if (citas.peso > 180) {
            Swal.fire({
                icon: 'error',
                text: "Por favor indique un peso no mayor a 180 Kilogramos.",
                title: 'Error'
            });
            return;
        }

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
            url: "https://localhost:7253/api/Usuario/GetClientes",
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