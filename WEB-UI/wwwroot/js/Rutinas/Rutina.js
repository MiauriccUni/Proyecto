function AgregarRutina() {
    this.InitView = function{
        $('#Rutina').click(function (event)){
            var view = new AgregarRutina();
            view.SubitRutinas();
        }
    });

    this.SubitRutinas = function () {
        var rutinas = {}
        rutinas.id = gereteUniqueID();
        rutinas.nombreEjercicio = $('#AgregarNombre').val();
        rutinas.tipoEjercicio = $('AgregarTipoEjer').val();

        if (rutinas.nombreEjercicio === "") {
            Swal.fire({
                icon: 'error',
                text: "Por favor indique el nombre ejercicio.",
                title: 'Error'
            });
            return;
        }

        if (rutinas.tipoEjercicio === "") {
            Swal.fire({
                icon: 'error',
                text: "Por favor indique el  tipo del ejercicio.",
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
            url: "https://localhost:7253/api/Rutina/CreateRutina",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            data: JSON.stringify(rutinas),
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

      
    }
}