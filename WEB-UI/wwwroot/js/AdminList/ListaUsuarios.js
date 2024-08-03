function UsuariosList() {
    this.InitView = function () {       
        $('#btnActRol').click(function () {
            var view = new UsuariosList();
            view.PutRol();
        });
    }


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
