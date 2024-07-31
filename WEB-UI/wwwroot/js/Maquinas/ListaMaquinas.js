function MaquinasList() {
    this.InitView = function () {
        $('#btnActRol').click(function () {
            var view = new MaquinasList();
            view.PutRol();
        });
    }
      this.PutRol = function () {

        id = $('#txtIdentificacion').val();
        nuevoRol = $('#rolselect').find(":selected").val();

          var api_url = "https://localhost:7253/api/Usuario/UpdateRol?id=" + id + "&rol=" + nuevoRol; /* cambiar esta parte del código */

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

        columns: ['Nombre'],
        server: {
            url: 'https://localhost:7253/api/Usuario/GetAllUsuarios', /* cambiar esta parte del código */
            then: data => data.data.map(result => [result.id, result.nombre, result.correo, result.rol])
        },
    }).render(document.getElementById('myGrid'));
}

$(document).ready(function () {
    Consultar();
    var view = new MaquinasList();
    view.InitView();
});
