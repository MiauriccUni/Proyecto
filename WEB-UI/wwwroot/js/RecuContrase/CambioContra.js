$(document).ready(function () {
    $('#cambiarContrasena').click(function () {
        var email = sessionStorage.getItem('correo');
        var newPassword = $('#newPassword').val();
        var confirmPassword = $('#confirmPassword').val();

        if (newPassword === "" || confirmPassword === "") {
            Swal.fire({
                icon: 'error',
                text: "Por favor ingrese la nueva contraseña y la confirmación.",
                title: 'Error'
            });
            return;
        }

        if (newPassword !== confirmPassword) {
            Swal.fire({
                icon: 'error',
                text: "Las contraseñas no coinciden.",
                title: 'Error'
            });
            return;
        }

        var email = sessionStorage.getItem('email');

        $.ajax({
            url: "https://localhost:7253/api/Usuario/ChangePassword",
            method: "PUT",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            data: JSON.stringify({
                email: email,
                newPassword: newPassword
            })
        }).done(function (response) {
            Swal.fire({
                icon: 'success',
                text: "Contraseña cambiada con éxito.",
                title: 'Éxito'
            }).then(() => {
                window.location.href = "/Home/Login";
            });
        }).fail(function (error) {
            Swal.fire({
                icon: 'error',
                text: "Hubo un error al cambiar la contraseña.",
                title: 'Error'
            });
            console.log(error);
        });
    });
});