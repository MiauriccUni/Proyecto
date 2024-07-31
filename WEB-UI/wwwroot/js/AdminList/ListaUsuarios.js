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

        $.ajax({
            headers: {
                'Accept': "application/json",
                'Content-Type': "application/json"
            },
            method: "PUT",
            url: api_url,
            contentType: "application/json;charset=utf-8",
            dataType: "text",      
        }).done(function (response) {
            Swal.fire({
                title: '¡Rol cambiado!',
                text: 'El rol del usuario ha sido cambiado con éxito.',
                icon: 'success',
                confirmButtonText: 'Aceptar',
            })
        }).fail(function (error) {
            Swal.fire({
                title: '¡Error!',
                text: 'No se pudo cambiar el rol del usuario.',
                icon: 'error',
                confirmButtonText: 'Aceptar',
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
