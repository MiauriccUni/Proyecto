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
    var view = new CrearCitaMedicion();
    view.InitView();
});