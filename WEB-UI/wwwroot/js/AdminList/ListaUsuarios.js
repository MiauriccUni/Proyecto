idUsuarioID = null;
infoUsuario = [];
function UsuariosList() {
    this.InitView = function () { 
        this.PopulateUsuarios();
        $('#btnActRol').click(function () {
            var view = new UsuariosList();
            view.PutRol();
        });
    }

    this.PutRol = function () {

        id = idUsuarioID;
        nuevoRol = $('#rolselect').find(":selected").val();

        var api_url = "https://localhost:7253/api/Usuario/UpdateRol?id=" + id + "&rol=" + nuevoRol;

        if (id === "") {
            Swal.fire({
                icon: 'error',
                text: "Por favor indique un ID a actualizar.",
                title: ''
            });
            return;
        }
        if (nuevoRol === "") {
            Swal.fire({
                icon: 'error',
                text: "Por favor indique el nuevo rol a asignar correspondiente.",
                title: ''
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
            if (!user) {
                Swal.fire({
                    title: '',
                    icon: 'error',
                    text: "El ID del usuario indicado no se encuentra registrado",
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
                        title: '¡Rol cambiado!',
                        text: 'El rol del usuario ha sido cambiado con éxito.',
                        icon: 'success',
                        confirmbuttontext: 'aceptar',
                    })
                }).fail(function (error) {
                    swal.fire({
                        title: '',
                        text: 'No se pudo cambiar el Rol del usuario.',
                        icon: 'error',
                        confirmbuttontext: 'aceptar',
                    });
                });
            }
        }).fail(function (error) {
            Swal.fire({
                title: '',
                icon: 'error',
                text: "Error al cargar los usuarios",
            });
        })
    }

    this.PopulateUsuarios = function () {
        $.ajax({
            url: "https://localhost:7253/api/Usuario/GetUsuarios",
            method: "GET",
            contentType: "application/json;charset=utf-8",
            dataType: "json"
        }).done(function (data) {
            infoUsuario = data;
            var select = $('#idusuario');
            for (var row in data) {
                select.append('<option value=' + data[row].id + '>' + data[row].nombre + ', ' + data[row].correo)
            }
            select.on('change', function () {
                let id = $(this).val();
                idUsuarioID = id;
            });
        }).fail(function (error) {
            Swal.fire({
                title: "",
                icon: "error",
                text: "Error al cargar los usuarios" + error
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
