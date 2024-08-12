$(document).ready(function () {
    $('#cambiarContrasena').click(function () {
        var email = sessionStorage.getItem('correo');
        var newPassword = $('#newPassword').val();
        var confirmPassword = $('#confirmPassword').val();

        if (newPassword.length < 8) {
            Swal.fire({
                icon: 'error',
                text: "La nueva contraseña debe tener al menos 8 caracteres.",
                title: ''
            });
            return;
        }

        if (newPassword === "" || confirmPassword === "") {
            Swal.fire({
                icon: 'error',
                text: "Por favor ingrese la nueva contraseña y la confirmación.",
                title: ''
            });
            return;
        }

        if (newPassword !== confirmPassword) {
            Swal.fire({
                icon: 'error',
                text: "Las contraseñas no coinciden.",
                title: ''
            });
            return;
        }

    

        $.ajax({
            url: "https://localhost:7253/api/Usuario/ChangePassword?correo=" + email + "&password=" + newPassword,
            method: "PUT",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (data)
            {
                console.log("exito")
            },
            error: function (error)
            {
                Swal.fire({
                    title: "",
                    icon: "success",
                    text: "Se ha cambiado la contraseña",
                }).then(
                   window.location = "/Home/Index"
                    
                )
            }
        
        });
    });
});