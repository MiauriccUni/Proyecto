function AgregarRutina() {
    this.InitView = function(){
        $('#Rutinas').click(function (event){
            var view = new AgregarRutina();
            view.SubitRutinas();
        });
    }
    this.SubitRutinas = function () {
        var rutina = {}
        rutina.id = generateUniqueId();
        rutina.nombreEjercicio = $('#AgregarNombre').val();
        rutina.tipoEjercicio = $('#AgregarTipoEjer').val();
        if (rutina.nombreEjercicio === "") {
            Swal.fire({
                icon: 'error',
                text: "Por favor indique el nombre ejercicio.",
                title: 'Error'
            });
            return;
        }
        if (rutina.tipoEjercicio === "") {
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
            data: JSON.stringify(rutina)
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
            limit: 3
        },
        columns: ['Nombre del ejercicio', 'Tipo de ejercicio'],
        server: {
            url: 'https://localhost:7253/api/Rutina/Getrutina',
            then: data => data.map(result => [
                result.nombreEjercicio,
                result.tipoEjercicio,
            ])
        },
    }).render(document.getElementById('myGrid'));
}

document.addEventListener("DOMContentLoaded", function() {
    Consultar();
});
generatedIds = [];
generateUniqueId = () => {
    let newId;
    do {
        const randomNumber = Math.floor(100000 + Math.random() * 900000);
        newId = randomNumber;
    } while (generatedIds.includes(newId));
    generatedIds.push(newId);
    return newId;
}

$(document).ready(function () {
    var view = new AgregarRutina();
    view.InitView();
});