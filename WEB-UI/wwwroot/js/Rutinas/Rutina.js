idUsuarioID = null;
infoUsuario = [];
idMaquinaID = null;
infoMaquina = [];
function AgregarRutina() {
    this.InitView = function () {
        this.PopulateUsuarios();
        this.PopulateMaquina();

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
        rutina.repeticiones = $('#AgregarReps').val();
        rutina.series = $('#AgregarSeries').val();
        rutina.idUsuarios = idUsuarioID;
        rutina.idMaquina = idMaquinaID;
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
        if (rutina.repeticiones === "") {
            Swal.fire({
                icon: 'error',
                text: "Por favor indique el  numero de repeticiones.",
                title: 'Error'
            });
            return;
        }
        if (rutina.series === "") {
            Swal.fire({
                icon: 'error',
                text: "Por favor indique el  tipo de series.",
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
            select.append('<option value=' + data[row].id + '>' + data[i].id + + ' - ' + usuario.correo + '</option>')    
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
    }
this.PopulateMaquina = function () {
    $.ajax({
        url: "https://localhost:7253/api/Maquina/Getmaquina",
        method: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json"
    }).done(function (data) {
        infoUsuario = data;
        var select = $('#idMaquina');
        for (var row in data) {
            select.append('<option value=' + data[row].id + '>' + data[i].id + + ' - ' + maquina.nombreMaquina + '</option>');

        }
     
        select.on('change', function () {
            let id = $(this).val();
            idMaquinaID = id;
        });
    }).fail(function (error) {
        Swal.fire({
            title: "Error",
            icon: "error",
            text: "Error al cargar los usuarios" + error
        });
    });
}
function Consultar() {
    const grid = new gridjs.Grid({
        search: true,
        sort: true,
        resizable: true,
        pagination: {
            limit:3
        },
        columns: ['Nombre del ejercicio', 'Tipo de ejercicio','Repeticiones','Serires','Usuario','Maquina'],
        server: {
            url: 'https://localhost:7253/api/Rutina/Getrutina',
            then: data => data.map(result => [
                result.nombreEjercicio,
                result.tipoEjercicio,
                result.repeticiones,
                result.series,
                result.usuariosList[0].correo,
                result.maquinaList[0]. nombreMaquina,
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