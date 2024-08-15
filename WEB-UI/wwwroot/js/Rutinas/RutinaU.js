

    var correo = sessionStorage.getItem('correo')
    //if (correo) {
    //    console.log("Tengo el correo" , correo)
    //} else {
    //    console.log("no tengo el correo", correo)
    //}
    
        //this.PopulateUsuarios = function () {
        //    $.ajax({
        //        url: "https://localhost:7253/api/Usuario/GetClientes",
        //        method: "GET",
        //        contentType: "application/json;charset=utf-8",
        //        dataType: "json"
        //    }).done(function (data) {
        //        infoUsuario = data;
        //        var select = $('#idusuario');
        //        for (var row in data) {
        //            select.append('<option value=' + data[row].id + '>' + data[row].correo + '</option>')
        //        }
        //        select.on('change', function () {
        //            let id = $(this).val();
        //            idUsuarioID = id;
        //        });
        //    }).fail(function (error) {
        //        Swal.fire({
        //            title: "Error",
        //            icon: "error",
        //            text: "Error al cargar los usuarios" + error
        //        });
        //    });
        //}

        //this.PopulateMaquina = function () {
        //    $.ajax({
        //        url: "https://localhost:7253/api/Maquina/Getmaquina",
        //        method: "GET",
        //        contentType: "application/json;charset=utf-8",
        //        dataType: "json"
        //    }).done(function (data) {
        //        infoMaquina = data;
        //        var select = $('#idMaquina');
        //        for (var row in data) {
        //            select.append('<option value=' + data[row].id + '>' + data[row].nombreMaquina + '</option>');
        //        }
        //        select.on('change', function () {
        //            let id = $(this).val();
        //            idMaquinaID = id;
        //        });
        //    }).fail(function (error) {
        //        Swal.fire({
        //            title: "Error",
        //            icon: "error",
        //            text: "Error al cargar los usuarios" + error
        //        });
        //    });
        //}

function Consultar() {
    const grid = new gridjs.Grid({
        search: true,
        language: {
            search: {
                placeholder: 'Buscar'
            }
        },
        sort: true,
        resizable: true,
        pagination: {
            limit: 3
        },
        columns: ['Nombre del ejercicio', 'Tipo de ejercicio', 'Repeticiones', 'Serires', 'Usuario', 'Maquina'],
        server: {
            url: 'https://localhost:7253/api/Rutina/GetRutinasBYCorreo?Correo=' + correo,
            then: data => data.map(result => [
                result.nombreEjercicio,
                result.tipoEjercicio,
                result.repeticiones,
                result.series,
                result.usuariosList[0].correo ,
                result.maquinaList[0].nombreMaquina,
            ])
        },
    }).render(document.getElementById('myGrid'));
}
document.addEventListener("DOMContentLoaded", function () {
    Consultar();
});