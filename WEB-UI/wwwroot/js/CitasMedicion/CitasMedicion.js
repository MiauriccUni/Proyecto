function CrearCitaMedicion() {

    this.InitView = function () {
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
        citas.rutinas = $('#rutina').val();
        citas.idRutinas = $('#idrutina').val();
        citas.idUsuarios = $('#idusuario').val();

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
        columns: ['ID', 'Nombre', 'Correo', 'Fecha', 'Peso', 'Estatura'],
        server: {
            url: 'https://localhost:7253/api/CitasMedicion/GetAllUsuarios',
            then: data => data.data.map(result => [
                result.id,
                result.usuariosList[0].nombre,
                result.usuariosList[0].correo,
                result.fecha,
                result.peso,
                result.estatura])
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