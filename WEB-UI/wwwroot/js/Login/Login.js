function Consulta() {

    this.InitView = function () {
        $('#login').click(function (event) {
            event.preventDefault(); // Prevent default form submission
            var view = new Consulta();
            view.SubmitConsulta();
        });
    }

    this.SubmitConsulta = function () {
        let email = $('#loginEmail').val();
        let pass = $('#loginPassword').val();

        if (email === "") {
            Swal.fire({
                icon: 'error',
                text: "Por favor indique su correo en el espacio correspondiente.",
                title: 'Error'
            });
            return;
        }

        if (pass === "") {
            Swal.fire({
                icon: 'error',
                text: "Por favor indique su contraseña en el espacio correspondiente.",
                title: 'Error'
            });
            return;
        }

        $.ajax({
            url: "https://localhost:7253/api/Usuario/GetUserByEmail?correo=" + email,
            method: "GET",
            contentType: "application/json;charset=utf-8",
            dataType: "json"
        }).done(function (result) {
            var user = result[0];
            if (!user) {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "El usuario y contraseña indicada no se encuentran registrados."
                });
            } else if ((user.correo != email) || (user.contrasenna != pass)) {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "La contraseña y el correo no coinciden."
                });
            } else if (user.verificar === "Incompleta") {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "La cuenta no esta verificada."
                });
            } else if ((user.correo === email) && (user.contrasenna === pass)) {
                Swal.fire({
                    icon: "success",
                    title: "Excelente",
                    text: "Bienvenido"
                }).then(function () {
                    sessionStorage.setItem('correo', email);
                    var roles = user.rol;
                    switch (roles) {
                        case "Administrador":
                            window.location = "/Administrador/AdminPanelPrincipal";
                            break;
                        case "Recepcionista":
                            window.location = "/Recepcionista/RecepcionPanel";
                            break;
                        case "Entrenador":
                            window.location = "/Entrenador/PanelEntrenador";
                            break;
                        case "ClientePremium":
                            window.location = "/Clientes/ClienteDia";
                            break;
                        case "ClienteStandard":
                            window.location = "/Clientes/ClientePremium";
                            break;
                        case "Cliente1dia":
                            window.location = "/Clientes/ClienteStandard";
                            break;
                        default:
                            Swal.fire({
                                icon: "error",
                                title: "Error",
                                text: "No se logro identificar el Usuario"
                            })
                    }
                });
            }          
        }).fail(function (error) {
            console.log("Error", error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Hubo un problema con la solicitud. Por favor, intente de nuevo más tarde."
            });
        });
    }
}

$(document).ready(function () {
    var view = new Consulta();
    view.InitView();
});
