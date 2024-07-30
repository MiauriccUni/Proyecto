function UsuariosList() {
    this.InitView = function () {
        this.ListaUsuarios();

        //$('#btnActRol').click(function () {
        //    var view = new UsuariosList();
        //    view.PutRol();
        //});
    }

    this.ListaUsuarios = function () {
        $.ajax({
            url: "https://localhost:7253/api/Usuario/GetAllUsuarios",
            method: "GET",
            contentType: "application/json;charset=utf-8",
            dataType: "json"
        }).done(function (result) {
            if (result.result == "OK") {
                console.log("Estos fueron", result);
                gridOptions.api.setRowData(result.data);
            }
            else {
                console.log(error);
                Swal.fire({
                    icon: "error",
                    title: "Hubo un problema al cargar los usuarios",
                    text: "Hubo un problema al cargar las usuarios " + result.message
                });
            }
        }).fail(function (error) {
            console.log("El error" + error.data);
            Swal.fire({
                icon: "error",
                title: "Error al cargar los Usuarios",
                text: "Hubo un error" + " " +error.message
            });

        });
    }

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

    //this.PutRol = function () {
    //    var usuario = {};
    //    usuario.Correo = $('#txtCorreo').val();
    //    usuario.nuevoRol = $('#Rol').find(":selected").val();

    //    var api_url = API_URL_BASE + "/api/Usuario/UpdateRol?correo=" + usuario.Correo + "&nuevoRol=" + usuario.nuevoRol;
    //    $.ajax({
    //        headers: {
    //            'Accept': "application/json",
    //            'Content-Type': "application/json"
    //        },
    //        method: "PUT",
    //        url: api_url,
    //        contentType: "application/json;charset=utf-8",
    //        dataType: "text",
    //        data: JSON.stringify(usuario)
    //    }).done(function (response) {
    //        Swal.fire({
    //            title: '¡Rol cambiado!',
    //            text: 'El rol del usuario ha sido cambiado con éxito.',
    //            icon: 'success',
    //            confirmButtonText: 'Aceptar',
    //        }).then(function (result) {
    //            //podria enviar correo por cambio de rol
    //            window.location = '/Administrador/VerUsuarios';
    //        });
    //    }).then(function (result) {
    //        console.log("ENTRO AL THEN DEL AJAX")

    //    }).fail(function (error) {
    //        Swal.fire({
    //            title: '¡Error!',
    //            text: 'No se pudo cambiar el rol del usuario.',
    //            icon: 'error',
    //            confirmButtonText: 'Aceptar',
    //        });
    //    });
    //}

}

$(document).ready(function () {
    var view = new UsuariosList();
    view.InitView();
});
