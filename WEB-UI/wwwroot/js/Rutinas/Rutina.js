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
        rutina.idMaquina = idMaquinaID;
        rutina.idUsuario = idUsuarioID;
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

        console.log(rutina);
        console.log(idUsuarioID);
   
        $.ajax({
            headers: {
                'Accept': "application/json",
                'Content-Type': "application/json"
            },
            method: "POST",
            url: "https://apirambosgym-emercdd0c8dbe0fq.eastus-01.azurewebsites.net/api/Rutina/CreateRutina",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            data: JSON.stringify(rutina),
            hasContent: true
        }).done(function (result) {
            console.log(result);
            console.log(rutina);
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
            console.log(rutina);
            console.log("este es el error: ",error)
        });
    }

    this.PopulateUsuarios = function () {
        $.ajax({
            url: "https://apirambosgym-emercdd0c8dbe0fq.eastus-01.azurewebsites.net/api/Usuario/GetClientes",
            method: "GET",
            contentType: "application/json;charset=utf-8",
            dataType: "json"
        }).done(function (data) {
            infoUsuario = data;
            var select = $('#idusuario');
            for (var row in data) {
                select.append('<option value=' + data[row].id + '>' + data[row].correo + '</option>')
            }
            select.on('change', function () {
                let id = $(this).val();
                idUsuarioID = id;
                console.log(id);
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
            url: "https://apirambosgym-emercdd0c8dbe0fq.eastus-01.azurewebsites.net/api/Maquina/Getmaquina",
            method: "GET",
            contentType: "application/json;charset=utf-8",
            dataType: "json"
        }).done(function (data) {
            infoMaquina = data;
            var select = $('#idMaquina');
            for (var row in data) {
                select.append('<option value=' + data[row].id + '>' + data[row].nombreMaquina + '</option>');
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
   
}

function Consultar() {
    const grid = new gridjs.Grid({
        search: true,
        search: {
            placeholder: 'Buscar'
        },
        sort: true,
        resizable: true,
        pagination: {
            limit:1
        },
        columns: ['Nombre del ejercicio', 'Tipo de ejercicio','Repeticiones','Serires','Usuario','Maquina'],
        server: {
            url: 'https://apirambosgym-emercdd0c8dbe0fq.eastus-01.azurewebsites.net/api/Rutina/Getrutina',
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