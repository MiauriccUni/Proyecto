$(document).ready(function () {
    $('#btnActRol').click(function () {
        var userId = $('#txtIdentificacion').val();
        var newRole = $('#rolselect').val();
        $.ajax({
            url: '/api/Usuario/UpdateUserRole',
            type: 'PUT',
            data: {
                userId: userId,
                newRole: newRole
                },
                success: function (response) {
                    if (response.success) {
                       alert('Rol actualizado correctamente');
                      } else {
                          alert('Error al actualizar el rol: ' + response.message);
                      }
                  },
                  error: function () {
                  alert('Error al conectar con el servidor');
              }
          });
     });
});