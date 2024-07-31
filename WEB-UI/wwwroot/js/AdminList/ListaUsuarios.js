function UsuariosList() {
    this.InitView = function () {       
        $('#btnActRol').click(function () {
            var view = new UsuariosList();
            view.PutRol();
        });
    }
    //this.ListaUsuarios = function () {
    //    $.ajax({
    //        url: "https://localhost:7253/api/Usuario/GetAllUsuarios",
    //        method: "GET",
    //        contentType: "application/json;charset=utf-8",
    //        dataType: "json"
    //    }).done(function (result) {
    //        if (result.result == "OK") {
    //            console.log("Estos fueron", result);
    //           // gripOptions.api.setRowData(result.data);
    //        }
    //        else {
    //            console.log(error);
    //            Swal.fire({
    //                icon: "error",
    //                title: "Hubo un problema al cargar los usuarios",
    //                text: "Hubo un problema al cargar las usuarios " + result.message
    //            });
    //        }
    //    }).fail(function (error) {
    //        console.log("El error" + error.data);
    //        Swal.fire({
    //            icon: "error",
    //            title: "Error al cargar los Usuarios",
    //            text: "Hubo un error" + " " +error.message
    //        });

    //    });
    //}

    //this.GetUsersDetails = function (correo) {
    //    $.ajax({
    //        url: API_URL_BASE + "/api/Usuario/GetUserByCorreo?correo=" + correo,
    //        method: "GET",
    //        contentType: "application/json;charset=utf-8",
    //        dataType: "json"
    //    }).done(function (result) {

    //        var usuario = result[0];
    //        console.log("Estos fueron", result);

    //        $('#txtIdentificacion').val(usuario.identificacion);
    //        console.log("Identificacion", usuario.identificacion);

    //        $('#txtNombre').val(usuario.nombre);
    //        console.log("Nombre", usuario.nombre);

    //        $('#txtApellidos').val(usuario.apellidos);
    //        console.log("Apellidos", usuario.apellidos);

    //        $('#txtCorreo').val(usuario.correo);
    //        console.log("Correo: ", usuario.correo);

    //        console.log("Rol: ", usuario.rol);

    //        // Remover opción vacía del dropdown
    //        $('#Rol option[value=""]').remove();

    //        // Establecer las opciones de rol disponibles
    //        var roles = ["Administrador", "Recepcionista", "Entrenador", "Cliente Premium", "Cliente Standard", "Cliente 1 dia"];

    //        // Verificar si el rol del usuario está en la lista de roles
    //        var index = roles.indexOf(usuario.rol);
    //        if (index !== -1) {
    //            // Mover el rol del usuario al principio de la lista
    //            roles.splice(index, 1);
    //            roles.unshift(usuario.rol);
    //        }

    //        // Actualizar el dropdown con las opciones de rol
    //        $('#Rol').empty();
    //        roles.forEach(function (rol) {
    //            $('#Rol').append('<option value="' + rol + '">' + rol + '</option>');
    //        });

    //        // Establecer el valor del rol del usuario seleccionado
    //        $('#Rol').val(usuario.rol);


    //    }).fail(function (error) {
    //        console.log("El error" + error.data);
    //        Swal.fire({
    //            icon: "error",
    //            title: "Error al cargar los usuarios",
    //            text: "Hubo un error" + error.message
    //        });

    //    });

    //}




    this.PutRol = function () {
        
        id = $('#txtIdentificacion').val();
        nuevoRol = $('#rolselect').find(":selected").val();

        var api_url = "https://localhost:7253/api/Usuario/UpdateRol?id=" + id + "&rol=" + nuevoRol;

        if (id === "") {
            Swal.fire({
                icon: 'error',
                text: "Por favor indique un ID a actualizar.",
                title: 'Error'
            });
            return;
        }
        if (nuevoRol === "") {
            Swal.fire({
                icon: 'error',
                text: "Por favor indique el nuevo rol a asignar correspondiente.",
                title: 'Error'
            });
            return;
        }

        $.ajax({
            url: "https://localhost:7253/api/Usuario/GetUserById?id=" + id,
            method: "GET",
            contentType: "application/json;charset=utf-8",
            dataType: "json"
        }).done(function (result) {
            var user = result[0];
            console.log(result[0]);
            if (!user) {
                Swal.fire({
                    title: 'Error',
                    icon: 'error',
                    text: "Error el ID del usuario indicado no se encuentra registrado",
                });
            } else {
                $.ajax({
                    headers: {
                        'accept': "application/json",
                        'content-type': "application/json"
                    },
                    method: "put",
                    url: api_url,
                    contenttype: "application/json;charset=utf-8",
                    datatype: "text",
                }).done(function (response) {
                    swal.fire({
                        title: '¡rol cambiado!',
                        text: 'el rol del usuario ha sido cambiado con éxito.',
                        icon: 'success',
                        confirmbuttontext: 'aceptar',
                    })
                }).fail(function (error) {
                    swal.fire({
                        title: '¡error!',
                        text: 'no se pudo cambiar el rol del usuario.',
                        icon: 'error',
                        confirmbuttontext: 'aceptar',
                    });
                });
            }
        }).fail(function (error) {
            Swal.fire({
                title: 'Error',
                icon: 'error',
                text: "Error al cargar los usuarios",
            });
        })
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

        columns: ['ID', 'Nombre', 'Correo', 'Rol'],
        server: {
            url: 'https://localhost:7253/api/Usuario/GetAllUsuarios',
            then: data => data.data.map(result => [result.id, result.nombre, result.correo, result.rol])
        },
    }).render(document.getElementById('myGrid'));
}

$(document).ready(function () {
    Consultar();
    var view = new UsuariosList();
    view.InitView();
});
